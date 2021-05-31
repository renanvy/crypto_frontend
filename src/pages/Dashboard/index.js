import React, { useState, useEffect } from 'react'
import {
  Button,
  Paper,
  TextField,
  Card,
  CardContent,
  Typography,
  Divider
} from '@material-ui/core'

import './styles.css'
import Loading from '../../common_components/Loading'

export default function Dashboard() {
  const [btcValue, setBtcValue] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const calculateBtc = async () => {
      try {
        setLoading(true)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    calculateBtc()
  }, [])

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
          name="btcValue"
          label="BTC"
          variant="outlined"
          margin="normal"
          autoFocus
          onChange={(evt) => setBtcValue(evt.target.value)}
          value={btcValue}
          size="large"
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
                6000,00
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                R$ BRL
              </Typography>
              <Typography variant="h5" component="h2">
                6000,00
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                € EUR
              </Typography>
              <Typography variant="h5" component="h2">
                6000,00
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                C$ CAD
              </Typography>
              <Typography variant="h5" component="h2">
                6000,00
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Paper>
    </div>
  )
}
