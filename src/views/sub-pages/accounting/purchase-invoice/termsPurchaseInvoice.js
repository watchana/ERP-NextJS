// ** React Import
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

// ** Mui Import
import {
  Grid,
  Typography,
  Box,
  Button,
  TextField,
  Divider,
  DialogActions,
  Card,
  DialogContent,
  DialogTitle,
  Dialog
} from '@mui/material'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import Icon from '@mdi/react'
import { mdiPencil } from '@mdi/js'

const TermsSalesInvoice = ({ dataRow, handleUpdateData }) => {
  const [selectedRow, setSelectedRow] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  const handleTextChange = event => {
    handleUpdateData(event.target.name, event.target.value)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleRowClick = (params, event) => {
    event.preventDefault()
    setSelectedRow(params.row)
    setOpenDialog(true)
  }

  const formattedDate = formatDate(dataRow.due_date)

  function formatDate(dateString) {
    const dateObject = new Date(dateString)
    const day = dateObject.getDate().toString().padStart(2, '0')
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0')
    const year = dateObject.getFullYear()

    return `${day}-${month}-${year}`
  }

  function formatCurrency(params) {
    const formattedValue = new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2
    }).format(params.value)

    return formattedValue
  }

  useEffect(() => {
    console.log('formattedDate', dataRow)
  }, [dataRow])

  const column = [
    { field: 'charge_type', headerName: 'Payment Term', width: 120 },
    { field: 'account_head', headerName: 'Description', width: 100 },
    {
      field: 'due_date',
      headerName: 'Due Date *',
      width: 120,
      valueFormatter: params => formatDate(params.value)
    },
    {
      field: 'invoice_portion',
      headerName: 'Invoice Portion',
      width: 170,
      valueFormatter: params => {
        // เพิ่มสัญลักษณ์ '%' หลังค่าที่ส่งมา
        return `${params.value}%`
      }
    },
    { field: 'payment_amount', headerName: 'Payment Amount (THB)', width: 150, valueFormatter: formatCurrency },
    {
      field: 'icon',
      headerName: 'Icon',
      width: 150,
      renderCell: params => (
        <Typography sx={{ display: 'flex' }}>
          <Icon path={mdiPencil} size={1} />
          &nbsp; Edit
        </Typography>
      )
    }
  ]

  const styles = {
    card: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      p: 2
    },
    textField: {
      bgcolor: 'grey.100'
    },
    box: {
      marginBlock: 2,
      mt: 4
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
        <DataGrid
          sx={{ width: 'full', mt: 6 }}
          rows={dataRow.payment_schedule || ''}
          columns={column}
          getRowId={row => row.name}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 }
            }
          }}
          pageSizeOptions={[5, 10]}
          onRowClick={handleRowClick}
        />

        {/* Popup Dialog */}
        <Dialog
          fullScreen
          PaperProps={{
            style: {
              width: '80%',
              height: '80%',
              margin: 0,
              maxWidth: 'none',
              maxHeight: 'none'
            }
          }}
          open={openDialog}
          onClose={handleCloseDialog}
        >
          {/* /                   แสดงข่อมูลชุด ที่อยู่ใน popup เมื่อคลิกข้อมูลในตลาง                               / */}
          <DialogTitle>Editing Row</DialogTitle>
          <DialogContent>
            <Card sx={styles.card}>
              <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography>Due Date *</Typography>
                    <TextField
                      fullWidth
                      variant='outlined'
                      name='formattedDate'
                      value={formattedDate}
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography>Invoice Portion</Typography>
                    <TextField
                      fullWidth
                      variant='outlined'
                      name='invoice_portion'
                      value={selectedRow?.invoice_portion ? `${selectedRow.invoice_portion}%` : ''}
                      onChange={e => {
                        const newValue = e.target.value.replace('%', '') // ลบ % ออกจากข้อมูลที่แก้ไข
                        handleTextChange({ ...e, target: { ...e.target, value: newValue } })
                      }}
                      sx={styles.textField}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography>Discount Type</Typography>
                    <TextField
                      fullWidth
                      variant='outlined'
                      name='discount_type'
                      value={selectedRow?.discount_type === '0.0' ? ' 0.0' : selectedRow?.discount_type}
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography>Discount </Typography>
                    <TextField
                      fullWidth
                      variant='outlined'
                      name='discount'
                      value={selectedRow?.discount === '0.0' ? ' 0.0' : selectedRow?.discount}
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography>Payment Amount (THB) *</Typography>
                    <TextField
                      fullWidth
                      variant='outlined'
                      name='payment_amount'
                      value={
                        selectedRow?.payment_amount === '0.0'
                          ? '฿ 0.0'
                          : `฿ ${parseFloat(selectedRow?.payment_amount).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}`
                      }
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>

                  <Typography>Outstanding</Typography>
                  <TextField
                    sx={{ marginBottom: 5 }}
                    size='small'
                    variant='filled'
                    fullWidth
                    value={
                      selectedRow?.outstanding === '0.0'
                        ? '฿ 0.0'
                        : `฿ ${parseFloat(selectedRow?.outstanding).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}`
                    }
                  />
                  <Box sx={styles.box}>
                    <Typography>Payment Amount (THB) *</Typography>
                    <TextField
                      fullWidth
                      variant='outlined'
                      name='payment_amount'
                      value={
                        selectedRow?.payment_amount === '0.0'
                          ? '฿ 0.0'
                          : `฿ ${parseFloat(selectedRow?.payment_amount).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}`
                      }
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Box>
  )
}

export default TermsSalesInvoice
