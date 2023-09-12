// ** React Import
import React from 'react'

// ** Mui Import
import { Box, Divider, Grid, TextField, Typography } from '@mui/material'

const TaxSupplier = dataRow => {
  return (
    <Box>
      {/* ////////////////////////////////////// แถวที่ 1 ///////////////////////////////////////////// */}
      <Grid container spacing={2}>
        <Grid item sm={12} md={12} lg={6}>
          <Typography>Tax ID</Typography>
          <TextField
            sx={{ marginBottom: 5 }}
            size='small'
            variant='filled'
            label=''
            value={dataRow?.tax_id || ''}
            fullWidth
          />
        </Grid>
        <Grid item sm={12} md={12} lg={6}>
          <Typography>Tax Category</Typography>
          <TextField
            sx={{ marginBottom: 5 }}
            size='small'
            variant='filled'
            label=''
            value={dataRow?.tax_category || ''}
            fullWidth
          />

          <Typography>Tax Wihholding Category</Typography>
          <TextField
            sx={{ marginBottom: 5 }}
            size='small'
            variant='filled'
            label=''
            value={dataRow?.tax_withholding_category || ''}
            fullWidth
          />
        </Grid>
        <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
        <Typography variant=''>Add a comment:</Typography>
        <TextField size='small' variant='filled' label='' multiline rows={4} fullWidth />
      </Grid>
    </Box>
  )
}

export default TaxSupplier
