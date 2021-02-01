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

const create = (state, newNode) => {
  return { ...valueStream, elements: state.elements.concat(newNode) }
}

const updateNode = (state, nodeId, data) => {
  const newState = {
    ...state,
    elements: state.elements.map((el) => {
      return el.id === nodeId ? { ...el, data: data } : el
    }),
  }

  return newState
}

const updateEdge = (state, data) => {
  console.log(data)
}

const valueStreamReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return { ...valueStream, lastElementId: state.lastElementId + 1 }
    }
    case 'CREATE': {
      return create(state, action.data)
    }
    case 'UPDATE_NODE': {
      return updateNode(state, action.nodeId, action.data)
    }
    case 'UPDATE_EDGE': {
      return updateEdge(state, action.data)
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
  const addNode = (data) => dispatch({ type: 'CREATE', data })
  const changeNodeValues = (
    nodeId,
    { processTime, cycleTime, pctCompleteAccurate },
  ) =>
    dispatch({
      type: 'UPDATE_NODE',
      nodeId,
      data: { processTime, cycleTime, pctCompleteAccurate },
    })

  return {
    state,
    dispatch,
    increment,
    addNode,
    changeNodeValues,
  }
}

export { ValueStreamProvider, useValueStream }
