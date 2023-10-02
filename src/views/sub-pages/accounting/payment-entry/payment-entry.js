import React, { useState } from 'react'

// ** Mui imports
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
  Icon,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Skeleton,
  Link,
  InputLabel,
  Input,
  FormControlLabel
} = require('@mui/material')
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// ** Mui X Date Picker
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/en-gb'
import { DataGrid } from '@mui/x-data-grid'

const PaymentEntry = ({ dataRow, handleUpdateData }) => {
  const styles = {
    card: {
      p: 4
    },
    cardConnect: {
      p: 4,
      borderRadius: 0
    },
    textField: {
      bgcolor: 'grey.100'
    },
    textFieldDetail: {
      minHeight: '4rem'
    },
    box: {
      marginBlock: 2,
      mt: 4
    },
    redAsterisk: {
      color: 'red'
    },
    gridItem: {
      p: 1,
      width: '100%'
    },
    datepicker: {
      bgcolor: 'grey.100'
    }
  }

  const handleCheckboxChange = event => {
    handleUpdateData(event.target.name, event.target.checked === true ? 1 : 0)
  }

  const handleTextChange = event => {
    handleUpdateData(event.target.name, event.target.value)
  }

  const columnsPayment = [
    { field: 'idx', headerName: 'No', width: 150 },
    { field: 'reference_doctype', headerName: 'Type', width: 150 },
    { field: 'reference_name', headerName: 'Name', width: 300 },
    { field: 'total_amount', headerName: 'Grand Total (THB)', width: 150 },
    { field: 'outstanding_amount', headerName: 'Outstanding (THB)', width: 300 },
    { field: 'allocated_amount', headerName: 'Allocated (THB)', width: 300 },
    { field: 'edit', headerName: '', width: 100 }
  ]

  const columnsAdvanceTaxesAndCharges = [
    { field: 'idx', headerName: 'No', width: 150 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'account_head', headerName: 'Account Head', width: 300 },
    { field: 'rate', headerName: 'Rate', width: 150 },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 300
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 300
    }
  ]

  const columnsDeductions = [
    { field: 'idx', headerName: 'No', width: 150 },
    { field: 'account', headerName: 'Account', width: 150 },
    { field: 'cost_center', headerName: 'Cost Center', width: 300 },
    { field: 'amount', headerName: 'Amount (Company Currency)', width: 150 },
    { field: 'edit', headerName: '', width: 100 }
  ]

  if (!dataRow) {
    return <Skeleton variant='rounded' width={210} height={60} />
  }

  return (
    <Box>
      <Card sx={{ p: 4 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Type of Payment
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box sx={styles.box}>
              <Typography sx={{ margin: 1 }}>Payment Type</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                value={dataRow.payment_type}
                fullWidth
                onChange={handleTextChange}
                name='payment_type'
                disabled
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box sx={styles.box}>
              <Typography sx={{ margin: 1 }}>Posting Date</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                value={formattedDate}
                fullWidth
                onChange={handleTextChange}
                name='posting_date'
                disabled
              />
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ margin: 0 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box sx={styles.box}>
              <Typography sx={{ margin: 1 }}>Party</Typography>
              <TextField sx={styles.textField} variant='outlined' value={dataRow.party} fullWidth name='party' />
            </Box>

            <Box sx={styles.box}>
              <Typography sx={{ margin: 1 }}>Party Name</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                value={dataRow.party_name}
                fullWidth
                onChange={handleTextChange}
                name='party_name'
                disabled
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box sx={styles.box}>
              <Typography sx={{ margin: 1 }}>Contact</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                value={dataRow.contact_person}
                fullWidth
                onChange={handleTextChange}
                name='contact_person'
              />
            </Box>

            <Box sx={styles.box}>
              <Typography sx={{ margin: 1 }}>Email</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                value={dataRow.contact_email}
                fullWidth
                onChange={handleTextChange}
                name='contact_email'
                disabled
              />
            </Box>
          </Grid>
        </Grid>
      </Card>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 'bold', p: 0 }}> Accounts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider sx={{ margin: 0 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box sx={styles.box}>
                <Typography sx={{ margin: 1 }}>Party Balance</Typography>
                <TextField
                  sx={styles.textField}
                  variant='outlined'
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
              </Box>

              <Box sx={styles.box}>
                <Typography sx={{ margin: 1 }}>Account Paid From</Typography>
                <TextField
                  sx={styles.textField}
                  variant='outlined'
                  value={dataRow.paid_from}
                  fullWidth
                  name='paid_from'
                />
              </Box>

              <Box sx={styles.box}>
                <Typography sx={{ margin: 1 }}>Account Currency (From)</Typography>
                <TextField
                  sx={styles.textField}
                  variant='outlined'
                  value={dataRow.paid_from_account_currency}
                  onChange={handleTextChange}
                  fullWidth
                  name='paid_from_account_currency'
                  disabled
                />
              </Box>

              <Box sx={styles.box}>
                <Typography sx={{ margin: 1 }}>Account Balance (From)</Typography>
                <TextField
                  sx={styles.textField}
                  variant='outlined'
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
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box sx={styles.box}>
                <Typography sx={{ margin: 1 }}>Account Paid To</Typography>
                <TextField sx={styles.textField} variant='outlined' value={dataRow.paid_to} fullWidth name='paid_to' />
              </Box>

              <Box sx={styles.box}>
                <Typography sx={{ margin: 1 }}>Account Currency (To)</Typography>
                <TextField
                  sx={styles.textField}
                  variant='outlined'
                  value={dataRow.paid_to_account_currency}
                  fullWidth
                  name='paid_to_account_currency'
                />
              </Box>

              <Box sx={styles.box}>
                <Typography sx={{ margin: 1 }}>Account Balance (To)</Typography>
                <TextField
                  sx={styles.textField}
                  variant='outlined'
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
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography sx={{ margin: 1 }} variant='h6'>
            Amount
          </Typography>

          <Box sx={styles.box}>
            <Typography sx={{ margin: 1 }}>Paid Amount (THB)</Typography>
            <TextField
              sx={styles.textField}
              variant='outlined'
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
          </Box>
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
          <Box sx={styles.box}>
            <Typography sx={{ margin: 1 }}>Total Allocated Amount (THB)</Typography>
            <TextField
              sx={styles.textField}
              variant='outlined'
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
          </Box>

          <Box sx={styles.box}>
            <Typography sx={{ margin: 1 }}>Difference Amount (THB)</Typography>
            <TextField
              sx={styles.textField}
              variant='outlined'
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
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={styles.box}>
            <Typography sx={{ margin: 1 }}>Unallocated Amount (THB)</Typography>
            <TextField
              sx={styles.textField}
              variant='outlined'
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
          </Box>

          <Box sx={styles.box}>
            <Typography sx={{ margin: 1 }}>Total Taxes and Charges (THB)</Typography>
            <TextField
              sx={styles.textField}
              variant='outlined'
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
          </Box>
        </Grid>
      </Grid>
      <Typography sx={{ margin: 1, mt: 10 }} variant='h6'>
        Transaction ID
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={styles.box}>
            <Typography sx={{ margin: 1 }}>Cheque/Reference Date</Typography>
            <TextField
              sx={styles.textField}
              variant='outlined'
              value={formattedDateRefer}
              onChange={handleTextChange}
              fullWidth
              name='reference_date'
              disabled
            />
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ my: 6 }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 'bold', p: 0 }}> More Infomation</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Divider sx={{ margin: 0 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Typography sx={{ margin: 1 }}>Status</Typography>
                <TextField
                  sx={styles.textField}
                  variant='outlined'
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
                    onChange={handleCheckboxChange}
                    disabled
                  />
                  <Typography variant='subtitle2'>Is Subcontracted</Typography>
                </Grid>

                <Typography sx={{ margin: 1 }}>Status</Typography>
                <TextField
                  sx={styles.textField}
                  variant='outlined'
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
          </AccordionDetails>
        </Accordion>
      </Box>

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
                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Type</Typography>
                    <TextField
                      variant='outlined'
                      value={getPayment.reference_doctype}
                      fullWidth
                      name='reference_doctype'
                      sx={styles.textField}
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(dataRow.custom_remarks)}
                          name='custom_remarks'
                          onChange={handleCheckboxChange}
                        />
                      }
                      label='Custom Remarks'
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography>Remarks</Typography>
                    <TextField
                      sx={styles.textField}
                      multiline
                      rows={2}
                      variant='outlined'
                      name='remarks'
                      value={dataRow && dataRow.remarks ? dataRow.remarks.replace(/\\n/g, '\n') : ''}
                      fullWidth
                      onChange={handleTextChange}
                      disabled
                    />
                  </Box>
                </Grid>

                <Grid item sm={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography>Letter Head</Typography>
                    <TextField
                      sx={styles.textField}
                      variant='outlined'
                      name='letter_head'
                      value={dataRow.letter_head}
                      fullWidth
                      onChange={handleTextChange}
                      disabled
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Account</Typography>
                    <TextField
                      variant='outlined'
                      value={getPayment.account}
                      fullWidth
                      name='account'
                      sx={styles.textField}
                    />
                  </Box>
                </Grid>
              </Grid>
              <DialogActions>
                <Button onClick={handleClose}>Insert Below</Button>
              </DialogActions>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Grid>
    </Box>
  )
}

export default PaymentEntry
