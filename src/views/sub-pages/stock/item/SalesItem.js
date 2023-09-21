// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  Button,
  CardActions,
  IconButton,
  Collapse,
  Divider,
  CardContent,
  FormGroup,
  FormControlLabel,
  Card,
  Grid
} from '@mui/material'

//Icon MUI
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { DataGrid } from '@mui/x-data-grid'

const SalesItem = ({ dataRow, handleUpdateData }) => {
  const [collapseDeferredOpen, setCollapseDeferredOpen] = useState(false)
  const [collapseCustomerOpen, setCollapseCustomerOpen] = useState(false)

  const handleDeferred = () => {
    setCollapseDeferredOpen(!collapseDeferredOpen)
  }

  const handleCustomer = () => {
    setCollapseCustomerOpen(!collapseCustomerOpen)
  }

  const handleCheckboxChange = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
    handleUpdateData(event.target.name, event.target.checked === true ? 1 : 0)
  }

  const handleTextChange = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    handleUpdateData(event.target.name, event.target.value)
  }

  const columnsCustomer = [
    { field: 'idx', headerName: 'No', width: 70 },
    { field: 'customer_name', headerName: 'Customer Name', width: 150 },
    { field: 'customer_group', headerName: 'Customer Group', width: 200 },
    { field: 'ref_code', headerName: 'Ref Code', width: 200 }
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
            <Typography sx={{ marginBottom: 2 }}>Default Sales Unit of Measure</Typography>
            <TextField
              fullWidth
              disabled
              size='small'
              variant='filled'
              label=''
              value={dataRow.sales_uom || ''}
              name='sales_uom'
              onChange={handleTextChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name='grant_commission'
                  checked={Boolean(dataRow.grant_commission)}
                  onChange={handleCheckboxChange}
                />
              }
              label=' Grant Commission'
            />
            <FormControlLabel
              control={
                <Checkbox
                  name='is_sales_item'
                  checked={Boolean(dataRow.is_sales_item)}
                  onChange={handleCheckboxChange}
                />
              }
              label='  Allow Sales'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography sx={{ marginBottom: 2 }}>Max Discount (%)</Typography>
            <TextField
              fullWidth
              size='small'
              variant='filled'
              value={dataRow.max_discount}
              name='max_discount'
              onChange={handleTextChange}
            />
          </Grid>
        </Grid>
        <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
        <Button variant='filled' label='' onClick={handleDeferred} sx={{ fontWeight: 'bold' }}>
          Deferred Revenue
        </Button>
        <IconButton size='small' onClick={handleDeferred}>
          {collapseDeferredOpen ? (
            <ChevronUp sx={{ fontSize: '1.875rem' }} />
          ) : (
            <ChevronDown sx={{ fontSize: '1.875rem' }} />
          )}
        </IconButton>

        <Collapse in={collapseDeferredOpen}>
          <Divider sx={{ margin: 0 }} />
          <FormControlLabel
            control={
              <Checkbox
                name='enable_deferred_expense'
                checked={Boolean(dataRow.enable_deferred_expense)}
                onChange={handleCheckboxChange}
              />
            }
            label='Enable Deferred Expense'
          />
          {dataRow.enable_deferred_expense === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ marginBottom: 2 }}>Deferred Expense Account</Typography>
                <TextField
                  fullWidth
                  size='small'
                  variant='filled'
                  value={dataRow.deferred_revenue_account || ''}
                  name='deferred_revenue_account'
                  onChange={handleTextChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ marginBottom: 2 }}>No of Months (Expense)</Typography>
                <TextField
                  fullWidth
                  size='small'
                  variant='filled'
                  value={
                    dataRow.no_of_months === '0.0'
                      ? ' 0.0'
                      : parseFloat(dataRow.no_of_months).toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0
                        })
                  }
                  name='no_of_months'
                  onChange={handleTextChange}
                />
              </Grid>
            </Grid>
          )}
        </Collapse>
        <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
        <Button size='small' variant='filled' label='' onClick={handleCustomer} sx={{ fontWeight: 'bold' }}>
          Customer Details
        </Button>

        <IconButton size='small' onClick={handleCustomer}>
          {collapseCustomerOpen ? (
            <ChevronUp sx={{ fontSize: '1.875rem' }} />
          ) : (
            <ChevronDown sx={{ fontSize: '1.875rem' }} />
          )}
        </IconButton>

        <Collapse in={collapseCustomerOpen}>
          <Divider sx={{ margin: 0 }} />
          <CardContent>
            <Typography variant='subtitle2' sx={{ marginBottom: 2 }}>
              Customer Items
            </Typography>

            <DataGrid
              rows={dataRow.customer_items}
              columns={columnsCustomer}
              getRowId={row => row.name} // ระบุ id โดยใช้ค่า name
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 }
                }
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />

            <Button variant='contained' sx={{ marginTop: 2 }}>
              Add Row
            </Button>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  )
}

export default SalesItem
