import React, { useState } from 'react'
import { TextField, Button, Paper } from '@material-ui/core'

import './styles.css'
import { AccountsService } from '../../services'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const login = async (evt) => {
    evt.preventDefault()

    try {
      setLoading(true)

      const response = await AccountsService.login(data)

      if (!response.ok) {
        const errors = await response.json()
        throw errors
      }

      const result = await response.json()

      window.localStorage.setItem('sessionToken', result.token)

      window.location = '/'
    } catch (error) {
      console.error(error)
      setLoading(false)
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
            disabled={loading || !isValidForm()}
          >
            {loading ? 'Logando...' : 'Entrar'}
          </Button>
        </form>
      </Paper>
    </div>
  )
}
