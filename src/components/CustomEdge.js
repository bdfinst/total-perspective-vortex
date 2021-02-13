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
  data,
  arrowHeadType,
  markerEndId,
  selected,
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

  console.log(selected)

  return (
    <>
      <path
        id={id}
        d={edgePath}
        markerEnd={markerEnd}
        className={!selected ? 'custom-edge-path' : 'custom-edge-path-selected'}
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
