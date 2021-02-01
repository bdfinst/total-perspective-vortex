/* Useful resources on context
 * https://kentcdodds.com/blog/how-to-use-react-context-effectively
 * https://kentcdodds.com/blog/how-to-optimize-your-context-value
 * https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/#usecontext
 * https://kentcdodds.com/blog/application-state-management-with-react
 */

import React from 'react'

const CountContext = React.createContext()

const valueStream = {
  lastElementId: 0,
  elements: [],
}

const valueStreamReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return { ...valueStream, lastElementId: state.lastElementId + 1 }
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}

const ValueStreamProvider = (props) => {
  const [state, dispatch] = React.useReducer(valueStreamReducer, valueStream)
  const value = React.useMemo(() => [state, dispatch], [state])
  return <CountContext.Provider value={value} {...props} />
}

const useValueStream = () => {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error(`useValueStream must be used within a ValueStreamProvider`)
  }
  const [state, dispatch] = context

  const increment = () => dispatch({ type: 'INCREMENT' })
  return {
    state,
    dispatch,
    increment,
  }
}

export { ValueStreamProvider, useValueStream }
