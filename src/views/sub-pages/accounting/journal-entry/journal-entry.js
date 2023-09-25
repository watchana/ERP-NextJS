import {
  Button,
  Card,
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  TextareaAutosize,
  Box,
  CardActions,
  Collapse,
  Divider
} from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import EventIcon from '@mui/icons-material/Event'
import { DataGrid } from '@mui/x-data-grid'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ChevronDown, ChevronUp } from 'mdi-material-ui'

const JournalEntryComp = ({ dataRow, setDataRow }) => {
  const [openCalendar, setOpenCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [getDataAccounting, setDataAccounting] = useState([])
  const [selectedToEnd, setSelectedDateToEnd] = useState(null)
  const [openCalendarToEnd, setOpenCalendarToEnd] = useState(false)
  const [selectedBillDate, setSelectedBillDate] = useState(null)
  const [openCalendarBillDate, setOpenCalendarBillDate] = useState(false)
  const [selectedDueDate, setSelectedDueDate] = useState(null)
  const [openCalendarDueDate, setOpenCalendarDueDate] = useState(false)
  const [collapseRefer, setCollapseRefer] = useState(false)
  const [collapsePrinting, setCollapsePrinting] = useState(false)
  const [collapseMoreInfo, setCollapseMoreInfo] = useState(false)

  const handleCollapseRefer = () => {
    setCollapseRefer(!collapseRefer)
  }

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}Journal Entry/${dataRow.name}`, {
        headers: {
          Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
        }
      })
      .then(res => {
        setDataAccounting(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [dataRow])

  function formatCurrency(params) {
    const formattedValue = new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2
    }).format(params.value)

    return formattedValue
  }

  const columns = [
    { field: 'idx', headerName: 'No', width: 150 },
    { field: 'account', headerName: 'Account', width: 150 },
    { field: 'party_type', headerName: 'Party Type', width: 150 },
    { field: 'party', headerName: 'Party', width: 150 },
    { field: 'debit_in_account_currency', headerName: 'Debit', width: 150, valueFormatter: formatCurrency },
    { field: 'credit_in_account_currency', headerName: 'Credit', width: 150, valueFormatter: formatCurrency }
  ]

  const EntryType = [
    { label: 'Journal Entry' },
    { label: 'Inter Company Journal Entry' },
    { label: 'Bank Entry' },
    { label: 'Cash Entry' },
    { label: 'Credit Card Entry' },
    { label: 'Debit Note' },
    { label: 'Credit Note' },
    { label: 'Contra Entry' },
    { label: 'Excise Entry' },
    { label: 'Write Entry' },
    { label: 'Depreciation Entry' },
    { label: 'Exchange Rate Revaluation' },
    { label: 'Exchange Gain Or Loss' },
    { label: 'Deferred Revenue' },
    { label: 'Deferred Expense' }
  ]

  const IsOpenting = [{ label: 'Yes' }, { label: 'No' }]

  const handleTextChange = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setDataRow({ ...dataRow, [event.target.name]: event.target.value })
  }

  const handleCheckbox = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
    setDataRow({ ...dataRow, [event.target.name]: event.target.checked === true ? 1 : 0 })
  }

  const checkboxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }

  const handleDateChange = date => {
    if (date) {
      setSelectedDate(date)
    }
    setOpenCalendar(false) // ปิดปฏิทินเสมอเมื่อมีการเลือกหรือไม่เลือก
  }

  const handleOpenCalendar = () => {
    setOpenCalendar(true)
  }

  const handleOpenPrinting = () => {
    setCollapsePrinting(!collapsePrinting)
  }

  const handleOpenMoreInfo = () => {
    setCollapseMoreInfo(!collapseMoreInfo)
  }

  const handleDateChangeToEnd = date => {
    if (date) {
      setSelectedDateToEnd(date)
    }
    setOpenCalendarToEnd(false) // ปิดปฏิทินเสมอเมื่อมีการเลือกหรือไม่เลือก
  }

  const handleOpenCalendarToEnd = () => {
    setOpenCalendarToEnd(true)
  }

  const handleDateChangeBillDate = date => {
    if (date) {
      setSelectedBillDate(date)
    }
    setOpenCalendarBillDate(false) // ปิดปฏิทินเสมอเมื่อมีการเลือกหรือไม่เลือก
  }

  const handleOpenCalendarBillDate = () => {
    setOpenCalendarBillDate(true)
  }

  const handleDateChangeDueDate = date => {
    if (date) {
      setSelectedDueDate(date)
    }
    setOpenCalendarDueDate(false) // ปิดปฏิทินเสมอเมื่อมีการเลือกหรือไม่เลือก
  }

  const handleOpenCalendarDueDate = () => {
    setOpenCalendarDueDate(true)
  }

  return (
    <Card sx={{ p: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography>Entry Type</Typography>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={EntryType}
            fullWidth
            renderInput={params => <TextField {...params} label='' />}
            sx={{ marginBottom: 3 }}
          />

          <Typography>Company</Typography>
          <TextField
            sx={{ marginBottom: 5 }}
            size='small'
            variant='filled'
            fullWidth
            label=''
            value={dataRow.company}
            name='company'
            onChange={handleTextChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>From Template</Typography>
          <TextField
            sx={{ marginBottom: 5 }}
            size='small'
            variant='filled'
            fullWidth
            label=''
            value={dataRow.from_template}
            name='from_template'
            onChange={handleTextChange}
          />

          <Typography>From Date</Typography>
          <TextField
            onClick={handleOpenCalendar}
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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>Accounting Entries</Typography>
          <DataGrid
            rows={getDataAccounting.accounts}
            columns={columns}
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
        <Grid item xs={12} sx={{ my: 4 }}>
          <Button>Add Multiple</Button>
          <Button>Add Row</Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography>Reference Number</Typography>
          <TextField
            sx={{ marginBottom: 5 }}
            size='small'
            variant='filled'
            fullWidth
            label=''
            value={dataRow.cheque_no}
            name='cheque_no'
            onChange={handleTextChange}
          />

          <Typography>To Date</Typography>
          <TextField
            onClick={handleOpenCalendarToEnd}
            sx={{ marginBottom: 5 }}
            size='small'
            variant='filled'
            fullWidth
            value={selectedToEnd ? dayjs(selectedToEnd).format('DD - MM - YYYY') : ''}
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
          {openCalendarToEnd && (
            <Grid width={'100%'}>
              <Typography sx={{ marginBottom: 2 }}>Release Date </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  orientation='landscape'
                  value={selectedToEnd}
                  onChange={handleDateChangeToEnd}
                  componentsProps={{ actionBar: { actions: [] } }}
                  renderInput={params => <TextField {...params} variant='filled' fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
          )}

          <Typography>User Remark</Typography>
          <TextareaAutosize
            style={{ minHeight: '200px', width: '100%' }}
            size='small'
            variant='filled'
            label='User Remark'
            value={dataRow.user_remark}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Total Debit</Typography>
          <TextField
            sx={{ marginBottom: 5 }}
            size='small'
            variant='filled'
            fullWidth
            label=''
            value={
              dataRow?.total_debit === '0.0'
                ? '฿0.0'
                : dataRow?.total_debit.toLocaleString('en-US', {
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
            name='total_debit'
            onChange={handleTextChange}
          />

          <Typography>Total Debit</Typography>
          <TextField
            sx={{ marginBottom: 5 }}
            size='small'
            variant='filled'
            fullWidth
            label=''
            value={
              dataRow?.total_credit === '0.0'
                ? '฿0.0'
                : dataRow?.total_credit.toLocaleString('en-US', {
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
            name='total_credit'
            onChange={handleTextChange}
          />

          <Grid sx={checkboxStyle}>
            <Checkbox checked={dataRow.multi_currency === 1 ? true : false} name='on_hold' onChange={handleCheckbox} />
            <Typography variant='subtitle2'>Multi Currency</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Box sx={{ display: 'flex' }}>
          <Button size='small' variant='filled' label='' onClick={handleCollapseRefer} sx={{ fontWeight: 'bold' }}>
            Reference
          </Button>
          <Box>
            <CardActions className='card-action-dense'>
              <IconButton size='small' onClick={handleCollapseRefer}>
                {collapseRefer ? (
                  <ChevronUp sx={{ fontSize: '1.875rem' }} />
                ) : (
                  <ChevronDown sx={{ fontSize: '1.875rem' }} />
                )}
              </IconButton>
            </CardActions>
          </Box>
        </Box>

        <Collapse in={collapseRefer}>
          <Divider sx={{ margin: 0 }} />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography sx={{ margin: 1 }}>Bill No</Typography>
              <TextField
                size='small'
                variant='filled'
                value={dataRow.bill_no}
                fullWidth
                name='bill_no'
                onChange={handleTextChange}
              />

              <Typography>Bill Date</Typography>
              <TextField
                onClick={handleOpenCalendarBillDate}
                sx={{ marginBottom: 5 }}
                size='small'
                variant='filled'
                fullWidth
                value={selectedBillDate ? dayjs(selectedBillDate).format('DD - MM - YYYY') : ''}
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
              {openCalendarBillDate && (
                <Grid width={'100%'}>
                  <Typography sx={{ marginBottom: 2 }}>Release Date </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                      orientation='landscape'
                      value={selectedBillDate}
                      onChange={handleDateChangeBillDate}
                      componentsProps={{ actionBar: { actions: [] } }}
                      renderInput={params => <TextField {...params} variant='filled' fullWidth />}
                    />
                  </LocalizationProvider>
                </Grid>
              )}

              <Typography>Due Date</Typography>
              <TextField
                onClick={handleOpenCalendarDueDate}
                sx={{ marginBottom: 5 }}
                size='small'
                variant='filled'
                fullWidth
                value={selectedDueDate ? dayjs(selectedDueDate).format('DD - MM - YYYY') : ''}
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
              {openCalendarDueDate && (
                <Grid width={'100%'}>
                  <Typography sx={{ marginBottom: 2 }}>Release Date </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                      orientation='landscape'
                      value={selectedDueDate}
                      onChange={handleDateChangeDueDate}
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
      <Grid>
        <Box sx={{ display: 'flex' }}>
          <Button size='small' variant='filled' label='' onClick={handleOpenPrinting} sx={{ fontWeight: 'bold' }}>
            Printing Settings
          </Button>
          <Box>
            <CardActions className='card-action-dense'>
              <IconButton size='small' onClick={handleOpenPrinting}>
                {collapsePrinting ? (
                  <ChevronUp sx={{ fontSize: '1.875rem' }} />
                ) : (
                  <ChevronDown sx={{ fontSize: '1.875rem' }} />
                )}
              </IconButton>
            </CardActions>
          </Box>
        </Box>
        <Collapse in={collapsePrinting}>
          <Divider sx={{ margin: 0 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ margin: 1 }}>Pay To / Recd From</Typography>
              <TextField
                size='small'
                variant='filled'
                value={dataRow.pay_to_recd_from}
                fullWidth
                name='pay_to_recd_from'
                onChange={handleTextChange}
              />

              <Typography sx={{ margin: 1 }}>Print Heading</Typography>
              <TextField
                size='small'
                variant='filled'
                value={dataRow.select_print_heading}
                fullWidth
                name='select_print_heading'
                onChange={handleTextChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ margin: 1 }}>Letter Head</Typography>
              <TextField
                size='small'
                variant='filled'
                value={dataRow.letter_head}
                fullWidth
                name='letter_head'
                onChange={handleTextChange}
              />
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
      <Grid>
        <Box sx={{ display: 'flex' }}>
          <Button size='small' variant='filled' label='' onClick={handleOpenMoreInfo} sx={{ fontWeight: 'bold' }}>
            More Information
          </Button>
          <Box>
            <CardActions className='card-action-dense'>
              <IconButton size='small' onClick={handleOpenMoreInfo}>
                {collapseMoreInfo ? (
                  <ChevronUp sx={{ fontSize: '1.875rem' }} />
                ) : (
                  <ChevronDown sx={{ fontSize: '1.875rem' }} />
                )}
              </IconButton>
            </CardActions>
          </Box>
        </Box>
        <Collapse in={collapseMoreInfo}>
          <Divider sx={{ margin: 0 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ margin: 1 }}>Mode of Payment</Typography>
              <TextField
                size='small'
                variant='filled'
                value={dataRow.mode_of_payment}
                fullWidth
                name='mode_of_payment'
                onChange={handleTextChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Is Opening</Typography>
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={IsOpenting}
                fullWidth
                renderInput={params => <TextField {...params} label='' />}
                sx={{ marginBottom: 3 }}
              />
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
    </Card>
  )
}

export default JournalEntryComp
