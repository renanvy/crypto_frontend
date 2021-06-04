import React, { useState, useEffect, useContext } from 'react'
import {
  Button,
  Paper,
  TextField,
  Card,
  CardContent,
  Typography,
  Divider
} from '@material-ui/core'
import numeral from 'numeral'

import './styles.css'
import Loading from '../../common_components/Loading'
import { BitcoinPricesService } from '../../services'
import { GlobalContext } from '../../contexts/GlobalContext'

export default function Dashboard() {
  const [btcQuantity, setBtcQuantity] = useState(1)
  const [calculating, setCalculating] = useState(false)
  const [bitcoinPrices, setBitcoinPrices] = useState({})
  const { setErrorMessage, setLoading, loading } = useContext(GlobalContext)

  useEffect(() => {
    const calculateBtc = async () => {
      try {
        setLoading(true)

        const response = await BitcoinPricesService.get()

        if (!response.ok) {
          const errors = await response.json()
          throw errors
        }

        const result = await response.json()

        setBitcoinPrices(result)
      } catch (error) {
        setErrorMessage(
          'Não foi possível calcular. Tente novamente mais tarde.'
        )
      } finally {
        setLoading(false)
      }
    }

    calculateBtc()
  }, [])

  const renderPrice = (currency) => {
    if (calculating) {
      return <Loading showMessage={false} />
    }

    return numeral(
      bitcoinPrices['bpi'][currency]['rate_float'] * btcQuantity
    ).format('0,0.0000')
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="Dashboard">
      <h1 className="Dashboard-title">
        Bem-vindo ao painel de BitCoins da Trybe!
      </h1>

      <Divider />

      <Button
        href="/settings"
        variant="contained"
        color="primary"
        size="large"
        classes={{ root: 'Dashboard-settings-button' }}
      >
        Atualizar valor monetário
      </Button>

      <Paper classes={{ root: 'Dashboard-content' }}>
        <TextField
          type="number"
          label="BTC"
          variant="outlined"
          margin="normal"
          autoFocus
          InputProps={{ inputProps: { min: 1 } }}
          onChange={(evt) => {
            const value = Number(evt.target.value)

            if (!value || value <= 0) {
              return
            }

            setBtcQuantity(value)
            setCalculating(true)

            setTimeout(() => {
              setCalculating(false)
            }, 1000)
          }}
          value={btcQuantity}
          size="medium"
          disabled={calculating}
          classes={{ root: 'Dashboard-input' }}
        />

        <Divider />

        <div className="Dashboard-cards">
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                $ USD
              </Typography>
              <Typography variant="h5" component="h2">
                {renderPrice('USD')}
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                R$ BRL
              </Typography>
              <Typography variant="h5" component="h2">
                {renderPrice('BRL')}
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                € EUR
              </Typography>
              <Typography variant="h5" component="h2">
                {renderPrice('EUR')}
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                C$ CAD
              </Typography>
              <Typography variant="h5" component="h2">
                {renderPrice('CAD')}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Paper>
    </div>
  )
}
