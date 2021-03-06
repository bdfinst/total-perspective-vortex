import React, { useEffect, useState } from 'react'
import ReactFlow, { MiniMap, ReactFlowProvider } from 'react-flow-renderer'
import { useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { getNodeById, isNode } from '../../helpers'
import { useValueStream } from './valueStreamContext'
import ConnectionLine from './ConnectionLine'
import Controls from './Controls'
import CustomEdge from './CustomEdge'
import HelpDialog from '../HelpDialog'
import InputDialog from './InputDialog/InputDialog'
import Node from './Node'
import ReworkNode from './ReworkNode'
import VsmHelpContent from './VsmHelpContent'
import config from '../../globalConfig'

const vsmBackground = 'rgb(238, 238, 240)'
const reactFlowStyle = {
  height: config.vsmHeight - 50,
  background: vsmBackground,
}
const ValueStreamMap = () => {
  const theme = useTheme()

  const {
    state,
    createEdge,
    changeNodeValues,
    toggleNodeSelect,
    changeEdgeTarget,
    removeElements,
  } = useValueStream()

  const [elements, setElements] = useState(state.elements)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedNode, setSelectedNode] = useState()
  const [vsmHelpOpen, setVsmHelpOpen] = useState(false)

  const handleVsmHelpOpen = () => {
    setVsmHelpOpen(true)
  }
  const handleVsmHelpClose = () => {
    setVsmHelpOpen(false)
  }

  useEffect(() => {
    setElements(state.elements)

    setSelectedNode(state.elements.find(el => isNode(el) && el.selected))
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

  const onConnect = params => {
    const source = getNodeById(state.elements, params.source)
    const target = getNodeById(state.elements, params.target)

    createEdge({ source, target })
  }

  const onNodeDragStop = (event, node) => {
    changeNodeValues({ node, position: node.position })
  }

  const onElementsRemove = elementsToRemove => {
    removeElements(elementsToRemove)
  }

  const onDragOver = event => {
    event.preventDefault()
    // eslint-disable-next-line no-param-reassign
    event.dataTransfer.dropEffect = 'move'
  }

  const onEdgeUpdate = (edge, newTargetNode) =>
    changeEdgeTarget(edge, newTargetNode)

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
              onVsmHelpOpen={handleVsmHelpOpen}
            />
          </Grid>
          <Grid item xs={12} id="vsm-container">
            <ReactFlow
              style={reactFlowStyle}
              elements={elements}
              nodeTypes={{
                [config.processNodeType]: Node,
                [config.reworkNodeType]: ReworkNode,
              }}
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
              onDragOver={onDragOver}
              arrowHeadColor="green"
            >
              <MiniMap
                style={{ width: 100, height: 75 }}
                nodeStrokeColor="blue"
                //  nodeClassName={}
                nodeBorderRadius={20}
                maskColor={vsmBackground}
                nodeColor={node => {
                  switch (node.type) {
                    case 'customNode':
                      return theme.palette.primary.main
                    default:
                      return '#eee'
                  }
                }}
              />
            </ReactFlow>
            <InputDialog
              open={isDialogOpen}
              onClose={handleDialogClose}
              selectedNode={selectedNode}
            />
          </Grid>
        </Grid>
      </ReactFlowProvider>
      <HelpDialog
        title="About Value Stream Mapping"
        open={vsmHelpOpen}
        onClose={handleVsmHelpClose}
      >
        <VsmHelpContent />
      </HelpDialog>
    </>
  )
}

export default ValueStreamMap
