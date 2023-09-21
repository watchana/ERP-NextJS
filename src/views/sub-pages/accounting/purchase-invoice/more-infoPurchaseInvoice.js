import {
  Box,
  Button,
  Card,
  CardActions,
  Checkbox,
  Collapse,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material'
import { ChevronDown, ChevronUp } from 'mdi-material-ui'
import { useState } from 'react'
import EventIcon from '@mui/icons-material/Event'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const MoreInfoPurchaseInvoice = ({ dataRow, setDataRow }) => {
  const [collapseStatus, setCollapseStatus] = useState(false)
  const [collapseAccouting, setCollapseAccouting] = useState(false)
  const [collapseSubscription, setCollapseSubscription] = useState(false)
  const [collapsePrint, setCollapsePrint] = useState(false)
  const [collapseHold, setCollapseHold] = useState(false)
  const [collapseAdditional, setCollapeAdditional] = useState(false)
  const [openCalendar, setOpenCalendar] = useState(false)
  const [openCalendarToEnd, setOpenCalendarToEnd] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedToEnd, setSelectedDateToEnd] = useState(null)

  const handleDateChange = date => {
    if (date) {
      setSelectedDate(date)
    }
    setOpenCalendar(false) // ปิดปฏิทินเสมอเมื่อมีการเลือกหรือไม่เลือก
  }

  const handleDateChangeToEnd = date => {
    if (date) {
      setSelectedDateToEnd(date)
    }
    setOpenCalendarToEnd(false) // ปิดปฏิทินเสมอเมื่อมีการเลือกหรือไม่เลือก
  }

  const handleOpenCalendar = () => {
    setOpenCalendar(true)
  }

  const handleOpenCalendarToEnd = () => {
    setOpenCalendarToEnd(true)
  }

  const handleCollapseAdditional = () => {
    setCollapeAdditional(!collapseAdditional)
  }

  const handleCollapseHold = () => {
    setCollapseHold(!collapseHold)
  }

  const handleCollapsePrint = () => {
    setCollapsePrint(!collapsePrint)
  }

  const handleCollapseStatus = () => {
    setCollapseStatus(!collapseStatus)
  }

  const handleCollapesAccouting = () => {
    setCollapseAccouting(!collapseAccouting)
  }

  const handleSubscription = () => {
    setCollapseSubscription(!collapseSubscription)
  }

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

  return (
    <Card sx={{ p: 4 }}>
      <Grid>
        <Grid>
          <Box sx={{ display: 'flex' }}>
            <Button size='small' variant='filled' label='' onClick={handleCollapseStatus}>
              Additional Discount
            </Button>
            <Box>
              <CardActions className='card-action-dense'>
                <IconButton size='small' onClick={handleCollapseStatus}>
                  {collapseStatus ? (
                    <ChevronUp sx={{ fontSize: '1.875rem' }} />
                  ) : (
                    <ChevronDown sx={{ fontSize: '1.875rem' }} />
                  )}
                </IconButton>
              </CardActions>
            </Box>
          </Box>

          <Collapse in={collapseStatus}>
            <Divider sx={{ margin: 0 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography sx={{ margin: 1 }}>Status</Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={dataRow.status}
                  fullWidth
                  name='status'
                  onChange={handleTextChange}
                  disabled
                />
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
        <Grid>
          <Box sx={{ display: 'flex' }}>
            <Button size='small' variant='filled' label='' onClick={handleCollapesAccouting}>
              Accounting Details
            </Button>
            <Box>
              <CardActions className='card-action-dense'>
                <IconButton size='small' onClick={handleCollapesAccouting}>
                  {collapseAccouting ? (
                    <ChevronUp sx={{ fontSize: '1.875rem' }} />
                  ) : (
                    <ChevronDown sx={{ fontSize: '1.875rem' }} />
                  )}
                </IconButton>
              </CardActions>
            </Box>
          </Box>

          <Collapse in={collapseAccouting}>
            <Divider sx={{ margin: 0 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography sx={{ margin: 1 }}>Credit To</Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={dataRow.credit_to}
                  onChange={handleTextChange}
                  fullWidth
                  name='credit_to'
                />

                <Typography sx={{ margin: 1 }}>Is Opening Entry</Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={dataRow.is_opening}
                  fullWidth
                  name='is_opening'
                  onChange={handleTextChange}
                  disabled
                />
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
        <Grid>
          <Box sx={{ display: 'flex' }}>
            <Button size='small' variant='filled' label='' onClick={handleSubscription}>
              Subscription
            </Button>
            <Box>
              <CardActions className='card-action-dense'>
                <IconButton size='small' onClick={handleSubscription}>
                  {collapseSubscription ? (
                    <ChevronUp sx={{ fontSize: '1.875rem' }} />
                  ) : (
                    <ChevronDown sx={{ fontSize: '1.875rem' }} />
                  )}
                </IconButton>
              </CardActions>
            </Box>
          </Box>

          <Collapse in={collapseSubscription}>
            <Divider sx={{ margin: 0 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
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
                <Typography variant='subtitle2' sx={{ marginBottom: 5 }}>
                  Start date of current invoice's period
                </Typography>
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
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
        {/* Print Setting */}
        <Grid>
          <Box sx={{ display: 'flex' }}>
            <Button size='small' variant='filled' label='' onClick={handleCollapsePrint}>
              Print Setting
            </Button>
            <Box>
              <CardActions className='card-action-dense'>
                <IconButton size='small' onClick={handleCollapsePrint}>
                  {collapsePrint ? (
                    <ChevronUp sx={{ fontSize: '1.875rem' }} />
                  ) : (
                    <ChevronDown sx={{ fontSize: '1.875rem' }} />
                  )}
                </IconButton>
              </CardActions>
            </Box>
          </Box>

          <Collapse in={collapsePrint}>
            <Divider sx={{ margin: 0 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography sx={{ margin: 1 }}>Letter Head</Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={dataRow.letter_head}
                  fullWidth
                  onChange={handleTextChange}
                  name='status'
                />

                <Grid sx={checkboxStyle}>
                  <Checkbox
                    checked={dataRow.group_same_items === 1 ? true : false}
                    name='group_same_items'
                    onChange={handleCheckbox}
                  />
                  <Typography variant='subtitle2'>Group same items</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography sx={{ margin: 1 }}>Print Heading</Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={dataRow.select_print_heading}
                  fullWidth
                  name='status'
                  onChange={handleTextChange}
                />

                <Typography sx={{ margin: 1 }}>Print Language</Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={dataRow.language}
                  fullWidth
                  name='status'
                  disabled
                  onChange={handleTextChange}
                />
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
        <Grid>
          <Box sx={{ display: 'flex' }}>
            <Button size='small' variant='filled' label='' onClick={handleCollapseHold}>
              Hold Invoice
            </Button>
            <Box>
              <CardActions className='card-action-dense'>
                <IconButton size='small' onClick={handleCollapseHold}>
                  {collapseHold ? (
                    <ChevronUp sx={{ fontSize: '1.875rem' }} />
                  ) : (
                    <ChevronDown sx={{ fontSize: '1.875rem' }} />
                  )}
                </IconButton>
              </CardActions>
            </Box>
          </Box>

          <Collapse in={collapseHold}>
            <Divider sx={{ margin: 0 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Grid sx={checkboxStyle}>
                  <Checkbox
                    checked={dataRow.on_hold === 1 ? true : false}
                    name='on_hold'
                    onChange={handleCheckbox}
                    disabled
                  />
                  <Typography variant='subtitle2'>Hold Invoice</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
        <Grid>
          <Box sx={{ display: 'flex' }}>
            <Button size='small' variant='filled' label='' onClick={handleCollapseAdditional}>
              Additional Info
            </Button>
            <Box>
              <CardActions className='card-action-dense'>
                <IconButton size='small' onClick={handleCollapseAdditional}>
                  {collapseAdditional ? (
                    <ChevronUp sx={{ fontSize: '1.875rem' }} />
                  ) : (
                    <ChevronDown sx={{ fontSize: '1.875rem' }} />
                  )}
                </IconButton>
              </CardActions>
            </Box>
          </Box>

          <Collapse in={collapseAdditional}>
            <Divider sx={{ margin: 0 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Grid sx={checkboxStyle}>
                  <Checkbox
                    checked={dataRow.on_hold === 1 ? true : false}
                    name='on_hold'
                    onChange={handleCheckbox}
                    disabled
                  />
                  <Typography variant='subtitle2'>Is Internal Supplier</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography sx={{ margin: 1 }}>Remarks</Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={dataRow.remarks}
                  fullWidth
                  name='status'
                  disabled
                  onChange={handleTextChange}
                />
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </Grid>
    </Card>
  )
}

export default MoreInfoPurchaseInvoice
