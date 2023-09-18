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

const SalesItem = ({ dataRow }) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const [collapseDeferred, setCollapseDeferred] = useState(false)
  const [collapseCustomer, setCollapseCustomer] = useState(false)
  const [IsDeferredCheck, setIsDeferredCheck] = useState(false)

  const handleDeferred = () => {
    setCollapseDeferred(!collapseDeferred)
  }

  const handleCustomer = () => {
    setCollapseCustomer(!collapseCustomer)
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

  const columnsCus = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'CustomerName', headerName: 'Customer Name', width: 150 },
    { field: 'CustomerGroup', headerName: 'Customer Group', width: 200 },
    { field: 'RefCode', headerName: 'Ref Code', width: 200 }
  ]

  const rowCus = [
    {
      id: 1,
      CustomerName: 'Targaryen',
      CustomerGroup: 'Daenerys',
      RefCode: 'daeams'
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
            <Typography sx={{ marginBottom: 2 }}>Default Sales Unit of Measure</Typography>
            <TextField
              fullWidth
              size='small'
              variant='filled'
              label=''
              value={dataRow.sales_uom || ''}
              name='sales_uom'
              onChange={handleTextChange}
            />
            <FormControlLabel
              control={<Checkbox checked={Boolean(dataRow.grant_commission) || false} />}
              label=' Grant Commission'
            />
            <FormControlLabel
              control={<Checkbox checked={Boolean(dataRow.is_sales_item) || false} />}
              label='  Allow Sales'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography sx={{ marginBottom: 2 }}>Max Discount (%)</Typography>
            <TextField
              fullWidth
              size='small'
              variant='filled'
              value={
                dataRow?.max_discount === '0.0'
                  ? ' 0.0'
                  : parseFloat(dataRow?.max_discount).toLocaleString('en-US', {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3
                    })
              }
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
                    value={dataRow.deferred_revenue_account || ''}
                    name='deferred_revenue_account'
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
          </FormGroup>
        </Collapse>
        <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
        <Button size='small' variant='filled' label='' onClick={handleCustomer} sx={{ fontWeight: 'bold' }}>
          Customer Details
        </Button>

        <IconButton size='small' onClick={handleCustomer}>
          {collapseCustomer ? (
            <ChevronUp sx={{ fontSize: '1.875rem' }} />
          ) : (
            <ChevronDown sx={{ fontSize: '1.875rem' }} />
          )}
        </IconButton>

        <Collapse in={collapseCustomer}>
          <Divider sx={{ margin: 0 }} />
          <CardContent>
            <Typography variant='subtitle2' sx={{ marginBottom: 2 }}>
              Customer Items
            </Typography>

            <DataGrid
              rows={rowCus}
              columns={columnsCus}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 }
                }
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />

            <Button>Add row</Button>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  )
}

export default SalesItem
