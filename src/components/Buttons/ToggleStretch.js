import React, { useEffect, useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import { useValueStream } from '../../appContext/valueStreamContext'

export const ToggleStretch = () => {
  const { state, setRelativelySized } = useValueStream()
  const [checked, setChecked] = useState(state.isRelativeSized)

  useEffect(() => {
    console.log(state.isRelativeSized)
    console.log(state.elements[1])
  }, [state.isRelativeSized])

  const handleChecked = (e) => {
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