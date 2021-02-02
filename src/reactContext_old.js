/* Useful resources on context
 * https://kentcdodds.com/blog/how-to-use-react-context-effectively
 * https://kentcdodds.com/blog/how-to-optimize-your-context-value
 * https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/#usecontext
 */

import React, { createContext, useContext, useReducer } from 'react'

export const MapStateContext = createContext()
export const MapDispatchContext = createContext()

const initState = {
  lastId: 0,
  elements: [
    {
      id: '1',
      type: 'stepNode',
      data: { processTime: 0, cycleTime: 0, pctCompleteAccurate: 100 },
      style: { border: '1px solid #777', padding: 10 },
      position: { x: 100, y: 150 },
    },
    {
      id: '2',
      type: 'stepNode',
      data: { processTime: 0, cycleTime: 0, pctCompleteAccurate: 100 },
      style: { border: '1px solid #777', padding: 10 },
      position: { x: 450, y: 150 },
    },

    { id: 'e1-2', source: '1', target: '2', animated: true },
  ],
}

const update = (state, node) => {
  const newState = {
    ...state,
    elements: state.elements.map((el) => {
      return el.id === node.id ? { ...el, data: node.data } : el
    }),
  }

  return newState
}

const vsmReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE': {
      return state.elements.concat(action.node)
    }
    case 'DELETE': {
      return state.elements.filter((el) => el.id !== action.node.id)
    }
    case 'UPDATE': {
      return update(state, action.node)
    }
    case 'SYNC': {
      return { ...state, elements: action.elements }
    }
    case 'INC': {
      return { ...state, lastId: state.lastId + 1 }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const ValueStreamProvider = ({ children }) => {
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
    throw new Error('useVSMState must be used within a ValueStreamProvider')
  }
  return context
}

const useVSMDispatch = () => {
  const context = useContext(MapDispatchContext)
  if (context === undefined) {
    throw new Error('useVSMDispatch must be used within a ValueStreamProvider')
  }
  return context
}

const useValueStream = () => {
  return [useVSMState(), useVSMDispatch()]
}

export { ValueStreamProvider, useVSMState, useVSMDispatch, useValueStream }