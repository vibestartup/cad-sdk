/**
 * saved camera views — declarative named views pinned inside a part/assembly Thing.
 *
 * <SavedView name="iso" camera={[100, 80, 100]} target={[0, 0, 0]} up={[0, 1, 0]} />
 *
 * renders to an op that the surface picks up as a named camera preset.
 */

import { createElement } from 'react'
import { Op } from '@vibestartup/sdk-runtime'

export type SavedViewProps = {
  name: string
  camera: [number, number, number]
  target?: [number, number, number]
  up?: [number, number, number]
  /** nodes to hide in this view (their node-ids) */
  hidden?: string[]
  /** explode offset per child (applied to assembly instances) */
  explode?: number
}

export function SavedView(p: SavedViewProps) {
  return createElement(Op, { type: 'cad.savedview', props: { name: p.name, camera: p.camera, target: p.target ?? [0, 0, 0], up: p.up ?? [0, 0, 1], hidden: p.hidden ?? [], explode: p.explode ?? 0 } })
}

/** <DrawingView> — used inside a drawing kind to place a projected view of a part. */
export type DrawingViewProps = {
  sourceRef: string             // link id pointing at a part Thing
  at: [number, number]
  scale?: number
  projection?: 'front' | 'top' | 'right' | 'iso' | 'section'
  sectionPlane?: 'XY' | 'XZ' | 'YZ'
  label?: string
}
export function DrawingView(p: DrawingViewProps) {
  return createElement(Op, { type: 'drawing.view', props: p })
}

/** <Dimension> — linear / angular / radial dim annotation. */
export type DimensionProps = {
  type: 'linear' | 'angular' | 'radial' | 'diameter'
  from: [number, number]
  to: [number, number]
  value?: number       // computed if absent
  label?: string
  tol?: [number, number]  // [lower, upper] tolerance
}
export function Dimension(p: DimensionProps) {
  return createElement(Op, { type: 'drawing.dimension', props: p })
}

/** <Annotation> — text callout. */
export type AnnotationProps = { text: string; at: [number, number]; leaderTo?: [number, number]; size?: number }
export function Annotation(p: AnnotationProps) {
  return createElement(Op, { type: 'drawing.annotation', props: p })
}

/** <TitleBlock> — standard drawing title block. */
export type TitleBlockProps = {
  title?: string
  drawer?: string
  approver?: string
  date?: string
  drawingNumber?: string
  revision?: string
  sheetSize?: 'A' | 'B' | 'C' | 'D' | 'E' | 'A0' | 'A1' | 'A2' | 'A3' | 'A4'
}
export function TitleBlock(p: TitleBlockProps) {
  return createElement(Op, { type: 'drawing.titleblock', props: p })
}

/** <CamToolpath> — CAM op inside a `cam` kind Thing. */
export type CamToolpathProps = {
  operation: 'contour' | 'pocket' | 'drill' | 'facing' | '3d-surface' | 'adaptive'
  targetRef: string          // link id pointing at a face / sketch / part
  tool: { diameterMm: number; fluteCount?: number; type?: 'endmill' | 'ballmill' | 'drill' | 'chamfer' }
  feedMmMin?: number
  spindleRpm?: number
  stepdownMm?: number
  stepoverMm?: number
}
export function CamToolpath(p: CamToolpathProps) {
  return createElement(Op, { type: 'cam.toolpath', props: p })
}

/** <CamSetup> — CAM setup (workpiece origin, stock, machine). */
export type CamSetupProps = {
  stockType: 'box' | 'cylinder' | 'from-part'
  stockDimsMm?: [number, number, number]
  origin?: [number, number, number]
  machine?: 'cnc-mill-3axis' | 'cnc-mill-5axis' | 'cnc-lathe' | 'laser' | 'waterjet'
}
export function CamSetup(p: CamSetupProps) {
  return createElement(Op, { type: 'cam.setup', props: p })
}

/** <Simulation> — FEM/CFD sim run declarative spec. */
export type SimulationProps = {
  solver: 'fem-static' | 'fem-modal' | 'fem-thermal' | 'cfd-steady' | 'em-electrostatic' | 'multiphysics'
  mesh?: { sizeMm?: number; refine?: number }
  timestepS?: number
  totalTimeS?: number
  loads?: string[]          // refIds of ForceLoad / PressureLoad ops in the source part
  /** compute resource target */
  targetRunner?: 'cpu-small' | 'cpu-large' | 'gpu-a100' | 'gpu-h100'
}
export function Simulation(p: SimulationProps) {
  return createElement(Op, { type: 'sim.run', props: p })
}
