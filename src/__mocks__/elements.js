import { buildEdge, buildNode } from '../helpers'

const buildData = (processTime, waitTime, pctCompleteAccurate) => ({
  processName: '',
  people: 1,
  processTime,
  waitTime,
  pctCompleteAccurate,
})

const elements = (count = 2, pca = 0) => {
  const nodes = []
  for (let index = 0; index <= count; index += 1) {
    const node = buildNode({ id: index + 1, x: 0, y: 0 })
    node.data = buildData(index + 1, index + 2, 0)

    nodes.push(node)
  }

  if (pca > 0) {
    nodes[0].data.pctCompleteAccurate = pca
    nodes[1].data.pctCompleteAccurate = pca / 2
  }

  const edges = nodes
    .map((node, idx) =>
      idx > 0 && idx < nodes.length - 1 ? buildEdge(nodes[idx - 1], node) : {},
    )
    .filter((x) => x) // Remove undefined

  return nodes.concat(edges)
}

export default elements
