// ** React Import
import React from 'react'

// ** Mui Import
import { Box, Grid, TextField, Typography, Checkbox, InputAdornment, IconButton, Divider, Card } from '@mui/material'

import { useState } from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import DorpdownButton from 'src/components/Button/Dorpdown_Text/Dorpdown_text'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import EventIcon from '@mui/icons-material/Event'
import dayjs from 'dayjs'

const SettingsSupplier = () => {
  const [setAge] = useState('')

  // ** State
  const [isInternalSupplier, setIsInternalSupplier] = useState(false)

  const handleCheckboxChange = event => {
    setIsInternalSupplier(event.target.checked)
  }

  const handleOpenCalendar = () => {
    setOpenCalendar(true)
  }

  const handleDateChange = date => {
    if (date) {
      setSelectedDate(date)
    }
    setOpenCalendar(false) // ปิดปฏิทินเสมอเมื่อมีการเลือกหรือไม่เลือก
  }

  const [openCalendar, setOpenCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)

  return (
    <Box>
      <Card
        sx={{
          borderTopLeftRadius: 0, // กำหนด borderRadius สำหรับมุมบนซ้าย
          borderTopRightRadius: 0, // กำหนด borderRadius สำหรับมุมบนขวา
          p: 2,
          mb: 2
        }}
      >
        {/* ////////////////////////////////////// แถวที่ 1 ///////////////////////////////////////////// */}
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} lg={12}>
            <FormGroup>
              <FormControlLabel
                sx={{ marginBottom: 1 }}
                control={<Checkbox defaultChecked />}
                label='Allow Purchase Invoice Creation Without Purchase Order'
              />
              <FormControlLabel
                sx={{ marginBottom: 1 }}
                control={<Checkbox defaultChecked />}
                label='Allow Purchase Invoice Creation Without Purchase Receipt'
              />
              <FormControlLabel sx={{ marginBottom: 1 }} control={<Checkbox defaultChecked />} label='Is Frozen' />
              <FormControlLabel sx={{ marginBottom: 1 }} control={<Checkbox defaultChecked />} label='Disabled' />
              <Box sx={{ borderBottom: '0.5px solid rgba(0, 0, 0, 0.1)', m: 8 }}></Box>
            </FormGroup>
            <Typography sx={{ marginBottom: 1 }}>Mention if non-standard payable account</Typography>

            <FormControlLabel
              control={<Checkbox checked={isInternalSupplier} onChange={handleCheckboxChange} />}
              variant='body2'
              label='Is Internal Supplier'
            />
            {isInternalSupplier && (
              <Box>
                <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Grid item xs={12}>
                    <Typography>Hold Type </Typography>
                    <DorpdownButton />

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
                        <Typography sx={{ marginBottom: 5 }}>Release Date </Typography>
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
                <Typography sx={{ marginBottom: 2 }}>Leave blank if the Supplier is blocked indefinitely </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default SettingsSupplier
