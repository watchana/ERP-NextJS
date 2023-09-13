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
    setDataRow({ ...dataRow, [event.target.name]: event.target.checked })
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ margin: 1 }}>Item Name</Typography>
            <TextField
              fullWidth
              size='small'
              variant='filled'
              value={dataRow.item_name || ''}
              name='item_name'
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ marginBottom: 2 }}>Item Group</Typography>
            <TextField
              fullWidth
              size='small'
              variant='filled'
              label=''
              value={dataRow.item_group || ''}
              name='item_group'
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={checkboxStyle}>
            <Checkbox checked={dataRow.disabled === 1 ? true : false} name='disabled' onChange={handleCheckboxChange} />
            <Typography variant='subtitle2'>Disabled</Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={checkboxStyle}>
            <Checkbox
              checked={dataRow.allow_alternative_item === 1 ? true : false}
              name='allow_alternative_item'
              onChange={handleCheckboxChange}
            />
            <Typography variant='subtitle2'>Allow Alternative Item</Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={checkboxStyle}>
            <Checkbox
              checked={dataRow.is_stock_item === 1 ? true : false}
              name='is_stock_item'
              onChange={handleCheckboxChange}
            />
            <Typography variant='subtitle2'>Maintain Stock</Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={checkboxStyle}>
            <Checkbox
              checked={dataRow.has_variants === 1 ? true : false}
              name='has_variants'
              onChange={handleCheckboxChange}
            />
            <Typography variant='subtitle2'>Has Variants</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ marginBottom: 2 }}>Default Unit of Measure</Typography>
            <TextField
              fullWidth
              size='small'
              variant='filled'
              label=''
              value={dataRow.stock_uom || ''}
              name='stock_uom'
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ marginBottom: 2 }}>Valuation Rate</Typography>
            <TextField
              fullWidth
              size='small'
              variant='filled'
              label=''
              value={dataRow.valuation_rate || ''}
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ marginBottom: 2 }}>Over Delivery / Receipt Allowance (%)</Typography>
            <TextField
              fullWidth
              size='small'
              variant='filled'
              value={dataRow.over_delivery_receipt_allowance || ''}
              name='over_delivery_receipt_allowance'
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ alignSelf: 'flex-end' }}>
            <Typography sx={{ marginBottom: 2 }}>Over Billing Allowance (%)</Typography>
            <TextField
              fullWidth
              size='small'
              variant='filled'
              label=''
              value={dataRow.over_billing_allowance || ''}
              name='over_billing_allowance'
              onChange={handleTextChange}
            />
          </Grid>
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
                <Box>
                  <Typography variant='subtitle2'>Description</Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={dataRow.description || ''}
                    name='description'
                    onChange={handleTextChange}
                  />
                </Box>
                <Box>
                  <Typography variant='subtitle1'>Brand</Typography>
                  <TextField fullWidth size='small' variant='filled' />
                </Box>
              </CardContent>
            </Collapse>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default DetailItem
