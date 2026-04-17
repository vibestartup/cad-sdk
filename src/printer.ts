/**
 * printer.ts — concrete-syntax printer for canonical CAD programs.
 *
 * given a Doc (from state.json), emit TSX that re-renders to the same Doc.
 * powers structural GUI edits (drag to reorder extrudes, delete features) by
 * giving the GUI a way to write source back.
 */

import type { Doc, OpNode } from '@vibestartup/sdk-runtime'

const CAD_IMPORT_MAP: Record<string, string> = {
  sketch: 'Sketch',
  'sketch.circle': 'Circle',
  'sketch.rect': 'Rect',
  'sketch.line': 'Line',
  'sketch.arc': 'Arc',
  'sketch.polygon': 'Polygon',
  'sketch.slot': 'Slot',
  'sketch.text': 'Text',
  extrude: 'Extrude',
  revolve: 'Revolve',
  sweep: 'Sweep',
  loft: 'Loft',
  fillet: 'Fillet',
  chamfer: 'Chamfer',
  shell: 'Shell',
  hole: 'Hole',
  boolean: 'Boolean',
  mirror: 'Mirror',
  'pattern.linear': 'PatternLinear',
  'pattern.circular': 'PatternCircular',
  plane: 'Plane',
  material: 'Material',
  'appearance.face': 'FaceAppearance',
  'generative.body': 'GenerativeBody',
  import: 'Import',
  link: 'Link',
  code: 'Code',
  'sim.force': 'ForceLoad',
  'sim.pressure': 'PressureLoad',
  mate: 'Mate',
  rigidgroup: 'RigidGroup',
}

export type PrintOptions = {
  /** function name, defaults to 'Thing' */
  name?: string
  /** whether to wrap the default export in `show(...)` (for cli-runnable files) */
  wrapShow?: boolean
}

export function printDocToTsx(doc: Doc, opts: PrintOptions = {}): string {
  const name = opts.name ?? 'Thing'
  const used = new Set<string>(['Studio'])
  const body = doc.rootIds.map((id) => printNode(doc, id, 2, used)).join('\n')

  const paramLines = doc.params.map((p) => {
    const kind = p.default.type
    const hook = kind === 'number' ? 'useNumberParam' :
                 kind === 'string' ? 'useStringParam' :
                 kind === 'boolean' ? 'useBooleanParam' :
                 kind === 'vec3' ? 'useVec3Param' : 'useParam'
    used.add(hook)
    const raw = paramLiteral(p.default)
    return `  const [${jsIdent(p.name)}] = ${hook}('${p.name}', ${raw})`
  }).join('\n')

  const imports = Array.from(used).sort().join(', ')
  return `import { ${imports} } from '@vibestartup/cad'

export default function ${name}() {
${paramLines}
  return (
    <Studio kind="${doc.kind}">
${body}
    </Studio>
  )
}
${opts.wrapShow ? `\nimport { show } from '@vibestartup/sdk-runtime'\nshow(<${name} />, { kind: '${doc.kind}' })\n` : ''}`
}

function printNode(doc: Doc, nodeId: string, indent: number, used: Set<string>): string {
  const n = doc.ops.get(nodeId)
  if (!n) return ''
  const compName = CAD_IMPORT_MAP[n.type] ?? 'Op'
  used.add(compName)
  const pad = ' '.repeat(indent)
  const props = printProps(n.props, n.type)
  if (n.children.length === 0) return `${pad}<${compName}${props ? ` ${props}` : ''} />`
  const inner = n.children.map((c) => printNode(doc, c, indent + 2, used)).join('\n')
  return `${pad}<${compName}${props ? ` ${props}` : ''}>\n${inner}\n${pad}</${compName}>`
}

function printProps(props: Record<string, unknown>, type: string): string {
  const parts: string[] = []
  for (const [k, v] of Object.entries(props)) {
    if (v === undefined) continue
    if (typeof v === 'string') parts.push(`${k}="${escapeStr(v)}"`)
    else parts.push(`${k}={${jsLiteral(v)}}`)
  }
  // raw <Op type="..."> fallback
  if (type && !CAD_IMPORT_MAP[type]) parts.unshift(`type="${type}"`)
  return parts.join(' ')
}

function escapeStr(s: string) { return s.replace(/"/g, '\\"') }
function jsLiteral(v: unknown): string { return JSON.stringify(v) }
function jsIdent(s: string): string { return s.replace(/[^a-zA-Z0-9_$]/g, '_') }
function paramLiteral(pv: { type: string; value: unknown; options?: string[] }): string {
  return JSON.stringify(pv.value)
}
