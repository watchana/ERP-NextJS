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
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { DataGrid, GridExpandMoreIcon } from '@mui/x-data-grid'

// ** Mdi Import
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import Icon from '@mdi/react'
import { mdiPencil } from '@mdi/js'
import useMediaQuery from '@mui/material/useMediaQuery'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const DetailSalesInvoice = ({ dataRow, handleUpdateData }) => {
  // ** State

  const [currencyPrice, setCurrencyPrice] = useState(false)
  const [additionalDiscount, setAdditionalDiscount] = useState(false)

  const [activity, setActivity] = useState(false)

  const handleClickActivity = () => {
    setActivity(!activity)
  }

  const handleClickAdditionalDiscount = () => {
    setAdditionalDiscount(!additionalDiscount)
  }

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
  const [selectedRowData, setSelectedRowData] = useState({})

  const handleRowClicks = params => {
    setSelectedRowData(params.row)
    setOpenDialog(true) // เปิด Dialog เมื่อคลิกแถว
  }

  const handleCheckboxChange = event => {
    const { name } = event.target
    if (name === 'is_stock_item') {
      setValuationRateOpen(!valuationRateOpen)
    }
    handleUpdateData(name, event.target.checked === true ? 1 : 0)
  }

  const handleTextChange = event => {
    handleUpdateData(event.target.name, event.target.value)
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
  const isLGScreen = useMediaQuery(theme => theme.breakpoints.up('lg'))

  useEffect(() => {
    console.log('test', dataRow.taxes)
  }, [dataRow])

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
      <Card sx={styles.card}>
        {/* /                   แสดงข่อมูลชุด แรก ของ Detail                               / */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography>Customer</Typography>
              <TextField
                fullWidth
                variant='outlined'
                name='customer'
                value={dataRow.customer}
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
                control={<Checkbox checked={dataRow?.is_pos === 1} onChange={handleCheckboxChange} />}
                label='Include Payment (POS)'
              />
            </Box>

            <Box sx={styles.box}>
              <FormControlLabel
                control={<Checkbox checked={dataRow?.is_return === 1} onChange={handleCheckboxChange} />}
                label='Is Return (Credit Note)'
              />
            </Box>

            <Box sx={styles.box}>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      alignSelf: 'flex-start' // เปลี่ยนตำแหน่งให้อยู่ด้านบน
                    }}
                    checked={dataRow?.is_debit_note === 1}
                    onChange={handleCheckboxChange}
                  />
                }
                label='Is Rate Adjustment Entry (Debit Note)Issue a debit note with 0 qty against an existing Sales Invoice'
              />
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ margin: 0, my: 5 }} />

        {/* /                   แสดงข่อมูลชุด dopdown                               / */}

        <Grid container spacing={3}>
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
                          value={dataRow.selling_price_list}
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
        <Divider sx={{ margin: 0, my: 5 }} />

        {/* /                   แสดงข่อมูลชุด Item ที่เป็น DataGit                               / */}
        <Typography size='small' sx={{ fontWeight: 'bold' }}>
          Item
        </Typography>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <FormControlLabel
            control={<Checkbox checked={dataRow?.update_stock === 1} onChange={handleCheckboxChange} />}
            label='Update Stock'
          />
        </Grid>
        <div>
          <DataGrid
            sx={{ width: 'full', mt: 6 }}
            rows={dataRow?.items || []}
            columns={columns}
            getRowId={row => row.name}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }
              }
            }}
            pageSizeOptions={[5, 10]}
            omRowClick={handleRowClicks}
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
            <DialogTitle>Row Details</DialogTitle>
            <DialogContent>
              <Card sx={{ width: '100%', p: 5 }}>
                <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography>Item</Typography>
                      <TextField
                        fullWidth
                        variant='outlined'
                        name='item_code'
                        value={selectedRow?.item_code}
                        onChange={handleTextChange}
                        sx={styles.textField}
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
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ margin: 0, my: 5, width: '100%' }} />

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Description</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ p: 2 }}>
                      <Divider />

                      <Box sx={styles.box}>
                        <Typography variant='subtitle1'>Description *</Typography>
                        <TextField
                          fullWidth
                          disabled
                          variant='outlined'
                          name='brand'
                          value={selectedRow?.description || ''}
                          onChange={handleTextChange}
                          sx={styles.textField}
                        />
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography> Image</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ p: 2 }}>
                      <Divider />

                      <Box sx={styles.box}>
                        <Typography variant='subtitle1'>Description *</Typography>
                        <CardMedia
                          sx={{
                            border: '1px solid gray',
                            borderRadius: '10px',
                            width: '50%', // เพิ่มข้อมูลเพื่อทำให้รูปภาพเต็มพื้นที่
                            height: '250px' // กำหนดความสูงเป็น 0 เพื่อให้เกิดเป็นสี่เหลี่ยมจัตุรัส
                          }}
                          component='img'
                          alt='Sample Image'
                          image={selectedRow?.image}
                        />
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>

                <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography variant='subtitle1'>Quantity</Typography>
                      <TextField
                        fullWidth
                        disabled
                        variant='outlined'
                        name='qty'
                        value={selectedRow?.qty || ''}
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
                        name='uom'
                        value={selectedRow?.uom || ''}
                        onChange={handleTextChange}
                        sx={styles.textField}
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ margin: 0, my: 5.5, width: '100%' }} />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography variant='subtitle1'>Price List Rate (THB)</Typography>
                      <TextField
                        fullWidth
                        disabled
                        variant='outlined'
                        name='price_list_rate'
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
                      <Typography variant='subtitle1'>Price List Rate (Company Currency)</Typography>
                      <TextField
                        fullWidth
                        disabled
                        variant='outlined'
                        name='base_price_list_rate'
                        value={
                          selectedRow?.price_list_rate === '0.0'
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
                <Divider sx={{ margin: 0, my: 5.5, width: '100%' }} />
                <Grid container>
                  <Box sx={{ width: '100%' }}>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography> Discount and Margin</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box sx={{ p: 2 }}>
                          <Divider />
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <Box sx={styles.box}>
                                <Typography variant='subtitle1'>Discount (%) on Price List Rate with Margin</Typography>
                                <TextField
                                  fullWidth
                                  disabled
                                  variant='outlined'
                                  name='discount_percentage'
                                  value={
                                    selectedRow?.base_amount === '0.0'
                                      ? '฿ 0.0'
                                      : `฿ ${parseFloat(selectedRow?.discount_percentage).toLocaleString('en-US', {
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
                                <Typography variant='subtitle1'>Discount Amount</Typography>
                                <TextField
                                  fullWidth
                                  disabled
                                  variant='outlined'
                                  name='discount_percentage'
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
                  </Box>
                </Grid>
                <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography variant='subtitle1'>Rate *</Typography>
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
                      <Typography variant='subtitle1'>Amount *</Typography>
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
                      <Typography variant='subtitle1'>Rate (Conpany Currency)</Typography>
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
                      <Typography variant='subtitle1'>Amount (Currency)</Typography>
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
                      control={<Checkbox checked={selectedRow?.is_free_item === 1} onChange={handleCheckboxChange} />}
                      label='Is Free Iten'
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedRow?.grant_commission === 1} onChange={handleCheckboxChange} />
                      }
                      label='Grant Commission'
                    />
                  </Grid>
                </Grid>
                <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
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
                  </Grid>
                </Grid>

                <Divider sx={{ margin: 0, my: 5.5, width: '100%' }} />
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography> Drop Ship</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ p: 2 }}>
                      <Divider />

                      <Box sx={styles.box}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedRow?.delivered_by_supplier === 1}
                              onChange={handleCheckboxChange}
                            />
                          }
                          label='Delivered by Supplier'
                        />
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography> Accounting Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ p: 2 }}>
                      <Divider />

                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Box sx={styles.box}>
                            <Typography variant='subtitle1'>income Account *</Typography>
                            <TextField
                              fullWidth
                              disabled
                              variant='outlined'
                              name='income_account'
                              value={selectedRow?.income_account || ''}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box sx={styles.box}>
                            <Typography variant='subtitle1'>Expense Account</Typography>
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
                    </Box>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography> Deferred Revenue</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ p: 2 }}>
                      <Divider />

                      <Box sx={styles.box}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedRow?.enable_deferred_revenue === 1}
                              onChange={handleCheckboxChange}
                            />
                          }
                          label='Enable Deferred Revenue'
                        />
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography> Item Weight Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ p: 2 }}>
                      <Divider />

                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Box sx={styles.box}>
                            <Typography variant='subtitle1'> Weight Per Unit </Typography>

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
                            <Typography variant='subtitle1'>Total Weight</Typography>
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
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography> Stock Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ p: 2 }}>
                      <Divider />

                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Box sx={styles.box}>
                            <Typography variant='subtitle1'> Warehouse </Typography>

                            <TextField
                              fullWidth
                              disabled
                              variant='outlined'
                              name='actual_batch_qty'
                              value={selectedRow?.warehouse || ''}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box sx={styles.box}>
                            <Typography variant='subtitle1'>Available Batch Qty at Warehouse</Typography>
                            <TextField
                              fullWidth
                              disabled
                              variant='outlined'
                              name='actual_batch_qty'
                              value={selectedRow?.actual_batch_qty || '0'}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedRow?.allow_zero_valuation_rate === 1}
                                onChange={handleCheckboxChange}
                              />
                            }
                            label='Allow Zero Valuation Rate'
                          />

                          <Box sx={styles.box}>
                            <Typography variant='subtitle1'>Available Qty at Warehouse</Typography>
                            <TextField
                              fullWidth
                              disabled
                              variant='outlined'
                              name='actual_qty'
                              value={selectedRow?.actual_qty || '0'}
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
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography> References</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ p: 2 }}>
                      <Divider />

                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Box sx={styles.box}>
                            <Typography variant='subtitle1'> Sales Order </Typography>

                            <TextField
                              fullWidth
                              disabled
                              variant='outlined'
                              name='sales_order'
                              value={selectedRow?.sales_order || ''}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box sx={styles.box}>
                            <Typography variant='subtitle1'>Deilvered Qty</Typography>
                            <TextField
                              fullWidth
                              disabled
                              variant='outlined'
                              name='delivered_qty'
                              value={selectedRow?.delivered_qty || '0'}
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
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography> Accounting Dimensions</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ p: 2 }}>
                      <Divider />

                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Box sx={styles.box}>
                            <Typography variant='subtitle1'> Cost Center * </Typography>

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
                        <Grid item xs={12} md={6}>
                          <Box sx={styles.box}>
                            <Typography variant='subtitle1'>Project</Typography>
                            <TextField
                              fullWidth
                              disabled
                              variant='outlined'
                              name='project'
                              value={selectedRow?.project || '0'}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </AccordionDetails>
                </Accordion>

                <Divider sx={{ margin: 0, my: 5.5, width: '100%' }} />
              </Card>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>

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
                name='total'
                value={`฿ ${parseFloat(dataRow.total).toLocaleString('en-US', {
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
                name='total_taxes_and_charges'
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
        <Box sx={styles.box}>
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
            <DialogTitle>Row Details</DialogTitle>
            <DialogContent>
              <Card sx={styles.card}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography variant='subtitle1'>Type *</Typography>
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

                    <Box sx={styles.box}>
                      <Typography variant='subtitle1'>Account Head *</Typography>
                      <TextField
                        fullWidth
                        name='account_head'
                        value={selectedRow?.account_head || ''}
                        onChange={handleTextChange}
                        sx={styles.textField}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography variant='subtitle1'>Description *</Typography>
                      <TextField
                        fullWidth
                        disabled
                        name='description'
                        value={selectedRow?.description || ''}
                        onChange={handleTextChange}
                        sx={styles.textField}
                      />
                    </Box>
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedRow?.included_in_print_rate === 1} onChange={handleCheckboxChange} />
                      }
                      label='Is this Tax included in Basic Rate?'
                    />
                    <Typography>
                      If checked, the tax amount will be considered as already included in the Print Rate / Print Amount
                    </Typography>
                  </Grid>
                  <Divider sx={{ margin: 0, my: 5.5, width: '100%' }} />
                  <Box sx={{ ml: 3 }}>
                    <Typography variant='h5'>Item</Typography>
                  </Box>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography variant='subtitle1'>Cost Center</Typography>
                      <TextField
                        fullWidth
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
                      <Typography variant='subtitle1'>Rate</Typography>
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
                <Divider sx={{ margin: 0, my: 5.5, width: '100%' }} />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography variant='subtitle1'>Amount (THB) *</Typography>
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
                      <Typography variant='subtitle1'>Total (THB)</Typography>
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

                    <Box sx={styles.box}>
                      <Typography variant='subtitle1'>Tax Amount After Discount Amount</Typography>
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
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography variant='subtitle1'>Amount (THB)</Typography>
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
                      <Typography variant='subtitle1'>Total (THB)</Typography>
                      <TextField
                        fullWidth
                        disabled
                        variant='outlined'
                        name='base_total'
                        value={
                          selectedRow?.base_total === '0.0'
                            ? '฿ 0.0'
                            : `฿ ${parseFloat(selectedRow?.base_total).toLocaleString('en-US', {
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
                <Divider sx={{ margin: 0, my: 5.5, width: '100%' }} />
              </Card>
            </DialogContent>
          </Dialog>
        </Box>
        {/* /                   แสดงข่อมูลชุด Totals                            / */}
        <Divider sx={{ margin: 0, my: 5.5 }} />
        <Typography sx={{ fontWeight: 'bold' }}>Totals</Typography>
        <Grid container spacing={3}>
          <Grid item sm={12} md={6}>
            <Box sx={styles.box}>
              <Typography>Grand Total (THB)</Typography>
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
              <Typography>Rounding Adjustment (THB)</Typography>
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
                  <Checkbox checked={dataRow?.use_company_roundoff_cost_center === 1} onChange={handleCheckboxChange} />
                }
                label='Use Company default Cost Center for Round off'
              />
            </Box>

            <Box sx={styles.box}>
              <Typography>Rounded Total (THB)</Typography>
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
          <Grid item sm={12} md={6}>
            <Box sx={styles.box}>
              <Typography>In Words (THB)</Typography>
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
              <Typography>Total Advance</Typography>
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
              <Typography>Outstanding Amount (THB)</Typography>
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
                sx={{ mt: -5 }}
                control={<Checkbox checked={dataRow?.disable_rounded_total === 1} onChange={handleCheckboxChange} />}
                label='Disable Rounded Total'
              />
            </Box>
          </Grid>
        </Grid>
        {/* /                   แสดงข่อมูลชุด ที่อยู่ในdopdown                               / */}
        <Divider sx={{ margin: 0, my: 5.5 }} />
        <Grid container>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
                <Typography> Additional Discount</Typography>
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
                      <Box sx={styles.box}>
                        <FormControlLabel
                          sx={{ mt: -2 }}
                          control={
                            <Checkbox
                              checked={dataRow?.is_cash_or_non_trade_discount === 1}
                              onChange={handleCheckboxChange}
                            />
                          }
                          label='Is Cash or Non Trade Discount'
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
                        <Typography variant='subtitle1'>Additional Discount Percentage</Typography>
                        <TextField
                          fullWidth
                          disabled
                          variant='outlined'
                          name='discount_amount'
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
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default DetailSalesInvoice
