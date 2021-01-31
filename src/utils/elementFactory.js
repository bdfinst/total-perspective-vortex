export const buildNode = (id, type, position) => {
  const defaultValues = {
    processTime: 0,
    cycleTime: 0,
    pctCompleteAccurate: 100,
  }
  const defaultStyle = { border: '1px solid #777', padding: 10 }

  if (type === undefined || position === undefined) {
    throw new Error(
      `Required property undefined in buildNode: id: ${id}, type: ${type}, position: ${position}`,
    )
  }
  return {
    id,
    type,
    position,
    elType: 'node',
    data: defaultValues,
    style: defaultStyle,
  }
}
