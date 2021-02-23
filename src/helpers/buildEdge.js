import { v4 as uuidv4 } from 'uuid'

export const createEdgeId = () => {
  return `${uuidv4()}`
}

export const buildEdge = (source, target) => {
  return {
    id: createEdgeId(),
    source: `${source.id}`,
    target: `${target.id}`,
    arrowHeadType: 'arrowclosed',
    type: 'custom',
    selected: false,
  }
}
