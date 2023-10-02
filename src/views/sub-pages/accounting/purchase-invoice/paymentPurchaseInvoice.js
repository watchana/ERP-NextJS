// ** React Import
import React from 'react'

// ** Mui Import
import {
  Grid,
  Box,
  Card,
  Collapse,
  Divider,
  FormControlLabel,
  Checkbox,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'

import { useState } from 'react'
import Btn from 'src/components/Button/Button'
import { GridExpandMoreIcon } from '@mui/x-data-grid'

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
    <Box>
      <Accordion>
        <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
          <Typography> Tax Breakup</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ p: 2 }}>
            <Divider />
            <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
              <Grid item xs={12}>
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

              <Grid item xs={12}>
                <Btn
                  detailbutton={' Get Advances Automatically'}
                  bgcolorbutton={'white'}
                  numminwid={'auto'}
                  handleButtonClick={() => router.push()}
                />
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
          <Typography> Loyailty Points Redemption</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ p: 2 }}>
            <Divider />
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <FormControlLabel
                control={<Checkbox checked={dataRow?.redeem_loyalty_points === 1} onChange={handleCheckboxChange} />}
                label='Redeem Loyalty Points'
              />
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default PaymentsPurchaseInvoice
