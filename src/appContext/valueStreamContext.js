/* Useful resources on context
 * https://kentcdodds.com/blog/how-to-use-react-context-effectively
 * https://kentcdodds.com/blog/how-to-optimize-your-context-value
 * https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/#usecontext
 * https://kentcdodds.com/blog/application-state-management-with-react
 */

import React, { useReducer } from 'react'
import { isEdge } from 'react-flow-renderer'
import ls from 'local-storage'

import {
  buildEdge,
  buildNode,
  edgeExists,
  getEdgesBySource,
  getGraphLayout,
  getLastEdge,
  getLastNode,
  nodeDefaults,
} from '../helpers'

const defaultPosition = { x: 100, y: 175 }

const ValueStreamContext = React.createContext()

const updateLocalStorage = (state) => {
  ls('maxNodeId', state.maxNodeId)
  ls('elements', state.elements)
}

const updateStateElements = (state) => {
  const graphedLayouts = getGraphLayout(state.elements, true, 10)
  const newState = { ...state, elements: graphedLayouts }
  updateLocalStorage(newState)
  return newState
}

const addNode = (state, { x, y }) => {
  const nodeId = state.maxNodeId + 1
  const newNode = buildNode({ id: nodeId, x, y })

  const newState = {
    ...state,
    maxNodeId: nodeId,
    elements: [...state.elements, newNode],
  }

  return newState
}

const resetData = (state) => {
  ls.clear()

  const newNode = buildNode({
    id: state.maxNodeId,
    x: defaultPosition.x,
    y: defaultPosition.y,
  })

  const newState = {
    ...state,
    elements: [newNode],
  }
  const initState = insertNodeAfter(newState, { node: newState.elements[0] })

  return initState
}

const initStateFromData = (state, data) => {
  //TODO: Validate file data
  const newState = {
    ...state,
    maxNodeId: data.maxNodeId,
    elements: data.elements,
  }

  return updateStateElements(newState)
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

  return updateStateElements(newState)
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
  return updateStateElements(newState)
}

const updateEdge = (edge, newNode, isTargetNode) => {
  return isTargetNode
    ? { ...edge, target: newNode.id }
    : { ...edge, source: newNode.id }
}

const updateAllEdgesTarget = (state, oldTargetNode, newTargetNode) => {
  const elements = state.elements

  const newElements = elements.map((e) =>
    isEdge(e) && e.target === oldTargetNode.id
      ? updateEdge(e, newTargetNode, true)
      : e,
  )

  return updateStateElements({ ...state, elements: newElements })
}

const updateOneEdge = (state, { edge, newNode, isTargetNode }) => {
  const elements = state.elements

  const newElements = elements.map((e) =>
    isEdge(e) && e.id === edge.id ? updateEdge(e, newNode, isTargetNode) : e,
  )

  return updateStateElements({ ...state, elements: newElements })
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

  return updateStateElements(newState)
}

const insertNodeBefore = (state, { node }) => {
  if (!node) return state

  const nodeAddedState = addNode(state, node.position)

  const insertedNode = getLastNode(nodeAddedState.elements)
  const edgesUpdatedState = updateAllEdgesTarget(
    nodeAddedState,
    node,
    insertedNode,
  )

  const newEdgeState = addEdge(edgesUpdatedState, {
    source: insertedNode,
    target: node,
  })

  return updateStateElements(newEdgeState)
}

const insertNodeAfter = (state, { node }) => {
  const sourceNode = node ? node : getLastNode(state.elements)
  const nodeAddedState = addNode(state, defaultPosition)

  const newNode = getLastNode(nodeAddedState.elements)

  const edgeAddedState = addEdge(nodeAddedState, {
    source: sourceNode,
    target: newNode,
  })

  const newRightEdge = getLastEdge(edgeAddedState.elements)
  const oldRightEdge = getEdgesBySource(state.elements, sourceNode).find(
    (e) => e.id !== newRightEdge.id,
  )

  const edgesUpdatedState = oldRightEdge
    ? updateOneEdge(edgeAddedState, {
        edge: oldRightEdge,
        newNode: newNode,
        isTarget: false,
      })
    : edgeAddedState

  return updateStateElements(edgesUpdatedState)
}

const initValueStream = () => {
  const state1 = {
    maxNodeId: 2,
    elements: [],
  }
  const state2 = addNode(state1, { x: defaultPosition.x, y: defaultPosition.y })
  const state3 = insertNodeAfter(state2, { node: state2.elements[0] })

  return state3
}

const buildData = () => {
  const init = initValueStream()

  if (process.env.REACT_APP_LOCAL_STORAGE === 'clear') {
    console.log('Clear local storage')
    ls.clear()
  }

  return {
    maxNodeId: ls('maxNodeId') || init.maxNodeId,
    elements: ls('elements') || init.elements,
  }
}

const valueStream = buildData()

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
      return updateOneEdge(state, action.data)
    }
    case 'DELETE': {
      return deleteElements(state, action.data)
    }
    case 'INSERT_NODE_BEFORE': {
      return insertNodeBefore(state, action.data)
    }
    case 'INSERT_NODE_AFTER': {
      return insertNodeAfter(state, action.data)
    }
    case 'RESET': {
      return resetData(state)
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
  const [state, dispatch] = useReducer(valueStreamReducer, valueStream)

  const value = React.useMemo(() => [state, dispatch], [state])

  // return <ValueStreamContext.Provider value={[state, dispatch]} {...props} />
  return <ValueStreamContext.Provider value={value} {...props} />
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

  const changeEdgeTarget = (edge, newTargetNode) => {
    dispatch({
      type: 'UPDATE_EDGE',
      data: { edge: edge, newNode: newTargetNode, isTargetNode: true },
    })
  }

  const changeEdgeSource = (edge, newSourceNode) => {
    dispatch({
      type: 'UPDATE_EDGE',
      data: { edge: edge, newNode: newSourceNode, isTargetNode: false },
    })
  }

  const addNodeBefore = (node) => {
    dispatch({ type: 'INSERT_NODE_BEFORE', data: { node } })
  }

  const addNodeAfter = (node) => {
    dispatch({ type: 'INSERT_NODE_AFTER', data: { node } })
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
    changeEdgeTarget,
    changeEdgeSource,
    removeElements,
    reset,
    initState,
    toggleNodeSelect,
    addNodeBefore,
    addNodeAfter,
  }
}

export { ValueStreamProvider, useValueStream }
