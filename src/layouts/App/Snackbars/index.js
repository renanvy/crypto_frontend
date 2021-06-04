import React, { useContext } from 'react'
import { Snackbar as MuiSnackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

import { GlobalContext } from '../../../contexts/GlobalContext'

export default function Snackbars() {
  const { setSuccessMessage, setErrorMessage, successMessage, errorMessage } =
    useContext(GlobalContext)

  return (
    <>
      <MuiSnackbar
        open={!!successMessage}
        autoHideDuration={5000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
      >
        <Alert onClose={() => setSuccessMessage('')} severity="success">
          {successMessage}
        </Alert>
      </MuiSnackbar>

      <MuiSnackbar
        open={!!errorMessage}
        autoHideDuration={5000}
        onClose={() => setErrorMessage('')}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
      >
        <Alert onClose={() => setErrorMessage('')} severity="error">
          {errorMessage}
        </Alert>
      </MuiSnackbar>
    </>
  )
}
