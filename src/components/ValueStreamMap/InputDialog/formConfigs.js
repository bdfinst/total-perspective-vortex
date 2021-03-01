export const fieldConfigs = [
  {
    propName: 'processName',
    title: 'Step Name',
    type: 'string',
    toolTip: '',
    gridCols: 12,
    required: true,
    autoFocus: true,
    fullWidth: true,
    inputProps: { maxLength: 20 },
    helpText: {
      error: 'Cannot be blank',
      normal: 'Enter a name for the process step',
    },
    isError: (value) => !(value.length > 0),
  },
  {
    propName: 'processTime',
    title: 'Work Time',
    type: 'number',
    gridCols: 6,
    required: false,
    autoFocus: false,
    toolTip:
      'The amount of time required to do the activity <Click for more info>',
    helpDoc:
      'This is the amount of time that work is being done on the step. Examples are time spent refining work, coding, or the time it takes for automation to build and deploy changes.',
    helpText: {
      error: 'Must be between 0 and 999',
      normal: 'Value between 0 and 999',
    },
    isError: (value) => !(value >= 0 && value <= 999),
  },
  {
    propName: 'waitTime',
    title: 'Wait Time',
    type: 'number',
    gridCols: 6,
    required: false,
    autoFocus: false,
    toolTip:
      'The amount of time spent before the activity is started <Click for more info>',
    helpDoc:
      'The amount of time between when the previous step finished and this step starts. ',
    helpText: {
      error: 'Must be between 0 and 999',
      normal: 'Value between 0 and 999',
    },
    isError: (value) => !(value >= 0 && value <= 999),
  },
  {
    propName: 'pctCompleteAccurate',
    title: '%C/A',
    type: 'number',
    gridCols: 6,
    required: false,
    autoFocus: false,
    toolTip:
      'What % of the output from this step is complete and accurate <Click for more info>',
    helpDoc:
      'What % of the output from this step is accepted by the next? For example, if 20% of code reviews require rework, this should be set to 80% ',
    helpText: {
      error: 'Must be between 1% and 100%',
      normal: '1% to 100%',
    },
    isError: (value) => !(value >= 1 && value <= 100),
  },
  {
    propName: 'people',
    title: 'People Required',
    type: 'number',
    gridCols: 6,
    required: false,
    autoFocus: false,
    toolTip: 'The number of people working on this step <Click for more info>',
    helpDoc:
      'This is the total number of people required to perform this step. For paired programming, this would be 2. If the team is working to refine work, it would be the number on the team. For automation, 0.',
    helpText: {
      error: 'Must be between 0 and 100',
      normal: '0 to 100',
    },
    isError: (value) => !(value >= 0 && value <= 100),
  },
]

// processName: '',
// people: 0,
// processTime: 0,
// waitTime: 0,
// pctCompleteAccurate: 100,

export const getFieldConfig = (propName) =>
  fieldConfigs.find((f) => f.propName === propName) || {}
