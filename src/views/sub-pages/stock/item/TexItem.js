// ** React Imports
import React from 'react'

// MUI imports
import { Box, Typography, TextField, Button, Card } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const TexItem = () => {
  const columnsTax = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'ItemTaxTemplate', headerName: 'Item Tax Template', width: 150 },
    { field: 'TaxCategory', headerName: 'Default Tax Category', width: 200 },
    { field: 'ValidFrom', headerName: 'Valid From', width: 200 },
    { field: 'Minimum', headerName: 'Minimum Net Rate', width: 200 },
    { field: 'Maximum', headerName: 'Maximum Net Rate', width: 200 }
  ]

  const rowTax = [
    {
      id: 1,
      ItemTaxTemplate: 'Targaryen',
      TaxCategory: 'Daenerys',
      ValidFrom: 'daeams',
      Minimum: 'dasd',
      Maximum: 'sssss'
    }
  ]

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
        <Typography variant='subtitle2'>Taxes</Typography>
        <Typography variant='subtitle2'>Will also apply for variants</Typography>
        <Box sx={{ mt: 4 }}>
          <DataGrid rows={rowTax} columns={columnsTax} checkboxSelection disableRowSelectionOnClick />
        </Box>
      </Card>
    </Box>
  )
}

export default TexItem
