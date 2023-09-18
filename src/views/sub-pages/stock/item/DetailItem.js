// ** React Import
import React, { useEffect, useState } from 'react'

// ** Mui Import
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  TextField,
  TextareaAutosize,
  Typography
} from '@mui/material'
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const DetailItem = ({ dataRow, setDataRow }) => {
  const [collapseDescription, setCollapseDescription] = useState(false)

  const handleClickDescription = () => {
    setCollapseDescription(!collapseDescription)
  }

  const handleCheckboxChange = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
    setDataRow({ ...dataRow, [event.target.name]: event.target.checked === true ? 1 : 0 })
  }

  const handleTextChange = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setDataRow({ ...dataRow, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    console.log('dataRow', dataRow)
  }, [dataRow])

  const checkboxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
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
        <Grid container spacing={2} style={{ width: '100%', display: 'flex' }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography>Item Name</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              fullWidth
              size='small'
              variant='filled'
              value={dataRow.item_name || ''}
              name='item_name'
              onChange={handleTextChange}
            />
            <Typography>Item Group</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              fullWidth
              size='small'
              variant='filled'
              label=''
              value={dataRow.item_group || ''}
              name='item_group'
              onChange={handleTextChange}
            />
            <Typography>Default Unit of Measure</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              fullWidth
              size='small'
              variant='filled'
              label=''
              value={dataRow.stock_uom || ''}
              name='stock_uom'
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormControlLabel control={<Checkbox checked={dataRow.disabled || false} />} label='Disabled' />
            <FormControlLabel
              control={<Checkbox checked={dataRow.allow_alternative_item || false} />}
              label='Allow Alternative Item'
            />
            <FormControlLabel
              control={<Checkbox checked={Boolean(dataRow.is_stock_item) || false} />}
              label='is_stock_item'
            />
            <FormControlLabel
              control={<Checkbox checked={Boolean(dataRow.has_variants) || false} />}
              label='has_variants'
            />

            <Typography sx={{ mt: 4 }}>Valuation Rate</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              fullWidth
              size='small'
              variant='filled'
              value={parseFloat(dataRow.valuation_rate).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
              name='valuation_rate'
              onChange={handleTextChange}
            />
            <Box sx={{ display: 'flex' }}>
              <Checkbox
                checked={dataRow.is_fixed_asset === 1 ? true : false}
                name='is_fixed_asset'
                onChange={handleCheckboxChange}
              />
              <Typography sx={{ m: 2 }}>Is Fixed Asset</Typography>
            </Box>

            <Typography>Over Delivery / Receipt Allowance (%)</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              fullWidth
              size='small'
              variant='filled'
              value={parseFloat(dataRow.over_delivery_receipt_allowance).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
              name='over_delivery_receipt_allowance'
              onChange={handleTextChange}
            />

            <Typography>Over Billing Allowance (%)</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              fullWidth
              size='small'
              variant='filled'
              value={parseFloat(dataRow.over_billing_allowance).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
              name='over_billing_allowance'
              onChange={handleTextChange}
            />
          </Grid>
        </Grid>
        <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
        <Grid item xs={12} sx={{ display: 'flex', marginBlock: 2 }}>
          <Box onClick={handleClickDescription} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 'medium' }}>Description</Typography>
            <IconButton size='small' disabled>
              {collapseDescription ? <ChevronUp /> : <ChevronDown />}
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Collapse in={collapseDescription}>
            <Divider sx={{ margin: 0 }} />
            <CardContent>
              <Typography variant='subtitle2'>Description</Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={dataRow.description || ''}
                name='description'
                onChange={handleTextChange}
              />

              <Box>
                <Typography variant='subtitle1'>Brand</Typography>
                <TextField fullWidth size='small' variant='filled' />
              </Box>
            </CardContent>
          </Collapse>
        </Grid>
      </Card>
    </Box>
  )
}

export default DetailItem
