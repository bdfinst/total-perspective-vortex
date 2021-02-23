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
  {
    propName: 'waitTime',
    title: 'Wait Time',
    type: 'number',
    gridCols: 6,
    required: false,
    autoFocus: false,
    toolTip: 'The amount of time spent before the activity is started',
    helpText: {
      error: 'Must be between 0 and 999',
      normal: 'Value between 0 and 999',
    },
    isError: (value) => (value >= 0 && value <= 999 ? false : true),
  },
  {
    propName: 'pctCompleteAccurate',
    title: '%C/A',
    type: 'number',
    gridCols: 6,
    required: false,
    autoFocus: false,
    toolTip:
      'What % of the output from this step is accepted by the next? For example, if 20% of code reviews require rework, this should be set to 80%',
    helpText: {
      error: 'Must be between 1% and 100%',
      normal: '1% to 100%',
    },
    isError: (value) => (value >= 1 && value <= 100 ? false : true),
  },
  {
    propName: 'people',
    title: 'People Required',
    type: 'number',
    gridCols: 6,
    required: false,
    autoFocus: false,
    toolTip: 'The amount of time required to do the activity',
    helpText: {
      error: 'Must be between 0 and 100',
      normal: '0 to 100',
    },
    isError: (value) => (value >= 0 && value <= 100 ? false : true),
  },
]

// processName: '',
// people: 0,
// processTime: 0,
// waitTime: 0,
// pctCompleteAccurate: 100,

export const getFieldConfig = (propName) => {
  return fieldConfigs.find((f) => f.propName === propName) || {}
}
