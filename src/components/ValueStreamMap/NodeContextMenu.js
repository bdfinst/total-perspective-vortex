import 'react-contexify/dist/ReactContexify.css'
import { Item, Menu } from 'react-contexify'
import React from 'react'

import { useValueStream } from './valueStreamContext'

const NodeContextMenu = ({ menuId }) => {
  const { removeElements } = useValueStream()

  const handleItemClick = ({ event, props, triggerEvent, data }) => {
    console.log(event, props, triggerEvent, data)
  }

  const handleDelete = ({ props }) => {
    removeElements([props.node])
  }

  return (
    <Menu id={menuId}>
      <Item onClick={handleItemClick}>Edit</Item>
      <Item onClick={handleDelete}>Delete</Item>
    </Menu>
  )
}

export default NodeContextMenu
