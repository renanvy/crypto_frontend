import React, { useState, useEffect, useContext } from 'react'
import {
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText
} from '@material-ui/core'
import { SettingsService } from '../../services'

import './styles.css'
import Loading from '../../common_components/Loading'
import { GlobalContext } from '../../contexts/GlobalContext'

const CURRENCY_TYPES = ['BRL', 'EUR', 'CAD']

export default function Settings() {
  const { setLoading, loading } = useContext(GlobalContext)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState({
    currency: '',
    currencyValue: ''
  })
  const [currencies, setCurrencies] = useState([])
  const [errors, setErrors] = useState({
    currency: [],
    value: []
  })

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
  }, [setLoading])

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
      setErrors(error)
      setSaving(false)
    }
  }

  const updateField = (evt) => {
    const { value } = evt.target

    setData({
      ...data,
      [evt.target.name]: value
    })
  }

  const renderError = (inputName) => {
    return errors[inputName] && errors[inputName].length > 0
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
          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            error={renderError('currency')}
          >
            <InputLabel id="currency-label">Moeda</InputLabel>
            <Select
              labelId="currency-label"
              value={data.currency}
              onChange={updateField}
              id="currency"
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

          {errors.currency && (
            <FormHelperText error>{errors.currency[0]}</FormHelperText>
          )}

          <TextField
            type="number"
            fullWidth
            error={renderError('value')}
            name="currencyValue"
            label="Novo Valor"
            variant="outlined"
            id="currencyValue"
            margin="normal"
            onChange={updateField}
            value={data.currencyValue}
            helperText={
              data.currency ? `Valor atual: ${currencies[data.currency]}` : ''
            }
          />
          {errors.value && (
            <FormHelperText error>{errors.value[0]}</FormHelperText>
          )}

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
