import { buildEdge, buildNode } from '../../src/helpers'

export const elements = () => {
  const ids = [1, 2, 3, 4, 5]
  const nodes = ids.map((id) => buildNode({ id: id, x: 0, y: 0 }))

  const edges = nodes
    .map((node, idx) => {
      if (idx > 0 && idx < nodes.length - 1) buildEdge(nodes[idx - 1], node)
    })
    .filter((x) => x) //Remove undefined

  return nodes.concat(edges)
}
