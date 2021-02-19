/* Useful resources on context
 * https://kentcdodds.com/blog/how-to-use-react-context-effectively
 * https://kentcdodds.com/blog/how-to-optimize-your-context-value
 * https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/#usecontext
 * https://kentcdodds.com/blog/application-state-management-with-react
 */

import React from 'react'
import ls from 'local-storage'

import { buildEdge, buildNode, edgeExists, nodeDefaults } from '../helpers'

const selectedBorderColor = 'red'
const borderColor = '#3385e9'

const init = () => {
  const node1 = buildNode({ id: 1, x: 100, y: 175 })
  const node2 = buildNode({ id: 2, x: 350, y: 175 })

  const elements = [node1, node2, buildEdge(node1, node2)]
  return elements
}

const ValueStreamContext = React.createContext()

const vsInit = {
  maxNodeId: 2,
  elements: init(),
}

const buildData = () => {
  ls.clear()

  return {
    maxNodeId: ls('maxNodeId') || vsInit.maxNodeId,
    elements: ls('elements') || vsInit.elements,
  }
}
const valueStream = buildData()

const updateLocalStorage = (state) => {
  ls('maxNodeId', state.maxNodeId)
  ls('elements', state.elements)
}

const resetVSM = () => {
  ls.clear()
  return vsInit
}

const initStateFromData = (state, data) => {
  //TODO: Validate file data
  const newState = {
    ...state,
    maxNodeId: data.maxNodeId,
    elements: data.elements,
  }

  updateLocalStorage(newState)
  return newState
}

const addNode = (state, { x, y }) => {
  const nodeId = state.maxNodeId + 1

  const newState = {
    ...state,
    maxNodeId: nodeId,
    elements: [...state.elements, buildNode({ id: nodeId, x, y })],
  }
  updateLocalStorage(newState)
  return newState
}

const addEdge = (state, { source, target }) => {
  const newEdge = buildEdge(source, target)

  if (edgeExists(state.elements, newEdge)) {
    return state
  }

  const newState = {
    ...state,
    elements: [...state.elements, buildEdge(source, target)],
  }
  updateLocalStorage(newState)
  return newState
}

const nodeSelect = (state, { node }) => {
  const newState = {
    ...state,
    elements: state.elements
      .map((el) => {
        return node.id !== el.id
          ? {
              ...el,
              selected: false,
              style: {
                ...el.style,
                borderColor: nodeDefaults.deselectedColor,
              },
            }
          : el
      })
      .map((el) => {
        return node.id === el.id
          ? {
              ...el,
              selected: el.selected ? false : true,
              style: {
                ...el.style,
                borderColor: !el.selected
                  ? nodeDefaults.selectedColor
                  : nodeDefaults.deselectedColor,
              },
            }
          : el
      }),
  }

  updateLocalStorage(newState)
  return newState
}

const updateNode = (state, { node, position, data }) => {
  const newState = {
    ...state,
    elements: state.elements.map((el) => {
      return el.id === node.id
        ? {
            ...el,
            data: data
              ? {
                  processName: data.processName
                    ? data.processName
                    : el.data.processName,
                  actors: data.actors ? data.actors : el.data.actors,
                  processTime: data.processTime
                    ? data.processTime
                    : el.data.processTime,
                  waitTime: data.waitTime ? data.waitTime : el.data.waitTime,
                  pctCompleteAccurate: data.pctCompleteAccurate
                    ? data.pctCompleteAccurate
                    : el.data.pctCompleteAccurate,
                }
              : el.data,
            position: position
              ? {
                  x: position ? position.x : el.position.x,
                  y: position ? position.y : el.position.y,
                }
              : el.position,
          }
        : el
    }),
  }
  updateLocalStorage(newState)
  return newState
}

const updateEdge = (state, { oldEdge, newTargetNode }) => {
  const newState = {
    ...state,
    elements: state.elements.map((edge) => {
      return edge.id === oldEdge.id
        ? { ...edge, target: newTargetNode.id }
        : edge
    }),
  }
  updateLocalStorage(newState)
  return newState
}

const deleteElements = (state, elementsToRemove) => {
  const elementList = Array.isArray(elementsToRemove)
    ? elementsToRemove
    : [elementsToRemove]

  const idsToRemove = elementList.map((el) => el.id)

  const newState = {
    ...state,
    elements:
      state.elements.length > 1
        ? state.elements.filter((el) => !idsToRemove.includes(el.id))
        : state.elements,
  }

  updateLocalStorage(newState)
  return newState
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
      return addEdge(state, action.data)
    }
    case 'UPDATE_NODE': {
      return updateNode(state, action.data)
    }
    case 'SELECT_NODE': {
      return nodeSelect(state, action.data)
    }
    case 'UPDATE_EDGE': {
      return updateEdge(state, action.data)
    }
    case 'DELETE': {
      return deleteElements(state, action.data)
    }
    case 'RESET': {
      return resetVSM()
    }
    case 'INIT': {
      return initStateFromData(state, action.data)
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}

const ValueStreamProvider = (props) => {
  const [state, dispatch] = React.useReducer(valueStreamReducer, valueStream)

  // const value = React.useMemo(() => [state, dispatch], [state])

  return <ValueStreamContext.Provider value={[state, dispatch]} {...props} />
}

const useValueStream = () => {
  const context = React.useContext(ValueStreamContext)
  if (!context) {
    throw new Error(`useValueStream must be used within a ValueStreamProvider`)
  }
  const [state, dispatch] = context

  const increment = () => dispatch({ type: 'INCREMENT' })

  const createNode = ({ x, y }) =>
    dispatch({ type: 'CREATE_NODE', data: { x, y } })

  const createEdge = ({ source, target }) =>
    dispatch({ type: 'CREATE_EDGE', data: { source, target } })

  const changeNodeValues = ({ node, position, data }) =>
    dispatch({ type: 'UPDATE_NODE', data: { node, position, data } })

  const changeEdge = ({ oldEdge, newTargetNode }) => {
    dispatch({ type: 'UPDATE_EDGE', data: { oldEdge, newTargetNode } })
  }

  const removeElements = (elements = []) => {
    dispatch({ type: 'DELETE', data: elements })
  }
  const reset = () => dispatch({ type: 'RESET' })

  const initState = (data) => dispatch({ type: 'INIT', data: data })

  const toggleNodeSelect = ({ node }) =>
    dispatch({ type: 'SELECT_NODE', data: { node } })

  return {
    state,
    increment,
    createNode,
    createEdge,
    changeNodeValues,
    changeEdge,
    removeElements,
    reset,
    initState,
    toggleNodeSelect,
  }
}

export { ValueStreamProvider, useValueStream }
