import React, { useEffect, useState } from 'react'
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { InputNumber, InputText } from './Inputs'

const useStyles = makeStyles((theme) => ({
  paper: {
    // height: '90vh',
    padding: '0 0 0 0 ',
    textAlign: 'center',
  },
}))
const InputBlock = ({ node }) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [open, setOpen] = useState(node.length && node.length === 1)

  useEffect(() => {
    console.log(node)
  }, [node])

  const handleNumberChange = (e) => {
    const { name, value } = e.target

    console.log(name, Number(value))
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    console.log(name, value)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const buttons = [
    {
      name: 'processTime',
      label: 'Work',
      max: 999,
      onChange: handleNumberChange,
    },
    {
      name: 'waitTime',
      label: 'Wait',
      max: 999,
      onChange: handleNumberChange,
    },
    {
      name: 'actors',
      label: 'Actors',
      max: 99,
      onChange: handleNumberChange,
    },
    {
      name: 'pctCompleteAccurate',
      label: '% C/A',
      max: 100,
      onChange: handleChange,
    },
  ]

  return (
    // <Container>
    //   <Paper elevation={1}>
    //     {' '}
    //     <Grid container>
    //       <Grid item xs={12}>
    //         <InputText
    //           id="description"
    //           name="description"
    //           label="Description"
    //           onChange={handleChange}
    //         />

    //         {buttons.map((button) => (
    //           <InputNumber
    //             id={`${button.name}`}
    //             name={button.name}
    //             label={button.label}
    //             inputProps={{ min: 0, max: button.max }}
    //             onChange={button.onChange}
    //           />
    //         ))}
    //       </Grid>
    //     </Grid>
    //   </Paper>
    // </Container>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default InputBlock
