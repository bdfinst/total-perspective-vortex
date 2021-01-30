import React, { useContext, useState } from 'react'
import ReactFlow, {
  Controls,
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

let id = 0
const getId = () => `vsmnode_${id++}`

const VSMFlow = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [elements, setElements] = useState(initialElements)
  const onConnect = (params) => setElements((els) => addEdge(params, els))
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els))

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance)

  const onDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const onDrop = (event) => {
    event.preventDefault()

    const type = event.dataTransfer.getData('application/reactflow')
    const position = reactFlowInstance.project({
      x: event.clientX,
      y: event.clientY - 40,
    })
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` },
    }

    setElements((es) => es.concat(newNode))
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
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  )
}

export default VSMFlow
