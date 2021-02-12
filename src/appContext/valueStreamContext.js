/* Useful resources on context
 * https://kentcdodds.com/blog/how-to-use-react-context-effectively
 * https://kentcdodds.com/blog/how-to-optimize-your-context-value
 * https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/#usecontext
 * https://kentcdodds.com/blog/application-state-management-with-react
 */

import React from 'react'
import validateKeys from 'object-key-validator'

import { buildEdge, buildNode } from '../helpers/utilities'

const init = () => {
  const node1 = buildNode({ id: 1, x: 100, y: 150 })
  const node2 = buildNode({ id: 2, x: 350, y: 150 })

  const elements = [node1, node2, buildEdge(node1, node2)]
  return elements
}

const CountContext = React.createContext()

const valueStream = {
  maxNodeId: 2,
  elements: init(),
}

const create = (state, newNode) => {
  return { ...valueStream, elements: state.elements.concat(newNode) }
}

const addNode = (state, { x, y }) => {
  const nodeId = state.maxNodeId + 1

  return {
    ...state,
    maxNodeId: nodeId,
    elements: [...state.elements, buildNode({ id: nodeId, x, y })],
  }
}

const updateNode = (state, nodeId, data) => {
  const rule = {
    $and: [
      'description',
      'actors',
      'processTime',
      'waitTime',
      'pctCompleteAccurate',
    ],
  }

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
      return { ...valueStream, maxNodeId: state.maxNodeId + 1 }
    }
    case 'CREATE_NODE': {
      return addNode(state, action.data)
    }
    case 'CREATE_EDGE': {
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
  const createNode = (data) => dispatch({ type: 'CREATE_NODE', data })
  const createEdge = (data) => dispatch({ type: 'CREATE_EDGE', data })
  const changeNodeValues = (nodeId, data) =>
    dispatch({
      type: 'UPDATE_NODE',
      nodeId: `${nodeId}`,
      data,
    })

  return {
    state,
    dispatch,
    increment,
    createNode,
    createEdge,
    changeNodeValues,
  }
}

export { ValueStreamProvider, useValueStream }
