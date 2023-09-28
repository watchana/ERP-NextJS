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

const TermsSalesInvoice = ({ dataRow }) => {
  const [selectedRow, setSelectedRow] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

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

  const handleTextChange = event => {
    handleUpdateData(event.target.name, event.target.value)
  }

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

  const [quotation, setQuotation] = useState([])
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}Sales%20Invoice/${dataRow.name}`, {
        headers: {
          Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
        }
      })
      .then(res => {
        setQuotation(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [dataRow])

  useEffect(() => {
    console.log('formattedDate', formattedDate)
  }, [formattedDate])

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

  return (
    <Box>
      <Card sx={styles.card}>
        <DataGrid
          sx={{ width: 'full', mt: 6 }}
          rows={quotation.payment_schedule || ''}
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
            <Card sx={{ width: '100%', p: 5 }}>
              <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                {/* {Object.values(quotation.items)?.map(item => ( */}
                {/* ))} */}
                <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography>Due Date *</Typography>
                      <TextField
                        fullWidth
                        variant='outlined'
                        name='due_date'
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
                        value={`${selectedRow?.invoice_portion === '0.0' ? ' 0.0' : selectedRow?.invoice_portion}%`}
                        onChange={handleTextChange}
                        sx={styles.textField}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}></Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography>Discount</Typography>
                      <TextField
                        fullWidth
                        variant='outlined'
                        name='discount'
                        value={`${selectedRow?.discount === '0.0' ? ' 0.0' : selectedRow?.invoice_portion}%`}
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
                        name='discount'
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

                    <Box sx={styles.box}>
                      <Typography>Outstanding</Typography>
                      <TextField
                        fullWidth
                        variant='outlined'
                        name='discount'
                        value={
                          selectedRow?.outstanding === '0.0'
                            ? '฿ 0.0'
                            : `฿ ${parseFloat(selectedRow?.outstanding).toLocaleString('en-US', {
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
