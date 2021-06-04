import React, { useState, useContext } from 'react'
import { TextField, Button, Paper } from '@material-ui/core'

import './styles.css'
import { AccountsService } from '../../services'
import { GlobalContext } from '../../contexts/GlobalContext'

export default function Login() {
  const { setErrorMessage } = useContext(GlobalContext)
  const [requesting, setRequesting] = useState(false)
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const login = async (evt) => {
    evt.preventDefault()

    try {
      setRequesting(true)

      const response = await AccountsService.login(data)

      if (!response.ok) {
        const errors = await response.json()
        throw errors
      }

      const result = await response.json()

      window.localStorage.setItem('sessionToken', result.token)

      window.location = '/'
    } catch (error) {
      setRequesting(false)
      setErrorMessage(error.message)
    }
  }

  const updateField = (evt) => {
    const { value } = evt.target

    setData({
      ...data,
      [evt.target.name]: value
    })
  }

  const isValidForm = () => {
    return data.email && data.password
  }

  return (
    <div className="Login">
      <Paper classes={{ root: 'Login-content' }}>
        <h1 className="Login-title">Login</h1>

        <form onSubmit={login}>
          <TextField
            fullWidth
            type="email"
            name="email"
            label="E-mail"
            variant="outlined"
            margin="normal"
            autoFocus
            onChange={updateField}
            value={data.email}
          />

          <TextField
            type="password"
            fullWidth
            name="password"
            label="Senha"
            variant="outlined"
            margin="normal"
            onChange={updateField}
            value={data.password}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            classes={{ root: 'Login-button' }}
            disabled={requesting || !isValidForm()}
          >
            {requesting ? 'Logando...' : 'Entrar'}
          </Button>
        </form>
      </Paper>
    </div>
  )
}
