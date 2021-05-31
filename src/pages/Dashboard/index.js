import React from 'react'
import { Paper, Typography, Container } from '@material-ui/core'

export default function Dashboard() {
  return (
    <>
      <Container maxWidth="sm">
        <Paper>
          <Typography component="h1">Dashboard</Typography>
        </Paper>
      </Container>
    </>
  )
}
