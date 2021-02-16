export const nodeDefaults = {
  width: 175,
  height: 300,
}

export const buildNode = ({ id, x, y }) => {
  const validCoord = (n) => !isNaN(n) && n > -1

  if (!validCoord(x) || !validCoord(y)) {
    throw new Error('XY Coordinates not available for buildNode')
  }
  const position = { x, y }

  return {
    id: id > 0 ? `${id}` : '-1',
    type: 'customNode',
    sourcePosition: 'right',
    targetPosition: 'left',
    selected: false,
    data: {
      description: '',
      actors: 0,
      processTime: 0,
      waitTime: 0,
      pctCompleteAccurate: 100,
    },
    style: {
      padding: -1,
    },
    position,
  }
}
