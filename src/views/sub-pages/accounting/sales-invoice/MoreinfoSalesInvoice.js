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
  InputAdornment
} from '@mui/material'

import EventIcon from '@mui/icons-material/Event'
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import Btn from 'src/components/Button/Button'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import dayjs from 'dayjs'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'

const MoreinfoSalesinvoice = ({ dataRow }) => {
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

  const handleOpenCalendar = () => {
    setOpenCalendar(true)
  }

  const handleClickCustomerPO = () => {
    setCustomerPO(!customerPOdetails)
  }

  const handleClickAccountingDetails = () => {
    setAccountingDetails(!accountingDetails)
  }

  const handleClickcommission = () => {
    setDeferredCommission(!commission)
  }

  const handleClickSalesTeam = () => {
    setSalesTeam(!salesTeam)
  }

  const handleClickPrintSettings = () => {
    setPrintSettings(!printSettings)
  }

  const handleClicubscription = () => {
    setStockDetails(!subscription)
  }

  const handleClickAdditionalInfo = () => {
    setAdditionalInfo(!additionalInfo)
  }

  /*  checkbox */
  const handleCheckboxChange = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
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
    <Grid>
      <Card sx={{ width: '100%', p: 5 }}>
        <Grid container>
          <Box sx={{ width: '100%' }}>
            <Button variant='filled' onClick={handleClickCustomerPO} sx={{ fontWeight: 'bold' }}>
              Customer PO Details
            </Button>
            <IconButton size='small' onClick={handleClickCustomerPO}>
              {customerPOdetails ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </IconButton>
          </Box>

          <Grid container>
            <Collapse in={customerPOdetails} width={'100%'} style={{ width: '100%' }}>
              <Divider sx={{ margin: 0, width: '100%' }} />
              <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography>Debit To *</Typography>

                  <TextField
                    sx={{ marginBottom: 5 }}
                    size='small'
                    variant='filled'
                    fullWidth
                    value={dataRow?.po_no || `${inputValue}`}
                    onChange={handleInputChange}
                  />
                  <Typography>Customer's Purchase Order Date</Typography>
                  <TextField
                    onClick={handleOpenCalendar}
                    sx={{ marginBottom: 5 }}
                    size='small'
                    variant='filled'
                    fullWidth
                    value={selectedDate ? dayjs(selectedDate).format('DD - MM - YYYY') : ''}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton>
                            <EventIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  {openCalendar && (
                    <Grid width={'100%'}>
                      <Typography sx={{ marginBottom: 2 }}>Release Date </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                          orientation='landscape'
                          value={selectedDate}
                          onChange={handleDateChange}
                          componentsProps={{ actionBar: { actions: [] } }}
                          renderInput={params => <TextField {...params} variant='filled' fullWidth />}
                        />
                      </LocalizationProvider>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
        <Divider sx={{ margin: 0, my: 3, width: '100%' }} />
        <Grid container>
          <Box sx={{ width: '100%' }}>
            <Button variant='filled' onClick={handleClickAccountingDetails} sx={{ fontWeight: 'bold' }}>
              Accounting Details
            </Button>
            <IconButton size='small' onClick={handleClickAccountingDetails}>
              {accountingDetails ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </IconButton>
          </Box>

          <Grid container>
            <Collapse in={accountingDetails} width={'100%'} style={{ width: '100%' }}>
              <Divider sx={{ margin: 0, width: '100%' }} />
              <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  {' '}
                  <Typography>Debit To *</Typography>
                  <TextField
                    sx={{ marginBottom: 5 }}
                    size='small'
                    variant='filled'
                    fullWidth
                    value={dataRow?.debit_to || ''}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Typography>Is Opening Entry</Typography>
                  <TextField
                    sx={{ marginBottom: 5 }}
                    size='small'
                    variant='filled'
                    fullWidth
                    value={dataRow?.is_opening || ''}
                  />
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
        <Divider sx={{ margin: 0, my: 3, width: '100%' }} />
        <Grid container>
          <Box sx={{ width: '100%' }}>
            <Button variant='filled' onClick={handleClickcommission} sx={{ fontWeight: 'bold' }}>
              Commission
            </Button>
            <IconButton size='small' onClick={handleClickcommission}>
              {commission ? <ChevronUp sx={{ fontSize: '1.875rem' }} /> : <ChevronDown sx={{ fontSize: '1.875rem' }} />}
            </IconButton>
          </Box>

          <Grid container>
            <Collapse in={commission} width={'100%'} style={{ width: '100%' }}>
              <Divider sx={{ margin: 0, width: '100%' }} />
              <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Typography>Amount Eligible for Commission</Typography>
                  <TextField
                    sx={{ marginBottom: 5 }}
                    size='small'
                    variant='filled'
                    fullWidth
                    value={
                      dataRow?.amount_eligible_for_commission === '0.0'
                        ? '฿ 0.0'
                        : `฿ ${parseFloat(dataRow?.amount_eligible_for_commission).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}`
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Typography>Commission Rate (%)</Typography>
                  <TextField
                    sx={{ marginBottom: 5 }}
                    size='small'
                    variant='filled'
                    fullWidth
                    value={dataRow?.commission_rate || ''}
                  />
                  <Typography>Total Commission</Typography>
                  <TextField
                    sx={{ marginBottom: 5 }}
                    size='small'
                    variant='filled'
                    fullWidth
                    value={
                      dataRow?.total_commission === '0.0'
                        ? '฿ 0.0'
                        : `฿ ${parseFloat(dataRow?.total_commission).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}`
                    }
                  />
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
        <Divider sx={{ margin: 0, my: 3, width: '100%' }} />
        <Grid container>
          <Box sx={{ width: '100%' }}>
            <Button variant='filled' onClick={handleClickSalesTeam} sx={{ fontWeight: 'bold' }}>
              Sales Team
            </Button>
            <IconButton size='small' onClick={handleClickSalesTeam}>
              {salesTeam ? <ChevronUp sx={{ fontSize: '1.875rem' }} /> : <ChevronDown sx={{ fontSize: '1.875rem' }} />}
            </IconButton>
          </Box>
          <Grid container>
            <Collapse in={salesTeam} width={'100%'} style={{ width: '100%' }}>
              <Divider sx={{ margin: 0, width: '100%' }} />
              <DataGrid
                sx={{ width: 'full', mt: 6 }}
                rows={dataRow.sales_team || ''}
                columns={column}
                getRowId={row => row.name}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 }
                  }
                }}
                pageSizeOptions={[5, 10]}
              />
            </Collapse>
          </Grid>
        </Grid>

        <Divider sx={{ margin: 0, my: 3, width: '100%' }} />
        <Grid container>
          <Box sx={{ width: '100%' }}>
            <Button variant='filled' onClick={handleClickPrintSettings} sx={{ fontWeight: 'bold' }}>
              Print Settings
            </Button>
            <IconButton size='small' onClick={handleClickPrintSettings}>
              {printSettings ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </IconButton>
          </Box>

          <Grid container>
            <Collapse in={printSettings} width={'100%'} style={{ width: '100%' }}>
              <Divider sx={{ margin: 0, width: '100%' }} />
              <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  {' '}
                  <Typography>Letter Head </Typography>
                  <TextField
                    sx={{ marginBottom: 5 }}
                    size='small'
                    variant='filled'
                    fullWidth
                    value={dataRow?.letter_head}
                  />
                  <FormControlLabel
                    control={<Checkbox checked={dataRow?.group_same_items === 1} onChange={handleCheckboxChange} />}
                    label='Group same items'
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Typography>Print Heading</Typography>
                  <TextField
                    sx={{ marginBottom: 5 }}
                    size='small'
                    variant='filled'
                    fullWidth
                    value={dataRow?.select_print_heading}
                  />

                  <Typography>Print Language</Typography>
                  <TextField
                    sx={{ marginBottom: 5 }}
                    size='small'
                    variant='filled'
                    fullWidth
                    value={dataRow?.language}
                  />
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
        <Divider sx={{ margin: 0, my: 3, width: '100%' }} />
        <Grid container>
          <Box sx={{ width: '100%' }}>
            <Button variant='filled' onClick={handleClicubscription} sx={{ fontWeight: 'bold' }}>
              Subscription
            </Button>
            <IconButton size='small' onClick={handleClicubscription}>
              {subscription ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </IconButton>
          </Box>

          <Grid container>
            <Collapse in={subscription} width={'100%'} style={{ width: '100%' }}>
              <Divider sx={{ margin: 0, width: '100%' }} />
              <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  {' '}
                  <Typography>From Date</Typography>
                  <TextField
                    sx={{ marginBottom: 5 }}
                    size='small'
                    variant='filled'
                    fullWidth
                    value={dataRow?.from_date}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Typography>To Date</Typography>
                  <TextField
                    sx={{ marginBottom: 5 }}
                    size='small'
                    variant='filled'
                    fullWidth
                    value={dataRow?.to_date}
                  />
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Grid>

        <Divider sx={{ margin: 0, my: 3, width: '100%' }} />
        <Grid container>
          <Box sx={{ width: '100%' }}>
            <Button variant='filled' onClick={handleClickAdditionalInfo} sx={{ fontWeight: 'bold' }}>
              Additional Info
            </Button>
            <IconButton size='small' onClick={handleClickAdditionalInfo}>
              {additionalInfo ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </IconButton>
          </Box>

          <Grid container>
            <Collapse in={additionalInfo} width={'100%'} style={{ width: '100%' }}>
              <Divider sx={{ margin: 0, width: '100%' }} />
              <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  {' '}
                  <Typography>Status </Typography>
                  <TextField sx={{ marginBottom: 5 }} size='small' variant='filled' fullWidth value={dataRow?.status} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <FormControlLabel
                    control={<Checkbox checked={dataRow?.is_internal_customer === 1} onChange={handleCheckboxChange} />}
                    label='Is Internal Customer'
                  />
                  <FormControlLabel
                    control={<Checkbox checked={dataRow?.is_discounted === 1} onChange={handleCheckboxChange} />}
                    label='Allow Zero Valuation Rate'
                  />
                  <Typography>Remarks</Typography>
                  <TextField
                    sx={{ marginBottom: 5 }}
                    size='small'
                    variant='filled'
                    fullWidth
                    value={dataRow?.remarks}
                  />
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
      </Card>
      <Grid sx={{ my: 5 }}>
        <Typography variant=''>Add a comment:</Typography>
        <TextField size='small' variant='filled' label='' multiline rows={4} fullWidth />
      </Grid>
      <Btn
        detailbutton={' Comment'}
        bgcolorbutton={'white'}
        numminwid={'auto'}
        handleButtonClick={() => router.push()}
      />
    </Grid>
  )
}

export default MoreinfoSalesinvoice
