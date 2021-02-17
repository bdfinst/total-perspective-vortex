export const buildEdge = (source, target) => {
  return {
    id: `${source.id}_${target.id}`,
    source: `${source.id}`,
    target: `${target.id}`,
    arrowHeadType: 'arrowclosed',
    type: 'custom',
    selected: false,
  }
}