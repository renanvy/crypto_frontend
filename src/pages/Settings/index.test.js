import React from 'react'
import {
  render,
  screen,
  queryByAttribute,
  waitForElement
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Settings from '.'
import { GlobalProvider } from '../../contexts/GlobalContext'

describe('Settings component', () => {
  beforeEach(() => {
    fetch.mockResponseOnce(
      JSON.stringify({
        BRL: 5.4,
        CAD: 1.44,
        EUR: 0.92
      })
    )
  })

  test('should contains title', async () => {
    render(
      <GlobalProvider>
        <Settings />
      </GlobalProvider>
    )

    const loginTitle = await screen.findByText('Configurações')

    expect(loginTitle).toBeInTheDocument()
  })

  test('should contains currency select', async () => {
    const dom = render(
      <GlobalProvider>
        <Settings />
      </GlobalProvider>
    )

    const getById = queryByAttribute.bind(null, 'id')
    const currencySelect = await waitForElement(() =>
      getById(dom.container, 'currency')
    )

    expect(currencySelect).toBeInTheDocument()
  })

  test('should contains currency value input', async () => {
    const dom = render(
      <GlobalProvider>
        <Settings />
      </GlobalProvider>
    )

    const getById = queryByAttribute.bind(null, 'id')
    const currencyValue = await waitForElement(() =>
      getById(dom.container, 'currencyValue')
    )

    expect(currencyValue).toBeInTheDocument()
  })

  test('should contains submit button', async () => {
    render(
      <GlobalProvider>
        <Settings />
      </GlobalProvider>
    )

    const submitButton = await waitForElement(() =>
      screen.findByRole('button', { name: 'Atualizar' })
    )

    expect(submitButton).toBeInTheDocument()
  })

  test('should change button text when user click to login', async () => {
    render(
      <GlobalProvider>
        <Settings />
      </GlobalProvider>
    )

    const submitButton = await waitForElement(() =>
      screen.getByRole('button', { name: 'Atualizar' })
    )

    userEvent.click(submitButton)

    expect(submitButton).toHaveTextContent('Salvando...')
  })
})
