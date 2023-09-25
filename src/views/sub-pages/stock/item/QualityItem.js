// React Imports
import React from 'react'

// MUI Imports
import { Box, Typography, Checkbox, TextField, Card, Grid } from '@mui/material'

const QualityItem = ({ dataRow, handleUpdateData }) => {
  const handleCheckboxChange = event => {
    handleUpdateData(event.target.name, event.target.checked === true ? 1 : 0)
  }

  const handleTextChange = event => {
    handleUpdateData(event.target.name, event.target.value)
  }

  return (
    <Box>
      <Card>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={Boolean(dataRow.inspection_required_before_purchase)}
              name='inspection_required_before_purchase'
              onChange={handleCheckboxChange}
            />
            <Typography variant='subtitle2'>Inspection Required before Purchase</Typography>
          </Grid>
          <Grid item xs={12} sx={{ mx: 3 }}>
            <Typography variant='subtitle2'>Quality Inspection Template</Typography>
            <TextField
              fullWidth
              disabled
              variant='outlined'
              name='quality_inspection_template'
              value={dataRow.quality_inspection_template}
              onChange={handleTextChange}
              sx={{
                backgroundColor: 'grey.100'
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={Boolean(dataRow.inspection_required_before_delivery)}
              name='inspection_required_before_delivery'
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
