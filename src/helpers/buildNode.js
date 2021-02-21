import theme from '../theme'

export const nodeDefaults = {
  width: 175,
  height: 300,
  selectedColor: theme.palette.secondary.main,
  deselectedColor: theme.palette.primary.dark,
}

export const defaultNodeData = {
  processName: '',
  actors: 0,
  processTime: 0,
  waitTime: 0,
  pctCompleteAccurate: 100,
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
    data: defaultNodeData,
    style: {
      width: nodeDefaults.width,
      background: theme.palette.background.paper,
      borderColor: nodeDefaults.deselectedColor,
      borderRadius: '12px',
      borderStyle: 'solid',
      borderWidth: '4px',
      padding: 5,
    },
    position,
  }
}
