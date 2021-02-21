import { act, cleanup, renderHook } from '@testing-library/react-hooks'

import {
  ValueStreamProvider,
  useValueStream,
} from '../src/appContext/valueStreamContext'
import { getEdges, getNodes, findEdgesTo } from '../src/helpers'

const renderVSMHook = () => {
  const wrapper = ({ children }) => (
    <ValueStreamProvider>{children}</ValueStreamProvider>
  )
  const { result } = renderHook(() => useValueStream(), {
    wrapper,
  })
  return result
}

describe('Value Stream Context', () => {
  afterEach(cleanup)
  let result
  beforeEach(() => {
    result = renderVSMHook()
  })

  it('should initialize the state', () => {
    expect(result.current.state.elements.length).toEqual(3)
  })

  it('should increment the element ID store', () => {
    const previousId = result.current.state.maxNodeId
    act(() => {
      result.current.increment()
    })

    expect(result.current.state.maxNodeId).toEqual(previousId + 1)
  })

  it('should add a new node the store', () => {
    act(() => {
      result.current.createNode({ x: 1, y: 1 })
    })

    const el = result.current.state.elements.length - 1

    expect(result.current.state.elements[el].id).toEqual('3')
    expect(result.current.state.elements.length).toEqual(4)
    expect(result.current.state.elements[el]).toHaveProperty('type')
    expect(result.current.state.elements[el]).toHaveProperty('data')
    expect(result.current.state.elements[el]).toHaveProperty('style')
    expect(result.current.state.elements[el]).toHaveProperty('position')
  })

  describe('Updating a node', () => {
    it('should update data for a node', () => {
      const newData = {
        processName: '',
        actors: 1,
        processTime: 1,
        waitTime: 2,
        pctCompleteAccurate: 3,
      }

      act(() => {
        result.current.createNode({ x: 1, y: 1 })
      })

      const nodes = getNodes(result.current.state.elements)
      const testNode = nodes[nodes.length - 1]

      act(() => {
        result.current.changeNodeValues({
          node: testNode,
          data: newData,
        })
      })

      const found = result.current.state.elements.filter(
        (node) => node.id === testNode.id,
      )

      expect(found[0].data).toEqual(newData)
    })
    it('should update one data property for a node', () => {
      act(() => {
        result.current.createNode({ x: 1, y: 1 })
      })

      const nodes = getNodes(result.current.state.elements)
      const testNode = nodes[nodes.length - 1]

      const newData = testNode.data
      newData.processName = 'New processName'
      const currentPos = testNode.position

      act(() => {
        result.current.changeNodeValues({
          node: testNode,
          data: newData,
        })
      })

      const found = result.current.state.elements.find(
        (node) => node.id === testNode.id,
      )

      expect(found.data).toEqual(newData)
      expect(found.position).toEqual(currentPos)
    })

    it('should update a node position', () => {
      act(() => {
        result.current.createNode({ x: 1, y: 1 })
      })

      const nodes = getNodes(result.current.state.elements)
      const testNode = nodes[nodes.length - 1]

      act(() => {
        result.current.changeNodeValues({
          node: testNode,
          position: { x: 2, y: 2 },
        })
      })

      const found = result.current.state.elements.filter(
        (node) => node.id === testNode.id,
      )

      expect(found[0].position).toEqual({ x: 2, y: 2 })
    })
  })
})

describe('Linking nodes with edges', () => {
  let result
  let nodes
  let source
  let target1
  let target2

  beforeEach(() => {
    result = renderVSMHook()
    act(() => {
      result.current.createNode({ x: 1, y: 1 })
    })
    act(() => {
      result.current.createNode({ x: 1, y: 1 })
    })

    nodes = getNodes(result.current.state.elements)
    source = nodes[nodes.length - 1]
    target1 = nodes[nodes.length - 2]
    target2 = nodes[nodes.length - 3]
  })

  afterEach(cleanup)

  it('should add an edge between two nodes', () => {
    act(() => {
      result.current.createEdge({ source: source, target: target1 })
    })

    const edges = getEdges(result.current.state.elements)

    expect(edges[edges.length - 1].source).toEqual(source.id)
    expect(edges[edges.length - 1].target).toEqual(target1.id)
  })

  it('should prevent adding a duplicate edge', () => {
    act(() => {
      result.current.createEdge({ source: source, target: target1 })
    })
    const before = getEdges(result.current.state.elements).length

    act(() => {
      result.current.createEdge({ source: source, target: target1 })
    })

    const after = getEdges(result.current.state.elements).length

    expect(after).toEqual(before)
  })

  it('should update an edge to point to a new node', () => {
    act(() => {
      result.current.createEdge({ source: source, target: target1 })
    })

    let edges = getEdges(result.current.state.elements)
    expect(edges[edges.length - 1].source).toEqual(source.id)
    expect(edges[edges.length - 1].target).toEqual(target1.id)

    act(() => {
      result.current.changeEdge({
        oldEdge: edges[edges.length - 1],
        newTargetNode: target2,
      })
    })

    edges = getEdges(result.current.state.elements)
    expect(edges[edges.length - 1].source).toEqual(source.id)
    expect(edges[edges.length - 1].target).toEqual(target2.id)
  })
})

describe('Deleting elements', () => {
  afterAll(cleanup)
  it('should delete elements', () => {
    const result = renderVSMHook()

    expect(result.current.state.elements.length).toBeGreaterThan(1)

    const elementsToRemove = result.current.state.elements
      .filter((el) => el.id !== '1')
      .map((el) => ({ id: el.id }))

    act(() => {
      result.current.removeElements(elementsToRemove)
    })

    const len = result.current.state.elements.length
    expect(len).toEqual(1)
    expect(result.current.state.elements[len - 1].id).toEqual('1')
  })
  it('should not delete the last element', () => {
    const result = renderVSMHook()

    expect(result.current.state.elements.length).toBeGreaterThan(1)

    let elementsToRemove = result.current.state.elements
      .filter((el) => el.id !== '1')
      .map((el) => ({ id: el.id }))

    act(() => {
      result.current.removeElements(elementsToRemove)
    })

    elementsToRemove = result.current.state.elements
      .filter((el) => el.id === '1')
      .map((el) => ({ id: el.id }))

    act(() => {
      result.current.removeElements(elementsToRemove)
    })

    const len = result.current.state.elements.length
    expect(len).toEqual(1)
    expect(result.current.state.elements[len - 1].id).toEqual('1')
  })
})
describe('Adding and inserting nodes', () => {
  afterEach(cleanup)
  let result
  beforeEach(() => {
    result = renderVSMHook()
  })

  it('should add a node with a connecting edge', () => {
    const selectedNode = getNodes(result.current.state.elements).length-1
    act(() => {
      result.current.createNode({ x: 1, y: 1 })
    })
    const newNode = getNodes(result.current.state.elements).length-1

    const edges = findEdgesTo(selectedNode)
    edges.map((edge)=>{})

    act(() => {
      result.current.createNode({ x: 1, y: 1 })
    })

    createNode,
    createEdge,
    changeEdge,


    const el = result.current.state.elements
    console.log(el)

    expect(true).toEqual(false)

    // addNodeAfter
  })
  // it('should insert a node', () => {
  //   insertNodeBefore
  // })
})
