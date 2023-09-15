// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import { Box, Button, TextField, Typography, Card } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'

const AccountingItem = ({ dataRow }) => {
  const columnsAcc = [
    { field: 'idx', headerName: 'No', width: 70 },
    { field: 'company', headerName: 'Company', width: 150 },
    { field: 'default_warehouse', headerName: 'Default Warehouse', width: 200 },
    { field: 'default_price_list', headerName: 'Default Price List', width: 200 }
  ]

  const [dataItemAccouting, setDataItemAccouting] = useState('')

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}Item/${dataRow.name}`, {
        headers: {
          Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
        }
      })
      .then(res => {
        setDataItemAccouting(res.data.data)
      })
  }, [dataRow])

  if (dataItemAccouting.length === 0) {
    return 'waiting...'
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
            rows={dataRow.item_defaults}
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
      </Card>
    </Box>
  )
}

export default AccountingItem
