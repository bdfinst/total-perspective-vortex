import React, { useMemo } from 'react'

import { buildEdge, buildNode, getEdgeId } from '../helpers/elementFactory'

const ValueStreamContext = React.createContext()

const init = () => {
  const nodes = [
    buildNode({ id: '1', text: 'Node 1' }),
    buildNode({ id: '2', text: 'Node 2' }),
  ]
  const edges = [buildEdge(nodes[0], nodes[1])]

  return { maxNodeId: 2, elements: { nodes, edges } }
}

const valueStream = init()

const create = (state, { text, data }) => {
  const nodeId = state.maxNodeId + 1

  return {
    ...state,
    maxNodeId: nodeId,
    elements: {
      ...state.elements,
      nodes: state.elements.nodes.concat(
        buildNode({ id: nodeId, text: text, data: data }),
      ),
    },
  }
}

const addNodeAndEdge = (state, { text, data, toNode }) => {
  const nodeId = state.maxNodeId + 1
  const node = buildNode({ id: nodeId, text: text, data: data })

  return {
    ...state,
    maxNodeId: nodeId,
    elements: {
      ...state.elements,
      nodes: [...state.elements.nodes, node],
      edges: [
        ...state.elements.edges,
        ...(toNode ? [buildEdge(node, toNode)] : []),
      ],
    },
  }
}

const update = (state, { id, text, data }) => {
  return {
    ...state,
    elements: {
      ...state.elements,
      nodes: state.elements.nodes.map((node) => {
        return node.id === id ? { ...node, data: data, text: text } : node
      }),
    },
  }
}

const updateEdges = (
  state,
  { oldFromNode, oldToNode, newFromNode, newToNode },
) => {
  return {
    ...state,
    elements: {
      ...state.elements,
      edges: state.elements.edges.map((edge) => {
        if (edge.id !== getEdgeId(oldFromNode, oldToNode)) {
          return edge
        }
        return {
          id: getEdgeId(newFromNode, newToNode),
          from: newFromNode.id,
          to: newToNode.id,
        }
      }),
    },
  }
}

const createEdges = (state, { fromNode, toNode }) => {
  const x = {
    ...state,
    elements: {
      ...state.elements,
      edges: state.elements.edges.concat(buildEdge(fromNode, toNode)),
    },
  }

  return x
  // if (!edgeExists(state, data.from, data.to)) {

  // }
}

const valueStreamReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return { ...valueStream, maxNodeId: state.maxNodeId + 1 }
    }
    case 'CREATE_NODE': {
      return create(state, action.data)
    }
    case 'CREATE_NODE_EDGE': {
      return addNodeAndEdge(state, action.data)
    }
    case 'CREATE_EDGE': {
      return createEdges(state, action.data)
    }
    case 'UPDATE_NODE': {
      return update(state, action.data)
    }
    case 'UPDATE_EDGE': {
      return updateEdges(state, action.data)
    }
    // case 'SYNC': {
    //   return { ...valueStream, elements: action.elements }
    // }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}

const ValueStreamProvider = (props) => {
  const [state, dispatch] = React.useReducer(valueStreamReducer, valueStream)

  const value = useMemo(() => [state, dispatch], [state])

  return <ValueStreamContext.Provider value={value} {...props} />
}

const useValueStream = () => {
  const context = React.useContext(ValueStreamContext)
  if (!context) {
    throw new Error(`useValueStream must be used within a ValueStreamProvider`)
  }
  const [state, dispatch] = context

  const incrementMaxId = () => dispatch({ type: 'INCREMENT' })
  const createNode = ({ text, data }) =>
    dispatch({ type: 'CREATE_NODE', data: { text, data } })

  const createNodeAndEdge = ({ text, data, toNode }) =>
    dispatch({ type: 'CREATE_NODE_EDGE', data: { text, data } })

  const createEdge = ({ fromNode, toNode }) =>
    dispatch({ type: 'CREATE_EDGE', data: { fromNode, toNode } })

  const updateEdge = ({ oldFromNode, oldToNode, newFromNode, newToNode }) =>
    dispatch({
      type: 'UPDATE_EDGE',
      data: {
        oldFromNode,
        oldToNode,
        newFromNode,
        newToNode,
      },
    })

  const updateNode = ({ id, text, data }) =>
    dispatch({
      type: 'UPDATE_NODE',
      data: { id, text, data },
    })

  return {
    state,
    dispatch,
    incrementMaxId,
    createNode,
    createEdge,
    createNodeAndEdge,
    updateEdge,
    updateNode,
  }
}

export { ValueStreamProvider, useValueStream }
