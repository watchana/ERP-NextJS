// ** React Imports
import React from 'react'

// MUI imports
import { Box, Typography, Checkbox, Card, Grid } from '@mui/material'

const ManufacturingItem = ({ dataRow }) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  const handleCheckboxChange = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
  }

  return (
    <Box>
      <Card>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox {...label} checked={dataRow.include_item_in_manufacturing} onChange={handleCheckboxChange} />
            <Typography variant='subtitle1'>Include Item In Manufacturing</Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Checkbox {...label} checked={dataRow.is_sub_contracted_item} onChange={handleCheckboxChange} />
              <Typography variant='subtitle1'>Supply Raw Materials for Purchase</Typography>
            </Box>
            <Box sx={{ ml: 4 }}>
              <Typography variant='subtitle2'>If subcontracted to a vendor</Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default ManufacturingItem
