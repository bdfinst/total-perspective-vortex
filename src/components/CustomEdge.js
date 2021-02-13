import { getMarkerEnd, getSmoothStepPath } from 'react-flow-renderer'
import React from 'react'

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = { stroke: 'green', width: '10px', strokeWidth: '3' },
  data,
  arrowHeadType,
  markerEndId,
}) => {
  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    borderRadius: 10,
    targetPosition,
  })
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId)

  console.log(markerEndId)

  return (
    <>
      <path
        id={id}
        style={style}
        // className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      {data ? (
        <text>
          <textPath
            href={`#${id}`}
            style={{ fontSize: '12px' }}
            startOffset="50%"
            textAnchor="middle"
          >
            {data.text}
          </textPath>
        </text>
      ) : (
        <div />
      )}
    </>
  )
}

export default CustomEdge
