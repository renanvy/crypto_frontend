import React from 'react'
import { render, screen, queryByAttribute } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Login from '.'
import { GlobalProvider } from '../../contexts/GlobalContext'

describe('Login component', () => {
  test('should returns title', () => {
    render(
      <GlobalProvider>
        <Login />
      </GlobalProvider>
    )

    const loginTitle = screen.getByText('Login')

    expect(loginTitle).toBeInTheDocument()
  })

  test('should contains email field', () => {
    const dom = render(
      <GlobalProvider>
        <Login />
      </GlobalProvider>
    )

    const getById = queryByAttribute.bind(null, 'id')
    const emailField = getById(dom.container, 'email')

    expect(emailField).toBeInTheDocument()
  })

  test('should contains password field', () => {
    const dom = render(
      <GlobalProvider>
        <Login />
      </GlobalProvider>
    )

    const getById = queryByAttribute.bind(null, 'id')
    const passwordField = getById(dom.container, 'password')

    expect(passwordField).toBeInTheDocument()
  })

  test('should contains submit button', () => {
    render(
      <GlobalProvider>
        <Login />
      </GlobalProvider>
    )

    const submitButton = screen.getByRole('button', { name: 'Entrar' })

    expect(submitButton).toBeInTheDocument()
  })

  test('should change button text when user click to login', () => {
    const dom = render(
      <GlobalProvider>
        <Login />
      </GlobalProvider>
    )

    const getById = queryByAttribute.bind(null, 'id')
    const emailField = getById(dom.container, 'email')
    const passwordField = getById(dom.container, 'password')
    const submitButton = screen.getByRole('button', { name: 'Entrar' })

    userEvent.type(emailField, 'renanvy@gmail.com')
    userEvent.type(passwordField, '123456')

    expect(emailField).toHaveValue('renanvy@gmail.com')
    expect(passwordField).toHaveValue('123456')

    userEvent.click(submitButton)

    expect(submitButton).toHaveTextContent('Logando...')
  })

  test('should disable submit button when login form is not filled', () => {
    render(
      <GlobalProvider>
        <Login />
      </GlobalProvider>
    )

    const submitButton = screen.getByRole('button', { name: 'Entrar' })

    expect(submitButton).toHaveAttribute('disabled')
  })
})
