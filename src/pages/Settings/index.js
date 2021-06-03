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
import { SettingsService } from '../../services'

import './styles.css'
import Loading from '../../common_components/Loading'

const CURRENCY_TYPES = ['BRL', 'EUR', 'CAD']

export default function Settings() {
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    currency: '',
    currencyValue: ''
  })
  const [currencies, setCurrencies] = useState([])

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        setLoading(true)

        const response = await SettingsService.list_currencies()

        if (!response.ok) {
          const errors = await response.json()
          throw errors
        }

        const result = await response.json()

        setCurrencies(result)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrencies()
  }, [])

  const save = async (evt) => {
    evt.preventDefault()

    try {
      setSaving(true)

      const response = await SettingsService.update_currency({
        currency: data.currency,
        value: data.currencyValue
      })

      if (!response.ok) {
        const errors = await response.json()
        throw errors
      }

      window.location = '/'
    } catch (error) {
      setSaving(false)
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
              {CURRENCY_TYPES.map((currency) => (
                <MenuItem value={currency} key={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            name="currencyValue"
            label="Novo Valor"
            variant="outlined"
            margin="normal"
            onChange={updateField}
            value={data.currencyValue}
            helperText={
              data.currency ? `Valor atual: ${currencies[data.currency]}` : ''
            }
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
