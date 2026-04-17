import { createElement, type ReactNode } from 'react'
import { Op } from '@vibestartup/sdk-runtime'

export type ExtrudeMode = 'new' | 'add' | 'cut' | 'intersect'

export type ExtrudeProps = {
  /** sketch index (0 = most recent sibling) or named sketch */
  sketch?: number | string
  depth: number
  /** 'mid' extrudes symmetric; 'sym' flips direction; 'new' starts a body */
  mode?: ExtrudeMode
  symmetric?: boolean
  draftDeg?: number
  children?: ReactNode
}
export function Extrude(p: ExtrudeProps) {
  return createElement(Op, { type: 'extrude', props: p }, p.children)
}

export type RevolveProps = {
  sketch?: number | string
  axis: [number, number, number]
  origin?: [number, number, number]
  angleDeg?: number
  mode?: ExtrudeMode
}
export function Revolve(p: RevolveProps) {
  return createElement(Op, { type: 'revolve', props: p })
}

export type SweepProps = {
  profile?: number | string
  path?: number | string
  twistDeg?: number
}
export function Sweep(p: SweepProps) {
  return createElement(Op, { type: 'sweep', props: p })
}

export type LoftProps = { sketches: (number | string)[]; ruled?: boolean }
export function Loft(p: LoftProps) { return createElement(Op, { type: 'loft', props: p }) }

export type FilletProps = { edges?: string[]; radius: number; everyEdge?: boolean }
export function Fillet(p: FilletProps) { return createElement(Op, { type: 'fillet', props: p }) }

export type ChamferProps = { edges?: string[]; distance: number; everyEdge?: boolean }
export function Chamfer(p: ChamferProps) { return createElement(Op, { type: 'chamfer', props: p }) }

export type ShellProps = { thickness: number; removeFaces?: string[] }
export function Shell(p: ShellProps) { return createElement(Op, { type: 'shell', props: p }) }

export type HoleProps = {
  at: [number, number, number]
  diameter: number
  depth: number
  countersink?: { diameter: number; depth: number }
  counterbore?: { diameter: number; depth: number }
  thread?: string
}
export function Hole(p: HoleProps) { return createElement(Op, { type: 'hole', props: p }) }

export type BooleanProps = {
  op: 'union' | 'difference' | 'intersect'
  children?: ReactNode
}
export function Boolean_(p: BooleanProps) {
  return createElement(Op, { type: 'boolean', props: { op: p.op } }, p.children)
}
export { Boolean_ as Boolean }

export type MirrorProps = { plane: 'XY' | 'XZ' | 'YZ' | string; children?: ReactNode }
export function Mirror(p: MirrorProps) {
  return createElement(Op, { type: 'mirror', props: { plane: p.plane } }, p.children)
}

export type PatternLinearProps = {
  direction: [number, number, number]
  count: number
  spacing: number
  children?: ReactNode
}
export function PatternLinear(p: PatternLinearProps) {
  return createElement(Op, { type: 'pattern.linear', props: { direction: p.direction, count: p.count, spacing: p.spacing } }, p.children)
}

export type PatternCircularProps = {
  axis: [number, number, number]
  count: number
  angleDeg?: number
  origin?: [number, number, number]
  children?: ReactNode
}
export function PatternCircular(p: PatternCircularProps) {
  return createElement(Op, { type: 'pattern.circular', props: p }, p.children)
}

export type PlaneProps = {
  /** 'offset' | 'fromFace' | '3point' */
  mode: 'offset' | 'fromFace' | 'threePoint'
  base?: 'XY' | 'XZ' | 'YZ' | string
  distance?: number
  face?: string
  points?: [[number, number, number], [number, number, number], [number, number, number]]
  name?: string
}
export function Plane(p: PlaneProps) { return createElement(Op, { type: 'plane', props: p }) }

/** generative body — black-box geometry emitted by an external solver/neural surrogate. */
export type GenerativeBodyProps = {
  solver: string
  config?: Record<string, unknown>
  children?: ReactNode
}
export function GenerativeBody(p: GenerativeBodyProps) {
  return createElement(Op, { type: 'generative.body', props: { solver: p.solver, config: p.config ?? {} } }, p.children)
}

/** simulation loads that live inside the CAD tree (read by FEM/CFD solvers). */
export type ForceLoadProps = { face?: string; vector: [number, number, number]; magnitude: number; unit?: 'N' | 'kN' | 'lbf' }
export function ForceLoad(p: ForceLoadProps) { return createElement(Op, { type: 'sim.force', props: p }) }
export type PressureLoadProps = { face?: string; pressure: number; unit?: 'Pa' | 'MPa' | 'psi' }
export function PressureLoad(p: PressureLoadProps) { return createElement(Op, { type: 'sim.pressure', props: p }) }
