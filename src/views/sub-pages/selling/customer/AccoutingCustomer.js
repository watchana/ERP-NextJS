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
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import axios from 'axios'

const AccountingCustomer = ({ dataRow, setDataRow, handleUpdateData }) => {
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

  const handleTextChange = event => {
    handleUpdateData(event.target.name, event.target.value)
  }

  const styles = {
    card: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      p: 2
    },
    textField: {
      bgcolor: 'grey.100'
    },
    box: {
      marginBlock: 2,
      mt: 4
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={styles.box}>
              <Typography sx={{ marginBottom: 2 }}>Default Payment Terms Template</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                value={dataRow.payment_terms || ''}
                fullWidth
                onChange={handleTextChange}
                name='payment_terms'
              />
            </Box>
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
          <Typography sx={{ fontWeight: 'bold' }}>Default Accounts:</Typography>
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
      </Card>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 'bold', p: 0 }}> More Infomation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} style={{ width: '100%' }}>
            <Grid item xs={12}>
              <Typography sx={{ marginBottom: 2 }}>Loyalty Program</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                value={dataRow.loyalty_program || ''}
                fullWidth
                onChange={handleTextChange}
                name='loyalty_program'
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default AccountingCustomer
