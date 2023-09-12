// React Imports
import React from 'react'

// MUI Imports
import { Box, Typography, Checkbox, TextField, Card, Grid } from '@mui/material'

const QualityItem = ({ dataRow }) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  const handleCheckboxChange = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
  }

  return (
    <Box>
      <Card>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              {...label}
              checked={dataRow.inspection_required_before_purchase}
              onChange={handleCheckboxChange}
            />
            <Typography variant='subtitle2'>Inspection Required before Purchase</Typography>
          </Grid>
          <Grid item xs={12} sx={{ ml: 3 }}>
            <Typography variant='subtitle2'>Quality Inspection Template</Typography>
            <TextField fullWidth variant='filled' label='' size='small' value={dataRow.quality_inspection_template} />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              {...label}
              checked={dataRow.inspection_required_before_delivery}
              onChange={handleCheckboxChange}
            />
            <Typography variant='subtitle2'>Inspection Required before Delivery</Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default QualityItem
