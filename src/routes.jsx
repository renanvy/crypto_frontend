import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import DashboardPage from './pages/Dashboard'

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={DashboardPage} />
      </Switch>
    </Router>
  )
}
