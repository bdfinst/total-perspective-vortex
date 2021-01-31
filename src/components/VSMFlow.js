import React, { useEffect, useState } from 'react'
import ReactFlow, {
  Controls,
  MiniMap,
  ReactFlowProvider,
  addEdge,
  removeElements,
} from 'react-flow-renderer'

import { buildNode } from '../utils/elementFactory'
import { useVSMDispatch, useVSMState } from '../components/AppContext'
import Sidebar from './Sidebar'
import StepNode from './StepNode'
import initialElements from '../initial-elements'

const nodeTypes = {
  stepNode: StepNode,
}

let maxNodeId = 0
let maxEdgeId = 0
const getNodeId = () => `node_${maxNodeId++}`
const getEdgeId = () => `edge_${maxEdgeId++}`

const VSMFlow = () => {
  const { elements } = useVSMState()
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [localElements, setElements] = useState(elements)

  useEffect(() => {
    console.log(`Elements: `)
    console.log(localElements)
  })

  const onConnect = (params) => {
    const found = localElements.find((element) => {
      return (
        element.source === params.source && element.target === params.target
      )
    })
    if (!found) {
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
    const nodes = localElements.filter(
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
    buildNode(getNodeId(), type, position)

    const newNode = buildNode(getNodeId(), type, position)

    setElements((element) => element.concat(newNode))
    autoConnect(newNode)
  }

  return (
    <div className="vsmflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper">
          <ReactFlow
            elements={localElements}
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
