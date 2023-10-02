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
      <Card sx={styles.card}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6'>Type of Payment</Typography>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6} sx={styles.gridItem}>
                <Box sx={styles.box}>
                  <Typography>
                    Payment Type <span style={styles.redAsterisk}>*</span>
                  </Typography>
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

              <Grid item sm={12} md={6} sx={styles.gridItem}>
                <Box sx={styles.BoxStyle}>
                  <Typography sx={{ my: 2 }}>
                    Posting Date <span style={styles.redAsterisk}>*</span>
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                    <DatePicker
                      sx={styles.datepicker}
                      views={['day', 'month', 'year']}
                      value={dayjs(dataRow.posting_date)}
                      onChange={newValue => handleDateChange('posting_date', newValue)}
                    />
                  </LocalizationProvider>
                </Box>

                <Box sx={styles.box}>
                  <Typography>Mode of Payment</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={dataRow.mode_of_payment}
                    fullWidth
                    onChange={handleTextChange}
                    name='mode_of_payment'
                    disabled
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sm={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6'>Payment From / To</Typography>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6} sx={styles.gridItem}>
                <Box sx={styles.box}>
                  <Typography>Party</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    name='party'
                    value={dataRow.party}
                    fullWidth
                    onChange={handleTextChange}
                    disabled
                  />
                </Box>

                <Box sx={styles.box}>
                  <Typography>Party Name</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    name='party_name'
                    value={dataRow.party_name}
                    fullWidth
                    onChange={handleTextChange}
                  />
                </Box>
              </Grid>

              <Grid item sm={12} md={6} sx={styles.gridItem}>
                <Box sx={styles.box}>
                  <Typography>Contact</Typography>
                  <Box
                    sx={{
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      borderRadius: 1,
                      height: '3.5rem',
                      borderColor: 'grey.500',
                      p: 1,
                      bgcolor: 'grey.100'
                    }}
                    variant='outlined'
                    display='flex'
                    alignItems='center'
                    fullWidth
                    disabled
                  >
                    <Link href='#' underline='hover'>
                      {dataRow.contact_person && typeof dataRow.contact_person === 'string' ? (
                        <Link href='#' underline='hover' sx={{ pl: 2 }}>
                          {dataRow.contact_person.split('-').slice(1).join('-').trim()}
                        </Link>
                      ) : (
                        <span>{dataRow.contact_person}</span>
                      )}
                    </Link>
                  </Box>
                </Box>

                <Box sx={styles.box}>
                  <Typography>Email</Typography>
                  <TextField
                    sx={styles.textField}
                    disabled
                    variant='outlined'
                    name='contact_email'
                    value={dataRow.contact_email}
                    fullWidth
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Accounts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <Box sx={styles.BoxStyle}>
                <Typography sx={{ my: 2 }}>Party Balance</Typography>
                <TextField
                  multiline
                  fullWidth
                  name='party_balance'
                  value={dataRow.party_balance}
                  sx={styles.textField}
                />
              </Box>

              <Box sx={styles.box}>
                <Typography>
                  Account Paid From <span style={styles.redAsterisk}>*</span>
                </Typography>
                <TextField
                  sx={styles.textField}
                  variant='outlined'
                  name='paid_from'
                  value={dataRow.paid_from}
                  fullWidth
                  onChange={handleTextChange}
                  disabled
                />
              </Box>

              <Box sx={styles.box}>
                <Typography>
                  Account Currency (From) <span style={styles.redAsterisk}>*</span>
                </Typography>
                <TextField
                  sx={styles.textField}
                  variant='outlined'
                  name='paid_to_account_currency'
                  value={dataRow.paid_to_account_currency}
                  fullWidth
                  onChange={handleTextChange}
                  disabled
                />
              </Box>

              <Box sx={styles.box}>
                <Typography>
                  Account Balance (From) <span style={styles.redAsterisk}>*</span>
                </Typography>
                <TextField
                  sx={styles.textField}
                  variant='outlined'
                  name='paid_to_account_balance'
                  value={dataRow.paid_to_account_balance}
                  fullWidth
                  onChange={handleTextChange}
                  disabled
                />
              </Box>
            </Grid>

            <Grid item sm={12} md={6}>
              <Box sx={styles.box}>
                <Typography>
                  Account Paid To <span style={styles.redAsterisk}>*</span>
                </Typography>
                <TextField
                  sx={styles.textField}
                  variant='outlined'
                  name='paid_to'
                  value={dataRow.paid_to}
                  fullWidth
                  onChange={handleTextChange}
                  disabled
                />
              </Box>

              <Box sx={styles.box}>
                <Typography>
                  Account Currency (To) <span style={styles.redAsterisk}>*</span>
                </Typography>
                <TextField
                  sx={styles.textField}
                  variant='outlined'
                  name='paid_to_account_currency'
                  value={dataRow.paid_to_account_currency}
                  fullWidth
                  onChange={handleTextChange}
                  disabled
                />
              </Box>

              <Box sx={styles.box}>
                <Typography>Account Balance (To)</Typography>
                <TextField
                  sx={styles.textField}
                  variant='outlined'
                  name='paid_to_account_balance'
                  value={dataRow.paid_to_account_balance}
                  fullWidth
                  onChange={handleTextChange}
                  disabled
                />
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Card sx={styles.cardConnect}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6'>Amount</Typography>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6} sx={styles.gridItem}>
                <Box sx={styles.box}>
                  <Typography>
                    Paid Amount (THB) <span style={styles.redAsterisk}>*</span>
                  </Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    name='paid_amount'
                    value={dataRow.paid_amount}
                    fullWidth
                    onChange={handleTextChange}
                  />
                </Box>
              </Grid>

              <Grid item sm={12} md={6} sx={styles.gridItem}>
                <Box sx={styles.box}>
                  <Typography>
                    Received Amount (THB) <span style={styles.redAsterisk}>*</span>
                  </Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    name='received_amount'
                    value={dataRow.received_amount}
                    fullWidth
                    onChange={handleTextChange}
                    disabled
                  />
                </Box>
              </Grid>
            </Grid>
            <Divider />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant='h6'>Reference</Typography>
              <Button
                variant='outlined'
                sx={{
                  alignSelf: 'flex-start',
                  width: 'auto'
                }}
              >
                Get Outstanding Invoices
              </Button>
              <Button
                variant='outlined'
                sx={{
                  alignSelf: 'flex-start',
                  width: 'auto'
                }}
              >
                Get Outstanding Orders
              </Button>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant='subtitle2'>Payment References</Typography>
              <DataGrid
                sx={{ height: !dataRow.references || dataRow.references.length === 0 ? 300 : 'auto' }}
                rows={dataRow.references}
                columns={columnsPayment}
                getRowId={row => row.name}
                pageSize={5}
              />

              <Button variant='contained' sx={{ marginBlock: 2 }}>
                Add Row
              </Button>
            </Box>
            <Divider />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6'>Writeoff</Typography>

            <Grid container spacing={2}>
              <Grid item sm={12} md={6} sx={styles.gridItem}>
                <Box sx={styles.box}>
                  <Typography>Total Allocated Amount (THB)</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    name='total_allocated_amount'
                    value={dataRow.total_allocated_amount}
                    fullWidth
                    onChange={handleTextChange}
                    disabled
                  />
                </Box>
              </Grid>

              <Grid item sm={12} md={6} sx={styles.gridItem}>
                <Box sx={styles.box}>
                  <Typography>Unallocated Amount (THB)</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    name='unallocated_amount'
                    value={dataRow.unallocated_amount}
                    fullWidth
                    onChange={handleTextChange}
                  />
                </Box>

                <Box sx={styles.box}>
                  <Typography>Difference Amount (THB)</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    name='difference_amount'
                    value={dataRow.difference_amount}
                    fullWidth
                    onChange={handleTextChange}
                    disabled
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6'>Taxes and Charges</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <Box sx={styles.BoxStyle}>
                <Typography sx={{ my: 2 }}>Purchase Taxes and Charges Template</Typography>
                <TextField
                  multiline
                  fullWidth
                  name='purchase_taxes_and_charges_template'
                  value={dataRow.purchase_taxes_and_charges_template}
                  sx={styles.textField}
                />
              </Box>
            </Grid>

            <Grid item sm={12} md={6}>
              <Box sx={styles.box}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Boolean(dataRow.apply_tax_withholding_amount)}
                      name='apply_tax_withholding_amount'
                      onChange={handleCheckboxChange}
                    />
                  }
                  label='Apply Tax Withholding Amount'
                />
              </Box>

              {dataRow.apply_tax_withholding_amount === 1 && (
                <Box sx={styles.box}>
                  <Typography>
                    Tax Withholding Category <span style={styles.redAsterisk}>*</span>
                  </Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    name='tax_withholding_category'
                    value={dataRow.tax_withholding_category}
                    fullWidth
                    onChange={handleTextChange}
                    disabled
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Card sx={styles.cardConnect}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='subtitle1'>Advance Taxes and Charges</Typography>
            <DataGrid
              sx={{
                height:
                  !dataRow.advance_taxes_and_charges || dataRow.advance_taxes_and_charges.length === 0 ? 300 : 'auto'
              }}
              rows={dataRow.advance_taxes_and_charges || []}
              columns={columnsAdvanceTaxesAndCharges}
              getRowId={row => row.name}
              pageSize={5}
            />
            <Button variant='contained' sx={{ marginBlock: 2 }}>
              Add Row
            </Button>
          </Grid>

          <Grid item xs={12} md={6}></Grid>

          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography>Total Taxes and Charges (THB)</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                name='total_taxes_and_charges'
                value={dataRow.total_taxes_and_charges}
                fullWidth
                onChange={handleTextChange}
                disabled
              />
            </Box>
          </Grid>
        </Grid>
      </Card>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6'>Deductions or Loss</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid item sm={12}>
            <Typography variant='subtitle2'>Payment Deductions or Loss</Typography>
            <DataGrid
              sx={{ height: !dataRow.deductions || dataRow.deductions.length === 0 ? 300 : 'auto' }}
              rows={dataRow.deductions || []}
              columns={columnsDeductions}
              getRowId={row => row.name}
              pageSize={5}
            />
          </Grid>
          <Button variant='contained' sx={{ marginBlock: 2 }}>
            Add Row
          </Button>
        </AccordionDetails>
      </Accordion>

      <Card sx={styles.cardConnect}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6'>Transaction ID</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography>Cheque/Reference No</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                name='reference_no'
                value={dataRow.reference_no}
                fullWidth
                onChange={handleTextChange}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography>Cheque/Reference Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                <DatePicker
                  sx={styles.datepicker}
                  views={['day', 'month', 'year']}
                  value={dayjs(dataRow.reference_date)}
                  onChange={newValue => handleDateChange('reference_date', newValue)}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
        </Grid>
      </Card>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6'>Accounting Dimensions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <Box sx={styles.box}>
                <Typography>Project</Typography>
                <TextField
                  sx={styles.textField}
                  variant='outlined'
                  name='project'
                  value={dataRow.project}
                  fullWidth
                  onChange={handleTextChange}
                  disabled
                />
              </Box>
            </Grid>

            <Grid item sm={12} md={6}>
              <Box sx={styles.box}>
                <Typography>Cost Center</Typography>
                <TextField
                  sx={styles.textField}
                  variant='outlined'
                  name='cost_center'
                  value={dataRow.cost_center}
                  fullWidth
                  onChange={handleTextChange}
                  disabled
                />
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6'>More Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <Box sx={styles.box}>
                <Typography>Status</Typography>
                <TextField
                  sx={styles.textField}
                  variant='outlined'
                  name='status'
                  value={dataRow.status}
                  fullWidth
                  onChange={handleTextChange}
                  disabled
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
                <Typography>Print Heading</Typography>
                <TextField
                  sx={styles.textField}
                  variant='outlined'
                  name='print_heading'
                  value={dataRow.print_heading}
                  fullWidth
                  onChange={handleTextChange}
                  disabled
                />
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default PaymentEntry
