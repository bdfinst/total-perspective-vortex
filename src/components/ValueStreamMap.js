import React, { useEffect, useRef, useState } from 'react'
import ReactFlow, {
  MiniMap,
  ReactFlowProvider,
  isNode,
} from 'react-flow-renderer'
import { Container, Grid, Paper } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { getGraphLayout, getNodeById, getNodes } from '../helpers'
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
    changeEdge,
    removeElements,
    toggleNodeSelect,
  } = useValueStream()
  const reactFlowWrapper = useRef(null)

  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [elements, setElements] = useState(state.elements)

  useEffect(() => {
    setElements(state.elements)

    console.log(`Nodes: ${getNodes(elements).length}`)
  }, [state.elements])

  // const getSelectedNode = () => {
  //   return getNodes(state.elements).filter((node) => node.selected === true)
  // }
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
      toggleNodeSelect({ node: element })
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

  const onEdgeUpdate = (oldEdge, newConnection) =>
    changeEdge({ oldEdge: oldEdge, newTargetNode: newConnection })

  const onDrop = (event) => {
    event.preventDefault()

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    })

    createNode(position)
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
                <Controls />
              </Paper>

              <Paper className={classes.paper} elevation={0}>
                <ReactFlow
                  elements={getGraphLayout(elements, true, 10)}
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
                <InputBlock />
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
