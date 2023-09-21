// ** React Imports
import React, { useEffect, useState } from 'react'

// MUI imports
import { Box, Typography, Checkbox, Card, Grid, TextField, Skeleton } from '@mui/material'

const ManufacturingItem = ({ dataRow, handleUpdateData }) => {
  const handleCheckboxChange = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)

    handleUpdateData(event.target.name, event.target.checked === true ? 1 : 0)
  }

  if (!dataRow) return <Skeleton variant='rounded' width={210} height={60} />

  return (
    <Box>
      <Card
        sx={{
          borderTopLeftRadius: 0, // กำหนด borderRadius สำหรับมุมบนซ้าย
          borderTopRightRadius: 0, // กำหนด borderRadius สำหรับมุมบนขวา
          p: 2,
          mb: 2,
          width: '100%'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', alignContent: 'flex-start' }}>
            <Checkbox
              checked={dataRow.include_item_in_manufacturing === 1 ? true : false}
              name='include_item_in_manufacturing'
              onChange={handleCheckboxChange}
            />
            <Typography variant='subtitle1'>Include Item In Manufacturing</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', alignContent: 'flex-start' }}>
            <Checkbox
              checked={dataRow.published_in_website === 1 ? true : false}
              name='published_in_website'
              onChange={handleCheckboxChange}
            />
            <Typography variant='subtitle1'>Published in Website</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                name='is_sub_contracted_item'
                checked={dataRow.is_sub_contracted_item === 1 ? true : false}
                onChange={handleCheckboxChange}
              />
              <Typography variant='subtitle1'>Supply Raw Materials for Purchase</Typography>
            </Box>
            <Typography variant='subtitle2' sx={{ ml: 4 }}>
              If subcontracted to a vendor
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography sx={{ marginBottom: 2 }}>Default BOM</Typography>
            <TextField fullWidth size='small' variant='filled' value={dataRow.default_bom || ''} />
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default ManufacturingItem
