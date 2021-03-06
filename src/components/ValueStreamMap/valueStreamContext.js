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
  spliceArray,
} from '../../helpers'
import config from '../../globalConfig'

const defaultPosition = { x: 100, y: 175 }

const ValueStreamContext = React.createContext()

const updateLocalStorage = (state) => {
  ls('maxNodeId', state.maxNodeId)
  ls('elements', state.elements)
}

const updateStateElements = (state) => {
  const relativeSize = 4
  const graphedLayouts = getGraphLayout(
    state.elements,
    false,
    // state.isRelativeSized,
    relativeSize,
  )
  const newState = { ...state, elements: graphedLayouts }
  updateLocalStorage(newState)
  return newState
}

const makeNewNode = (state, x, y) => {
  const nodeId = state.maxNodeId + 1
  const newNode = buildNode({ id: nodeId, x, y })

  return [
    {
      ...state,
      maxNodeId: nodeId,
    },
    newNode,
  ]
}

const addNode = (state, { x, y }) => {
  const [newState, newNode] = makeNewNode(state, x, y)

  return {
    ...newState,
    elements: [...state.elements, newNode],
  }
}

const initStateFromData = (state, data) => {
  // TODO: Validate file data
  const newState = {
    ...state,
    maxNodeId: data.maxNodeId,
    elements: data.elements,
  }

  return updateStateElements(newState)
}

/**
 * Add an edge if there are no duplicates
 * @param {*} state
 * @param {*} param1
 */
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
      .map((el) =>
        node.id !== el.id
          ? {
              ...el,
              selected: false,
              style: {
                ...el.style,
                borderColor: config.deselectedColor,
              },
            }
          : el,
      )
      .map((el) =>
        node.id === el.id
          ? {
              ...el,
              selected: !el.selected,
              style: {
                ...el.style,
                borderColor: !el.selected
                  ? config.selectedColor
                  : config.deselectedColor,
              },
            }
          : el,
      ),
  }

  return updateStateElements(newState)
}

const updateNode = (state, { node, position, data }) => {
  const newState = {
    ...state,
    elements: state.elements.map((el) =>
      el.id === node.id
        ? {
            ...el,
            data: data
              ? {
                  processName: data.processName
                    ? data.processName
                    : el.data.processName,
                  people: data.people ? data.people : el.data.people,
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
        : el,
    ),
  }
  return updateStateElements(newState)
}

const updateEdge = (edge, newNode, isTargetNode) =>
  isTargetNode
    ? { ...edge, target: newNode.id }
    : { ...edge, source: newNode.id }

const updateAllEdgesTarget = (state, oldTargetNode, newTargetNode) => {
  const { elements } = state

  const newElements = elements.map((e) =>
    isEdge(e) && e.target === oldTargetNode.id
      ? updateEdge(e, newTargetNode, true)
      : e,
  )

  return updateStateElements({ ...state, elements: newElements })
}

const updateOneEdge = (state, { edge, newNode, isTargetNode }) => {
  const { elements } = state

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

const markNodeSelected = (_node, isSelected) => ({
  ..._node,
  selected: isSelected ? true : _node.selected,
})

const insertNodeBefore = (state, { node, selectNewNode }) => {
  if (!node) return state

  const [newNodeState, insertedNode] = makeNewNode(state, 0, 0)

  const index = state.elements.findIndex((e) => e.id === node.id)

  const nodeAddedState = {
    ...newNodeState,
    elements:
      index > 0
        ? spliceArray(
            state.elements,
            index,
            markNodeSelected(insertedNode, selectNewNode),
          )
        : state.elements,
  }

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

const insertNodeAfter = (state, { node, selectNewNode }) => {
  const sourceNode = node || getLastNode(state.elements)

  const [newNodeState, insertedNode] = makeNewNode(state, 0, 0)

  const index = node
    ? state.elements.findIndex((e) => e.id === node.id)
    : undefined

  const nodeAddedState = {
    ...newNodeState,
    elements: node
      ? spliceArray(
          state.elements,
          index + 1,
          markNodeSelected(insertedNode, selectNewNode),
        )
      : state.elements.concat(insertedNode),
  }

  const edgeAddedState = addEdge(nodeAddedState, {
    source: sourceNode,
    target: insertedNode,
  })

  const newRightEdge = getLastEdge(edgeAddedState.elements)
  const oldRightEdge = getEdgesBySource(state.elements, sourceNode).find(
    (e) => e.id !== newRightEdge.id,
  )

  const edgesUpdatedState = oldRightEdge
    ? updateOneEdge(edgeAddedState, {
        edge: oldRightEdge,
        newNode: insertedNode,
        isTarget: false,
      })
    : edgeAddedState

  return updateStateElements(edgesUpdatedState)
}

const initValueStream = () => {
  const state1 = {
    maxNodeId: 0,
    elements: [],
    isRelativeSized: true,
  }
  const state2 = addNode(state1, { x: defaultPosition.x, y: defaultPosition.y })
  const state3 = insertNodeAfter(state2, { node: state2.elements[0] })

  return state3
}

const buildData = () => {
  const init = initValueStream()

  if (process.env.REACT_APP_LOCAL_STORAGE === 'clear') {
    // eslint-disable-next-line no-console
    console.log('Clear local storage')
    ls.clear()
  }

  return {
    maxNodeId: ls('maxNodeId') || init.maxNodeId,
    elements: ls('elements') || init.elements,
  }
}

const resetData = () => {
  ls.clear()

  return buildData()
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
      return resetData()
    }
    case 'INIT': {
      return initStateFromData(state, action.data)
    }
    case 'RELATIVE_SIZE': {
      return { ...valueStream, isRelativeSized: !state.isRelativeSized }
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}

const ValueStreamProvider = (props) => {
  const [state, dispatch] = useReducer(valueStreamReducer, valueStream)

  const value = React.useMemo(() => [state, dispatch], [state])

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ValueStreamContext.Provider value={value} {...props} />
}

const useValueStream = () => {
  const context = React.useContext(ValueStreamContext)
  if (!context) {
    throw new Error(`useValueStream must be used within a ValueStreamProvider`)
  }
  const [state, dispatch] = context

  const increment = () => dispatch({ type: 'INCREMENT' })

  const createNode = (x, y) => dispatch({ type: 'CREATE_NODE', data: { x, y } })

  const createEdge = ({ source, target }) =>
    dispatch({ type: 'CREATE_EDGE', data: { source, target } })

  const changeNodeValues = ({ node, position, data }) =>
    dispatch({ type: 'UPDATE_NODE', data: { node, position, data } })

  const changeEdgeTarget = (edge, newTargetNode) => {
    dispatch({
      type: 'UPDATE_EDGE',
      data: { edge, newNode: newTargetNode, isTargetNode: true },
    })
  }

  const changeEdgeSource = (edge, newSourceNode) => {
    dispatch({
      type: 'UPDATE_EDGE',
      data: { edge, newNode: newSourceNode, isTargetNode: false },
    })
  }

  const addNodeBefore = (node, selectNewNode = false) => {
    dispatch({ type: 'INSERT_NODE_BEFORE', data: { node, selectNewNode } })
  }

  const addNodeAfter = (node, selectNewNode = false) => {
    dispatch({ type: 'INSERT_NODE_AFTER', data: { node, selectNewNode } })
  }

  const removeElements = (elements = []) => {
    dispatch({ type: 'DELETE', data: elements })
  }
  const reset = () => dispatch({ type: 'RESET' })

  const setRelativelySized = () => dispatch({ type: 'RELATIVE_SIZE' })

  const initState = (data) => dispatch({ type: 'INIT', data })

  const toggleNodeSelect = (node) =>
    dispatch({ type: 'SELECT_NODE', data: { node } })

  return {
    state,
    increment,
    createNode,
    createEdge,
    setRelativelySized,
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
