import { Handle } from 'react-flow-renderer'
import React from 'react'

const settings = (type) => {
  switch (type) {
    case 'target':
      return { type: 'target', side: 'left', color: 'red' }
    case 'source':
      return { type: 'source', side: 'right', color: 'green' }
    case 'reworkTarget':
      return { type: 'target', side: 'bottom', color: 'red' }
    case 'reworkSource':
      return { type: 'source', side: 'left', color: 'green' }
    default:
      return {}
  }
}

const EdgeHandle = ({ type }) => (
  <Handle
    data-testid="edgeHandle"
    type={settings(type).type}
    position={settings(type).side}
    style={{
      background: settings(type).color,
      width: '15px',
      height: '15px',
      [settings(type).side]: '-9px',
    }}
  />
)

export default EdgeHandle
