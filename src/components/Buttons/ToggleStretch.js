import React, { useEffect, useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import { useValueStream } from '../../appContext/valueStreamContext'

export const ToggleStretch = () => {
  const { state, isRelativeSized } = useValueStream()
  const [checked, setChecked] = useState(state.isRelativeSized)

  useEffect(() => {
    setChecked(state.isRelativeSized)
    console.log(state.isRelativeSized)
  }, [state.isRelativeSized])

  const handleChecked = (e) => {
    console.log(e.target.value)
    isRelativeSized()
  }

  return (
    <FormControl component="fieldset">
      <FormControlLabel
        value="bottom"
        control={
          <Switch color="primary" value={checked} onChange={handleChecked} />
        }
        label="Bottom"
        labelPlacement="bottom"
      />
    </FormControl>
  )
}
