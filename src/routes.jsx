import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import DashboardPage from './pages/Dashboard'
import LoginPage from './pages/Login'
import SettingsPage from './pages/Settings'

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={DashboardPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/settings" component={SettingsPage} />
      </Switch>
    </Router>
  )
}
