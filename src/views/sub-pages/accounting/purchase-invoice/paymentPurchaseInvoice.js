// ** React Import
import React from 'react'

// ** Mui Import
import {
  Grid,
  Box,
  Button,
  Card,
  IconButton,
  Collapse,
  Divider,
  FormControlLabel,
  Checkbox,
  Typography,
  TextField,
  InputAdornment
} from '@mui/material'
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { useState } from 'react'
import Btn from 'src/components/Button/Button'

const PaymentsPurchaseInvoice = ({ dataRow }) => {
  // ** State
  const [advancePayments, setAdvancepayments] = useState(false)
  const [loyailtyPointsRedemption, setloyailtyPointsRedemption] = useState(false)

  const handleClickAdvancePayments = () => {
    setAdvancepayments(!advancePayments)
  }

  const handleClickLoyailtyPointsRedemption = () => {
    setloyailtyPointsRedemption(!loyailtyPointsRedemption)
  }

  /*  checkbox */
  const handleCheckboxChange = event => {
    // เมื่อ Checkbox ถูกเปลี่ยนแปลงสถานะ
    // คุณสามารถทำสิ่งที่คุณต้องการเมื่อ Checkbox ถูกเปิดหรือปิดที่นี่
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
  }

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
        <Grid container sx={{ mt: 7 }}>
          <Box sx={{ width: '100%' }}>
            <Button size='small' variant='filled' label='' onClick={handleClickAdvancePayments}>
              Advance Payments
            </Button>
            <IconButton size='small' onClick={handleClickAdvancePayments}>
              {advancePayments ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </IconButton>
          </Box>

          <Collapse in={advancePayments} style={{ width: '100%' }}>
            <Divider sx={{ margin: 0, width: '100%' }} />
            <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dataRow?.allocate_advances_automatically === 1}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label='Allocate Advances Automatically (FIFO)
'
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Btn
                  detailbutton={' Get Advances Automatically'}
                  bgcolorbutton={'white'}
                  numminwid={'auto'}
                  handleButtonClick={() => router.push()}
                />
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
        <Divider sx={{ margin: 0, my: 5 }} />

        <Grid container>
          <Box sx={{ width: '100%' }}>
            <Button size='small' variant='filled' label='' onClick={handleClickLoyailtyPointsRedemption}>
              Write Off
            </Button>
            <IconButton size='small' onClick={handleClickLoyailtyPointsRedemption}>
              {loyailtyPointsRedemption ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </IconButton>
          </Box>

          <Collapse in={loyailtyPointsRedemption} style={{ width: '100%' }}>
            <Divider sx={{ margin: 0, width: '100%' }} />
            <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography>Write Off Amount (THB)</Typography>
                <TextField
                  sx={{ marginBottom: 5 }}
                  size='small'
                  variant='filled'
                  fullWidth
                  value={dataRow.write_off_amount.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Typography>฿</Typography>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </Card>
    </Box>
  )
}

export default PaymentsPurchaseInvoice
