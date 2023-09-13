// ** React Import
import React from 'react'

// ** Mui Import
import { Box, Divider, Grid, TextField, Typography, Card } from '@mui/material'

const TaxSupplier = dataRow => {
  return (
    <Box>
      <Card
        sx={{
          borderTopLeftRadius: 0, // กำหนด borderRadius สำหรับมุมบนซ้าย
          borderTopRightRadius: 0, // กำหนด borderRadius สำหรับมุมบนขวา
          p: 2,
          mb: 2
        }}
      >
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
        </Grid>
      </Card>
    </Box>
  )
}

export default TaxSupplier
