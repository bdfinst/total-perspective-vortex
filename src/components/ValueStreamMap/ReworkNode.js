/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Paper } from '@material-ui/core'
import { createPortal } from 'react-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useContextMenu } from 'react-contexify'

import { useValueStream } from './valueStreamContext'
import EdgeHandle from '../Nodes/EdgeHandle'
import NodeContextMenu from './NodeContextMenu'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '1.2em',
    color: theme.textSecondary,
    textAlign: 'center',
  },
}))

const defaultData = {
  processName: '',
}

const ContextMenuPortal = ({ children }) =>
  createPortal(children, document.getElementById('vsm-container'))

const ReworkNode = (props) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const { state, toggleNodeSelect } = useValueStream()
  const [node, setNode] = useState(props)
  const [data, setData] = useState(defaultData)

  useEffect(() => {
    const found = state.elements.find((el) => el.id === node.id)
    setData(found ? found.data : defaultData)
    setNode(props)
  }, [state.elements])

  const menuId = `NODE_CONTEXT_${node.id}`
  const { show } = useContextMenu({
    id: menuId,
  })

  const handleDoubleClick = (event) => {
    if (event) event.preventDefault()

    toggleNodeSelect(node)
  }

  const handleContextMenu = (event) => {
    if (event) event.preventDefault()

    show(event, { props: { node } })
  }

  return (
    <>
      <EdgeHandle type="reworkTarget" />
      <div onDoubleClick={handleDoubleClick} onContextMenu={handleContextMenu}>
        <Paper>
          <div className={classes.title}>Rework</div>
          <div>{data.description}</div>
        </Paper>
      </div>
      <ContextMenuPortal>
        <NodeContextMenu menuId={menuId} />
      </ContextMenuPortal>
      <EdgeHandle type="reworkSource" />
    </>
  )
}

export default ReworkNode
