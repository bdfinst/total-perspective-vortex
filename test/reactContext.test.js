import { act, renderHook,cleanup } from '@testing-library/react-hooks'

import { ValueStreamProvider, useValueStream } from '../src/reactContext2'
import { buildNode } from '../src/utils/utilities'

afterEach(cleanup)

describe('Value Stream Context', () => {

  const renderVSMHook = () => {
    const wrapper = ({ children }) => (
      <ValueStreamProvider>{children}</ValueStreamProvider>
    )
    const { result } = renderHook(() => useValueStream(), {
      wrapper,
    })
    return result
  }

  it('should increment the element ID store', () => {
    const result = renderVSMHook()

    act(() => {
      result.current.increment()
    })

    expect(result.current.state.lastElementId).toBe(1)
  })

  it('should add a new node the store', () => {
    const result = renderVSMHook()

    act(() => {
      result.current.addNode(buildNode("1", { x: 1, y: 1 }))
    })

    expect(result.current.state.elements[0].id).toBe("1")
    expect(result.current.state.elements[0]).toHaveProperty('type')
    expect(result.current.state.elements[0]).toHaveProperty('data')
    expect(result.current.state.elements[0]).toHaveProperty('style')
    expect(result.current.state.elements[0]).toHaveProperty('position')

  })




  it('should update an existing node with a given node ID', () => {
    const result = renderVSMHook()

    const newData = { processTime: 1, cycleTime: 2, pctCompleteAccurate: 3 }

    const testNodeId = "1"

    act(() => {
      result.current.addNode(buildNode(testNodeId, { x: 1, y: 1 }))
    })

    act(() => {
      result.current.changeNodeValues(testNodeId, newData)
    })

    console.log(result.current.state.elements[0])

    // const found = result.current.state.elements.filter(node=>node.id===testNodeId)

    // expect(found[0].id).toBe(testNodeId)
    // expect(found[0].data.processTime).toBe(1)
    // expect(found[0].data.cycleTime).toBe(2)
    // expect(found[0].data.pctCompleteAccurate).toBe(3)

  });

  it('should throw an error for unknown dispatch', () => {
    const result = renderVSMHook()


    act(() => {
      result.current.dispatch({ type: 'FAKE' })
    })

    expect(result.error).toEqual(Error("Unsupported action type: FAKE"))
  })
})
