import React from 'react'
import { CircularProgress } from '@material-ui/core'

import './styles.css'

export default function Loading() {
  return (
    <div className="Loading">
      <CircularProgress />
      <span>Carregando...</span>
    </div>
  )
}
