import React from 'react'
import 'normalize.css'
import 'fontsource-roboto'
import { Button } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import '../../global_styles.css'
import './styles.css'
import Routes from '../../routes'
import { AccountsService } from '../../services'
import { getSessionToken } from '../../helpers'
import { GlobalProvider } from '../../contexts/GlobalContext'
import Snackbars from './Snackbars'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#036b52'
    }
  }
})

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
    <ThemeProvider theme={theme}>
      <GlobalProvider>
        <div className="App">
          <Snackbars />

          {renderLogoutBtn()}

          <div className="App-container">
            <Routes />
          </div>
        </div>
      </GlobalProvider>
    </ThemeProvider>
  )
}
