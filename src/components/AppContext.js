/* Useful resources on context
 * https://kentcdodds.com/blog/how-to-use-react-context-effectively
 * https://kentcdodds.com/blog/how-to-optimize-your-context-value
 * https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/#usecontext
 */

import React from 'react'

export const MapStateContext = React.createContext()
export const MapDispatchContext = React.createContext()

const initState = {
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
  console.log(node)
  console.log(state)

  const newState = {
    ...state,
    elements: state.elements.map((el) => {
      return el.id === node.id ? { ...el, data: node.data } : el
    }),
  }
  console.log(newState)

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
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const VSMProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(vsmReducer, initState)
  return (
    <MapStateContext.Provider value={state}>
      <MapDispatchContext.Provider value={dispatch}>
        {children}
      </MapDispatchContext.Provider>
    </MapStateContext.Provider>
  )
}

const useVSMState = () => {
  const context = React.useContext(MapStateContext)
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context
}

const useVSMDispatch = () => {
  const context = React.useContext(MapDispatchContext)
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider')
  }
  return context
}
export { VSMProvider, useVSMState, useVSMDispatch }
