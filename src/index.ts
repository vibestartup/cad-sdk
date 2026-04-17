/**
 * @vibestartup/cad — declarative CAD primitives.
 *
 *   import { Studio, Sketch, Circle, Extrude, useNumberParam } from '@vibestartup/cad'
 *
 *   export default function Flywheel() {
 *     const [d] = useNumberParam('diameter', 60, { unit: 'mm', min: 10, max: 200 })
 *     const [w] = useNumberParam('width', 8, { unit: 'mm', min: 1, max: 30 })
 *     return (
 *       <Studio kind="part">
 *         <Sketch plane="XZ"><Circle r={d/2} /></Sketch>
 *         <Extrude depth={w} />
 *       </Studio>
 *     )
 *   }
 */

export { Studio, useNumberParam, useStringParam, useBooleanParam, useVec3Param, useParam, Ref, Link, Import, Code } from '@vibestartup/sdk-runtime'
export type { StudioProps } from '@vibestartup/sdk-runtime/primitives'

export * from './sketch.ts'
export * from './features.ts'
export * from './material.ts'
export * from './assembly.ts'
export * from './kinds.ts'
export * from './views.ts'
