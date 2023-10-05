// ** React Import
import React from 'react'

// ** Mui Import
import { Box, Grid, Typography, Checkbox, FormGroup, FormControlLabel, Card, Select, MenuItem } from '@mui/material'

import { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { HoldType } from 'src/dummy/sub-pages/buying/supplierPage'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'

const SettingsSupplier = ({ dataRow, handleUpdateData }) => {
  const endOfLifeDate = dayjs(dataRow.release_date)

  // ** State
  const [valuationRateOpen, setValuationRateOpen] = useState(dataRow.on_hold === 1 ? true : false)

  const handleDateChange = (name, date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD')
    handleUpdateData(name, formattedDate)
  }

  const handleCheckboxChange = event => {
    const { name } = event.target
    if (name === 'on_hold') {
      setValuationRateOpen(!valuationRateOpen)
    }
    handleUpdateData(name, event.target.checked === true ? 1 : 0)
  }

  const handleSelectChange = event => {
    handleUpdateData(event.target.name, event.target.value)
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
      mt: 1
    }
  }

  return (
    <Box>
      <Card sx={styles.card}>
        {/* ////////////////////////////////////// แถวที่ 1 ///////////////////////////////////////////// */}
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <FormGroup>
              <Box sx={styles.box}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Boolean(dataRow.allow_purchase_invoice_creation_without_purchase_order)}
                      name='allow_purchase_invoice_creation_without_purchase_order'
                      onChange={handleCheckboxChange}
                    />
                  }
                  label='Allow Purchase Invoice Creation Without Purchase Order'
                />
              </Box>

              <Box sx={styles.box}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Boolean(dataRow.allow_purchase_invoice_creation_without_purchase_receipt)}
                      name='allow_purchase_invoice_creation_without_purchase_receipt'
                      onChange={handleCheckboxChange}
                    />
                  }
                  label='Allow Purchase Invoice Creation Without Purchase Receipt'
                />
              </Box>

              <Box sx={styles.box}>
                <FormControlLabel
                  control={
                    <Checkbox checked={Boolean(dataRow.is_frozen)} name='is_frozen' onChange={handleCheckboxChange} />
                  }
                  label='Is Frozen'
                />
              </Box>

              <Box sx={styles.box}>
                <FormControlLabel
                  control={
                    <Checkbox checked={Boolean(dataRow.disabled)} name='disabled' onChange={handleCheckboxChange} />
                  }
                  label='Disabled'
                />
              </Box>

              <Box sx={{ borderBottom: '0.5px solid rgba(0, 0, 0, 0.1)', m: 8 }}></Box>
            </FormGroup>
            <Typography sx={{ marginBottom: 1 }}>Mention if non-standard payable account</Typography>
            <Grid item xs={12} sm={6} md={12}>
              <FormControlLabel
                control={<Checkbox checked={Boolean(dataRow.on_hold)} name='on_hold' onChange={handleCheckboxChange} />}
                label='Maintain Stock'
              />
              {valuationRateOpen && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.BoxStyle}>
                      <Typography variant='subtitle2' sx={{ my: 2 }}>
                        Pupplier Type
                      </Typography>
                      <Select
                        fullWidth
                        name='hold_type'
                        value={dataRow.hold_type}
                        onChange={handleSelectChange}
                        sx={{
                          backgroundColor: 'grey.100'
                        }}
                      >
                        {HoldType.map(supplier => (
                          <MenuItem key={supplier.id} value={supplier.name}>
                            {supplier.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={styles.BoxStyle}>
                      <Typography variant='subtitle2' sx={{ my: 2 }}>
                        End of Life
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{
                            backgroundColor: 'grey.100',
                            width: '100%'
                          }}
                          views={['year', 'month', 'day']}
                          value={''}
                          onChange={date => handleDateChange('end_of_life', date)}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default SettingsSupplier
