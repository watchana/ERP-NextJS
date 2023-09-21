// ** React Imports
import React from 'react'

// MUI imports
import { Box, Typography, Button, Card, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const columnsTax = [
  { field: 'id', headerName: 'No', width: 70 },
  { field: 'ItemTaxTemplate', headerName: 'Item Tax Template', width: 150 },
  { field: 'TaxCategory', headerName: 'Default Tax Category', width: 200 },
  { field: 'ValidFrom', headerName: 'Valid From', width: 200 },
  { field: 'Minimum', headerName: 'Minimum Net Rate', width: 200 },
  { field: 'Maximum', headerName: 'Maximum Net Rate', width: 200 }
]

const TexItem = ({ dataRow }) => {
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
        <Grid container spacing={2} rowSpacing={2}>
          <Grid item xs>
            <Typography variant='subtitle2'>Taxes</Typography>
            <Typography variant='subtitle2'>Will also apply for variants</Typography>
            <Box>
              <DataGrid
                style={{ height: dataRow.taxes.length === 0 ? 300 : 'auto' }}
                rows={dataRow.taxes}
                columns={columnsTax}
                getRowId={row => row.id}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 }
                  }
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ p: 0 }}>
            <Button variant='contained' sx={{ mt: 2 }}>
              Add Row
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default TexItem
