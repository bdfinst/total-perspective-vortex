import React, { useEffect, useRef, useState } from 'react'
import ReactFlow, {
  Controls,
  MiniMap,
  ReactFlowProvider,
  isNode,
} from 'react-flow-renderer'

import { getNodeById, getNodes } from '../helpers'
import { useValueStream } from '../appContext/valueStreamContext'
import ConnectionLine from './ConnectionLine'
import CustomEdge from './CustomEdge'
import Node from './Node'
import Sidebar from './Sidebar'

const ValueStreamMap = () => {
  const {
    state,
    createEdge,
    createNode,
    changeEdge,
    removeElements,
    selectNode,
  } = useValueStream()
  const reactFlowWrapper = useRef(null)

  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  useEffect(() => {
    const nodes = getNodes(state.elements)

    console.log(`Nodes: ${nodes.length}`)
  }, [state.elements])

  const onConnect = (params) => {
    const source = getNodeById(state.elements, params.source)
    const target = getNodeById(state.elements, params.target)

    createEdge({ source, target })
  }

  const onConnectStart = (event, { nodeId, handleType }) =>
    console.log('on connect start', { nodeId, handleType })
  const onConnectStop = (event) => console.log('on connect stop', event)
  const onConnectEnd = (event) => console.log('on connect end', event)
  const onNodeDragStop = (event, node) => console.log('drag stop', node)

  const onElementClick = (event, element) => {
    if (isNode(element)) {
      selectNode({ node: element })
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
    <div className="vsmflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={state.elements}
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
            <Controls />
            <MiniMap
              nodeColor={(node) => {
                switch (node.type) {
                  case 'input':
                    return 'red'
                  case 'default':
                    return '#00ff00'
                  case 'output':
                    return 'rgb(0,0,255)'
                  default:
                    return '#eee'
                }
              }}
            />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  )
}

export default ValueStreamMap
