/** cad thing kinds registered by this sdk. editors match on these. */
export const CAD_KINDS = ['part', 'assembly', 'drawing', 'cam', 'sim-run'] as const
export type CadKind = typeof CAD_KINDS[number]
