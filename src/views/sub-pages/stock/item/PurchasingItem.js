// ** React Imports
import React, { useState } from 'react'

// ** Mui Imports
import { DataGrid } from '@mui/x-data-grid'
import {
  Box,
  Button,
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

const PurchasingItem = ({ dataRow, handleUpdateData }) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  const [collapseSupplierDetailsOpen, setCollapseSupplierDetailsOpen] = useState(false)
  const [collapseDeferredExpenseOpen, setCollapseDeferredExpenseOpen] = useState(false)
  const [collapseForeignTradeDetailsOpen, setCollapseForeignTradeDetailsOpen] = useState(false)

  const handleSupplierDetails = () => {
    setCollapseSupplierDetailsOpen(!collapseSupplierDetailsOpen)
  }

  const handleDeferredExpense = () => {
    setCollapseDeferredExpenseOpen(!collapseDeferredExpenseOpen)
  }

  const handleForeignTradeDetails = () => {
    setCollapseForeignTradeDetailsOpen(!collapseForeignTradeDetailsOpen)
  }

  const handleCheckboxChange = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
    handleUpdateData(event.target.name, event.target.checked === true ? 1 : 0)
  }

  const handleTextChange = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    handleUpdateData(event.target.name, event.target.value)
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
              disabled
              size='small'
              variant='filled'
              label=''
              value={dataRow.purchase_uom || ''}
              name='purchase_uom'
              onChange={handleTextChange}
            />

            <Typography sx={{ my: 2 }} variant='subtitle1'>
              Minimum Order Qty
            </Typography>
            <TextField
              fullWidth
              size='small'
              variant='filled'
              label=''
              value={dataRow.min_order_qty}
              name='min_order_qty'
              onChange={handleTextChange}
            />
            <Typography sx={{ marginBottom: 2 }} variant='subtitle2'>
              Minimum quantity should be as per Stock UOM
            </Typography>
            <Typography sx={{ my: 2 }}>Safety Stock</Typography>
            <TextField
              fullWidth
              size='small'
              variant='filled'
              value={dataRow?.safety_stock}
              name='safety_stock'
              onChange={handleTextChange}
            />

            <FormControlLabel
              control={<Checkbox checked={Boolean(dataRow.is_purchase_item)} />}
              label=' Allow Purchase'
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography sx={{ marginBottom: 2 }}>Lead Time in days </Typography>
            <TextField
              fullWidth
              size='small'
              variant='filled'
              value={dataRow?.lead_time_days}
              name='lead_time_days'
              onChange={handleTextChange}
            />

            <Typography sx={{ marginBottom: 2 }} variant='subtitle2'>
              Average time taken by the supplier to deliver
            </Typography>
            <Typography sx={{ marginBottom: 2 }}>Last Purchase Rate</Typography>
            <TextField
              fullWidth
              disabled
              size='small'
              variant='filled'
              value={dataRow?.last_purchase_rate}
              name='last_purchase_rate'
              onChange={handleTextChange}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name='is_customer_provided_item'
                  checked={Boolean(dataRow.is_customer_provided_item)}
                  onChange={handleCheckboxChange}
                />
              }
              label=' Is Customer Provided Item'
            />
            {dataRow.is_customer_provided_item && (
              <>
                <Typography sx={{ marginBottom: 2 }}>Customer</Typography>
                <TextField
                  fullWidth
                  disabled
                  size='small'
                  variant='filled'
                  value={dataRow?.customer}
                  name='last_purchase_rate'
                  onChange={handleTextChange}
                />
              </>
            )}
          </Grid>
        </Grid>
        <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
        <Button variant='filled' label='' onClick={handleSupplierDetails} sx={{ fontWeight: 'bold' }}>
          Supplier Details
        </Button>
        <IconButton size='small' onClick={handleSupplierDetails}>
          {collapseSupplierDetailsOpen ? (
            <ChevronUp sx={{ fontSize: '1.875rem' }} />
          ) : (
            <ChevronDown sx={{ fontSize: '1.875rem' }} />
          )}
        </IconButton>
        <Collapse in={collapseSupplierDetailsOpen}>
          <Divider sx={{ margin: 0 }} />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sx={{ display: 'flex', mb: '5' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name='delivered_by_supplier'
                      checked={Boolean(dataRow.delivered_by_supplier)}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label=' Delivered by Supplier (Drop Ship)'
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: '5' }}>
                <Typography sx={{ marginBottom: 2 }}>Supplier Items</Typography>
                <DataGrid
                  rows={dataRow.supplier_items}
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

        <Button variant='filled' type='text' onClick={handleDeferredExpense} sx={{ fontWeight: 'bold' }} s>
          Deferred Expense
        </Button>
        <IconButton size='small' onClick={handleDeferredExpense}>
          {collapseDeferredExpenseOpen ? (
            <ChevronUp sx={{ fontSize: '1.875rem' }} />
          ) : (
            <ChevronDown sx={{ fontSize: '1.875rem' }} />
          )}
        </IconButton>

        <Collapse in={collapseDeferredExpenseOpen}>
          <Divider sx={{ margin: 0 }} />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={Boolean(dataRow.enable_deferred_expense)} onChange={handleCheckboxChange} />}
              variant='body2'
              label='Enable Deferred Expense'
            />
            {dataRow.enable_deferred_expense && (
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
                    value={
                      dataRow?.no_of_months_exp === '0.0'
                        ? '฿ 0.0'
                        : `฿ ${parseFloat(dataRow?.no_of_months_exp).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}`
                    }
                    name='no_of_months_exp'
                    onChange={handleTextChange}
                  />
                </Grid>
              </Grid>
            )}
          </FormGroup>
        </Collapse>
        <Divider sx={{ margin: 0, my: 5, width: '100%' }} />

        <Button variant='filled' type='text' onClick={handleForeignTradeDetails} sx={{ fontWeight: 'bold' }}>
          Foreign Trade Details
        </Button>
        <IconButton size='small' onClick={handleForeignTradeDetails}>
          {collapseForeignTradeDetailsOpen ? (
            <ChevronUp sx={{ fontSize: '1.875rem' }} />
          ) : (
            <ChevronDown sx={{ fontSize: '1.875rem' }} />
          )}
        </IconButton>

        <Collapse in={collapseForeignTradeDetailsOpen}>
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
