/* Useful resources on context
 * https://kentcdodds.com/blog/how-to-use-react-context-effectively
 * https://kentcdodds.com/blog/how-to-optimize-your-context-value
 * https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/#usecontext
 * https://kentcdodds.com/blog/application-state-management-with-react
 */

import React from 'react'
import validateKeys from 'object-key-validator'

import { buildEdge, buildNode } from './utils/utilities'

const init = () => {
  const elements = [
    buildNode('1', { x: 100, y: 150 }),
    buildNode('2', { x: 350, y: 150 }),
    buildEdge('e1', '1', '2'),
  ]
  return elements
}

const CountContext = React.createContext()

const valueStream = {
  lastElementId: 0,
  elements: init(),
}

const create = (state, newNode) => {
  return { ...valueStream, elements: state.elements.concat(newNode) }
}

const updateNode = (state, nodeId, data) => {
  const rule = { $and: ['processTime', 'cycleTime', 'pctCompleteAccurate'] }

  if (validateKeys(rule, data)) {
    return {
      ...state,
      elements: state.elements.map((el) => {
        return el.id === nodeId ? { ...el, data: data } : el
      }),
    }
  } else {
    throw new Error(
      `Invalid object sent to updateNode: ${JSON.stringify(data)}`,
    )
  }
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
    case 'SYNC': {
      return { ...valueStream, elements: action.elements }
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
