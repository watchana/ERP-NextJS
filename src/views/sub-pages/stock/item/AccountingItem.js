// ** React Imports
import React from 'react'

// ** MUI Imports
import { Box, Button, Typography, Card, Skeleton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const columnsAcc = [
  { field: 'idx', headerName: 'No', width: 70 },
  { field: 'company', headerName: 'Company', width: 150 },
  { field: 'default_warehouse', headerName: 'Default Warehouse', width: 200 },
  { field: 'default_price_list', headerName: 'Default Price List', width: 200 }
]

const AccountingItem = ({ dataRow }) => {
  if (!dataRow) return <Skeleton variant='rounded' width={210} height={60} />

  const heightValue = dataRow?.item_defaults?.length === 0 || dataRow?.item_defaults === undefined ? 300 : 'auto'

  const styles = {
    dataGrid: {
      height: heightValue
    }
  }

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
        <Typography variant='subtitle2' sx={{ marginBottom: 2 }}>
          Item Defaults
        </Typography>
        <Box>
          <DataGrid
            sx={styles.dataGrid}
            rows={dataRow.item_defaults || []}
            columns={columnsAcc}
            getRowId={row => row.name} // ระบุ id โดยใช้ค่า name
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }
              }
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </Box>
        <Button variant='contained' sx={{ marginTop: 2 }}>
          Add Row
        </Button>
      </Card>
    </Box>
  )
}

export default AccountingItem
