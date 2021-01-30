import React from 'react'
import ReactFlow from 'react-flow-renderer'
import StepNode from './StepNode'
import elements from './initial-elements'

const nodeTypes = {
  stepNode: StepNode,
}
const graphStyles = { width: '100%', height: '500px' }

const VSMGraph = () => (
  <ReactFlow elements={elements} nodeTypes={nodeTypes} style={graphStyles} />
)

export default VSMGraph
