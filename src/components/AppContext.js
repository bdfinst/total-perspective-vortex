/* Useful resources on context
 * https://kentcdodds.com/blog/how-to-use-react-context-effectively
 * https://kentcdodds.com/blog/how-to-optimize-your-context-value
 * https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/#usecontext
 */

import React, { createContext, useContext, useReducer } from 'react'

export const MapStateContext = createContext()
export const MapDispatchContext = createContext()

const initState = {
  lastElementId: 0,
  elements: [
    {
      id: '1',
      type: 'stepNode',
      elType: 'node',
      data: { processTime: 0, cycleTime: 0, pctCompleteAccurate: 100 },
      style: { border: '1px solid #777', padding: 10 },
      position: { x: 100, y: 150 },
    },
    {
      id: '2',
      type: 'stepNode',
      elType: 'node',
      data: { processTime: 0, cycleTime: 0, pctCompleteAccurate: 100 },
      style: { border: '1px solid #777', padding: 10 },
      position: { x: 450, y: 150 },
    },

    { id: 'e1-2', elType: 'edge', source: '1', target: '2', animated: true },
  ],
}

const update = (state, node) => {
  const replaceData = (elements, node) => {
    return elements.map((el) => {
      return el.id === node.id ? { ...el, data: node.data } : el
    })
  }

  const newState = {
    ...state,
    elements: replaceData(state.elements, node),
  }

  return newState
}

const create = (state, node) => {
  state.lastElementId++

  const id = `vsm_${state.lastElementId}`

  const newState = state.elements.concat({ ...node, id: id })

  return newState
}

const setElements = (state, action) => {
  const newEl = { ...state, elements: action.elements }

  return newEl
}
const vsmReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE': {
      return create(state, action.node)
    }
    case 'SET_ELEMENTS': {
      return setElements(state, action)
    }
    case 'DELETE_NODE': {
      return state.elements.filter((el) => el.id !== action.node.id)
    }
    case 'UPDATE_NODE': {
      return update(state, action.node)
    }
    case 'INCREMENT_ID': {
      return { ...state, lastElementId: state.lastElementId + 1 }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const VSMProvider = ({ children }) => {
  const [state, dispatch] = useReducer(vsmReducer, initState)
  return (
    <MapStateContext.Provider value={state}>
      <MapDispatchContext.Provider value={dispatch}>
        {children}
      </MapDispatchContext.Provider>
    </MapStateContext.Provider>
  )
}

const useVSMState = () => {
  const context = useContext(MapStateContext)
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context
}

const useVSMDispatch = () => {
  const context = useContext(MapDispatchContext)
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider')
  }
  return context
}

const isNode = (el) => {
  return el.elType === 'node'
}
const isEdge = (el) => {
  return el.elType === 'edge'
}
export { VSMProvider, useVSMState, useVSMDispatch, isNode, isEdge }
