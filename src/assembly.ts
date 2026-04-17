import { createElement, type ReactNode } from 'react'
import { Op, Link } from '@vibestartup/sdk-runtime'

/** assembly root — the Studio kind="assembly" already declares intent, but
 *  <Part> / <SubAssembly> provide transform + mate semantics inside the tree. */

export type PartInstanceProps = {
  /** must refer to a linked Thing (see Link / links.yml) */
  ref: string
  at?: [number, number, number]
  rot?: [number, number, number]
  scale?: number
  children?: ReactNode
}

/** single part instance in an assembly — thin sugar over <Link>. */
export function PartInstance(p: PartInstanceProps) {
  return createElement(Link, { ref: p.ref, at: p.at, rot: p.rot, scale: p.scale }, p.children)
}

export type MateProps = {
  type: 'coincident' | 'concentric' | 'parallel' | 'perpendicular' | 'distance' | 'angle'
  a: string
  b: string
  value?: number
}
export function Mate(p: MateProps) {
  return createElement(Op, { type: 'mate', props: p })
}

export type RigidGroupProps = { ids: string[] }
export function RigidGroup(p: RigidGroupProps) { return createElement(Op, { type: 'rigidgroup', props: p }) }
