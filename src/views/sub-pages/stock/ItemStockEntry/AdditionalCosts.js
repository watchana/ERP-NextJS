import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Card,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'

const AdditionalCosts = ({ dataRow, setDataRow }) => {
  const [getAdditionalCost, setGetAdditionalCost] = useState([])
  const [open, setOpen] = useState(false)
  const [getDataAddions, setGetDataAddions] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}Stock Entry/${dataRow.name}`, {
        headers: {
          Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
        }
      })
      .then(res => {
        setGetAdditionalCost(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [dataRow])

  if (Object.values(getAdditionalCost)?.length === 0) {
    return 'waiting...'
  }

  const handleRowClick = params => {
    setGetDataAddions(params.row)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleTextChange = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setDataRow({ ...dataRow, [event.target.name]: event.target.value })
  }

  const handleTextChangeAddition = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setGetDataAddions({ ...getDataAddions, [event.target.name]: event.target.value })
  }

  const columns = [
    { field: 'idx', headerName: 'No', width: 120 },
    { field: 'expense_account', headerName: 'Expense Account', width: 100 },
    {
      field: 'description',
      headerName: 'DDescription',
      width: 120
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 170
    },
    { field: 'payment_amount', headerName: 'Payment Amount (THB)', width: 150 }
  ]

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
    <Card sx={{ p: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DataGrid
            rows={getAdditionalCost.additional_costs}
            columns={columns}
            getRowId={row => row.name}
            onRowClick={handleRowClick}
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
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box sx={styles.box}>
            <Typography sx={{ margin: 1 }}>Total Additional Costs</Typography>
            <TextField
              variant='outlined'
              sx={styles.textField}
              value={
                dataRow?.total_additional_costs === '0.0'
                  ? '฿0.0'
                  : dataRow?.total_additional_costs.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Typography>฿</Typography>
                  </InputAdornment>
                )
              }}
              name='total_additional_costs'
              onChange={handleTextChange}
              fullWidth
              disabled
            />
          </Box>
        </Grid>
      </Grid>
      <Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          maxWidth={'lg'}
          fullScreen
          PaperProps={{
            style: {
              width: '60%',
              height: '60%',
              margin: 0,
              maxWidth: 'none',
              maxHeight: 'none'
            }
          }}
        >
          <DialogTitle id='Editing Row #1'>
            {'Editing Row #'}
            {getDataAddions.idx}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              <Grid container spacing={3} sx={{ mt: 6 }}>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Expense Account</Typography>
                    <TextField
                      variant='outlined'
                      value={getDataAddions.expense_account}
                      fullWidth
                      name='expense_account'
                      sx={styles.textField}
                      disabled
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Account Currency</Typography>
                    <TextField
                      variant='outlined'
                      value={getDataAddions.account_currency}
                      fullWidth
                      name='account_currency'
                      sx={styles.textField}
                      disabled
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Exchange Rate</Typography>
                    <TextField
                      variant='outlined'
                      value={getDataAddions.exchange_rate}
                      fullWidth
                      name='exchange_rate'
                      sx={styles.textField}
                      disabled
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Description</Typography>
                    <TextField
                      variant='outlined'
                      value={getDataAddions.description}
                      fullWidth
                      name='description'
                      sx={styles.textField}
                      disabled
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Amount</Typography>
                    <TextField
                      variant='outlined'
                      value={getDataAddions.amount}
                      fullWidth
                      name='amount'
                      sx={styles.textField}
                      disabled
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Amount (Company Currency)</Typography>
                    <TextField
                      variant='outlined'
                      value={getDataAddions.base_amount}
                      fullWidth
                      name='base_amount'
                      sx={styles.textField}
                      disabled
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}></Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'right'
                  }}
                >
                  <Button onClick={() => handleClose()}>Inset Below</Button>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Grid>
    </Card>
  )
}

export default AdditionalCosts
