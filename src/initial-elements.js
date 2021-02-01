import { buildEdge, buildNode } from './utils/utilities'

const init = () => {
  const elements = [
    buildNode('1', { x: 100, y: 150 }),
    buildNode('2', { x: 450, y: 150 }),
    buildEdge('e1', '1', '2'),
  ]
  return elements
}

const initialElements = init()

export { initialElements }
