import React from 'react'
import PropTypes from 'prop-types'
import { CircularProgress } from '@material-ui/core'

import './styles.css'

export default function Loading({ showMessage }) {
  return (
    <div className="Loading">
      <CircularProgress />
      {showMessage && <span>Carregando...</span>}
    </div>
  )
}

Loading.defaultProps = {
  showMessage: true
}

Loading.propTypes = {
  showMessage: PropTypes.bool
}
