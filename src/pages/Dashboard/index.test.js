import React from 'react'
import { render, screen, waitForElement } from '@testing-library/react'

import Dashboard from '.'
import { GlobalProvider } from '../../contexts/GlobalContext'

describe('Dashboard component', () => {
  beforeEach(() => {
    fetch.mockResponseOnce(
      JSON.stringify({
        bpi: {
          BTC: {
            code: 'BTC',
            description: 'Bitcoin',
            rate: '1.0000',
            rate_float: 1
          },
          CAD: {
            code: 'CAD',
            description: 'Canadian Dollar',
            rate: '56,337.51',
            rate_float: 56337.5088
          },
          EUR: {
            code: 'EUR',
            description: 'Euro',
            rate: '35,993.41',
            rate_float: 35993.4084
          },
          USD: {
            code: 'USD',
            description: 'United States Dollar',
            rate: '39,123.2700',
            rate_float: 39123.27
          }
        },
        disclaimer:
          'This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org',
        time: {
          updated: 'Jun 3, 2021 23:49:00 UTC',
          updatedISO: '2021-06-03T23:49:00+00:00',
          updateduk: 'Jun 4, 2021 at 00:49 BST'
        }
      })
    )
  })

  test('should render title', async () => {
    render(
      <GlobalProvider>
        <Dashboard />
      </GlobalProvider>
    )

    const loginTitle = await waitForElement(() =>
      screen.getByText('Bem-vindo ao painel BitCoins da Trybe!')
    )

    expect(loginTitle).toBeInTheDocument()
  })
})
