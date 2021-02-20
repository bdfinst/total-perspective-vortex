const fieldDefs = [
  {
    id: 'processName',
    label: 'Process Name',
    value: '',
    error: false,
    helperText: 'Enter a name for the process step',
    getHelperText: (error) =>
      error ? 'Cannot be blank' : 'Enter a name for the process step',
    isValid: (value) => value.length > 0,
  },
  {
    id: 'processTime',
    label: 'Work Time',
    inputProps: { min: 0, max: 999 },
    value: '',
    error: false,
    toolTip: 'The amount of time required to do the activity',
    helperText: 'Value between 1 and 999',
    getHelperText: (error) =>
      error ? 'Must be between 1 and 999' : 'Value between 1 and 999',
    isValid: (value) => value > 0 && value <= 999,
  },
  {
    id: 'waitTime',
    label: 'Wait Time',
    inputProps: { min: 0, max: 999 },
    value: '',
    error: false,
    toolTip: 'The amount of time spent before the activity is started',
    helperText: 'Value between 0 and 999',
    getHelperText: (error) =>
      error ? 'Must be between 0 and 999' : 'Value between 0 and 999',
    isValid: (value) => value >= 0 && value <= 999,
  },
  {
    id: 'actors',
    label: 'People Required',
    inputProps: { min: 0, max: 99 },
    value: '',
    error: false,
    toolTip:
      'The number of people engaged in the activity. For automation, this should be 0',
    helperText: 'Value between 0 and 99',
    getHelperText: (error) =>
      error ? 'Must be between 0 and 99' : 'Value between 0 and 99',
    isValid: (value) => value >= 0 && value <= 99,
  },
  {
    id: 'pctCompleteAccurate',
    label: '%C/A',
    inputProps: { min: 0, max: 100 },
    value: '',
    error: false,
    toolTip:
      'What % of the output from this step is accepted by the next? For example, if 20% of code reviews require rework, this should be set to 80%',
    helperText: 'Value between 1% and 100%',
    getHelperText: (error) =>
      error ? 'Must be between 1% and 100%' : 'Value between 1% and 100%',
    isValid: (value) => value > 0 && value <= 100,
  },
]

export default fieldDefs
