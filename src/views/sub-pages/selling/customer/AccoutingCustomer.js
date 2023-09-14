import React, { useEffect, useState } from 'react'
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
  Card,
  FormControlLabel
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import axios from 'axios'

const AccountingCustomer = ({ dataRow }) => {
  const [collapseInformation, setCollapseInformation] = useState()

  const columnsCredit = [
    { field: 'idx', headerName: 'No', width: 70 },
    { field: 'company', headerName: 'Company', width: 150 },
    { field: 'credit_limit', headerName: 'Credit Limit', width: 300 },
    {
      field: 'bypass_credit_limit_check',
      headerName: 'Bypass Credit Limit Check at Sales Order',
      width: 150,
      renderCell: (
        params //ทั้งหมดมี button edit
      ) => (
        <FormControlLabel
          sx={{ mt: 2 }}
          control={<Checkbox checked={Boolean(getDataAccount[0]?.bypass_credit_limit_check) || false} />}
          label='Preferred Billing Address'
        />
      )
    }
  ]

  const columnsAcount = [
    { field: 'idx', headerName: 'No', width: 70 },
    { field: 'company', headerName: 'Company', width: 150 },
    { field: 'account', headerName: 'Default Account', width: 300 }
  ]

  const [getDataAccount, setGetDataAccount] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}Customer/${dataRow.name}`, {
        headers: {
          Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
        }
      })
      .then(res => {
        setGetDataAccount(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [dataRow])

  if (Object.values(getDataAccount)?.length === 0) {
    return 'waiting...'
  }

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
            <TextField size='small' variant='filled' value={dataRow.payment_terms || ''} fullWidth />
          </Grid>
        </Grid>

        <Grid sx={{ mt: 10 }} item xs={12}>
          <Typography>Credit Limit</Typography>
          <DataGrid
            sx={{ height: '100%' }}
            rows={getDataAccount.credit_limits}
            columns={columnsCredit}
            getRowId={row => row.name}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }
              }
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </Grid>

        <Grid sx={{ mt: 15 }}>
          <Divider sx={{ margin: 0, my: 5, width: '100%', ml: 3 }} />
          <Typography variant='h6'>Default Accounts:</Typography>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 20 }}>
          <Grid item xs={12}>
            <Typography variant='subtitle1'>Accounts</Typography>
            <Typography variant='subtitle1'>Mention if non-standard Receivable account</Typography>
            <DataGrid
              rows={getDataAccount.accounts}
              columns={columnsAcount}
              getRowId={row => row.name}
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
                <TextField size='small' variant='filled' value={dataRow.loyalty_program || ''} fullWidth />
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </Card>
    </Box>
  )
}

export default AccountingCustomer
