import {
  Box,
  Button,
  Card,
  CardActions,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
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
      <Box sx={{ display: 'flex' }}>
        <Button size='small' variant='filled' label='' sx={{ fontWeight: 'bold' }} onClick={handleCollapseStatus}>
          Additional Discount
        </Button>
        <IconButton size='small' onClick={handleCollapseStatus}>
          {collapseStatus ? <ChevronUp sx={{ fontSize: '1.875rem' }} /> : <ChevronDown sx={{ fontSize: '1.875rem' }} />}
        </IconButton>
      </Box>

      <Grid container>
        <Collapse in={collapseStatus} style={{ width: '100%' }}>
          <Divider sx={{ margin: 0, width: '100%' }} />
          <Grid container>
            <Grid item xs={12}>
              <Typography sx={{ margin: 1 }}>Status</Typography>
              <TextField
                size='small'
                variant='filled'
                value={dataRow?.status || ''}
                fullWidth
                onChange={handleTextChange}
                sx={{
                  pointerEvents: 'none'
                }}
              />
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
      <Divider sx={{ margin: 0, my: 3, width: '100%' }} />
      <Grid>
        <Box sx={{ display: 'flex' }}>
          <Button size='small' variant='filled' label='' sx={{ fontWeight: 'bold' }} onClick={handleCollapesAccouting}>
            Accounting Details
          </Button>
          <Box>
            <IconButton size='small' onClick={handleCollapesAccouting}>
              {collapseAccouting ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </IconButton>
          </Box>
        </Box>

        <Collapse in={collapseAccouting}>
          <Divider sx={{ margin: 0, width: '100%' }} />
          <Grid container>
            <Grid item xs={12}>
              <Typography sx={{ margin: 1 }}>Credit To</Typography>
              <TextField
                size='small'
                variant='filled'
                value={dataRow?.credit_to || ''}
                onChange={handleTextChange}
                fullWidth
              />

              <Typography sx={{ margin: 1 }}>Is Opening Entry</Typography>
              <TextField
                size='small'
                variant='filled'
                value={dataRow?.is_opening || ''}
                fullWidth
                name='is_opening'
                onChange={handleTextChange}
                sx={{
                  pointerEvents: 'none'
                }}
              />
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
      <Divider sx={{ margin: 0, my: 3, width: '100%' }} />
      <Grid>
        <Box sx={{ display: 'flex' }}>
          <Button size='small' variant='filled' label='' sx={{ fontWeight: 'bold' }} onClick={handleSubscription}>
            Subscription
          </Button>
          <Box>
            <IconButton size='small' onClick={handleSubscription}>
              {collapseSubscription ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </IconButton>
          </Box>
        </Box>

        <Collapse in={collapseSubscription}>
          <Divider sx={{ margin: 0, width: '100%' }} />
          <Grid container>
            <Grid item xs={12}>
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

      <Divider sx={{ margin: 0, my: 3, width: '100%' }} />
      <Grid>
        <Box sx={{ display: 'flex' }}>
          <Button size='small' variant='filled' label='' sx={{ fontWeight: 'bold' }} onClick={handleCollapsePrint}>
            Print Setting
          </Button>
          <IconButton size='small' onClick={handleCollapsePrint}>
            {collapsePrint ? (
              <ChevronUp sx={{ fontSize: '1.875rem' }} />
            ) : (
              <ChevronDown sx={{ fontSize: '1.875rem' }} />
            )}
          </IconButton>
        </Box>
        <Grid container>
          <Collapse in={collapsePrint} width={'100%'} style={{ width: '100%' }}>
            <Divider sx={{ margin: 0, width: '100%' }} />
            <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                {' '}
                <Typography sx={{ margin: 1 }}>Letter Head </Typography>
                <TextField
                  sx={{ marginBottom: 5 }}
                  size='small'
                  variant='filled'
                  fullWidth
                  value={dataRow?.letter_head}
                />
                <FormControlLabel
                  control={<Checkbox checked={Boolean(dataRow?.group_same_items) || false} />}
                  label='Group same items'
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography sx={{ margin: 1 }}>Print Heading</Typography>
                <TextField
                  sx={{ marginBottom: 5 }}
                  size='small'
                  variant='filled'
                  fullWidth
                  value={dataRow?.select_print_heading || ''}
                />

                <Typography sx={{ margin: 1 }}>Print Language</Typography>
                <TextField
                  sx={{ marginBottom: 5 }}
                  size='small'
                  variant='filled'
                  fullWidth
                  value={dataRow?.language || ''}
                />
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </Grid>
      <Divider sx={{ margin: 0, my: 3, width: '100%' }} />
      <Grid>
        <Box sx={{ display: 'flex' }}>
          <Button size='small' variant='filled' label='' sx={{ fontWeight: 'bold' }} onClick={handleCollapseHold}>
            Hold Invoice
          </Button>
          <Box>
            <IconButton size='small' onClick={handleCollapseHold}>
              {collapseHold ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </IconButton>
          </Box>
        </Box>

        <Collapse in={collapseHold}>
          <Divider sx={{ margin: 0, width: '100%' }} />
          <Grid container>
            <Grid item xs={12}>
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
      <Divider sx={{ margin: 0, my: 3, width: '100%' }} />
      <Grid>
        <Box sx={{ display: 'flex' }}>
          <Button size='small' variant='filled' label='' sx={{ fontWeight: 'bold' }} onClick={handleCollapseAdditional}>
            Additional Info
          </Button>
          <Box>
            <IconButton size='small' onClick={handleCollapseAdditional}>
              {collapseAdditional ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </IconButton>
          </Box>
        </Box>

        <Collapse in={collapseAdditional}>
          <Divider sx={{ margin: 0, width: '100%' }} />
          <Grid container>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <Typography sx={{ margin: 1 }}>Remarks</Typography>
              <TextField
                size='small'
                variant='filled'
                value={dataRow?.remarks || ''}
                fullWidth
                onChange={handleTextChange}
                sx={{
                  pointerEvents: 'none'
                }}
              />
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
    </Card>
  )
}

export default MoreInfoPurchaseInvoice
