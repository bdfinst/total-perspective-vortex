import React, { useContext, useState } from 'react'
import ReactFlow, {
  Controls,
  MiniMap,
  ReactFlowProvider,
  addEdge,
  removeElements,
} from 'react-flow-renderer'

import Sidebar from './Sidebar'
import StepNode from './StepNode'
import initialElements from '../initial-elements'

const nodeTypes = {
  stepNode: StepNode,
}

let maxNodeId = 0
let maxEdgeId = 0
const getNodeId = () => `vsmnode_${maxNodeId++}`
const getEdgeId = () => `vsmedge_${maxEdgeId++}`

const VSMFlow = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [elements, setElements] = useState(initialElements)

  const onConnect = (params) => {
    const found = elements.find((element) => {
      return (
        element.source === params.source && element.target === params.target
      )
    })
    if (!found) {
      console.log(params)

      setElements((els) => addEdge(params, els))
    }
  }

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els))

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance)

  const onDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const autoConnect = (newNode) => {
    const nodes = elements.filter(
      (el) => el.hasOwnProperty('type') && el.type === 'stepNode',
    )
    const source = nodes[nodes.length - 1].id

    const newEdge = {
      id: getEdgeId(),
      source,
      target: newNode.id,
      animated: true,
    }
    setElements((element) => element.concat(newEdge))
  }

  const onDrop = (event) => {
    event.preventDefault()

    const type = event.dataTransfer.getData('application/reactflow')
    const position = reactFlowInstance.project({
      x: event.clientX,
      y: event.clientY - 40,
    })
    const newNode = {
      id: getNodeId(),
      type,
      position,
      data: { processTime: 0, cycleTime: 0, pctCompleteAccurate: 100 },
      style: { border: '1px solid #777', padding: 10 },
    }

    setElements((element) => element.concat(newNode))
    autoConnect(newNode)

    console.log(elements)
    console.log(elements.length)
  }

  return (
    <div className="vsmflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper">
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
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

export default VSMFlow
