// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  Button,
  Divider,
  FormControlLabel,
  Card,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

//Icon MUI
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { DataGrid } from '@mui/x-data-grid'

// ** Column for DataGrid
const columnsCustomer = [
  { field: 'idx', headerName: 'No', width: 70 },
  { field: 'customer_name', headerName: 'Customer Name', width: 150 },
  { field: 'customer_group', headerName: 'Customer Group', width: 200 },
  { field: 'ref_code', headerName: 'Ref Code', width: 200 }
]

const SalesItem = ({ dataRow, handleUpdateData }) => {
  const handleCheckboxChange = event => {
    handleUpdateData(event.target.name, event.target.checked === true ? 1 : 0)
  }

  const handleTextChange = event => {
    handleUpdateData(event.target.name, event.target.value)
  }

  const styles = {
    dataGrid: {
      height: dataRow.supplier_items.length === 0 ? 300 : 'auto'
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
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography sx={{ marginBottom: 2 }}>Default Sales Unit of Measure</Typography>
            <TextField
              fullWidth
              disabled
              variant='outlined'
              name='sales_uom'
              value={dataRow.sales_uom}
              onChange={handleTextChange}
              sx={{
                backgroundColor: 'grey.100'
              }}
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
              variant='outlined'
              name='max_discount'
              value={dataRow.max_discount}
              onChange={handleTextChange}
              sx={{
                backgroundColor: 'grey.100'
              }}
            />
          </Grid>
        </Grid>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Deferred Revenue</Typography>
          </AccordionSummary>
          <AccordionDetails>
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
                    disabled
                    variant='outlined'
                    name='deferred_revenue_account'
                    value={dataRow.deferred_revenue_account}
                    onChange={handleTextChange}
                    sx={{
                      backgroundColor: 'grey.100'
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ marginBottom: 2 }}>No of Months (Expense)</Typography>
                  <TextField
                    fullWidth
                    variant='outlined'
                    name='no_of_months'
                    value={dataRow.no_of_months}
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
            <Typography> Customer Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Divider />
            <Typography variant='subtitle2' sx={{ marginBottom: 2 }}>
              Customer Items
            </Typography>
            <DataGrid
              style={styles.dataGrid}
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
          </AccordionDetails>
        </Accordion>
      </Card>
    </Box>
  )
}

export default SalesItem
