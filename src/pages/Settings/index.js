import React, { useState, useEffect } from 'react'
import {
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@material-ui/core'

import './styles.css'
import Loading from '../../common_components/Loading'

export default function Settings() {
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    currency: '',
    currencyValue: '',
    newCurrencyValue: ''
  })

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true)

        // setData(...)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const save = async (evt) => {
    evt.preventDefault()

    try {
      setSaving(true)

      window.location = '/'
    } catch (error) {
      console.error(error)
    }
  }

  const updateField = (evt) => {
    const { value } = evt.target

    setData({
      ...data,
      [evt.target.name]: value
    })
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="Settings">
      <Button
        href="/"
        variant="outlined"
        size="large"
        color="primary"
        classes={{ root: 'Settings-back_button' }}
      >
        Voltar
      </Button>

      <Paper classes={{ root: 'Settings-content' }}>
        <h1 className="Settings-title">Configurações</h1>

        <form onSubmit={save}>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="currency-label">Moeda</InputLabel>
            <Select
              labelId="currency-label"
              value={data.currency}
              onChange={updateField}
              label="Moeda"
              name="currency"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            name="newCurrencyValue"
            label="Novo Valor"
            variant="outlined"
            margin="normal"
            onChange={updateField}
            value={data.newCurrencyValue}
            helperText={`Valor atual: ${data.currencyValue}`}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            classes={{ root: 'Settings-button' }}
            disabled={saving}
          >
            {saving ? 'Salvando...' : 'Atualizar'}
          </Button>
        </form>
      </Paper>
    </div>
  )
}
