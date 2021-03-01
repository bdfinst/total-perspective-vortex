import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Switch from '@material-ui/core/Switch'

import { useValueStream } from '../valueStreamContext'

const ToggleStretch = () => {
  const { state, setRelativelySized } = useValueStream()
  // const [checked, setChecked] = useState(state.isRelativeSized)

  const handleChecked = () => {
    setRelativelySized()
  }

  return (
    <FormControl component="fieldset">
      <FormControlLabel
        value="bottom"
        control={
          <Switch
            color="primary"
            value={state.isRelativeSized}
            onChange={handleChecked}
          />
        }
        label="Bottom"
        labelPlacement="bottom"
      />
    </FormControl>
  )
}

export default ToggleStretch
