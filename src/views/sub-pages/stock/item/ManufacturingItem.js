// ** React Imports
import React, { useEffect, useState } from 'react'

// MUI imports
import { Box, Typography, Checkbox, Card, Grid, TextField } from '@mui/material'

const ManufacturingItem = ({ dataRow, setDataRow = { setDataRow } }) => {
  const handleCheckboxChange = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)

    setDataRow({ ...dataRow, [event.target.name]: event.target.checked === true ? 1 : 0 })
  }

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
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={dataRow.include_item_in_manufacturing === 1 ? true : false}
              name='include_item_in_manufacturing'
              onChange={handleCheckboxChange}
            />
            <Typography variant='subtitle1'>Include Item In Manufacturing</Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Checkbox
                name='is_sub_contracted_item'
                checked={dataRow.is_sub_contracted_item === 1 ? true : false}
                onChange={handleCheckboxChange}
              />
              <Typography variant='subtitle1'>Supply Raw Materials for Purchase</Typography>
            </Box>
            <Box sx={{ ml: 4 }}>
              <Typography variant='subtitle2'>If subcontracted to a vendor</Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ marginBottom: 2 }}>Deferred Expense Account</Typography>
          <TextField fullWidth size='small' variant='filled' value={dataRow.default_bom || ''} />
        </Grid>
      </Card>
    </Box>
  )
}

export default ManufacturingItem
