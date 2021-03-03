import React, { useEffect, useRef, useState } from 'react'
import ReactFlow, {
  MiniMap,
  ReactFlowProvider,
  isNode,
} from 'react-flow-renderer'
import { useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { getNodeById } from '../../helpers'
import { useValueStream } from './valueStreamContext'
import ConnectionLine from './ConnectionLine'
import Controls from './Controls'
import CustomEdge from './CustomEdge'
import InputBlock from './InputDialog/InputDialog'
import Node from './Node'

const vsmBackground = 'rgb(238, 238, 240)'
const reactFlowStyle = {
  height: '500px',
  background: vsmBackground,
}
const ValueStreamMap = () => {
  const theme = useTheme()

  const {
    state,
    createEdge,
    createNode,
    changeNodeValues,
    toggleNodeSelect,
    changeEdgeTarget,
    removeElements,
  } = useValueStream()
  const reactFlowWrapper = useRef(null)

  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [elements, setElements] = useState(state.elements)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedNode, setSelectedNode] = useState()

  useEffect(() => {
    setElements(state.elements)
    setSelectedNode(state.elements.find((el) => isNode(el) && el.selected))
  }, [state.elements])

  useEffect(() => {
    if (selectedNode) {
      setIsDialogOpen(true)
    }
  }, [selectedNode])

  const handleDialogOpen = () => {
    setIsDialogOpen(true)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
  }

  const onConnect = (params) => {
    const source = getNodeById(state.elements, params.source)
    const target = getNodeById(state.elements, params.target)

    createEdge({ source, target })
  }

  const onNodeDragStop = (event, node) => {
    changeNodeValues({ node, position: node.position })
  }

  const onElementsRemove = (elementsToRemove) => {
    removeElements(elementsToRemove)
  }

  const onLoad = (_reactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance)
  }

  const onDragOver = (event) => {
    event.preventDefault()
    // eslint-disable-next-line no-param-reassign
    event.dataTransfer.dropEffect = 'move'
  }

  const onEdgeUpdate = (edge, newTargetNode) =>
    changeEdgeTarget(edge, newTargetNode)

  const onDrop = (event) => {
    event.preventDefault()

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    })

    createNode(position)
  }

  const handlePaneClick = () => {
    if (selectedNode) toggleNodeSelect(selectedNode)
  }

  return (
    <>
      <ReactFlowProvider>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            <Controls
              onDialogOpen={handleDialogOpen}
              selectedNode={selectedNode}
            />
          </Grid>
          <Grid item xs={12} id="vsm-container">
            <ReactFlow
              style={reactFlowStyle}
              elements={elements}
              nodeTypes={{ customNode: Node }}
              edgeTypes={{ custom: CustomEdge }}
              connectionLineComponent={ConnectionLine}
              defaultZoom={0.6}
              minZoom={0.05}
              maxZoom={1.5}
              snapToGrid
              onConnect={onConnect}
              onPaneClick={handlePaneClick}
              onEdgeUpdate={onEdgeUpdate}
              onElementsRemove={onElementsRemove}
              onNodeDragStop={onNodeDragStop}
              onLoad={onLoad}
              onDrop={onDrop}
              onDragOver={onDragOver}
              arrowHeadColor="green"
            >
              <MiniMap
                style={{ width: 100, height: 75 }}
                nodeStrokeColor="blue"
                //  nodeClassName={}
                nodeBorderRadius={20}
                maskColor={vsmBackground}
                nodeColor={(node) => {
                  switch (node.type) {
                    case 'customNode':
                      return theme.palette.primary.main
                    default:
                      return '#eee'
                  }
                }}
              />
            </ReactFlow>
            <InputBlock
              open={isDialogOpen}
              onClose={handleDialogClose}
              selectedNode={selectedNode}
            />
          </Grid>
        </Grid>
      </ReactFlowProvider>
    </>
  )
}

export default ValueStreamMap
