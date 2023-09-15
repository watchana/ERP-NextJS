// ** React Imports
import React, { useState } from 'react'

// ** Mui Imports
import { DataGrid } from '@mui/x-data-grid'
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Checkbox,
  Collapse,
  Divider,
  IconButton,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Card,
  Grid
} from '@mui/material'

//Icon
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const PurchasingItem = ({ dataRow, setDataRow }) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  const [collapseSupplier, setCollapseSupplier] = useState(false)
  const [collapseDeferred, setCollapseDeferred] = useState(false)
  const [collapseForeign, setCollapseForeign] = useState(false)
  const [IsDeferredCheck, setIsDeferredCheck] = useState(false)

  const handleSupplier = () => {
    setCollapseSupplier(!collapseSupplier)
  }

  const handleDeferred = () => {
    setCollapseDeferred(!collapseDeferred)
  }

  const handleForeign = () => {
    setCollapseForeign(!collapseForeign)
  }

  const handleDeferredCheck = event => {
    setIsDeferredCheck(event.target.checked)
  }

  const handleCheckboxChange = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
    setDataRow({ ...dataRow, [event.target.name]: event.target.checked })
  }

  const handleTextChange = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setDataRow({ ...dataRow, [event.target.name]: event.target.value })
  }

  const Columns = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'Barcodes', headerName: 'Barcodes', width: 150 },
    { field: 'BarcodeType', headerName: 'Barcode Type', width: 200 }
  ]

  const Rows = [
    {
      id: 1,
      Barcodes: 'Lannister',
      BarcodeType: 'Cersei'
    },
    {
      id: 2,
      Barcodes: 'Lannister',
      BarcodeType: 'Jaime',
      UOM: 'dasd'
    }
  ]

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
        <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography sx={{ marginBottom: 2 }}>Default Purchase Unit of Measure</Typography>
            <TextField
              fullWidth
              size='small'
              variant='filled'
              label=''
              value={dataRow.purchase_uom || ''}
              name='purchase_uom'
              onChange={handleTextChange}
            />

            <Typography sx={{ marginBottom: 2 }} variant='subtitle1'>
              Minimum Order Qty
            </Typography>
            <TextField
              fullWidth
              size='small'
              variant='filled'
              label=''
              value={dataRow.min_order_qty || ''}
              name='min_order_qty'
              onChange={handleTextChange}
            />
            <Typography sx={{ marginBottom: 2 }} variant='subtitle2'>
              Minimum quantity should be as per Stock UOM
            </Typography>
            <Typography sx={{ marginBottom: 2 }}>Safety Stock</Typography>
            <TextField
              fullWidth
              size='small'
              variant='filled'
              label=''
              value={dataRow.safety_stock || ''}
              name='safety_stock'
              onChange={handleTextChange}
            />

            <FormControlLabel
              control={<Checkbox checked={Boolean(dataRow.is_purchase_item) || false} />}
              label=' Allow Purchase'
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography sx={{ marginBottom: 2 }}>Lead Time in days </Typography>
            <TextField
              fullWidth
              size='small'
              variant='filled'
              label=''
              value={dataRow.lead_time_days || ''}
              name='lead_time_days'
              onChange={handleTextChange}
            />

            <Typography sx={{ marginBottom: 2 }} variant='subtitle2'>
              Average time taken by the supplier to deliver
            </Typography>
            <Typography sx={{ marginBottom: 2 }}>Last Purchase Rate</Typography>
            <TextField
              fullWidth
              size='small'
              variant='filled'
              label=''
              value={dataRow.last_purchase_rate || ''}
              name='last_purchase_rate'
              onChange={handleTextChange}
            />

            <FormControlLabel
              control={<Checkbox checked={Boolean(dataRow.is_customer_provided_item) || false} />}
              label=' Is Customer Provided Item'
            />
          </Grid>
        </Grid>
        <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
        <Button variant='filled' label='' onClick={handleSupplier} sx={{ fontWeight: 'bold' }}>
          Supplier Details
        </Button>
        <IconButton size='small' onClick={handleSupplier}>
          {collapseSupplier ? (
            <ChevronUp sx={{ fontSize: '1.875rem' }} />
          ) : (
            <ChevronDown sx={{ fontSize: '1.875rem' }} />
          )}
        </IconButton>
        <Collapse in={collapseSupplier}>
          <Divider sx={{ margin: 0 }} />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sx={{ display: 'flex', mb: '5' }}>
                <FormControlLabel
                  control={<Checkbox checked={Boolean(dataRow.delivered_by_supplier) || false} />}
                  label=' Delivered by Supplier (Drop Ship)'
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: '5' }}>
                <DataGrid
                  rows={Rows}
                  columns={Columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 }
                    }
                  }}
                  pageSizeOptions={[5, 10]}
                  checkboxSelection
                />
                <Button>Add Row</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>

        <Divider sx={{ margin: 0, my: 5, width: '100%' }} />

        <Button variant='filled' type='text' onClick={handleDeferred} sx={{ fontWeight: 'bold' }} s>
          Deferred Expense
        </Button>
        <IconButton size='small' onClick={handleDeferred}>
          {collapseDeferred ? (
            <ChevronUp sx={{ fontSize: '1.875rem' }} />
          ) : (
            <ChevronDown sx={{ fontSize: '1.875rem' }} />
          )}
        </IconButton>

        <Collapse in={collapseDeferred}>
          <Divider sx={{ margin: 0 }} />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={IsDeferredCheck} onChange={handleDeferredCheck} />}
              variant='body2'
              label='Enable Deferred Expense'
            />
            {IsDeferredCheck && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Typography sx={{ marginBottom: 2 }}>Deferred Expense Account</Typography>
                  <TextField
                    fullWidth
                    size='small'
                    variant='filled'
                    value={dataRow.deferred_expense_account || ''}
                    name='deferred_expense_account'
                    onChange={handleTextChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Typography sx={{ marginBottom: 2 }}>No of Months (Expense)</Typography>
                  <TextField
                    fullWidth
                    size='small'
                    variant='filled'
                    value={dataRow.no_of_months_exp || ''}
                    name='no_of_months_exp'
                    onChange={handleTextChange}
                  />
                </Grid>
              </Grid>
            )}
          </FormGroup>
        </Collapse>
        <Divider sx={{ margin: 0, my: 5, width: '100%' }} />

        <Button variant='filled' type='text' onClick={handleForeign} sx={{ fontWeight: 'bold' }}>
          Foreign Trade Details
        </Button>
        <IconButton size='small' onClick={handleForeign}>
          {collapseForeign ? (
            <ChevronUp sx={{ fontSize: '1.875rem' }} />
          ) : (
            <ChevronDown sx={{ fontSize: '1.875rem' }} />
          )}
        </IconButton>

        <Collapse in={collapseForeign}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography sx={{ marginBottom: 2 }}>Country of Origin</Typography>
              <TextField
                fullWidth
                size='small'
                variant='filled'
                value={dataRow.country_of_origin || ''}
                name='country_of_origin'
                onChange={handleTextChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography sx={{ marginBottom: 2 }}>Customs Tariff Number</Typography>
              <TextField
                fullWidth
                size='small'
                variant='filled'
                value={dataRow.customs_tariff_number || ''}
                name='customs_tariff_number'
                onChange={handleTextChange}
              />
            </Grid>
          </Grid>
        </Collapse>
      </Card>
    </Box>
  )
}

export default PurchasingItem
