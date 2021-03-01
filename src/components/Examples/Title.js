import PropTypes from 'prop-types'
import React from 'react'
import Typography from '@material-ui/core/Typography'

export default function Title({ children }) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {children}
    </Typography>
  )
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
}
