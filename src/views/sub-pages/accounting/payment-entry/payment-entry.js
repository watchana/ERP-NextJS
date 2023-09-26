import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { ChevronDown, ChevronUp } from 'mdi-material-ui'
import { useEffect, useState } from 'react'

const {
  Grid,
  Card,
  Typography,
  TextField,
  Divider,
  Box,
  Button,
  CardActions,
  IconButton,
  Collapse,
  Checkbox,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Icon
} = require('@mui/material')

import { mdiKeyboardOutline } from '@mdi/js'

const PaymentEntry = ({ dataRow, setDataRow }) => {
  const [collapseAccount, setCollapseAccount] = useState(false)
  const [getDataPayment, setGetDataPayment] = useState([])
  const [getPayment, setGetPayment] = useState([])
  const [collapseMoreInfo, setCollapseMoreInfo] = useState(false)
  const [open, setOpen] = useState(false)

  const handleCollapseAccount = () => {
    setCollapseAccount(!collapseAccount)
  }

  const handleCollapseMoreInfo = () => {
    setCollapseMoreInfo(!collapseMoreInfo)
  }

  const checkboxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }

  const handleTextChange = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setDataRow({ ...dataRow, [event.target.name]: event.target.value })
  }

  const handleCheckbox = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
    setDataRow({ ...dataRow, [event.target.name]: event.target.checked === true ? 1 : 0 })
  }

  const columnsPayment = [
    { field: 'idx', headerName: 'No', width: 150 },
    { field: 'reference_doctype', headerName: 'Type', width: 150 },
    { field: 'reference_name', headerName: 'Name', width: 300 },
    { field: 'total_amount', headerName: 'Grand Total (THB)', width: 150 },
    { field: 'outstanding_amount', headerName: 'Outstanding (THB)', width: 300 },
    { field: 'allocated_amount', headerName: 'Allocated (THB)', width: 300 }
  ]

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}Payment Entry/${dataRow.name}`, {
        headers: {
          Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
        }
      })
      .then(res => {
        setGetDataPayment(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [dataRow])

  if (Object.values(getDataPayment)?.length === 0) {
    return 'waiting...'
  }

  const handleRowClick = params => {
    setOpen(true)
    setGetPayment(params.row)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function formatDate(dateString) {
    const dateObject = new Date(dateString)
    const day = dateObject.getDate().toString().padStart(2, '0')
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0')
    const year = dateObject.getFullYear()

    return `${day}-${month}-${year}`
  }
  const formattedDate = formatDate(dataRow.posting_date)
  const formattedDateRefer = formatDate(dataRow.reference_date)
  const formattedDueData = formatDate(getPayment.due_date)

  function formatTime(timeString) {
    const timeParts = timeString.split(':')
    const hours = timeParts[0]
    const minutes = timeParts[1]
    const formattedTime = `${hours}:${minutes}`

    return formattedTime
  }
  const formattedTime = formatTime(dataRow?.posting_time || '')

  function formatCurrency(params) {
    const formattedValue = new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2
    }).format(params.value)

    return formattedValue
  }

  return (
    <Card sx={{ p: 4 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        Type of Payment
      </Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography sx={{ margin: 1 }}>Payment Type</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.payment_type}
            fullWidth
            onChange={handleTextChange}
            name='payment_type'
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography sx={{ margin: 1 }}>Posting Date</Typography>
          <TextField
            size='small'
            variant='filled'
            value={formattedDate}
            fullWidth
            onChange={handleTextChange}
            name='posting_date'
            disabled
          />
        </Grid>
      </Grid>
      <Divider sx={{ margin: 0 }} />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography sx={{ margin: 1 }}>Party</Typography>
          <TextField size='small' variant='filled' value={dataRow.party} fullWidth name='party' />

          <Typography sx={{ margin: 1 }}>Party Name</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.party_name}
            fullWidth
            onChange={handleTextChange}
            name='party_name'
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography sx={{ margin: 1 }}>Contact</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.contact_person}
            fullWidth
            onChange={handleTextChange}
            name='contact_person'
          />

          <Typography sx={{ margin: 1 }}>Email</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.contact_email}
            fullWidth
            onChange={handleTextChange}
            name='contact_email'
            disabled
          />
        </Grid>
      </Grid>
      <Grid>
        <Box sx={{ display: 'flex', my: 6 }}>
          <Button size='small' variant='filled' label='' onClick={handleCollapseAccount} sx={{ fontWeight: 'bold' }}>
            Accounts
          </Button>
          <Box>
            <IconButton size='small' onClick={handleCollapseAccount}>
              {collapseAccount ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </IconButton>
          </Box>
        </Box>

        <Collapse in={collapseAccount}>
          <Divider sx={{ margin: 0 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography sx={{ margin: 1 }}>Party Balance</Typography>
              <TextField
                size='small'
                variant='filled'
                value={
                  dataRow?.party_balance === '0.0'
                    ? '฿0.0'
                    : dataRow?.party_balance.toLocaleString('en-US', {
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
                onChange={handleTextChange}
                fullWidth
                disabled
                name='party_balance'
              />

              <Typography sx={{ margin: 1 }}>Account Paid From</Typography>
              <TextField size='small' variant='filled' value={dataRow.paid_from} fullWidth name='paid_from' />

              <Typography sx={{ margin: 1 }}>Account Currency (From)</Typography>
              <TextField
                size='small'
                variant='filled'
                value={dataRow.paid_from_account_currency}
                onChange={handleTextChange}
                fullWidth
                name='paid_from_account_currency'
                disabled
              />

              <Typography sx={{ margin: 1 }}>Account Balance (From)</Typography>
              <TextField
                size='small'
                variant='filled'
                value={
                  dataRow?.paid_from_account_balance === '0.0'
                    ? '฿0.0'
                    : dataRow?.paid_from_account_balance.toLocaleString('en-US', {
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
                onChange={handleTextChange}
                fullWidth
                name='paid_from_account_balance'
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography sx={{ margin: 1 }}>Account Paid To</Typography>
              <TextField size='small' variant='filled' value={dataRow.paid_to} fullWidth name='paid_to' />

              <Typography sx={{ margin: 1 }}>Account Currency (To)</Typography>
              <TextField
                size='small'
                variant='filled'
                value={dataRow.paid_to_account_currency}
                fullWidth
                name='paid_to_account_currency'
              />

              <Typography sx={{ margin: 1 }}>Account Balance (To)</Typography>
              <TextField
                size='small'
                variant='filled'
                value={
                  dataRow?.paid_to_account_balance === '0.0'
                    ? '฿0.0'
                    : dataRow?.paid_to_account_balance.toLocaleString('en-US', {
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
                onChange={handleTextChange}
                fullWidth
                name='paid_to_account_balance'
                disabled
              />
            </Grid>
          </Grid>
        </Collapse>
        <Divider sx={{ margin: 0, my: 6 }} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography sx={{ margin: 1 }} variant='h6'>
              Amount
            </Typography>

            <Typography sx={{ margin: 1 }}>Paid Amount (THB)</Typography>
            <TextField
              size='small'
              variant='filled'
              value={
                dataRow?.total_allocated_amount === '0.0'
                  ? '฿0.0'
                  : dataRow?.total_allocated_amount.toLocaleString('en-US', {
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
              onChange={handleTextChange}
              fullWidth
              name='paid_amount'
              disabled
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography sx={{ margin: 1, my: 6 }} variant='h6'>
              Reference
            </Typography>

            <Typography variant='subtitle2'>Payment References</Typography>
            <DataGrid
              rows={getDataPayment.references}
              columns={columnsPayment}
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
        <Typography sx={{ margin: 1, mt: 30 }} variant='h6'>
          Writeoff
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ margin: 1 }}>Total Allocated Amount (THB)</Typography>
            <TextField
              size='small'
              variant='filled'
              value={
                dataRow?.total_allocated_amount === '0.0'
                  ? '฿0.0'
                  : dataRow?.total_allocated_amount.toLocaleString('en-US', {
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
              onChange={handleTextChange}
              fullWidth
              name='total_allocated_amount'
              disabled
            />

            <Typography sx={{ margin: 1 }}>Difference Amount (THB)</Typography>
            <TextField
              size='small'
              variant='filled'
              value={
                dataRow?.difference_amount === '0.0'
                  ? '฿0.0'
                  : dataRow?.difference_amount.toLocaleString('en-US', {
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
              onChange={handleTextChange}
              fullWidth
              name='difference_amount'
              disabled
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography sx={{ margin: 1 }}>Unallocated Amount (THB)</Typography>
            <TextField
              size='small'
              variant='filled'
              value={
                dataRow?.difference_amount === '0.0'
                  ? '฿0.0'
                  : dataRow?.difference_amount.toLocaleString('en-US', {
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
              onChange={handleTextChange}
              fullWidth
              name='unallocated_amount'
              disabled
            />

            <Typography sx={{ margin: 1 }}>Total Taxes and Charges (THB)</Typography>
            <TextField
              size='small'
              variant='filled'
              value={
                dataRow?.total_taxes_and_charges === '0.0'
                  ? '฿0.0'
                  : dataRow?.total_taxes_and_charges.toLocaleString('en-US', {
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
              onChange={handleTextChange}
              fullWidth
              name='total_taxes_and_charges'
              disabled
            />
          </Grid>
        </Grid>
        <Typography sx={{ margin: 1, mt: 10 }} variant='h6'>
          Transaction ID
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography sx={{ margin: 1 }}>Cheque/Reference Date</Typography>
            <TextField
              size='small'
              variant='filled'
              value={formattedDateRefer}
              onChange={handleTextChange}
              fullWidth
              name='reference_date'
              disabled
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', my: 6 }}>
          <Button size='small' variant='filled' label='' onClick={handleCollapseMoreInfo} sx={{ fontWeight: 'bold' }}>
            More Information
          </Button>
          <Box>
            <IconButton size='small' onClick={handleCollapseMoreInfo}>
              {collapseMoreInfo ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </IconButton>
          </Box>
        </Box>

        <Collapse in={collapseMoreInfo}>
          <Divider sx={{ margin: 0 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Typography sx={{ margin: 1 }}>Status</Typography>
              <TextField
                size='small'
                variant='filled'
                value={dataRow.status}
                onChange={handleTextChange}
                fullWidth
                disabled
                name='status'
              />

              <Grid sx={checkboxStyle}>
                <Checkbox
                  checked={dataRow.custom_remarks === 1 ? true : false}
                  name='custom_remarks'
                  onChange={handleCheckbox}
                  disabled
                />
                <Typography variant='subtitle2'>Is Subcontracted</Typography>
              </Grid>

              <Typography sx={{ margin: 1 }}>Status</Typography>
              <TextField
                size='small'
                variant='filled'
                value={dataRow.remarks}
                onChange={handleTextChange}
                fullWidth
                disabled
                multiline
                rows={3}
                name='remarks'
              />
            </Grid>
          </Grid>
        </Collapse>
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
            {getPayment.idx}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              <Grid container spacing={3} sx={{ mt: 6 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant='subtitle1'>Type</Typography>
                  <TextField
                    size='small'
                    variant='filled'
                    value={getPayment.reference_doctype}
                    fullWidth
                    name='reference_doctype'
                    sx={{ mb: 4 }}
                  />

                  <Typography variant='subtitle1'>Name</Typography>
                  <TextField
                    size='small'
                    variant='filled'
                    value={getPayment.reference_name}
                    fullWidth
                    name='reference_name'
                    sx={{ mb: 4 }}
                  />

                  <Typography variant='subtitle1'>Due Date</Typography>
                  <TextField
                    size='small'
                    variant='filled'
                    value={formattedDueData}
                    fullWidth
                    name='due_date'
                    sx={{ mb: 4 }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant='subtitle1'>Grand Total (THB)</Typography>
                  <TextField
                    size='small'
                    variant='filled'
                    value={getPayment.total_amount}
                    fullWidth
                    name='total_amount'
                    disabled
                    sx={{ mb: 4 }}
                  />

                  <Typography variant='subtitle1'>Outstanding (THB)</Typography>
                  <TextField
                    size='small'
                    variant='filled'
                    value={getPayment.outstanding_amount}
                    fullWidth
                    name='outstanding_amount'
                    disabled
                    sx={{ mb: 4 }}
                  />

                  <Typography variant='subtitle1'>Allocated</Typography>
                  <TextField
                    size='small'
                    variant='filled'
                    value={getPayment.allocated_amount}
                    fullWidth
                    name='allocated_amount'
                    sx={{ mb: 4 }}
                    disabled
                  />

                  <Typography variant='subtitle1'>Account</Typography>
                  <TextField
                    size='small'
                    variant='filled'
                    value={getPayment.account}
                    fullWidth
                    name='account'
                    sx={{ mb: 4 }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3} sx={{ display: 'flex' }}>
                <Grid item xs={12} sx={{ mt: 4, display: 'flex', width: '100%' }}>
                  <Icon path={mdiKeyboardOutline} size={1} />
                  <Typography>Shortcuts:</Typography>
                  <Button sx={{ width: 200, bgcolor: '#e0e0e0', ml: 2, height: 30 }}>
                    <Typography variant='subtitle2'>Ctrl + Up</Typography>
                  </Button>

                  <Button sx={{ width: 200, bgcolor: '#e0e0e0', ml: 2, height: 30 }}>
                    <Typography variant='subtitle2'>Ctrl + Down</Typography>
                  </Button>

                  <Button sx={{ width: 200, bgcolor: '#e0e0e0', ml: 2, height: 30 }}>
                    <Typography variant='subtitle2'>ESC</Typography>
                  </Button>

                  <Button sx={{ width: 200, bgcolor: '#e0e0e0', ml: 100, height: 30 }}>
                    <Typography variant='subtitle2'>Insert Below</Typography>
                  </Button>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Grid>
    </Card>
  )
}

export default PaymentEntry
