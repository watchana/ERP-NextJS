// ** React Import
import React, { useEffect, useState } from 'react'

// ** Mui Import
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Skeleton,
  TextField,
  Typography
} from '@mui/material'
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const DetailItem = ({ dataRow, handleUpdateData }) => {
  const [descriptionOpen, setDescriptionOpen] = useState(false)

  const handleClickDescription = () => {
    setDescriptionOpen(!descriptionOpen)
  }

  const handleCheckboxChange = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
    handleUpdateData(event.target.name, event.target.checked === true ? 1 : 0)
  }

  const handleTextChange = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    handleUpdateData(event.target.name, event.target.value)
  }

  useEffect(() => {
    console.log('dataRow', dataRow)
  }, [dataRow])

  if (!dataRow) return <Skeleton variant='rounded' width={210} height={60} />

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
          <Grid item sm={12} md={6}>
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
              disabled
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
              disabled
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={dataRow.disabled === 1 ? true : false}
                  name='disabled'
                  onChange={handleCheckboxChange}
                />
              }
              label='Disabled'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={dataRow.allow_alternative_item === 1 ? true : false}
                  name='allow_alternative_item'
                  onChange={handleCheckboxChange}
                />
              }
              label='Allow Alternative Item'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={dataRow.is_stock_item === 1 ? true : false}
                  name='is_stock_item'
                  onChange={handleCheckboxChange}
                />
              }
              label='Maintain Stock'
            />
            <FormControlLabel
              control={<Checkbox disabled checked={Boolean(dataRow.has_variants) === 1 ? true : false} />}
              label='Has Variants'
            />

            <Typography sx={{ mt: 4 }}>Valuation Rate</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              fullWidth
              size='small'
              variant='filled'
              type='number'
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

            <Typography>Over Delivery / Receipt Allowance (%)</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              fullWidth
              size='small'
              variant='filled'
              type='number'
              value={dataRow.over_delivery_receipt_allowance}
              name='over_delivery_receipt_allowance'
              onChange={handleTextChange}
            />

            <Typography>Over Billing Allowance (%)</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              fullWidth
              size='small'
              variant='filled'
              type='number'
              value={dataRow.over_billing_allowance}
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
              {descriptionOpen ? <ChevronUp /> : <ChevronDown />}
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Collapse in={descriptionOpen}>
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
                <TextField
                  fullWidth
                  size='small'
                  variant='filled'
                  name='brand'
                  value={dataRow.brand}
                  onChange={handleTextChange}
                />
              </Box>
            </CardContent>
          </Collapse>
        </Grid>
      </Card>
    </Box>
  )
}

export default DetailItem
