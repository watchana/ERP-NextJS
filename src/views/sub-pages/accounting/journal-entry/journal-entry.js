import { Card, Grid } from '@mui/material'

const JournalEntry = () => {
  return (
    <Card>
      <Grid container spacing={3}>
        <Grid xs={12} md={6}></Grid>
        <Grid xs={12} md={6}></Grid>
      </Grid>
    </Card>
  )
}

export default JournalEntry
