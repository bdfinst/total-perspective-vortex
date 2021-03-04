import 'react-contexify/dist/ReactContexify.css'
import { Item, Menu } from 'react-contexify'
import React from 'react'

import { useValueStream } from './valueStreamContext'
import useZoom from '../../hooks/useZoom'

const NodeContextMenu = ({ menuId }) => {
  const { removeElements, toggleNodeSelect } = useValueStream()
  const zoom = useZoom()

  // const handleItemClick = ({ event, props, triggerEvent, data }) => {
  //   console.log(event, props, triggerEvent, data)
  // }

  const handleDelete = ({ props }) => {
    removeElements([props.node])
  }

  const handleZoom = ({ props }) => {
    zoom(props.node)
  }

  const handleEdit = ({ props }) => {
    // if (!props.node.selected) {
    toggleNodeSelect(props.node)
    // }
  }

  return (
    <Menu id={menuId}>
      <Item onClick={handleEdit}>Edit</Item>
      <Item onClick={handleDelete}>Delete</Item>
      <Item onClick={handleZoom}>Focus to node</Item>
    </Menu>
  )
}

export default NodeContextMenu
