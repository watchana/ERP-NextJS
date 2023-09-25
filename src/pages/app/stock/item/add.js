import React from 'react'

// ** Mui Import
import { Box, Button, Card, Grid, Typography } from '@mui/material'

const AddItemPage = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h6'>New Item</Typography>
          <Box>
            <Button>test</Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Card>test</Card>
        </Grid>

        <Grid item xs={12}></Grid>
      </Grid>
    </Box>
  )
}

export default AddItemPage
