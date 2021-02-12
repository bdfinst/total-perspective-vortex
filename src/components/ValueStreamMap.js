import React, { useEffect, useRef, useState } from 'react'
import ReactFlow, {
  Controls,
  MiniMap,
  ReactFlowProvider,
  addEdge,
  removeElements,
  updateEdge,
} from 'react-flow-renderer'

import { getNodes } from '../helpers/utilities'
import { useValueStream } from '../appContext/valueStreamContext'
import Node from './Node'
import Sidebar from './Sidebar'

const nodeTypes = {
  stepNode: Node,
}

const ValueStreamMap = () => {
  const reactFlowWrapper = useRef(null)

  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const { state, createEdge, createNode } = useValueStream()
  const [elements, setElements] = useState(state.elements)

  useEffect(() => {
    setElements(state.elements)
  }, [state.elements])

  // const onConnect = (params) => {
  //   const found = elements.find((element) => {
  //     return (
  //       element.source === params.source && element.target === params.target
  //     )
  //   })
  //   if (!found) {
  //     setElements((els) => addEdge(params, els))
  //   }
  // }

  const onConnectStart = (event, { nodeId, handleType }) =>
    console.log('on connect start', { nodeId, handleType })
  const onConnectStop = (event) => console.log('on connect stop', event)
  const onConnectEnd = (event) => console.log('on connect end', event)
  const onNodeDragStop = (event, node) => console.log('drag stop', node)
  const onElementClick = (event, element) => console.log('click', element)

  // const onElementsRemove = (elementsToRemove) =>
  //   setElements((els) => removeElements(elementsToRemove, els))

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance)

  const onDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  // const onEdgeUpdate = (oldEdge, newConnection) =>
  //   setElements((els) => updateEdge(oldEdge, newConnection, els))

  // const autoConnect = (newNode) => {
  //   const nodes = elements.filter((el) => el.elType === 'NODE')
  //   const source = nodes[nodes.length - 1].id

  //   createEdge(buildEdge(getElementId(), source, newNode.id))
  //   setElements((element) =>
  //     element.concat(buildEdge(getElementId(), source, newNode.id)),
  //   )
  // }

  const onDrop = (event) => {
    event.preventDefault()

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    })

    createNode(position)
    const nodes = getNodes(state.elements)

    createEdge({
      source: nodes[nodes.length - 2],
      target: nodes[nodes.length - 1],
    })
    console.log(state.elements)
  }

  return (
    <div className="vsmflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={state.elements}
            nodeTypes={nodeTypes}
            defaultZoom={0.8}
            minZoom={0.01}
            maxZoom={1.5}
            snapToGrid={true}
            // onConnect={onConnect}
            // onEdgeUpdate={onEdgeUpdate}
            // onElementsRemove={onElementsRemove}
            onNodeDragStop={onNodeDragStop}
            onElementClick={onElementClick}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onConnectStart={onConnectStart}
            onConnectStop={onConnectStop}
            onConnectEnd={onConnectEnd}
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
