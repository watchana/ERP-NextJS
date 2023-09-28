// ** React Imports
import React, { useCallback, useState } from 'react'

// ** Mui Imports
import { DataGrid } from '@mui/x-data-grid'
import {
  Box,
  Button,
  Checkbox,
  TextField,
  Typography,
  FormControlLabel,
  Card,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const columnsSupplierItem = [
  { field: 'id', headerName: 'No', width: 70 },
  { field: 'Barcodes', headerName: 'Barcodes', width: 150 },
  { field: 'BarcodeType', headerName: 'Barcode Type', width: 200 }
]

const PurchasingItem = ({ dataRow, handleUpdateData }) => {
  const handleCheckboxChange = event => {
    handleUpdateData(event.target.name, event.target.checked === true ? 1 : 0)
  }

  const handleTextChange = event => {
    handleUpdateData(event.target.name, event.target.value)
  }

  const style = {
    styleBox: {
      marginBlock: 3
    },
    styleTextField: {
      backgroundColor: 'grey.100'
    }
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
        <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item sm={12} md={6}>
            <Box sx={style.styleBox}>
              <Typography sx={{ marginBottom: 2 }}>Default Purchase Unit of Measure</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='purchase_uom'
                value={dataRow.purchase_uom}
                onChange={handleTextChange}
                sx={{
                  backgroundColor: 'grey.100'
                }}
              />
            </Box>

            <Box sx={style.styleBox}>
              <Typography variant='subtitle1' sx={{ marginBottom: 2 }}>
                Minimum Order Qty
              </Typography>
              <TextField
                fullWidth
                variant='outlined'
                name='min_order_qty'
                value={dataRow.min_order_qty}
                onChange={handleTextChange}
                sx={{
                  backgroundColor: 'grey.100'
                }}
              />
              <Typography sx={{ marginBottom: 2 }} variant='subtitle2'>
                Minimum quantity should be as per Stock UOM
              </Typography>
            </Box>

            <Box sx={style.styleBox}>
              <Typography sx={{ my: 2 }}>Safety Stock</Typography>
              <TextField
                fullWidth
                variant='outlined'
                name='safety_stock'
                value={dataRow.safety_stock}
                onChange={handleTextChange}
                sx={{
                  backgroundColor: 'grey.100'
                }}
              />
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  name='is_purchase_item'
                  checked={Boolean(dataRow.is_purchase_item)}
                  onChange={handleCheckboxChange}
                />
              }
              label=' Allow Purchase'
            />
          </Grid>

          <Grid item sm={12} md={6}>
            <Box sx={style.styleBox}>
              <Typography sx={{ marginBottom: 2 }}>Lead Time in days </Typography>
              <TextField
                fullWidth
                variant='outlined'
                name='lead_time_days'
                value={dataRow.lead_time_days}
                onChange={handleTextChange}
                sx={{
                  backgroundColor: 'grey.100'
                }}
              />
              <Typography variant='subtitle2'>Average time taken by the supplier to deliver</Typography>
            </Box>

            <Box sx={{ marginBlock: 2 }}>
              <Typography sx={{ marginBottom: 2 }}>Last Purchase Rate</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='last_purchase_rate'
                value={dataRow.last_purchase_rate}
                onChange={handleTextChange}
                sx={{
                  backgroundColor: 'grey.100'
                }}
              />
            </Box>

            <Box sx={{ marginBlock: 2 }}>
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
            </Box>

            {dataRow.is_customer_provided_item === 1 && (
              <Box sx={{ marginBlock: 2 }}>
                <Typography sx={{ marginBottom: 2 }}>Customer</Typography>
                <TextField
                  fullWidth
                  disabled
                  variant='outlined'
                  name='customer'
                  value={dataRow.customer}
                  onChange={handleTextChange}
                  sx={{
                    backgroundColor: 'grey.100'
                  }}
                />
              </Box>
            )}
          </Grid>
        </Grid>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Supplier Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
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
            <Typography sx={{ marginBottom: 2 }}>Supplier Items</Typography>
            <DataGrid
              style={{ height: dataRow.supplier_items.length === 0 ? 300 : 'auto' }}
              rows={dataRow.supplier_items}
              columns={columnsSupplierItem}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 }
                }
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
            <Button variant='contained' sx={{ my: 2 }}>
              Add Row
            </Button>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Deferred Expense</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControlLabel
              control={<Checkbox checked={Boolean(dataRow.enable_deferred_expense)} onChange={handleCheckboxChange} />}
              variant='body2'
              label='Enable Deferred Expense'
            />
            {dataRow.enable_deferred_expense && (
              <Grid container spacing={2}>
                <Grid item sm={12} md={6}>
                  <Typography sx={{ marginBottom: 2 }}>Deferred Expense Account</Typography>
                  <TextField
                    fullWidth
                    disabled
                    variant='outlined'
                    name='deferred_expense_account'
                    value={dataRow.deferred_expense_account}
                    onChange={handleTextChange}
                    sx={{
                      backgroundColor: 'grey.100'
                    }}
                  />
                </Grid>
                <Grid item sm={12} md={6}>
                  <Typography sx={{ marginBottom: 2 }}>No of Months (Expense)</Typography>
                  <TextField
                    fullWidth
                    type='number'
                    variant='outlined'
                    name='no_of_months_exp'
                    value={dataRow.no_of_months_exp}
                    onChange={handleTextChange}
                    sx={{
                      backgroundColor: 'grey.100'
                    }}
                  />
                </Grid>
              </Grid>
            )}
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Foreign Trade Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6}>
                <Typography sx={{ marginBottom: 2 }}>Country of Origin</Typography>
                <TextField
                  fullWidth
                  variant='outlined'
                  name='country_of_origin'
                  value={dataRow.country_of_origin}
                  onChange={handleTextChange}
                  sx={{
                    backgroundColor: 'grey.100'
                  }}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <Typography sx={{ marginBottom: 2 }}>Customs Tariff Number</Typography>
                <TextField
                  fullWidth
                  variant='outlined'
                  name='customs_tariff_number'
                  value={dataRow.customs_tariff_number}
                  onChange={handleTextChange}
                  sx={{
                    backgroundColor: 'grey.100'
                  }}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Card>
    </Box>
  )
}

export default PurchasingItem
