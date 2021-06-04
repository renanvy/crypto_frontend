import React, { useState, createContext } from 'react'
import PropTypes from 'prop-types'

const GlobalContext = createContext()

function GlobalProvider({ children }) {
  const [loading, setLoading] = useState(true)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <GlobalContext.Provider
      value={{
        loading,
        setLoading,

        successMessage,
        setSuccessMessage,

        errorMessage,
        setErrorMessage
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export { GlobalContext, GlobalProvider }
