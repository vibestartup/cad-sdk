import { createElement, type ReactNode } from 'react'
import { Op } from '@vibestartup/sdk-runtime'

export type SketchPlane = 'XY' | 'XZ' | 'YZ' | string

export type SketchProps = {
  plane?: SketchPlane
  /** named, so features can reference this sketch by id */
  name?: string
  children?: ReactNode
}

/** sketching plane — container for 2D primitives feeding downstream features. */
export function Sketch({ plane = 'XY', name, children }: SketchProps) {
  return createElement(Op, { type: 'sketch', props: { plane, name } }, children)
}

export type CircleProps = { cx?: number; cy?: number; r: number }
export function Circle({ cx = 0, cy = 0, r }: CircleProps) {
  return createElement(Op, { type: 'sketch.circle', props: { cx, cy, r } })
}

export type RectProps = {
  x?: number
  y?: number
  width: number
  height: number
  /** corner-radius for rounded-rect */
  radius?: number
  centered?: boolean
}
export function Rect({ x = 0, y = 0, width, height, radius = 0, centered = false }: RectProps) {
  return createElement(Op, { type: 'sketch.rect', props: { x, y, width, height, radius, centered } })
}

export type LineProps = { x1: number; y1: number; x2: number; y2: number }
export function Line(p: LineProps) { return createElement(Op, { type: 'sketch.line', props: p }) }

export type ArcProps = { cx: number; cy: number; r: number; start: number; end: number }
export function Arc(p: ArcProps) { return createElement(Op, { type: 'sketch.arc', props: p }) }

export type PolygonProps = { points: [number, number][]; close?: boolean }
export function Polygon({ points, close = true }: PolygonProps) {
  return createElement(Op, { type: 'sketch.polygon', props: { points, close } })
}

export type SlotProps = { x1: number; y1: number; x2: number; y2: number; width: number }
export function Slot(p: SlotProps) { return createElement(Op, { type: 'sketch.slot', props: p }) }

export type TextProps = { x: number; y: number; text: string; size?: number; font?: string }
export function Text(p: TextProps) { return createElement(Op, { type: 'sketch.text', props: p }) }

/** constraints — declarative 2D gcs. these are picked up by the sketch solver in the kernel. */
export type CoincidentProps = { a: string; b: string }
export function Coincident(p: CoincidentProps) { return createElement(Op, { type: 'sketch.coincident', props: p }) }

export type HorizontalProps = { line: string }
export function Horizontal(p: HorizontalProps) { return createElement(Op, { type: 'sketch.horizontal', props: p }) }
export function Vertical(p: HorizontalProps) { return createElement(Op, { type: 'sketch.vertical', props: p }) }

export type DistanceProps = { a: string; b: string; d: number }
export function Distance(p: DistanceProps) { return createElement(Op, { type: 'sketch.distance', props: p }) }
