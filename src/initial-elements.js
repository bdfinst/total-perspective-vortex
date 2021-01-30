const elements = [
  {
    id: '1',
    type: 'stepNode',
    data: { processTime: 0, cycleTime: 0, pctCompleteAccurate: 100 },
    style: { border: '1px solid #777', padding: 10 },
    position: { x: 100, y: 150 },
  },
  {
    id: '2',
    type: 'stepNode',
    data: { processTime: 0, cycleTime: 0, pctCompleteAccurate: 100 },
    style: { border: '1px solid #777', padding: 10 },
    position: { x: 450, y: 150 },
  },

  { id: 'e1-2', source: '1', target: '2', animated: true },
]

export default elements
