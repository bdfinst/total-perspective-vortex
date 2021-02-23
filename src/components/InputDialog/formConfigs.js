export const fieldConfigs = [
  {
    propName: 'processName',
    title: 'Step Name',
    type: 'string',
    toolTip: '',
    gridCols: 12,
    required: true,
    autoFocus: true,
    helpText: {
      error: 'Cannot be blank',
      normal: 'Enter a name for the process step',
    },
    isError: (value) => (value.length > 0 ? false : true),
  },
  {
    propName: 'processTime',
    title: 'Work Time',
    type: 'number',
    gridCols: 6,
    required: false,
    autoFocus: false,
    toolTip: 'The amount of time required to do the activity',
    helpText: {
      error: 'Must be between 0 and 999',
      normal: 'Value between 0 and 999',
    },
    isError: (value) => (value >= 0 && value <= 999 ? false : true),
  },
]

export const getFieldConfig = (propName) => {
  return fieldConfigs.find((f) => f.propName === propName) || {}
}
