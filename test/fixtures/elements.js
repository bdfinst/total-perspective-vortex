import { buildEdge, buildNode } from '../../src/helpers'

export const elements = () => {
  const max = 10
  const nodes = []

  for (let index = 1; index < max; index++) {
    nodes.push(buildNode({ id: index, x: 100, y: 150 }))
  }

  const els = nodes.map((node, idx) => {
    if (idx === 0) return node
    if (idx > nodes.length - 1) return node
    const edge = buildEdge(nodes[idx - 1], node)
    return [node, edge]
  })

  return els
}
