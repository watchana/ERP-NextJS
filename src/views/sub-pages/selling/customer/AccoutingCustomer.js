import React, { useState } from 'react'
import {
  Box,
  TextField,
  Typography,
  Checkbox,
  Button,
  CardActions,
  IconButton,
  Collapse,
  Divider,
  CardContent,
  Grid,
  Card
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const AccountingCustomer = ({ dataRow }) => {
  const [collapseInformation, setCollapseInformation] = useState()

  const columns = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'Company', headerName: 'Company', width: 150 },
    { field: 'CreditLimit', headerName: 'Credit Limit', width: 300 },
    {
      field: 'Bypass',
      headerName: 'Bypass Credit Limit Check at Sales Or',
      width: 300
    }
  ]

  const rows = [
    { id: 1, Company: 'Sidw', CreditLimit: 'Jon', Bypass: 'dasd' },
    { id: 2, Company: 'Lannister', CreditLimit: 'Cersei', Bypass: 'dasd' }
  ]

  const handleClickInformation = () => {
    setCollapseInformation(!collapseInformation)
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{ marginBottom: 2 }}>Default Payment Terms Template</Typography>
            <TextField size='small' variant='filled' value={dataRow.payment_terms} fullWidth />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 5 }}>
          <Grid item sx={12} md={12} lg={12}>
            <Typography>Credit Limit</Typography>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 }
                }
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </Grid>
        </Grid>

        <Grid sx={{ mt: 15 }}>
          <Divider sx={{ margin: 0, my: 5, width: '100%', ml: 3 }} />
          <Typography variant='h6'>Default Accounts:</Typography>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 20 }}>
          <Grid item sm={12} md={12} lg={12}>
            <Typography variant='subtitle1'>Accounts</Typography>
            <Typography variant='subtitle1'>Mention if non-standard Receivable account</Typography>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 }
                }
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </Grid>
        </Grid>
        <Divider sx={{ margin: 0, my: 5, width: '100%', ml: 3 }} />
        <Grid container sx={{ mb: 5 }}>
          <Grid item sx={{ width: '100%' }}>
            <Button size='small' variant='filled' onClick={handleClickInformation}>
              More Infomation
            </Button>

            <IconButton size='small' onClick={handleClickInformation}>
              {collapseInformation ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </IconButton>
          </Grid>
        </Grid>
        <Grid container>
          <Collapse in={collapseInformation} width={'100%'} style={{ width: '100%' }}>
            <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
              <Grid item xs={12}>
                <Typography sx={{ marginBottom: 2 }}>Loyalty Program</Typography>
                <TextField size='small' variant='filled' value={dataRow.loyalty_program} fullWidth />
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </Card>
    </Box>
  )
}

export default AccountingCustomer
