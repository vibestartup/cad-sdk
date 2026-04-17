import { createElement } from 'react'
import { Op } from '@vibestartup/sdk-runtime'

export type MaterialProps = {
  /** canonical preset id (aluminum-6061, steel-1018, pla, abs, ...) or custom */
  preset?: string
  densityKgM3?: number
  youngsPa?: number
  poisson?: number
  yieldPa?: number
  color?: string
  roughness?: number
  metalness?: number
  face?: string
}

/** declarative material assignment — applies to the enclosing body or named face. */
export function Material(p: MaterialProps) {
  return createElement(Op, { type: 'material', props: p })
}

export type FaceAppearanceProps = {
  face: string
  color?: string
  roughness?: number
  metalness?: number
}
export function FaceAppearance(p: FaceAppearanceProps) {
  return createElement(Op, { type: 'appearance.face', props: p })
}
