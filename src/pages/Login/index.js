import React, { useState } from 'react'
import { TextField, Button, Paper } from '@material-ui/core'
import './styles.css'

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

  return (
    <div className="Login">
      <Paper classes={{ root: 'Login-content' }}>
        <h1 className="Login-title">Login</h1>

        <form onSubmit={login}>
          <TextField
            fullWidth
            name="email"
            label="E-mail"
            variant="outlined"
            margin="normal"
            autoFocus
            onChange={updateField}
            value={data.email}
          />

          <TextField
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
            disabled={loading}
          >
            {loading ? 'Logando...' : 'Entrar'}
          </Button>
        </form>
      </Paper>
    </div>
  )
}
