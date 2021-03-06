import { isEdge, isNode } from 'react-flow-renderer'

import { buildEdge } from './buildEdge'
import { buildNode } from './buildNode'
import isSameJsonSchema from './isSameJsonSchema'

const isNodeData = (el) => {
  const expectedNodeFormat = {
    id: '',
    data: {
      processName: '',
      people: 0,
      processTime: 0,
      waitTime: 0,
      pctCompleteAccurate: 0,
    },
  }

  return isSameJsonSchema(el, expectedNodeFormat)
}

const isEdgeData = (el) => {
  const expectedEdgeFormat = {
    source: '',
    target: '',
  }

  return isSameJsonSchema(el, expectedEdgeFormat)
}

export const isValidFile = (file) => {
  if (!Array.isArray(file)) return false

  const invalidFile = file.find((el) => !(isNodeData(el) || isEdgeData(el)))

  return !invalidFile
}

const formatNode = (nodeData) => {
  const node = buildNode({ id: nodeData.id, x: 1, y: 1 })
  return { ...node, data: nodeData.data }
}

export const buildElementsFromFile = (file) => {
  if (isValidFile(file)) {
    return file.map((el) =>
      isNode(el)
        ? formatNode(el)
        : buildEdge({ id: el.source }, { id: el.target }),
    )
  }
  throw new Error('Invalid file format')
}

export const buildFileFromElements = (data) =>
  data
    .map((el) => (isNode(el) ? { id: el.id, data: el.data } : el))
    .map((el) => (isEdge(el) ? { source: el.source, target: el.target } : el))
