import { isNode } from 'react-flow-renderer'

import { buildEdge } from './buildEdge'
import { buildNode } from './buildNode'

const formatNode = (nodeData) => {
  const node = buildNode({ id: nodeData.id, x: 1, y: 1 })
  return { ...node, data: nodeData.data }
}

export const buildElementsFromFile = (data) =>
  data.map((el) =>
    isNode(el)
      ? formatNode(el)
      : buildEdge({ id: el.source }, { id: el.target }),
  )
export const buildFileFromElements = (data) => data
