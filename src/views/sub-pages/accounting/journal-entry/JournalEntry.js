import React, { useEffect } from 'react'

// ** Mui Import
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// ** Mui X Date Picker
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/en-gb'
import { DataGrid } from '@mui/x-data-grid'

const ColumnAccountingEntries = [
  { field: 'idx', headerName: 'No', width: 100 },
  {
    field: 'account',
    headerName: 'Account',
    width: 200
  },
  {
    field: 'party_type',
    headerName: 'Party Type',
    width: 200
  },
  {
    field: 'party',
    headerName: 'Party',
    width: 200
  },
  {
    field: 'debit',
    headerName: 'Debit',
    width: 200
  },
  {
    field: 'credit',
    headerName: 'Credit',
    width: 200
  },
  {
    field: 'edit',
    headerName: 'Edit',
    width: 200,
    renderCell: params => (
      <Button variant='contained' color='primary'>
        Edit
      </Button>
    )
  }
]

const JournalEntry = ({ dataRow, handleUpdateData }) => {
  const styles = {
    card: {
      p: 2
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
    }
  }

  const handleCheckboxChange = event => {
    handleUpdateData(event.target.name, event.target.checked === true ? 1 : 0)
  }

  const handleTextChange = event => {
    handleUpdateData(event.target.name, event.target.value)
  }

  const handleDateChange = (name, date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD')
    handleUpdateData(name, formattedDate)
  }

  useEffect(() => {
    console.log('dataRow: ', dataRow)
  }, [dataRow])

  if (!dataRow) {
    return <Skeleton variant='rounded' width={210} height={60} />
  }

  return (
    <Box>
      <Card sx={styles.card}>
        <Grid container spacing={2} sx={{ m: 0, p: 0, display: 'flex', width: '100%' }}>
          <Grid item sm={12} md={6} sx={styles.gridItem}>
            <Box sx={styles.box}>
              <Typography>
                Entry Type <span style={styles.redAsterisk}>*</span>
              </Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='voucher_type'
                value={dataRow.voucher_type}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>
          </Grid>

          <Grid item sm md={6} sx={styles.gridItem}>
            <Box sx={styles.box}>
              <Typography>From Template</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name=''
                value={''}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>

            <Box sx={styles.box}>
              <Typography>
                Company <span style={styles.redAsterisk}>*</span>
              </Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='company'
                value={dataRow.company}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>

            <Box sx={styles.BoxStyle}>
              <Typography sx={{ my: 2 }}>
                Posting Date <span style={styles.redAsterisk}>*</span>
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                <DatePicker
                  sx={{ width: '100%' }}
                  views={['day', 'month', 'year']}
                  value={dayjs(dataRow.posting_date)}
                  onChange={newValue => handleDateChange('posting_date', newValue)}
                />
              </LocalizationProvider>
            </Box>
          </Grid>

          <Grid item xs>
            <Divider />
          </Grid>

          <Grid item xs={12} sx={styles.gridItem}>
            <Box sx={styles.box}>
              <Typography sx={{ mb: 2 }}>Accounting Entries</Typography>
              <DataGrid
                rows={dataRow.accounts}
                columns={ColumnAccountingEntries}
                getRowId={row => row.name}
                sx={{ height: 300 }}
                checkboxSelection
                disableSelectionOnClick
              />
              <Box sx={{ marginBlock: 2 }}>
                <Button variant='contained' color='primary' sx={{ mr: 2 }}>
                  Add Multiple
                </Button>
                <Button variant='contained' color='primary'>
                  Add Row
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item sm={12} md={6} sx={styles.gridItem}>
            <Box sx={styles.box}>
              <Typography>Reference Number</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                label='มีเงื่อนไข'
                name='cheque_no'
                value={dataRow.cheque_no}
                sx={(styles.textField, { bgcolor: 'red' })}
              />
            </Box>

            <Box sx={styles.BoxStyle}>
              <Typography sx={{ my: 2 }}>Reference Date </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                <DatePicker
                  disabled
                  sx={{ width: '100%', bgcolor: 'red' }}
                  views={['day', 'month', 'year']}
                  value={dayjs(dataRow.cheque_date)}
                  onChange={newValue => handleDateChange('cheque_date', newValue)}
                />
              </LocalizationProvider>
            </Box>

            <Box sx={styles.BoxStyle}>
              <Typography sx={{ my: 2 }}>User Remark</Typography>
              <TextField
                multiline
                rows={4}
                fullWidth
                name='user_remark'
                value={dataRow.user_remark}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>
          </Grid>

          <Grid item sm md={6} sx={styles.gridItem}>
            <Box sx={styles.BoxStyle}>
              <Typography sx={{ my: 2 }}>Total Debit</Typography>
              <TextField fullWidth name='total_debit' value={dataRow.total_debit} sx={styles.textField} />
            </Box>

            <Box sx={styles.BoxStyle}>
              <Typography sx={{ my: 2 }}>Total Credit</Typography>
              <TextField fullWidth name='total_credit' value={dataRow.total_credit} sx={styles.textField} />
            </Box>

            <Box sx={styles.box}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(dataRow.multi_currency)}
                    name='multi_currency'
                    onChange={handleCheckboxChange}
                  />
                }
                label='Multi Currency'
              />
            </Box>
          </Grid>
        </Grid>
      </Card>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Reference</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <Box sx={styles.BoxStyle}>
                <Typography sx={{ my: 2 }}>Remark</Typography>
                <TextField
                  multiline
                  fullWidth
                  name='remark'
                  value={dataRow && dataRow.remark ? dataRow.remark.replace(/\\n/g, '\n') : ''}
                  sx={styles.textField}
                />
              </Box>
            </Grid>

            <Grid item sm md={6}>
              <Box sx={styles.BoxStyle}>
                <Typography sx={{ my: 2 }}>Bill No</Typography>
                <TextField fullWidth name='bill_no' value={dataRow.bill_no} sx={styles.textField} />
              </Box>

              <Box sx={styles.BoxStyle}>
                <Typography sx={{ my: 2 }}>Bill Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                  <DatePicker
                    views={['day', 'month', 'year']}
                    value={dayjs(dataRow.bill_date)}
                    onChange={newValue => handleDateChange('bill_date', newValue)}
                  />
                </LocalizationProvider>
              </Box>

              <Box sx={styles.BoxStyle}>
                <Typography sx={{ my: 2 }}>Due Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                  <DatePicker
                    views={['day', 'month', 'year']}
                    value={dayjs(dataRow.due_date)}
                    onChange={newValue => handleDateChange('due_date', newValue)}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Printing Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <Box sx={styles.BoxStyle}>
                <Typography sx={{ my: 2 }}>Pay To / Recd From</Typography>
                <TextField fullWidth name='pay_to_recd_from' value={dataRow.pay_to_recd_from} sx={styles.textField} />
              </Box>
            </Grid>

            <Grid item sm md={6}>
              <Box sx={styles.BoxStyle}>
                <Typography sx={{ my: 2 }}>Letter Head</Typography>
                <TextField fullWidth name='letter_head' value={dataRow.letter_head} sx={styles.textField} />
              </Box>

              <Box sx={styles.BoxStyle}>
                <Typography sx={{ my: 2 }}>Print Heading</Typography>
                <TextField fullWidth name='print_heading' value={dataRow.print_heading} sx={styles.textField} />
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>More Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <Box sx={styles.BoxStyle}>
                <Typography sx={{ my: 2 }}>Mode of Payment</Typography>
                <TextField fullWidth name='mode_of_payment' value={dataRow.mode_of_payment} sx={styles.textField} />
              </Box>
            </Grid>

            <Grid item sm md={6}>
              <Box sx={styles.BoxStyle}>
                <Typography sx={{ my: 2 }}>Is Opening</Typography>
                <Select
                  fullWidth
                  name='is_opening'
                  value={dataRow.is_opening}
                  onChange={handleTextChange}
                  sx={{
                    backgroundColor: 'grey.100'
                  }}
                >
                  <MenuItem value={'No'}>NO</MenuItem>
                  <MenuItem value={'Yes'}>YES</MenuItem>
                </Select>
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default JournalEntry
