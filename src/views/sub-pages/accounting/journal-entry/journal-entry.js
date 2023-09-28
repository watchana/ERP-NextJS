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
  Collapse,
  Divider,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  FormControl,
  InputLabel,
  Select,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails
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
import Icon from '@mdi/react'
import { mdiMenuDown } from '@mdi/js'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const JournalEntryComp = ({ dataRow, setDataRow }) => {
  const [openCalendar, setOpenCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [getDataAccounting, setGetDataAccounting] = useState([])
  const [selectedToEnd, setSelectedDateToEnd] = useState(null)
  const [openCalendarToEnd, setOpenCalendarToEnd] = useState(false)
  const [selectedBillDate, setSelectedBillDate] = useState(null)
  const [openCalendarBillDate, setOpenCalendarBillDate] = useState(false)
  const [selectedDueDate, setSelectedDueDate] = useState(null)
  const [openCalendarDueDate, setOpenCalendarDueDate] = useState(false)
  const [open, setOpen] = useState(false)
  const [getItem, setGetItem] = useState([])
  const [selectedRerferDueDate, setSelectedRerferDueDate] = useState(false)
  const [openCalendarRerferDueDate, setOpenCalendarRerferDueDate] = useState(false)

  // const [age, setAge] = useState('')

  const handleDateChangeRerfer = date => {
    if (date) {
      setSelectedRerferDueDate(date)
    }
    setOpenCalendarRerferDueDate(false) // ปิดปฏิทินเสมอเมื่อมีการเลือกหรือไม่เลือก
  }

  const handleOpenCalendarRerfer = () => {
    setOpenCalendarRerferDueDate(true)
  }

  const handleChange = event => {
    setGetItem(event.target.value)
  }

  const handleRowClick = params => {
    setOpen(true)
    setGetItem(params.row)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [anchorElType, setAnchorElType] = useState(null)
  const [selectedType, setSelectedType] = useState('')

  const handleMenuOpenType = event => {
    setAnchorElType(event.currentTarget)
  }

  const handleMenuCloseType = () => {
    setAnchorElType(null)
  }

  const handleTypeChange = value => {
    setSelectedType(value)
    handleMenuCloseType()
  }

  const accountDorpdownType = [
    { value: '', label: 'None' },
    { value: 'Journal Entry', label: 'Journal Entry' },
    { value: 'Inter Company Journal Entry', label: 'Inter Company Journal Entry' },
    { value: 'Bank Entry', label: 'Bank Entry' },
    { value: 'Cash Entry', label: 'Cash Entry' },
    { value: 'Credit Card Entry', label: 'Credit Card Entry' },
    { value: 'Debit Note', label: 'Debit Note' },
    { value: 'Credit Note', label: 'Credit Note' },
    { value: 'Contra Entry', label: 'Contra Entry' },
    { value: 'Excise Entry', label: 'Excise Entry' },
    { value: 'Write Entry', label: 'Write Entry' },
    { value: 'Depreciation Entry', label: 'Depreciation Entry' },
    { value: 'Exchange Rate Revaluation', label: 'Exchange Rate Revaluation' },
    { value: 'Exchange Gain Or Loss', label: 'Exchange Gain Or Loss' },
    { value: 'Deferred Revenue', label: 'Deferred Revenue' },
    { value: 'Deferred Expense', label: 'Deferred Expense' }
  ]

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}Journal Entry/${dataRow.name}`, {
        headers: {
          Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
        }
      })
      .then(res => {
        setGetDataAccounting(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [dataRow])

  if (Object.values(getDataAccounting)?.length === 0) {
    return 'waiting...'
  }

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

  const handleTextChange = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setDataRow({ ...dataRow, [event.target.name]: event.target.value })
  }

  const handleCheckbox = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
    setDataRow({ ...dataRow, [event.target.name]: event.target.checked === true ? 1 : 0 })
  }

  const handleTextChangeItem = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setGetItem({ ...getItem, [event.target.name]: event.target.value })
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
        <Grid item xs={12} md={6}>
          <Box sx={styles.box}>
            <Typography>Entry Type</Typography>
            <TextField
              sx={styles.textField}
              fullWidth
              variant='outlined'
              value={selectedType || dataRow.voucher_type}
              onClick={handleMenuOpenType}
              InputProps={{
                endAdornment: (
                  <span onClick={handleMenuOpenType} style={{ cursor: 'pointer' }}>
                    <Icon path={mdiMenuDown} size={1} />
                  </span>
                )
              }}
            />
            <Menu
              anchorEl={anchorElType}
              open={Boolean(anchorElType)}
              onClose={handleMenuCloseType}
              PaperProps={{
                style: {
                  maxHeight: 250, // ความสูงสูงสุดของ dropdown
                  width: 350 // ความกว้างของ dropdown
                }
              }}
            >
              {accountDorpdownType.map(option => (
                <MenuItem key={option.value} value={option.value} onClick={() => handleTypeChange(option.value)}>
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={styles.box}>
            <Typography>Company</Typography>
            <TextField
              sx={styles.textField}
              variant='outlined'
              fullWidth
              label=''
              value={dataRow.company || ''}
              name='company'
              onChange={handleTextChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={styles.box}>
            <Typography>From Template</Typography>
            <TextField
              sx={styles.textField}
              variant='outlined'
              fullWidth
              label=''
              value={dataRow.from_template || ''}
              name='from_template'
              onChange={handleTextChange}
            />
          </Box>

          <Box sx={styles.box}>
            <Typography>Posting Date *</Typography>
            <TextField
              onClick={handleOpenCalendar}
              variant='outlined'
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
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ margin: 0, my: 3, width: '100%' }} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>Accounting Entries</Typography>
          <DataGrid
            rows={getDataAccounting.accounts}
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
        <Grid item xs={12} sx={{ my: 4 }}>
          <Button>Add Multiple</Button>
          <Button>Add Row</Button>
        </Grid>
      </Grid>
      <Divider sx={{ margin: 0, my: 3, width: '100%' }} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={styles.box}>
            <Typography>Reference Number</Typography>
            <TextField
              sx={styles.textField}
              variant='outlined'
              fullWidth
              label=''
              value={dataRow.cheque_no || ''}
              name='cheque_no'
              onChange={handleTextChange}
            />
          </Box>

          <Box sx={styles.box}>
            <Typography>To Date</Typography>
            <TextField
              onClick={handleOpenCalendarToEnd}
              sx={styles.textField}
              variant='outlined'
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
          </Box>

          <Box sx={styles.box}>
            <Typography>User Remark</Typography>
            <TextareaAutosize
              style={{ minHeight: '200px', width: '100%' }}
              variant='outlined'
              label='User Remark'
              value={dataRow.user_remark || ''}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={styles.box}>
            <Typography>Total Debit</Typography>
            <TextField
              sx={styles.textField}
              variant='outlined'
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
              disabled
            />
          </Box>

          <Box sx={styles.box}>
            <Typography>Total Debit</Typography>
            <TextField
              sx={styles.textField}
              variant='outlined'
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
              disabled
            />
          </Box>

          <Grid sx={checkboxStyle}>
            <Checkbox
              checked={dataRow.multi_currency === 1 ? true : false}
              name='multi_currency'
              onChange={handleCheckbox}
            />
            <Typography variant='subtitle2'>Multi Currency</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ margin: 0, my: 3, width: '100%' }} />

      <Box sx={{ width: '100%' }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 'bold', p: 0 }}> Reference</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Divider sx={{ margin: 0 }} />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={styles.box}>
                  <Typography sx={{ margin: 1 }}>Bill No</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={dataRow.bill_no || ''}
                    fullWidth
                    name='bill_no'
                    onChange={handleTextChange}
                  />
                </Box>

                <Box sx={styles.box}>
                  <Typography>Bill Date</Typography>
                  <TextField
                    onClick={handleOpenCalendarBillDate}
                    sx={styles.textField}
                    variant='outlined'
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
                </Box>

                <Box sx={styles.box}>
                  <Typography>Due Date</Typography>
                  <TextField
                    onClick={handleOpenCalendarDueDate}
                    sx={styles.textField}
                    variant='outlined'
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
                </Box>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Divider sx={{ margin: 0, my: 3, width: '100%' }} />

      <Box>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 'bold', p: 0 }}> Printing Settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Divider sx={{ margin: 0 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={styles.box}>
                  <Typography sx={{ margin: 1 }}>Pay To / Recd From</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={dataRow.pay_to_recd_from || ''}
                    fullWidth
                    name='pay_to_recd_from'
                    onChange={handleTextChange}
                  />
                </Box>

                <Box sx={styles.box}>
                  <Typography sx={{ margin: 1 }}>Print Heading</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={dataRow.select_print_heading || ''}
                    fullWidth
                    name='select_print_heading'
                    onChange={handleTextChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={styles.box}>
                  <Typography sx={{ margin: 1 }}>Letter Head</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={dataRow.letter_head || ''}
                    fullWidth
                    name='letter_head'
                    onChange={handleTextChange}
                  />
                </Box>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Divider sx={{ margin: 0, my: 3, width: '100%' }} />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 'bold', p: 0 }}> More Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider sx={{ margin: 0 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={styles.box}>
                <Typography>Mode of Payment</Typography>
                <TextField
                  sx={styles.textField}
                  variant='outlined'
                  value={dataRow.mode_of_payment || ''}
                  fullWidth
                  name='mode_of_payment'
                  onChange={handleTextChange}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={styles.box}>
                <FormControl variant='outlined' fullWidth>
                  <Typography>Is Advance</Typography>

                  <Select
                    sx={styles.textField}
                    labelId='demo-simple-select-filled-label'
                    id='demo-simple-select-filled'
                    // value={getItem.is_advance}
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>Yes</MenuItem>
                    <MenuItem value={2}>No</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

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
          {getItem.idx}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={styles.box}>
                  <Typography sx={{ margin: 1 }}>Account</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={getItem.account || ''}
                    fullWidth
                    name='account'
                    onChange={handleTextChangeItem}
                  />
                </Box>

                <Box sx={styles.box}>
                  <Typography sx={{ margin: 1 }}>Account Balance</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={
                      getItem?.balance === '0.0'
                        ? '฿ 0.0'
                        : `฿ ${parseFloat(getItem?.balance).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}`
                    }
                    fullWidth
                    name='balance'
                    onChange={handleTextChangeItem}
                    disabled
                  />
                </Box>

                <Box sx={styles.box}>
                  <Typography sx={{ margin: 1 }}>Party</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={getItem.party || ''}
                    fullWidth
                    name='party'
                    onChange={handleTextChangeItem}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={styles.box}></Box>
                <Typography sx={{ margin: 1 }}>Bank Account</Typography>
                <TextField
                  sx={styles.textField}
                  variant='outlined'
                  value={getItem.bank_account || ''}
                  fullWidth
                  name='bank_account'
                  onChange={handleTextChangeItem}
                />

                <Box sx={styles.box}>
                  <Typography sx={{ margin: 1 }}>Party Type</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={getItem.party_type || ''}
                    fullWidth
                    name='party_type'
                    disabled
                    onChange={handleTextChangeItem}
                  />
                </Box>
                <Box sx={styles.box}>
                  <Typography sx={{ margin: 1 }}>Party Balance</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    fullWidth
                    name='party_type'
                    onChange={handleTextChangeItem}
                  />
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ width: '100%' }}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 'bold', p: 0 }}> Accounting Dimensions</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Divider sx={{ margin: 0, width: '100%' }} />
                  <Grid container spacing={2} style={{ width: '100%' }}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Box sx={styles.box}>
                        <Typography sx={{ margin: 1 }}>Cost Center</Typography>
                        <TextField
                          sx={styles.textField}
                          variant='outlined'
                          value={getItem.cost_center || ''}
                          fullWidth
                          name='cost_center'
                          onChange={handleTextChangeItem}
                        />
                      </Box>
                      <Typography sx={{ margin: 1 }} variant='subtitle2'>
                        If Income or Expense
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Box sx={styles.box}>
                        <Typography sx={{ margin: 1 }}>Project</Typography>
                        <TextField
                          sx={styles.textField}
                          variant='outlined'
                          value={getItem.project || ''}
                          fullWidth
                          name='project'
                          onChange={handleTextChangeItem}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Box>

            <Grid sx={{ mt: 6 }}>
              <Typography sx={{ fontWeight: 'bold' }}> Amount</Typography>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box sx={styles.box}>
                  <Typography sx={{ margin: 1 }}>Debit</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={getItem.debit_in_account_currency || ''}
                    fullWidth
                    name='debit_in_account_currency'
                    onChange={handleTextChangeItem}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={styles.box}>
                  <Typography sx={{ margin: 1 }}>Credit</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={getItem.debit_in_account_currency || ''}
                    fullWidth
                    name='debit_in_account_currency'
                    onChange={handleTextChangeItem}
                  />
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ m: 6, width: '100%' }} />
            <Grid>
              <Typography sx={{ fontWeight: 'bold' }}> Reference</Typography>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box sx={styles.box}>
                  <FormControl variant='outlined' fullWidth>
                    <Typography>Reference Type</Typography>

                    <Select
                      labelId='demo-simple-select-filled-label'
                      id='demo-simple-select-filled'
                      // value={getItem.reference_type}
                      onChange={handleChange}
                      sx={styles.textField}
                    >
                      <MenuItem value=''>
                        <em>{getItem.reference_type}</em>
                      </MenuItem>
                      <MenuItem value={1}>Sales Invoice </MenuItem>
                      <MenuItem value={2}>Purchase Invoice</MenuItem>
                      <MenuItem value={3}>Journal Entry</MenuItem>
                      <MenuItem value={4}>Sales Order</MenuItem>
                      <MenuItem value={5}>Purchase Order</MenuItem>
                      <MenuItem value={6}>Expense Claim</MenuItem>
                      <MenuItem value={7}>Asset</MenuItem>
                      <MenuItem value={8}>Loan</MenuItem>
                      <MenuItem value={9}>Payroll Entry</MenuItem>
                      <MenuItem value={10}>Employee Advance</MenuItem>
                      <MenuItem value={11}>Exchange Rate Revaluation</MenuItem>
                      <MenuItem value={12}>Invoice Discounting</MenuItem>
                      <MenuItem value={13}>Fees</MenuItem>
                      <MenuItem value={14}>Full and Final Statement</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={styles.box}>
                  <Typography sx={{ margin: 1 }}>Reference Name</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={getItem.reference_name || ''}
                    fullWidth
                    name='reference_name'
                    onChange={handleTextChangeItem}
                  />
                </Box>

                <Typography sx={{ margin: 1 }}>Reference Due Date</Typography>
                <TextField
                  onClick={handleOpenCalendarRerfer}
                  sx={styles.textField}
                  variant='outlined'
                  fullWidth
                  value={selectedRerferDueDate ? dayjs(selectedRerferDueDate).format('DD - MM - YYYY') : ''}
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
                {openCalendarRerferDueDate && (
                  <Grid width={'100%'}>
                    <Typography sx={{ marginBottom: 2 }}>Release Date </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <StaticDatePicker
                        orientation='landscape'
                        value={selectedDueDate}
                        onChange={handleDateChangeRerfer}
                        componentsProps={{ actionBar: { actions: [] } }}
                        renderInput={params => <TextField {...params} variant='filled' fullWidth />}
                      />
                    </LocalizationProvider>
                  </Grid>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={styles.box}>
                  <FormControl variant='outlined' fullWidth>
                    <Typography>Is Advance</Typography>
                    <Select
                      labelId='demo-simple-select-filled-label'
                      id='demo-simple-select-filled'
                      // value={getItem.is_advance}
                      onChange={handleChange}
                      sx={styles.textField}
                    >
                      <MenuItem value={1}>Yes</MenuItem>
                      <MenuItem value={2}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={styles.box}>
                  <Typography>User Remark</Typography>
                  <TextareaAutosize
                    style={{ minHeight: '150px', width: '100%' }}
                    size='small'
                    variant='filled'
                    label=''
                    value={getItem.user_remark || ''}
                  />
                </Box>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Insert Below</Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default JournalEntryComp
