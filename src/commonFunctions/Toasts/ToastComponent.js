import React from 'react'
import Snackbar from '@mui/material/Snackbar';


const ToastComponent = () => {
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      message="Link Copied"
      key={vertical + horizontal}
      />
  )
}

export default ToastComponent