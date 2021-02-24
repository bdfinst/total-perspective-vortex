import React, { useEffect, useRef, useState } from 'react'
import ReactFlow, {
  MiniMap,
  ReactFlowProvider,
  isNode,
} from 'react-flow-renderer'
import { Container, Grid, Paper } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { getNodeById } from '../helpers'
import { useValueStream } from '../appContext/valueStreamContext'
import ConnectionLine from './ConnectionLine'
import Controls from './Controls'
import CustomEdge from './CustomEdge'
import InputBlock from './InputDialog/InputDialog'
import Node from './Node'
import Sidebar from './Sidebar'

const useStyles = makeStyles((theme) => ({
  container: {
    align: 'center',
    padding: '0 0 0 0 ',
  },
  paper: {
    elevation: 0,
    height: '80vh',
    padding: '0 0 0 0 ',
    textAlign: 'center',
  },
  controls: {
    elevation: 0,
    height: '10vh',
    padding: '0 0 0 0 ',
    textAlign: 'center',
  },
}))

const ValueStreamMap = () => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const {
    state,
    createEdge,
    createNode,
    changeNodeValues,
    changeEdgeTarget,
    removeElements,
    toggleNodeSelect,
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

  const onConnect = (params) => {
    const source = getNodeById(state.elements, params.source)
    const target = getNodeById(state.elements, params.target)

    createEdge({ source, target })
  }

  const onConnectStart = (event, { nodeId, handleType }) =>
    console.log('on connect start', { nodeId, handleType, event })

  const onConnectStop = (event) => console.log('on connect stop', event)

  const onConnectEnd = (event) => console.log('on connect end', event)

  const onNodeDragStop = (event, node) => {
    changeNodeValues({ node, position: node.position })
  }

  const onElementClick = (event, element) => {
    if (isNode(element)) {
      toggleNodeSelect(element)
    }
  }

  const onElementsRemove = (elementsToRemove) => {
    removeElements(elementsToRemove)
  }

  const onLoad = (_reactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance)
  }

  const onDragOver = (event) => {
    event.preventDefault()
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

  const handleDialogOpen = () => {
    if (selectedNode) setIsDialogOpen(true)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
  }

  return (
    <Container className={classes.container}>
      <ReactFlowProvider>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={12} md={9}>
            <div ref={reactFlowWrapper}>
              <Paper className={classes.controls} elevation={0}>
                <Controls
                  onDialogOpen={handleDialogOpen}
                  selectedNode={selectedNode}
                />
              </Paper>

              <Paper className={classes.paper} elevation={0}>
                <ReactFlow
                  elements={elements}
                  nodeTypes={{ customNode: Node }}
                  edgeTypes={{ custom: CustomEdge }}
                  connectionLineComponent={ConnectionLine}
                  defaultZoom={0.6}
                  minZoom={0.05}
                  maxZoom={1.5}
                  snapToGrid={true}
                  onConnect={onConnect}
                  onEdgeUpdate={onEdgeUpdate}
                  onElementsRemove={onElementsRemove}
                  onNodeDragStop={onNodeDragStop}
                  onElementClick={onElementClick}
                  onLoad={onLoad}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onConnectStart={onConnectStart}
                  onConnectStop={onConnectStop}
                  onConnectEnd={onConnectEnd}
                  arrowHeadColor="green"
                >
                  <MiniMap
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
              </Paper>
            </div>
          </Grid>
          <Grid item>
            <Sidebar />
          </Grid>
        </Grid>
      </ReactFlowProvider>
    </Container>
  )
}

export default ValueStreamMap
