import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import DashboardPage from './pages/Dashboard'
import LoginPage from './pages/Login'
import SettingsPage from './pages/Settings'
import PrivateRoute from './private_routes'

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />

        <PrivateRoute exact path="/" component={DashboardPage} />
        <PrivateRoute path="/settings" component={SettingsPage} />
      </Switch>
    </Router>
  )
}
