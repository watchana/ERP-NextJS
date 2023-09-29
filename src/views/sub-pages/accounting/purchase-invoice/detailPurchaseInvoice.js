// ** React Import
import { useState, useEffect } from 'react'

// ** Mui Import
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Divider,
  Collapse,
  IconButton,
  Card,
  CardMedia,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  CardHeader,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { DataGrid, GridExpandMoreIcon } from '@mui/x-data-grid'

// ** Mdi Import

import Icon from '@mdi/react'
import { mdiPencil } from '@mdi/js'

const DetailPurchaseInvoice = ({ dataRow, setDataRow }) => {
  // ** State

  const [currencyPrice, setCurrencyPrice] = useState(false)

  const [selectedRow, setSelectedRow] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [openDialogs, setOpenDialogs] = useState(false)

  const handleRowClick = (params, event) => {
    event.preventDefault()
    setSelectedRow(params.row)
    setOpenDialog(true)
  }

  const handleRowClickDtb2 = (params, event) => {
    event.preventDefault()
    setSelectedRow(params.row)
    setOpenDialogs(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleCloseDialogs = () => {
    setOpenDialogs(false)
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

  const handleCheckboxChange = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
    setDataRow({ ...dataRow, [event.target.name]: event.target.checked === true ? 1 : 0 })
  }

  const handleTextChange = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setDataRow({ ...dataRow, [event.target.name]: event.target.value })
  }

  const handleNumChange = (event, NumberTotal) => {
    const newValue = event.target.value

    // ตรวจสอบว่าค่าที่ผู้ใช้ป้อนเป็นตัวเลขที่ถูกต้องหรือไม่
    if (/^\d+(\.\d{0,4})?$/.test(newValue)) {
      setDataRow({
        ...dataRow,
        [NumberTotal]: newValue
      })
    } else {
      // Input is not a valid number, clear the field
      setDataRow({
        ...dataRow,
        [NumberTotal]: ''
      })
    }
  }

  const handleBlur = NumberTotal => {
    if (dataRow[NumberTotal] !== '') {
      const formattedValue = parseFloat(dataRow[NumberTotal]).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })

      setDataRow({
        ...dataRow,
        [NumberTotal]: formattedValue
      })
    } else {
      setDataRow({
        ...dataRow,
        [NumberTotal]: parseFloat(`0`).toFixed(2)
      })
    }
  }

  function formatDate(dateString) {
    const dateObject = new Date(dateString)
    const day = dateObject.getDate().toString().padStart(2, '0')
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0')
    const year = dateObject.getFullYear()

    return `${day}-${month}-${year}`
  }
  const formattedDate = formatDate(dataRow.posting_date)
  const formattedDateEnd = formatDate(dataRow.due_date)

  function formatTime(timeString) {
    const timeParts = timeString.split(':')
    const hours = timeParts[0]
    const minutes = timeParts[1]
    const formattedTime = `${hours}:${minutes}`

    return formattedTime
  }
  const formattedTime = formatTime(dataRow?.posting_time || '')

  function formatCurrency(params) {
    const formattedValue = new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2
    }).format(params.value)

    return formattedValue
  }

  useEffect(() => {
    console.log('Formatted Total:', selectedRow)
  }, [])

  const columns = [
    { field: 'item_name', headerName: 'Item', width: 150 },
    { field: 'stock_qty', headerName: 'Quantity', width: 150 },
    { field: 'rate', headerName: 'Rate (THB) *', width: 150, valueFormatter: formatCurrency },
    { field: 'amount', headerName: 'Amount (THB) *', width: 150, valueFormatter: formatCurrency },
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

  const column = [
    { field: 'charge_type', headerName: 'Type *', width: 150 },
    { field: 'account_head', headerName: 'Account Head *', width: 150 },
    { field: 'rate', headerName: 'Rate', width: 150 },
    { field: 'base_tax_amount', headerName: 'Amount (THB)', width: 150, valueFormatter: formatCurrency },
    { field: 'base_total', headerName: 'Total (THB)', width: 150, valueFormatter: formatCurrency },
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

  if (dataRow.length === 0) {
    return 'waiting...'
  }

  return (
    <Box>
      <Card sx={styles.card}>
        {/* /                   แสดงข่อมูลชุด แรก ของ Detail                               / */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography>Supplier *</Typography>
              <TextField
                fullWidth
                variant='outlined'
                name='supplier'
                value={dataRow.supplier}
                onChange={handleTextChange}
                sx={styles.textField}
                disabled
              />
            </Box>

            <Box sx={styles.box}>
              <Typography>Date *</Typography>
              <TextField
                fullWidth
                variant='outlined'
                name='customer'
                value={formattedDate}
                onChange={handleTextChange}
                sx={styles.textField}
                disabled
              />
            </Box>

            <Box sx={styles.box}>
              <Typography>Posting Time</Typography>
              <TextField
                fullWidth
                variant='outlined'
                name='formattedTime'
                value={formattedTime}
                onChange={handleTextChange}
                sx={styles.textField}
                disabled
              />
            </Box>
            <Typography sx={{ marginBottom: 5 }}>Asia/Kolkata</Typography>

            <Box sx={styles.box}>
              <Typography>Payment Due Date</Typography>
              <TextField
                fullWidth
                variant='outlined'
                name='formattedDateEnd'
                value={formattedDateEnd}
                onChange={handleTextChange}
                sx={styles.textField}
                disabled
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <FormControlLabel
                control={<Checkbox checked={dataRow?.is_paid === 1} onChange={handleCheckboxChange} />}
                label='Is Paid'
              />
            </Box>

            <Box sx={styles.box}>
              <FormControlLabel
                control={<Checkbox checked={dataRow?.is_return === 1} onChange={handleCheckboxChange} />}
                label='Is Return (Debit Note)'
              />
            </Box>

            <Box sx={styles.box}>
              <FormControlLabel
                control={<Checkbox checked={dataRow?.apply_tds === 1} onChange={handleCheckboxChange} />}
                label='Apply Tax Withholding Amount'
              />
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ margin: 0, my: 4 }} />

        {/* /                   แสดงข่อมูลชุด dopdown                               / */}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
                <Typography>Currency and Price List</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ p: 2 }}>
                  <Divider />
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box sx={styles.box}>
                        <Typography variant='subtitle1'>Currency</Typography>
                        <TextField
                          fullWidth
                          disabled
                          variant='outlined'
                          name='currency'
                          value={dataRow.currency}
                          onChange={handleTextChange}
                          sx={styles.textField}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box sx={styles.box}>
                        <Typography variant='subtitle1'>Price List *</Typography>
                        <TextField
                          fullWidth
                          disabled
                          variant='outlined'
                          name='selling_price_list'
                          value={dataRow.buying_price_list}
                          onChange={handleTextChange}
                          sx={styles.textField}
                        />
                      </Box>

                      <FormControlLabel
                        control={
                          <Checkbox checked={dataRow?.ignore_pricing_rule === 1} onChange={handleCheckboxChange} />
                        }
                        label='Ignore Pricing Rule'
                      />
                    </Grid>
                  </Grid>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Grid>

          {/* /                   แสดงข่อมูลชุด ที่อยู่ในdopdown                               / */}
          <Grid container>
            <Collapse in={currencyPrice} width={'100%'} style={{ width: '100%' }}>
              <Divider sx={{ margin: 0, width: '100%' }} />
            </Collapse>
          </Grid>
        </Grid>
        <Divider sx={{ margin: 0, my: 4 }} />

        {/* /                   แสดงข่อมูลชุด Item ที่เป็น DataGit                               / */}
        <Typography size='small' sx={{ fontWeight: 'bold' }}>
          Items
        </Typography>
        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={<Checkbox checked={Boolean(dataRow?.update_stock) || false} onChange={handleCheckboxChange} />}
            label='Update Stock'
          />
          <FormControlLabel
            control={<Checkbox checked={Boolean(dataRow?.update_stock) || false} onChange={handleCheckboxChange} />}
            label='Is Subcontracted'
          />
        </Grid>
        <Divider sx={{ margin: 0, my: 4 }} />
        <Typography>Items</Typography>
        <DataGrid
          sx={{ width: 'full' }}
          rows={dataRow?.items || []}
          columns={columns}
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

          <CardHeader title='Row Details' />
          <DialogContent>
            <Card sx={styles.card}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography>Item</Typography>
                    <TextField
                      fullWidth
                      variant='outlined'
                      name='item_code'
                      value={selectedRow?.item_code || ''}
                      onChange={handleTextChange}
                      sx={styles.textField}
                      disabled
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography>Item Name</Typography>
                    <TextField
                      fullWidth
                      variant='outlined'
                      name='item_name'
                      value={selectedRow?.item_name || ''}
                      onChange={handleTextChange}
                      sx={styles.textField}
                      disabled
                    />
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ margin: 0, my: 4, width: '100%' }} />
              <Grid container>
                <Grid item xs={12}>
                  <Accordion>
                    <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
                      <Typography> Currency and Price List</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ p: 2 }}>
                        <Divider />
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Box sx={styles.box}>
                              <Typography variant='subtitle1'>Description *</Typography>
                              <TextField
                                fullWidth
                                disabled
                                variant='outlined'
                                name='description'
                                value={selectedRow?.description || ''}
                                onChange={handleTextChange}
                                sx={styles.textField}
                              />
                            </Box>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Box sx={styles.box}>
                              <Typography variant='subtitle1'>Item Group</Typography>
                              <TextField
                                fullWidth
                                disabled
                                variant='outlined'
                                name='item_group'
                                value={selectedRow?.item_group || ''}
                                onChange={handleTextChange}
                                sx={styles.textField}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
              <Divider sx={{ margin: 0, my: 4, width: '100%' }} />
              <Grid container>
                <Grid item xs={12}>
                  <Accordion>
                    <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
                      <Typography> Image</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ p: 2 }}>
                        <Divider />
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Box sx={styles.box}>
                              <CardMedia
                                sx={{
                                  border: '1px solid gray',
                                  borderRadius: '10px',
                                  width: '50%', // เพิ่มข้อมูลเพื่อทำให้รูปภาพเต็มพื้นที่
                                  height: '250px' // กำหนดความสูงเป็น 0 เพื่อให้เกิดเป็นสี่เหลี่ยมจัตุรัส
                                }}
                                component='img'
                                alt='Sample Image'
                                image={selectedRow?.image_view || ''}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
              <Divider sx={{ margin: 0, my: 4.5, width: '100%' }} />
              <Grid container spacing={2} style={{ width: '100%' }}>
                <Grid item mt={3}>
                  <Typography sx={{ fontWeight: 'bold' }}>Quantity and Rate</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Received Qty</Typography>
                    <TextField
                      fullWidth
                      disabled
                      variant='outlined'
                      name='description'
                      value={selectedRow?.received_qty === '0' ? '0' : selectedRow?.received_qty}
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Accepted Qty</Typography>
                    <TextField
                      fullWidth
                      disabled
                      variant='outlined'
                      name='qty'
                      value={selectedRow?.qty === '0' ? '0' : selectedRow?.qty}
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Rejected Qty</Typography>
                    <TextField
                      fullWidth
                      disabled
                      variant='outlined'
                      name='rejected_qty'
                      value={selectedRow?.rejected_qty === '0' ? '0' : selectedRow?.rejected_qty}
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>UOM *</Typography>
                    <TextField
                      fullWidth
                      disabled
                      variant='outlined'
                      name='description'
                      value={selectedRow?.uom || ''}
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ margin: 0, my: 4.5, width: '100%' }} />
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Price List Rate (THB)</Typography>
                    <TextField
                      fullWidth
                      disabled
                      variant='outlined'
                      name='description'
                      value={
                        selectedRow?.price_list_rate === '0.0'
                          ? '฿ 0.0'
                          : `฿ ${parseFloat(selectedRow?.price_list_rate).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}`
                      }
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Price List Rate (THB)</Typography>
                    <TextField
                      fullWidth
                      disabled
                      variant='outlined'
                      name='description'
                      value={
                        selectedRow?.base_price_list_rate === '0.0'
                          ? '฿ 0.0'
                          : `฿ ${parseFloat(selectedRow?.base_price_list_rate).toLocaleString('en-US', {
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
              <Divider sx={{ margin: 0, my: 4.5, width: '100%' }} />
              <Grid container>
                <Grid item xs={12}>
                  <Accordion>
                    <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
                      <Typography> Discount and Margin</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ p: 2 }}>
                        <Divider />
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Box sx={styles.box}>
                              <Typography variant='subtitle1'>Discount on Price List Rate (%)</Typography>
                              <TextField
                                fullWidth
                                disabled
                                variant='outlined'
                                name='description'
                                value={
                                  selectedRow?.discount_percentage === '0.0'
                                    ? '0%'
                                    : selectedRow?.discount_percentage + '%'
                                }
                                onChange={handleTextChange}
                                sx={styles.textField}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Box sx={styles.box}>
                              <Typography variant='subtitle1'>Discount Amount</Typography>
                              <TextField
                                fullWidth
                                disabled
                                variant='outlined'
                                name='price_list_rate'
                                value={
                                  selectedRow?.discount_amount === '0.0'
                                    ? '฿ 0.0'
                                    : `฿ ${parseFloat(selectedRow?.discount_amount).toLocaleString('en-US', {
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
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
              <Divider sx={{ margin: 0, my: 4, width: '100%' }} />
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Rate (THB) *</Typography>
                    <TextField
                      fullWidth
                      disabled
                      variant='outlined'
                      name='rate'
                      value={
                        selectedRow?.rate === '0.0'
                          ? '฿ 0.0'
                          : `฿ ${parseFloat(selectedRow?.rate).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}`
                      }
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Amount (THB) *</Typography>
                    <TextField
                      fullWidth
                      disabled
                      variant='outlined'
                      name='amount'
                      value={
                        selectedRow?.amount === '0.0'
                          ? '฿ 0.0'
                          : `฿ ${parseFloat(selectedRow?.amount).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}`
                      }
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Rate (THB) *</Typography>
                    <TextField
                      fullWidth
                      disabled
                      variant='outlined'
                      name='base_rate'
                      value={
                        selectedRow?.base_rate === '0.0'
                          ? '฿ 0.0'
                          : `฿ ${parseFloat(selectedRow?.base_rate).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}`
                      }
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Amount (THB) *</Typography>
                    <TextField
                      fullWidth
                      disabled
                      variant='outlined'
                      name='base_amount'
                      value={
                        selectedRow?.base_amount === '0.0'
                          ? '฿ 0.0'
                          : `฿ ${parseFloat(selectedRow?.base_amount).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}`
                      }
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>

                  <FormControlLabel
                    control={
                      <Checkbox checked={Boolean(selectedRow?.is_free_item) || false} onChange={handleCheckboxChange} />
                    }
                    label='Is Free Item'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={Boolean(selectedRow?.apply_tds) || false} onChange={handleCheckboxChange} />
                    }
                    label='Apply TDS'
                  />
                </Grid>
              </Grid>
              <Divider sx={{ margin: 0, my: 4, width: '100%' }} />
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Net Rate (THB)</Typography>
                    <TextField
                      fullWidth
                      disabled
                      variant='outlined'
                      name='net_rate'
                      value={
                        selectedRow?.net_rate === '0.0'
                          ? '฿ 0.0'
                          : `฿ ${parseFloat(selectedRow?.net_rate).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}`
                      }
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Net Amount (THB)</Typography>
                    <TextField
                      fullWidth
                      disabled
                      variant='outlined'
                      name='net_amount'
                      value={
                        selectedRow?.net_amount === '0.0'
                          ? '฿ 0.0'
                          : `฿ ${parseFloat(selectedRow?.net_amount).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}`
                      }
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Net Rate (THB)</Typography>
                    <TextField
                      fullWidth
                      disabled
                      variant='outlined'
                      name='base_net_rate'
                      value={
                        selectedRow?.base_net_rate === '0.0'
                          ? '฿ 0.0'
                          : `฿ ${parseFloat(selectedRow?.base_net_rate).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}`
                      }
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Net Amount (THB)</Typography>
                    <TextField
                      fullWidth
                      disabled
                      variant='outlined'
                      name='base_net_amount'
                      value={
                        selectedRow?.base_net_amount === '0.0'
                          ? '฿ 0.0'
                          : `฿ ${parseFloat(selectedRow?.base_net_amount).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}`
                      }
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Landed Cost Voucher Amount</Typography>
                    <TextField
                      fullWidth
                      disabled
                      variant='outlined'
                      name='landed_cost_voucher_amount'
                      value={
                        selectedRow?.landed_cost_voucher_amount === '0.0'
                          ? '฿ 0.0'
                          : `฿ ${parseFloat(selectedRow?.landed_cost_voucher_amount).toLocaleString('en-US', {
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
              <Divider sx={{ margin: 0, my: 4, width: '100%' }} />
              <Typography sx={{ fontWeight: 'bold' }}>Warehouse</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant='subtitle1'>Accepted Warehouse</Typography>
                    <TextField
                      fullWidth
                      disabled
                      variant='outlined'
                      name='warehouse'
                      value={selectedRow?.warehouse || ''}
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ margin: 0, my: 4, width: '100%' }} />
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant='subtitle1'>Expense Head</Typography>
                    <TextField
                      fullWidth
                      disabled
                      variant='outlined'
                      name='expense_account'
                      value={selectedRow?.expense_account || ''}
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ margin: 0, my: 4.5, width: '100%' }} />
              <Grid container>
                <Grid item xs={12}>
                  <Accordion>
                    <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
                      <Typography> Deferred Expense</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ p: 2 }}>
                        <Divider />
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Box sx={styles.box}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={Boolean(dataRow?.enable_deferred_expense) || false}
                                    onChange={handleCheckboxChange}
                                  />
                                }
                                label='Enable Deferred Expense'
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
                      <Typography> Reference</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ p: 2 }}>
                        <Divider />
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Box sx={styles.box}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={Boolean(dataRow?.allow_zero_valuation_rate) || false}
                                    onChange={handleCheckboxChange}
                                  />
                                }
                                label='Allow Zero Valuation Rate'
                              />
                            </Box>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Box sx={styles.box}>
                              <Typography variant='subtitle1'>Purchase Order</Typography>
                              <TextField
                                fullWidth
                                disabled
                                variant='outlined'
                                name='purchase_order'
                                value={selectedRow?.purchase_order || ''}
                                onChange={handleTextChange}
                                sx={styles.textField}
                              />
                            </Box>

                            <Box sx={styles.box}>
                              <Typography variant='subtitle1'>Purchase Receipt</Typography>
                              <TextField
                                fullWidth
                                disabled
                                variant='outlined'
                                name='purchase_receipt'
                                value={selectedRow?.purchase_receipt || ''}
                                onChange={handleTextChange}
                                sx={styles.textField}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
                      <Typography> Item Weight Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ p: 2 }}>
                        <Divider />
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Box sx={styles.box}>
                              <Typography variant='subtitle1'>Purchase Order</Typography>
                              <TextField
                                fullWidth
                                disabled
                                variant='outlined'
                                name='weight_per_unit'
                                value={selectedRow?.weight_per_unit || '0'}
                                onChange={handleTextChange}
                                sx={styles.textField}
                              />
                            </Box>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Box sx={styles.box}>
                              <Typography variant='subtitle1'>Purchase Receipt</Typography>
                              <TextField
                                fullWidth
                                disabled
                                variant='outlined'
                                name='total_weight'
                                value={selectedRow?.total_weight || '0'}
                                onChange={handleTextChange}
                                sx={styles.textField}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
                      <Typography> Accounting Dimensions</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ p: 2 }}>
                        <Divider />
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Box sx={styles.box}>
                              <Typography variant='subtitle1'>Cost Center *</Typography>
                              <TextField
                                fullWidth
                                disabled
                                variant='outlined'
                                name='cost_center'
                                value={selectedRow?.cost_center || '0'}
                                onChange={handleTextChange}
                                sx={styles.textField}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>

              <Divider sx={{ margin: 0, my: 4.5, width: '100%' }} />
            </Card>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* /                   แสดงข่อมูลชุด Total Quantity                               / */}
        <Divider sx={{ margin: 0, my: 8 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography variant='subtitle1'>Total Quantity</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='total_qty'
                value={dataRow.total_qty}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography variant='subtitle1'>Total (THB)</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='total_qty'
                value={`฿ ${parseFloat(dataRow.total_qty).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}`}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>
          </Grid>
        </Grid>

        {/* /                   แสดงข่อมูลชุด taxes                               / */}
        <Divider sx={{ margin: 0, my: 3 }} />
        <Grid container spacing={2} width={'100%'}>
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography variant='subtitle1'>Taxes and Charges Added (THB)</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='currency'
                value={`฿ ${parseFloat(dataRow.taxes_and_charges_added).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}`}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>

            <Box sx={styles.box}>
              <Typography variant='subtitle1'>Taxes and Charges Deducted (THB)</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='currency'
                value={`฿ ${parseFloat(dataRow.taxes_and_charges_deducted).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}`}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>

            <Box sx={styles.box}>
              <Typography variant='subtitle1'>Total Taxes and Charges (THB)</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='currency'
                value={`฿ ${parseFloat(dataRow.total_taxes_and_charges).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}`}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>
          </Grid>
        </Grid>

        {/* /                   แสดงข่อมูลชุด ที่ใน Datagit ตารางที่2 แสดงเมื่อมีข้อมูล                            / */}
        <Box>
          {dataRow?.taxes?.length > 0 && (
            <DataGrid
              sx={{ width: 'full', mt: 6 }}
              rows={dataRow?.taxes || []} // Use optional chaining for dataRow.taxes
              columns={column}
              getRowId={row => row.name}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 }
                }
              }}
              pageSizeOptions={[5, 10]}
              onRowClick={handleRowClickDtb2}
            />
          )}

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
            open={openDialogs}
            onClose={handleCloseDialogs}
          >
            <DialogTitle>Row Detail1</DialogTitle>
            <DialogContent>
              <Card sx={styles.card}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography>Consider Tax or Charge for *</Typography>
                      <TextField
                        fullWidth
                        disabled
                        variant='outlined'
                        name='category'
                        value={selectedRow?.category || ''}
                        onChange={handleTextChange}
                        sx={styles.textField}
                      />
                    </Box>

                    <Box sx={styles.box}>
                      <Typography>Add or Deduct *</Typography>
                      <TextField
                        fullWidth
                        disabled
                        variant='outlined'
                        name='add_deduct_tax'
                        value={selectedRow?.add_deduct_tax || ''}
                        onChange={handleTextChange}
                        sx={styles.textField}
                      />
                    </Box>

                    <Box sx={styles.box}>
                      <Typography>Type *</Typography>
                      <TextField
                        fullWidth
                        disabled
                        variant='outlined'
                        name='charge_type'
                        value={selectedRow?.charge_type || ''}
                        onChange={handleTextChange}
                        sx={styles.textField}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={Boolean(dataRow?.included_in_print_rate) || false}
                            onChange={handleCheckboxChange}
                          />
                        }
                        label='Is this Tax included in Basic Rate?'
                      />
                      <Typography sx={{ mt: -2.5 }}>
                        If checked, the tax amount will be considered as already included in the Print Rate / Print
                        Amount
                      </Typography>
                    </Box>

                    <Box sx={styles.box}>
                      <Typography>Account Head *</Typography>
                      <TextField
                        fullWidth
                        disabled
                        variant='outlined'
                        name='account_head'
                        value={selectedRow?.account_head || ''}
                        onChange={handleTextChange}
                        sx={styles.textField}
                      />
                    </Box>

                    <Box sx={styles.box}>
                      <Typography>Description *</Typography>
                      <TextField
                        fullWidth
                        disabled
                        variant='outlined'
                        name='description'
                        value={selectedRow?.description || ''}
                        onChange={handleTextChange}
                        sx={styles.textField}
                      />
                    </Box>
                  </Grid>
                  <Divider sx={{ margin: 0, my: 3, width: '100%' }} />

                  <Grid container spacing={2} style={{ width: '100%' }}>
                    <Grid item mt={3}>
                      <Typography sx={{ fontWeight: 'bold', ml: 1.5 }}>Accounting Dimensions</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography>Cost Center</Typography>
                      <TextField
                        fullWidth
                        disabled
                        variant='outlined'
                        name='cost_center'
                        value={selectedRow?.cost_center || ''}
                        onChange={handleTextChange}
                        sx={styles.textField}
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ margin: 0, my: 3, width: '100%' }} />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography>Rate</Typography>
                      <TextField
                        fullWidth
                        disabled
                        variant='outlined'
                        name='rate'
                        value={selectedRow?.rate || '0'}
                        onChange={handleTextChange}
                        sx={styles.textField}
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ margin: 0, my: 3, width: '100%' }} />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography>Account Currency</Typography>
                      <TextField
                        fullWidth
                        disabled
                        variant='outlined'
                        name='rate'
                        value={selectedRow?.account_currency || ''}
                        onChange={handleTextChange}
                        sx={styles.textField}
                      />
                    </Box>

                    <Box sx={styles.box}>
                      <Typography>Amount (THB) *</Typography>
                      <TextField
                        fullWidth
                        disabled
                        variant='outlined'
                        name='tax_amount'
                        value={
                          selectedRow?.tax_amount === '0.0'
                            ? '฿ 0.0'
                            : `฿ ${parseFloat(selectedRow?.tax_amount).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}`
                        }
                        onChange={handleTextChange}
                        sx={styles.textField}
                      />
                    </Box>

                    <Box sx={styles.box}>
                      <Typography>Tax Amount After Discount Amount</Typography>
                      <TextField
                        fullWidth
                        disabled
                        variant='outlined'
                        name='tax_amount_after_discount_amount'
                        value={
                          selectedRow?.tax_amount_after_discount_amount === '0.0'
                            ? '฿ 0.0'
                            : `฿ ${parseFloat(selectedRow?.tax_amount_after_discount_amount).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}`
                        }
                        onChange={handleTextChange}
                        sx={styles.textField}
                      />
                    </Box>

                    <Box sx={styles.box}>
                      <Typography>Total (THB)</Typography>
                      <TextField
                        fullWidth
                        disabled
                        variant='outlined'
                        name='total'
                        value={
                          selectedRow?.total === '0.0'
                            ? '฿ 0.0'
                            : `฿ ${parseFloat(selectedRow?.total).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}`
                        }
                        onChange={handleTextChange}
                        sx={styles.textField}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography>Amount (THB)</Typography>
                      <TextField
                        fullWidth
                        disabled
                        variant='outlined'
                        name='base_tax_amount'
                        value={
                          selectedRow?.base_tax_amount === '0.0'
                            ? '฿ 0.0'
                            : `฿ ${parseFloat(selectedRow?.base_tax_amount).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}`
                        }
                        onChange={handleTextChange}
                        sx={styles.textField}
                      />
                    </Box>

                    <Box sx={styles.box}>
                      <Typography>Tax Amount After Discount Amount</Typography>
                      <TextField
                        fullWidth
                        disabled
                        variant='outlined'
                        name='base_tax_amount_after_discount_amount'
                        value={
                          selectedRow?.base_tax_amount_after_discount_amount === '0.0'
                            ? '฿ 0.0'
                            : `฿ ${parseFloat(selectedRow?.base_tax_amount_after_discount_amount).toLocaleString(
                                'en-US',
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                }
                              )}`
                        }
                        onChange={handleTextChange}
                        sx={styles.textField}
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ margin: 0, my: 3, width: '100%' }} />
              </Card>
            </DialogContent>
          </Dialog>
        </Box>
        {/* /                   แสดงข่อมูลชุด Totals                            / */}
        <Divider sx={{ margin: 0, my: 4.5 }} />
        <Typography sx={{ fontWeight: 'bold' }}>Totals</Typography>
        <Grid container spacing={2} width={'100%'}>
          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography variant='subtitle1'>Grand Total (THB)</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='grand_total'
                value={`฿ ${parseFloat(dataRow.grand_total).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}`}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>

            <Box sx={styles.box}>
              <Typography variant='subtitle1'>Rounding Adjustment (THB)</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='rounding_adjustment'
                value={`฿ ${parseFloat(dataRow.rounding_adjustment).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}`}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>

            <Box sx={styles.box}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(dataRow.use_company_roundoff_cost_center) || false}
                    onChange={handleCheckboxChange}
                  />
                }
                label='Use Company default Cost Center for Round off'
              />
            </Box>

            <Box sx={styles.box}>
              <Typography variant='subtitle1'>Rounded Total (THB)</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='rounded_total'
                value={`฿ ${parseFloat(dataRow.rounded_total).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}`}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography variant='subtitle1'>In Words (THB)</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='in_words'
                value={dataRow.in_words}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>

            <Box sx={styles.box}>
              <Typography variant='subtitle1'>Total Advance</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='total_advance'
                value={`฿ ${parseFloat(dataRow.total_advance).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}`}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>

            <Box sx={styles.box}>
              <Typography variant='subtitle1'>Outstanding Amount (THB)</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='outstanding_amount'
                value={`฿ ${parseFloat(dataRow.outstanding_amount).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}`}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>

            <Box sx={styles.box}>
              <FormControlLabel
                control={
                  <Checkbox checked={Boolean(dataRow.disable_rounded_total) || false} onChange={handleCheckboxChange} />
                }
                label='Disable Rounded Total'
              />
            </Box>
          </Grid>
        </Grid>
        {/* /                   แสดงข่อมูลชุด ที่อยู่ในdopdown                               / */}

        <Divider sx={{ margin: 0, my: 4.5 }} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
                <Typography>Currency and Price List</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ p: 2 }}>
                  <Divider />
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box sx={styles.box}>
                        <Typography variant='subtitle1'>Apply Additional Discount On</Typography>
                        <TextField
                          fullWidth
                          disabled
                          variant='outlined'
                          name='apply_discount_on'
                          value={dataRow.apply_discount_on}
                          onChange={handleTextChange}
                          sx={styles.textField}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box sx={styles.box}>
                        <Typography variant='subtitle1'>Additional Discount Percentage</Typography>
                        <TextField
                          fullWidth
                          disabled
                          variant='outlined'
                          name='additional_discount_percentage'
                          value={dataRow.additional_discount_percentage}
                          onChange={handleTextChange}
                          sx={styles.textField}
                        />
                      </Box>

                      <Box sx={styles.box}>
                        <Typography variant='subtitle1'>Additional Discount Amount (THB)</Typography>
                        <TextField
                          fullWidth
                          disabled
                          variant='outlined'
                          name='selling_price_list'
                          value={`฿ ${parseFloat(dataRow.discount_amount).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}`}
                          onChange={handleTextChange}
                          sx={styles.textField}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>

        <Accordion>
          <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
            <Typography> Tax Breakup</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ p: 2 }}>
              <Divider />
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box sx={styles.box}>
                    <table style={{ width: '100%', fontSize: '10.6px', textAlign: 'left' }}>
                      <tbody dangerouslySetInnerHTML={{ __html: dataRow.other_charges_calculation }} />
                    </table>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Card>
    </Box>
  )
}

export default DetailPurchaseInvoice
