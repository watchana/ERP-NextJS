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
  TextField,
  Typography
} from '@mui/material'
import { ChevronDown, ChevronUp } from 'mdi-material-ui'
import { useState } from 'react'

const PaymentsPurchaseInvoice = ({ dataRow, setDataRow }) => {
  const [collapsePayments, setCollapsePayments] = useState(false)
  const [collapseWriteOff, setCollapseWriteOff] = useState(false)

  const handleCollapsePayments = () => {
    setCollapsePayments(!collapsePayments)
  }

  const handleWriteOff = () => {
    setCollapseWriteOff(!collapseWriteOff)
  }

  const handleCheckbox = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
    setDataRow({ ...dataRow, [event.target.name]: event.target.checked === true ? 1 : 0 })
  }

  const handleTextChange = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setDataRow({ ...dataRow, [event.target.name]: event.target.value })
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
            <Button size='small' variant='filled' label='' onClick={handleCollapsePayments}>
              Additional Discount
            </Button>
            <Box>
              <CardActions className='card-action-dense'>
                <IconButton size='small' onClick={handleCollapsePayments}>
                  {collapsePayments ? (
                    <ChevronUp sx={{ fontSize: '1.875rem' }} />
                  ) : (
                    <ChevronDown sx={{ fontSize: '1.875rem' }} />
                  )}
                </IconButton>
              </CardActions>
            </Box>
          </Box>

          <Collapse in={collapsePayments}>
            <Divider sx={{ margin: 0 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Grid sx={checkboxStyle}>
                  <Checkbox
                    checked={dataRow.allocate_advances_automatically === 1 ? true : false}
                    name='allocate_advances_automatically'
                    onChange={handleCheckbox}
                    disabled
                  />
                  <Typography variant='subtitle2'>Set Advances and Allocate (FIFO)</Typography>
                </Grid>

                <Button onClick={() => handleCollapsePayments()}>Get Advance Paid</Button>
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
        <Grid>
          <Box sx={{ display: 'flex' }}>
            <Button size='small' variant='filled' label='' onClick={handleWriteOff}>
              Write Off
            </Button>
            <Box>
              <CardActions className='card-action-dense'>
                <IconButton size='small' onClick={handleWriteOff}>
                  {collapseWriteOff ? (
                    <ChevronUp sx={{ fontSize: '1.875rem' }} />
                  ) : (
                    <ChevronDown sx={{ fontSize: '1.875rem' }} />
                  )}
                </IconButton>
              </CardActions>
            </Box>
          </Box>

          <Collapse in={collapseWriteOff}>
            <Divider sx={{ margin: 0 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography sx={{ margin: 1 }}>Write Off Amount (THB)</Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={dataRow.write_off_amount}
                  fullWidth
                  onChange={handleTextChange}
                  name='write_off_amount'
                  disabled
                />
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </Grid>
    </Card>
  )
}

export default PaymentsPurchaseInvoice
