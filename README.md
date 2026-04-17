# @vibestartup/cad

declarative parametric CAD primitives. pure React components that compile to
a kernel-agnostic op graph.

```tsx
import { Studio, Sketch, Circle, Rect, Extrude, Fillet, Material, useNumberParam } from '@vibestartup/cad'

export default function Flywheel() {
  const [d] = useNumberParam('diameter', 60, { unit: 'mm', min: 10, max: 200 })
  const [h] = useNumberParam('height', 8, { unit: 'mm', min: 1, max: 30 })
  return (
    <Studio kind="part">
      <Sketch plane="XZ"><Circle r={d/2} /></Sketch>
      <Extrude depth={h} />
      <Fillet radius={1} everyEdge />
      <Material preset="aluminum-6061" />
    </Studio>
  )
}
```

primitives: `Studio`, `Sketch` + {Circle,Rect,Line,Arc,Polygon,Slot,Text,Coincident,Horizontal,Vertical,Distance}, `Extrude`, `Revolve`, `Sweep`, `Loft`, `Fillet`, `Chamfer`, `Shell`, `Hole`, `Boolean`, `Mirror`, `PatternLinear`, `PatternCircular`, `Plane`, `GenerativeBody`, `ForceLoad`, `PressureLoad`, `Material`, `FaceAppearance`, `PartInstance`, `Mate`, `RigidGroup`, `Link`, `Import`, `Code`.

MIT. see [oss/README.md](../README.md).
