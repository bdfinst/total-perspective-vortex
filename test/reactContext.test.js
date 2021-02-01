import { act, renderHook } from '@testing-library/react-hooks'

import { ValueStreamProvider, useValueStream } from '../src/reactContext2'

describe('Value Stream Context', () => {
  it('should increment the element ID store', () => {
    const wrapper = ({ children }) => (
      <ValueStreamProvider>{children}</ValueStreamProvider>
    )
    const { result } = renderHook(() => useValueStream(), {
      wrapper,
    })

    act(() => {
      result.current.increment()
    })
    expect(result.current.state.lastElementId).toBe(1)
  })
  it('should add a new node the store', () => {
    const wrapper = ({ children }) => (
      <ValueStreamProvider>{children}</ValueStreamProvider>
    )
    const { result } = renderHook(() => useValueStream(), {
      wrapper,
    })

    act(() => {
      result.current.increment()
    })
    expect(result.current.state.lastElementId).toBe(1)
  })
})

// import {CountProvider, useCount} from './count-context'
/*
function Counter() {
  const {
    state: {count},
    increment,
  } = useCount()
  return <button onClick={increment}>{count}</button>
}

function CountDisplay() {
  const {
    state: {count},
  } = useCount()
  return <div>The current counter count is {count}</div>
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}
*/
