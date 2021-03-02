import React, { useState } from 'react'

const init = {
  xPos: '0px',
  yPos: '0px',
  showMenu: false,
}

const ContextMenu = () => {
  const [state, setState] = useState(init)

  return (
    <>
      <div>Context Menu {state.showMenu}</div>
      <div data-testid="state">{state.showMenu}</div>
    </>
  )
}

export default ContextMenu
