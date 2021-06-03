import React from 'react'
import 'normalize.css'
import 'fontsource-roboto'
import { Button } from '@material-ui/core'

import '../../global_styles.css'
import './styles.css'
import Routes from '../../routes'
import { AccountsService } from '../../services'
import { getSessionToken } from '../../helpers'

export default function App() {
  const renderLogoutBtn = () => {
    if (getSessionToken() === null) {
      return null
    }

    return (
      <Button
        color="primary"
        onClick={() => AccountsService.logout()}
        className="App-logout-btn"
      >
        Logout
      </Button>
    )
  }

  return (
    <div className="App">
      {renderLogoutBtn()}

      <div className="App-container">
        <Routes />
      </div>
    </div>
  )
}
