// ** React Import
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

// ** Mui Import
import {
  Grid,
  Typography,
  Box,
  Button,
  TextField,
  IconButton,
  Collapse,
  Divider,
  FormControlLabel,
  Checkbox,
  Card,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  Select,
  MenuItem
} from '@mui/material'

import EventIcon from '@mui/icons-material/Event'
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import Btn from 'src/components/Button/Button'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import axios from 'axios'
import { DataGrid, GridExpandMoreIcon } from '@mui/x-data-grid'
import { IsOpeningEntry } from 'src/dummy/sub-pages/accounting/salesInvoice'

const MoreInfoPurchaseInvoice = ({ dataRow, handleUpdateData }) => {
  const [customerPOdetails, setCustomerPO] = useState(false)
  const [accountingDetails, setAccountingDetails] = useState(false)
  const [commission, setDeferredCommission] = useState(false)
  const [salesTeam, setSalesTeam] = useState(false)
  const [subscription, setStockDetails] = useState(false)
  const [printSettings, setPrintSettings] = useState(false)
  const [additionalInfo, setAdditionalInfo] = useState(false)
  const [openCalendar, setOpenCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)

  const handleDateChange = date => {
    if (date) {
      setSelectedDate(date)
    }
    setOpenCalendar(false) // ปิดปฏิทินเสมอเมื่อมีการเลือกหรือไม่เลือก
  }

  const handleCheckboxChange = event => {
    handleUpdateData(event.target.name, event.target.checked === true ? 1 : 0)
  }

  const handleTextChange = event => {
    handleUpdateData(event.target.name, event.target.value)
  }

  const handleSelectChange = event => {
    handleUpdateData(event.target.name, event.target.value)
  }

  const FromDate = dayjs(dataRow.from_date)
  const ToDate = dayjs(dataRow.to_date)

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

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}Sales%20Invoice/${dataRow.name}`, {
        headers: {
          Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
        }
      })
      .then(res => {
        setQuotation(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [dataRow])
  useEffect(() => {
    console.log('dataRow', dataRow)
  }, [dataRow])

  const column = [
    { field: 'sales_person', headerName: 'Sales Person *', width: 140 },
    { field: 'contribution', headerName: 'Contribution (%)', width: 140 },
    { field: 'contribution_to_net_to', headerName: 'Contribution to Net To', width: 140 },
    { field: 'commission_rate', headerName: 'Commission Rate', width: 140 },
    { field: 'incentives', headerName: 'Incentives', width: 140 }
  ]

  const [inputValue, setInputValue] = useState(' ')

  const handleInputChange = e => {
    const newValue = e.target.value

    setInputValue(newValue)
  }

  return (
    <Box>
      <Accordion>
        <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
          <Typography>Status</Typography>
        </AccordionSummary>
        <Divider sx={{ margin: 0, my: 1, width: '100%' }} />
        <AccordionDetails>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={styles.box}>
                  <Typography>Status</Typography>
                  <TextField
                    fullWidth
                    disabled
                    variant='outlined'
                    name='status'
                    value={dataRow?.status}
                    onChange={handleTextChange}
                    sx={styles.textField}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
          <Typography> Accounting Details</Typography>
        </AccordionSummary>
        <Divider sx={{ margin: 0, my: 1, width: '100%' }} />
        <AccordionDetails>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={styles.box}>
                  <Typography>Debit To *</Typography>
                  <TextField
                    fullWidth
                    disabled
                    variant='outlined'
                    name='credit_to'
                    value={dataRow?.credit_to || ''}
                    onChange={handleTextChange}
                    sx={styles.textField}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={styles.box}>
                  <Typography>Is Opening Entry</Typography>
                  <TextField
                    fullWidth
                    disabled
                    variant='outlined'
                    name='is_opening'
                    value={dataRow?.is_opening || ''}
                    onChange={handleTextChange}
                    sx={styles.textField}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
          <Typography> Subscription</Typography>
        </AccordionSummary>
        <Divider sx={{ margin: 0, my: 1, width: '100%' }} />
        <AccordionDetails>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={styles.box}>
                  <Typography>From Date</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{
                        backgroundColor: 'grey.100',
                        width: '100%'
                      }}
                      views={['year', 'month', 'day']}
                      value={FromDate}
                      onChange={date => handleDateChange('from_date', date)}
                    />
                  </LocalizationProvider>
                  <Typography>Start date of current invoice's period</Typography>
                </Box>

                <Box sx={styles.box}>
                  <Typography>To Date</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{
                        backgroundColor: 'grey.100',
                        width: '100%'
                      }}
                      views={['year', 'month', 'day']}
                      value={ToDate}
                      onChange={date => handleDateChange('to_date', date)}
                    />
                  </LocalizationProvider>
                  <Typography>End date of current invoice's period</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
          <Typography> Print Settings</Typography>
        </AccordionSummary>
        <Divider sx={{ margin: 0, my: 1, width: '100%' }} />
        <AccordionDetails>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={styles.box}>
                  <Typography>Letter Head</Typography>
                  <TextField
                    fullWidth
                    variant='outlined'
                    name='letter_head'
                    value={dataRow?.letter_head || ''}
                    onChange={handleTextChange}
                    sx={styles.textField}
                  />
                </Box>

                <Box sx={styles.BoxStyle}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Boolean(dataRow.allow_negative_stock)}
                        name='allow_negative_stock'
                        onChange={handleCheckboxChange}
                      />
                    }
                    label='Allow Negative Stock'
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={styles.box}>
                  <Typography>Print Heading</Typography>
                  <TextField
                    fullWidth
                    variant='outlined'
                    name='select_print_heading'
                    value={dataRow?.select_print_heading || ''}
                    onChange={handleTextChange}
                    sx={styles.textField}
                  />
                </Box>

                <Box sx={styles.box}>
                  <Typography>Print Language</Typography>
                  <TextField
                    fullWidth
                    disabled
                    variant='outlined'
                    name='commission_rate'
                    value={dataRow?.language || ''}
                    onChange={handleTextChange}
                    sx={styles.textField}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
          <Typography>Hold Invoice</Typography>
        </AccordionSummary>
        <Divider sx={{ margin: 0, my: 1, width: '100%' }} />
        <AccordionDetails>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={styles.BoxStyle}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Boolean(dataRow.on_hold)}
                        name='Is Internal Customer'
                        onChange={handleCheckboxChange}
                      />
                    }
                    label='Hold Invoice'
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
          <Typography> Additional Info</Typography>
        </AccordionSummary>
        <Divider sx={{ margin: 0, my: 1, width: '100%' }} />
        <AccordionDetails>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={styles.BoxStyle}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Boolean(dataRow.is_internal_supplier)}
                        name='Is Internal Customer'
                        onChange={handleCheckboxChange}
                      />
                    }
                    label='Is Internal Supplier'
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={styles.box}>
                  <Typography>Remarks</Typography>
                  <TextField
                    fullWidth
                    variant='outlined'
                    name='status'
                    value={dataRow?.remarks || ''}
                    onChange={handleTextChange}
                    sx={styles.textField}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default MoreInfoPurchaseInvoice
