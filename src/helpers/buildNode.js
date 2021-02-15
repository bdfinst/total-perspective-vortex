export const nodeDefaults = {
  width: 175,
  height: 300,
}

export const buildNode = ({ id, x, y }) => {
  if (!x || !y) {
    throw new Error('XY Coordinates not available for buildNode')
  }
  const position = { x, y }

  return {
    id: id > 0 ? `${id}` : '-1',
    type: 'customNode',
    elType: 'NODE',
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
