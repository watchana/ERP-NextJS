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
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import Icon from '@mdi/react'
import { mdiPencil } from '@mdi/js'
import useMediaQuery from '@mui/material/useMediaQuery'

const DetailPurchaseInvoice = ({ dataRow, setDataRow }) => {
  // ** State

  const [currencyPrice, setCurrencyPrice] = useState(false)
  const [additionalDiscount, setAdditionalDiscount] = useState(false)
  const [description, setDescription] = useState(false)
  const [image, setImage] = useState(false)
  const [discountMargin, setDiscountMargin] = useState(false)
  const [deferredExpense, setDropShip] = useState(false)
  const [reference, setAccountingDetails] = useState(false)
  const [deferredRevenue, setDeferredRevenue] = useState(false)
  const [itemWeightDetails, setItemWeightDetails] = useState(false)
  const [stockDetails, setStockDetails] = useState(false)
  const [references, setReferences] = useState(false)
  const [accountingDimensions, setAccountingDimensions] = useState(false)
  const [activity, setActivity] = useState(false)

  const handleClickActivity = () => {
    setActivity(!activity)
  }

  const handleClickAdditionalDiscount = () => {
    setAdditionalDiscount(!additionalDiscount)
  }

  const handleClickCurrencyPrice = () => {
    setCurrencyPrice(!currencyPrice)
  }

  const handleClickDescription = () => {
    setDescription(!description)
  }

  const handleClickImage = () => {
    setImage(!image)
  }

  const handleClickDeferredExpense = () => {
    setDropShip(!deferredExpense)
  }

  const handleClickReference = () => {
    setAccountingDetails(!reference)
  }

  const handleClickDeferredRevenue = () => {
    setDeferredRevenue(!deferredRevenue)
  }

  const handleClickItemWeightDetails = () => {
    setItemWeightDetails(!itemWeightDetails)
  }

  const handleClickReferences = () => {
    setReferences(!references)
  }

  const handleClickStockDetails = () => {
    setStockDetails(!stockDetails)
  }

  const handleClickAccountingDimensions = () => {
    setAccountingDimensions(!accountingDimensions)
  }

  const handleClickDiscountMargin = () => {
    setDiscountMargin(!discountMargin)
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
  const isLGScreen = useMediaQuery(theme => theme.breakpoints.up('lg'))

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
        <Grid item xs={12} sm={12} md={6} lg={6}>
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
            <Card sx={{ width: '100%', p: 5 }}>
              <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography>Item</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      fullWidth
                      value={selectedRow?.item_code || ''}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography>Item Name</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      fullWidth
                      value={selectedRow?.item_name || ''}
                    />
                  </Grid>
                </Grid>
                <Divider sx={{ margin: 0, my: 4, width: '100%' }} />
                <Grid container>
                  <Box sx={{ width: '100%' }}>
                    <Button variant='filled' onClick={handleClickDescription} sx={{ fontWeight: 'bold' }}>
                      Description
                    </Button>
                    <IconButton size='small' onClick={handleClickDescription}>
                      {description ? (
                        <ChevronUp sx={{ fontSize: '1.875rem' }} />
                      ) : (
                        <ChevronDown sx={{ fontSize: '1.875rem' }} />
                      )}
                    </IconButton>
                  </Box>

                  <Grid container>
                    <Collapse in={description} width={'100%'} style={{ width: '100%' }}>
                      <Divider sx={{ margin: 0, width: '100%' }} />
                      <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Typography>Description * </Typography>
                          <TextField
                            sx={{ marginBottom: 5 }}
                            size='small'
                            variant='filled'
                            fullWidth
                            label=''
                            value={selectedRow?.description || ''}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Typography>Item Group </Typography>
                          <TextField
                            sx={{ marginBottom: 5 }}
                            size='small'
                            variant='filled'
                            fullWidth
                            label=''
                            value={selectedRow?.item_group || ''}
                          />
                        </Grid>
                      </Grid>
                    </Collapse>
                  </Grid>
                </Grid>
                <Divider sx={{ margin: 0, my: 4, width: '100%' }} />

                <Grid container>
                  <Box sx={{ width: '100%' }}>
                    <Button variant='filled' onClick={handleClickImage} sx={{ fontWeight: 'bold' }}>
                      Image
                    </Button>
                    <IconButton size='small' onClick={handleClickImage}>
                      {image ? (
                        <ChevronUp sx={{ fontSize: '1.875rem' }} />
                      ) : (
                        <ChevronDown sx={{ fontSize: '1.875rem' }} />
                      )}
                    </IconButton>
                  </Box>
                  <Grid container>
                    <Collapse in={image} width={'100%'} style={{ width: '100%' }}>
                      <Divider sx={{ margin: 0, mb: 5, width: '100%' }} />
                      <Grid container spacing={2} style={{ width: '100%' }}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
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
                        </Grid>
                      </Grid>
                    </Collapse>
                  </Grid>
                </Grid>
                <Divider sx={{ margin: 0, my: 4.5, width: '100%' }} />
                <Grid container spacing={2} style={{ width: '100%' }}>
                  <Grid item mt={3}>
                    <Typography sx={{ fontWeight: 'bold' }}>Quantity and Rate</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{ width: '100%' }}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography>Received Qty</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      fullWidth
                      value={selectedRow?.received_qty === '0' ? '0' : selectedRow?.received_qty}
                    />
                    <Typography>Accepted Qty</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      fullWidth
                      value={selectedRow?.qty === '0' ? '0' : selectedRow?.qty}
                    />
                    <Typography>Rejected Qty</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      fullWidth
                      value={selectedRow?.rejected_qty === '0' ? '0' : selectedRow?.rejected_qty}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography>UOM *</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      fullWidth
                      value={selectedRow?.uom || ''}
                    />
                  </Grid>
                </Grid>
                <Divider sx={{ margin: 0, my: 4.5, width: '100%' }} />
                <Grid container spacing={2} style={{ width: '100%' }}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography>Price List Rate (THB)</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      fullWidth
                      value={
                        selectedRow?.price_list_rate ||
                        ''.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Typography>฿</Typography>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography>Price List Rate (THB)</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      fullWidth
                      value={
                        selectedRow?.base_price_list_rate === '0.0'
                          ? '฿0.0'
                          : selectedRow?.base_price_list_rate ||
                            ''.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Typography>฿</Typography>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
                <Divider sx={{ margin: 0, my: 4.5, width: '100%' }} />
                <Grid container>
                  <Box sx={{ width: '100%' }}>
                    <Button variant='filled' onClick={handleClickDiscountMargin} sx={{ fontWeight: 'bold' }}>
                      Discount and Margin
                    </Button>
                    <IconButton size='small' onClick={handleClickDiscountMargin}>
                      {discountMargin ? (
                        <ChevronUp sx={{ fontSize: '1.875rem' }} />
                      ) : (
                        <ChevronDown sx={{ fontSize: '1.875rem' }} />
                      )}
                    </IconButton>
                  </Box>

                  <Grid container>
                    <Collapse in={discountMargin} width={'100%'} style={{ width: '100%' }}>
                      <Divider sx={{ margin: 0, width: '100%' }} />
                      <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Typography>Discount on Price List Rate (%)</Typography>
                          <TextField
                            sx={{ marginBottom: 5 }}
                            size='small'
                            variant='filled'
                            fullWidth
                            value={selectedRow?.base_amount === '0.0' ? '0%' : selectedRow?.discount_percentage + '%'}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography>Discount Amount </Typography>
                          <TextField
                            sx={{ marginBottom: 5 }}
                            size='small'
                            variant='filled'
                            fullWidth
                            value={
                              selectedRow?.discount_amount === '0.0'
                                ? '฿0.0'
                                : selectedRow?.discount_amount ||
                                  ''.toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                  })
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position='start'>
                                  <Typography>฿</Typography>
                                </InputAdornment>
                              )
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Collapse>
                  </Grid>
                </Grid>
                <Divider sx={{ margin: 0, my: 4, width: '100%' }} />
                <Grid container spacing={2} style={{ width: '100%' }}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography>Rate (THB) *</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      fullWidth
                      value={
                        selectedRow?.rate === '0.0'
                          ? '฿0.0'
                          : selectedRow?.rate ||
                            ''.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Typography>฿</Typography>
                          </InputAdornment>
                        )
                      }}
                    />
                    <Typography>Amount (THB) * </Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      fullWidth
                      value={
                        selectedRow?.amount === '0.0'
                          ? '฿0.0'
                          : selectedRow?.amount ||
                            ''.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Typography>฿</Typography>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography>Rate (THB) *</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      fullWidth
                      value={
                        selectedRow?.base_rate === '0.0'
                          ? '฿0.0'
                          : selectedRow?.base_rate ||
                            ''.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Typography>฿</Typography>
                          </InputAdornment>
                        )
                      }}
                    />
                    <Typography>Amount (THB) *</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      fullWidth
                      value={
                        selectedRow?.base_amount === '0.0'
                          ? '฿0.0'
                          : selectedRow?.base_amount ||
                            ''.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Typography>฿</Typography>
                          </InputAdornment>
                        )
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(selectedRow?.is_free_item) || false}
                          onChange={handleCheckboxChange}
                        />
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
                <Grid container spacing={2} style={{ width: '100%' }}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography>Net Rate (THB)</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      fullWidth
                      value={
                        selectedRow?.net_rate === '0.0'
                          ? '฿0.0'
                          : selectedRow?.net_rate ||
                            ''.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Typography>฿</Typography>
                          </InputAdornment>
                        )
                      }}
                    />
                    <Typography>Net Amount (THB)</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      fullWidth
                      value={
                        selectedRow?.net_amount === '0.0'
                          ? '฿0.0'
                          : selectedRow?.net_amount ||
                            ''.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Typography>฿</Typography>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography>Net Rate (THB)</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      fullWidth
                      value={
                        selectedRow?.base_net_rate === '0.0'
                          ? '฿0.0'
                          : selectedRow?.base_net_rate ||
                            ''.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Typography>฿</Typography>
                          </InputAdornment>
                        )
                      }}
                    />
                    <Typography>Net Amount (THB)</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      fullWidth
                      value={
                        selectedRow?.base_net_amount === '0.0'
                          ? '฿0.0'
                          : selectedRow?.base_net_amount ||
                            ''.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Typography>฿</Typography>
                          </InputAdornment>
                        )
                      }}
                    />
                    <Typography>Landed Cost Voucher Amount</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      fullWidth
                      value={
                        selectedRow?.landed_cost_voucher_amount === '0'
                          ? '0'
                          : selectedRow?.landed_cost_voucher_amount ||
                            `0`.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Typography>฿</Typography>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
                <Divider sx={{ margin: 0, my: 4, width: '100%' }} />
                <Grid container spacing={2} style={{ width: '100%' }}>
                  <Grid item mt={3}>
                    <Typography sx={{ fontWeight: 'bold' }}>Warehouse</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{ width: '100%' }}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography>Accepted Warehouse</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      fullWidth
                      value={selectedRow?.warehouse || ''}
                    />
                  </Grid>
                </Grid>
                <Divider sx={{ margin: 0, my: 4, width: '100%' }} />
                <Grid container spacing={2} style={{ width: '100%' }}>
                  <Grid item mt={3}>
                    <Typography sx={{ fontWeight: 'bold' }}>Accounting</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{ width: '100%' }}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography>Expense Head</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      fullWidth
                      value={selectedRow?.expense_account || ''}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ margin: 0, my: 4.5, width: '100%' }} />
                <Grid container>
                  <Box sx={{ width: '100%' }}>
                    <Button variant='filled' onClick={handleClickDeferredExpense} sx={{ fontWeight: 'bold' }}>
                      Deferred Expense
                    </Button>
                    <IconButton size='small' onClick={handleClickDeferredExpense}>
                      {deferredExpense ? (
                        <ChevronUp sx={{ fontSize: '1.875rem' }} />
                      ) : (
                        <ChevronDown sx={{ fontSize: '1.875rem' }} />
                      )}
                    </IconButton>
                  </Box>

                  <Grid container>
                    <Collapse in={deferredExpense} width={'100%'} style={{ width: '100%' }}>
                      <Divider sx={{ margin: 0, width: '100%' }} />
                      <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={Boolean(dataRow?.enable_deferred_expense) || false}
                                onChange={handleCheckboxChange}
                              />
                            }
                            label='Enable Deferred Expense'
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
                      </Grid>
                    </Collapse>
                  </Grid>
                </Grid>
                <Divider sx={{ margin: 0, my: 4.5, width: '100%' }} />
                <Grid container>
                  <Box sx={{ width: '100%' }}>
                    <Button variant='filled' onClick={handleClickReference} sx={{ fontWeight: 'bold' }}>
                      Reference
                    </Button>
                    <IconButton size='small' onClick={handleClickReference}>
                      {reference ? (
                        <ChevronUp sx={{ fontSize: '1.875rem' }} />
                      ) : (
                        <ChevronDown sx={{ fontSize: '1.875rem' }} />
                      )}
                    </IconButton>
                  </Box>

                  <Grid container>
                    <Collapse in={reference} width={'100%'} style={{ width: '100%' }}>
                      <Divider sx={{ margin: 0, width: '100%' }} />
                      <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={Boolean(dataRow?.allow_zero_valuation_rate) || false}
                                onChange={handleCheckboxChange}
                              />
                            }
                            label='Allow Zero Valuation Rate'
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Typography>Purchase Order</Typography>
                          <TextField
                            sx={{ marginBottom: 5 }}
                            size='small'
                            variant='filled'
                            fullWidth
                            value={selectedRow?.purchase_order || ''}
                            onChange={handleTextChange}
                          />
                          <Typography>Purchase Receipt</Typography>
                          <TextField
                            sx={{ marginBottom: 5 }}
                            size='small'
                            variant='filled'
                            fullWidth
                            value={selectedRow?.purchase_receipt || ''}
                          />
                        </Grid>
                      </Grid>
                    </Collapse>
                  </Grid>
                </Grid>

                <Divider sx={{ margin: 0, my: 4.5, width: '100%' }} />
                <Grid container>
                  <Box sx={{ width: '100%' }}>
                    <Button variant='filled' onClick={handleClickItemWeightDetails} sx={{ fontWeight: 'bold' }}>
                      Item Weight Details
                    </Button>
                    <IconButton size='small' onClick={handleClickItemWeightDetails}>
                      {itemWeightDetails ? (
                        <ChevronUp sx={{ fontSize: '1.875rem' }} />
                      ) : (
                        <ChevronDown sx={{ fontSize: '1.875rem' }} />
                      )}
                    </IconButton>
                  </Box>

                  <Grid container>
                    <Collapse in={itemWeightDetails} width={'100%'} style={{ width: '100%' }}>
                      <Divider sx={{ margin: 0, width: '100%' }} />
                      <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          {' '}
                          <Typography>Weight Per Unit </Typography>
                          <TextField
                            sx={{ marginBottom: 5 }}
                            size='small'
                            variant='filled'
                            fullWidth
                            value={selectedRow?.weight_per_unit}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Typography>Total Weight</Typography>
                          <TextField
                            sx={{ marginBottom: 5 }}
                            size='small'
                            variant='filled'
                            fullWidth
                            value={selectedRow?.total_weight}
                          />
                        </Grid>
                      </Grid>
                    </Collapse>
                  </Grid>
                </Grid>

                <Divider sx={{ margin: 0, my: 4.5, width: '100%' }} />
                <Grid container>
                  <Box sx={{ width: '100%' }}>
                    <Button variant='filled' onClick={handleClickAccountingDimensions} sx={{ fontWeight: 'bold' }}>
                      Accounting Dimensions
                    </Button>
                    <IconButton size='small' onClick={handleClickAccountingDimensions}>
                      {accountingDimensions ? (
                        <ChevronUp sx={{ fontSize: '1.875rem' }} />
                      ) : (
                        <ChevronDown sx={{ fontSize: '1.875rem' }} />
                      )}
                    </IconButton>
                  </Box>

                  <Grid container>
                    <Collapse in={accountingDimensions} width={'100%'} style={{ width: '100%' }}>
                      <Divider sx={{ margin: 0, width: '100%' }} />
                      <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          {' '}
                          <Typography>Cost Center * </Typography>
                          <TextField
                            sx={{ marginBottom: 5 }}
                            size='small'
                            variant='filled'
                            fullWidth
                            value={selectedRow?.cost_center}
                          />
                        </Grid>
                      </Grid>
                    </Collapse>
                  </Grid>
                </Grid>
              </Grid>
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
          <Grid item xs={12} sm={12} md={6} lg={6}></Grid>

          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography variant='subtitle1'>Taxes and Charges Added (THB)</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='currency'
                value={dataRow.taxes_and_charges_added.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Typography>฿</Typography>
                    </InputAdornment>
                  )
                }}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>

            <Typography>Taxes and Charges Deducted (THB)</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              size='small'
              variant='filled'
              fullWidth
              value={
                dataRow.taxes_and_charges_deducted ||
                '0'.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Typography>฿</Typography>
                  </InputAdornment>
                )
              }}
            />
            <Box sx={styles.box}>
              <Typography variant='subtitle1'>Taxes and Charges Added (THB)</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='currency'
                value={dataRow.taxes_and_charges_added.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Typography>฿</Typography>
                    </InputAdornment>
                  )
                }}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>
            <Typography>Total Taxes and Charges (THB)</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              size='small'
              variant='filled'
              fullWidth
              value={
                dataRow.total_taxes_and_charges ||
                ''.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Typography>฿</Typography>
                  </InputAdornment>
                )
              }}
            />
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
              <Card sx={{ width: '100%', p: 5 }}>
                <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Grid container spacing={2} width={'100%'}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Typography>Consider Tax or Charge for *</Typography>
                      <TextField
                        sx={{ marginBottom: 5 }}
                        size='small'
                        variant='filled'
                        fullWidth
                        label=''
                        value={selectedRow?.category || ''}
                      />
                      <Typography>Add or Deduct *</Typography>
                      <TextField
                        sx={{ marginBottom: 5 }}
                        size='small'
                        variant='filled'
                        fullWidth
                        label=''
                        value={selectedRow?.add_deduct_tax || ''}
                      />
                      <Typography>Type *</Typography>
                      <TextField
                        sx={{ marginBottom: 5 }}
                        size='small'
                        variant='filled'
                        fullWidth
                        value={selectedRow?.charge_type || ''}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} sx={{ mb: 5 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={Boolean(dataRow?.included_in_print_rate) || false}
                            onChange={handleCheckboxChange}
                          />
                        }
                        label='Is this Tax included in Basic Rate?'
                      />
                      <Typography>
                        If checked, the tax amount will be considered as already included in the Print Rate / Print
                        Amount
                      </Typography>
                      <Typography>Account Head *</Typography>
                      <TextField
                        sx={{ marginBottom: 5 }}
                        size='small'
                        variant='filled'
                        fullWidth
                        label=''
                        value={selectedRow?.account_head || ''}
                      />
                      <Typography>Account Head *</Typography>
                      <TextField
                        sx={{ marginBottom: 5 }}
                        size='small'
                        variant='filled'
                        fullWidth
                        label=''
                        value={selectedRow?.account_head || ''}
                      />
                    </Grid>
                    <Divider sx={{ margin: 0, my: 5.5, width: '100%' }} />

                    <Grid container spacing={2} style={{ width: '100%' }}>
                      <Grid item mt={3}>
                        <Typography sx={{ fontWeight: 'bold', ml: 1.5 }}>Accounting Dimensions</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} width={'100%'}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Typography>Cost Center</Typography>
                      <TextField
                        sx={{ marginBottom: 5 }}
                        size='small'
                        variant='filled'
                        fullWidth
                        value={selectedRow?.cost_center || ''}
                      />
                    </Grid>
                  </Grid>
                  <Divider sx={{ margin: 0, my: 5.5, width: '100%' }} />
                  <Grid container spacing={2} width={'100%'}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Typography>Rate</Typography>
                      <TextField
                        sx={{ marginBottom: 5 }}
                        size='small'
                        variant='filled'
                        fullWidth
                        value={selectedRow?.tax_amount || 0}
                      />
                    </Grid>
                  </Grid>
                  <Divider sx={{ margin: 0, my: 5.5, width: '100%' }} />
                  <Grid container spacing={2} width={'100%'}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Typography>Account Currency</Typography>
                      <TextField
                        sx={{ marginBottom: 5 }}
                        size='small'
                        variant='filled'
                        fullWidth
                        value={selectedRow?.account_currency || ''}
                      />

                      <Typography>Amount (THB) *</Typography>
                      <TextField
                        sx={{ marginBottom: 5 }}
                        size='small'
                        variant='filled'
                        fullWidth
                        value={
                          selectedRow?.tax_amount === '0.0'
                            ? '฿ 0.0'
                            : `฿ ${parseFloat(selectedRow?.tax_amount).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}`
                        }
                      />

                      <Typography>Tax Amount After Discount Amount</Typography>
                      <TextField
                        sx={{ marginBottom: 5 }}
                        size='small'
                        variant='filled'
                        fullWidth
                        value={
                          selectedRow?.tax_amount_after_discount_amount === '0.0'
                            ? '฿ 0.0'
                            : `฿ ${parseFloat(selectedRow?.tax_amount_after_discount_amount).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}`
                        }
                      />
                      <Typography>Total (THB)</Typography>
                      <TextField
                        sx={{ marginBottom: 5 }}
                        size='small'
                        variant='filled'
                        fullWidth
                        value={
                          selectedRow?.total === '0.0'
                            ? '฿ 0.0'
                            : `฿ ${parseFloat(selectedRow?.total).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}`
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Typography>Amount (THB)</Typography>
                      <TextField
                        sx={{ marginBottom: 5 }}
                        size='small'
                        variant='filled'
                        fullWidth
                        value={
                          selectedRow?.base_tax_amount === '0.0'
                            ? '฿ 0.0'
                            : `฿ ${parseFloat(selectedRow?.base_tax_amount).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}`
                        }
                      />
                      <Typography>Tax Amount After Discount Amount</Typography>
                      <TextField
                        sx={{ marginBottom: 5 }}
                        size='small'
                        variant='filled'
                        fullWidth
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
                      />
                    </Grid>
                  </Grid>
                  <Divider sx={{ margin: 0, my: 5.5, width: '100%' }} />
                </Grid>
              </Card>
            </DialogContent>
          </Dialog>
        </Box>
        {/* /                   แสดงข่อมูลชุด Totals                            / */}
        <Divider sx={{ margin: 0, my: 4.5 }} />
        <Typography sx={{ fontWeight: 'bold' }}>Totals</Typography>
        <Grid container spacing={2} width={'100%'}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography>Grand Total (THB)</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              size='small'
              variant='filled'
              fullWidth
              label=''
              value={`฿ ${parseFloat(dataRow.grand_total).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}`}
            />
            <Typography>Rounding Adjustment (THB)</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              size='small'
              variant='filled'
              fullWidth
              value={`฿ ${parseFloat(dataRow.rounding_adjustment).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}`}
            />
            <FormControlLabel
              sx={{ mt: -5 }}
              control={
                <Checkbox
                  checked={Boolean(dataRow?.use_company_roundoff_cost_center) || false}
                  onChange={handleCheckboxChange}
                />
              }
              label='Use Company default Cost Center for Round off'
            />
            <Typography>Rounded Total (THB)</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              size='small'
              variant='filled'
              fullWidth
              label=''
              value={`฿ ${parseFloat(dataRow.rounded_total).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}`}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography></Typography>
            <Typography>In Words (THB)</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              size='small'
              variant='filled'
              fullWidth
              label=''
              value={dataRow.in_words}
            />

            <Typography>Total Advance</Typography>
            <TextField
              sx={{
                marginBottom: 5,
                ...(isLGScreen ? { marginBottom: 12 } : {}) // เพิ่ม mb5 ถ้าหน้าจอ LG (ความกว้าง >= 1280px)
              }}
              size='small'
              variant='filled'
              fullWidth
              label=''
              value={`฿ ${parseFloat(dataRow.total_advance).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}`}
            />

            <Typography>Outstanding Amount (THB)</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              size='small'
              variant='filled'
              fullWidth
              label=''
              value={`฿ ${parseFloat(dataRow.outstanding_amount).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}`}
            />
            <FormControlLabel
              sx={{ mt: -5 }}
              control={
                <Checkbox checked={Boolean(dataRow?.disable_rounded_total) || false} onChange={handleCheckboxChange} />
              }
              label='Disable Rounded Total'
            />
          </Grid>
        </Grid>
        {/* /                   แสดงข่อมูลชุด ที่อยู่ในdopdown                               / */}
        <Divider sx={{ margin: 0, my: 4.5 }} />
        <Grid container sx={{ mb: 5 }}>
          <Box sx={{ width: '100%' }}>
            <Button size='small' sx={{ fontWeight: 'bold' }} variant='filled' onClick={handleClickAdditionalDiscount}>
              Additional Discount
            </Button>
            <IconButton size='small' onClick={handleClickAdditionalDiscount}>
              {additionalDiscount ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </IconButton>
          </Box>
          <Collapse in={additionalDiscount} width={'100%'} style={{ width: '100%' }}>
            <Divider sx={{ margin: 0, width: '100%' }} />
            <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography>Apply Additional Discount On</Typography>
                <TextField
                  sx={{ marginBottom: 5 }}
                  size='small'
                  variant='filled'
                  fullWidth
                  value={dataRow.apply_discount_on}
                />
                <FormControlLabel
                  sx={{ mt: -2 }}
                  control={
                    <Checkbox
                      checked={Boolean(dataRow?.is_cash_or_non_trade_discount) || false}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label='Is Cash or Non Trade Discount'
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography>Additional Discount Percentage</Typography>
                <TextField
                  sx={{ marginBottom: 5 }}
                  size='small'
                  variant='filled'
                  fullWidth
                  label=''
                  value={dataRow.additional_discount_percentage}
                />
                <Typography>Additional Discount Amount (THB)</Typography>
                <TextField
                  sx={{ marginBottom: 5 }}
                  size='small'
                  variant='filled'
                  fullWidth
                  label=''
                  value={`฿ ${parseFloat(dataRow.discount_amount).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}`}
                />
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
        <Divider sx={{ margin: 0, my: 4, width: '100%' }} />
        <Grid container>
          <Grid item sx={{ width: '100%' }}>
            <Button size='small' variant='filled' sx={{ fontWeight: 'bold' }} onClick={handleClickActivity}>
              Tax Breakup
            </Button>
            <IconButton size='small' onClick={handleClickActivity}>
              {activity ? <ChevronUp sx={{ fontSize: '1.875rem' }} /> : <ChevronDown sx={{ fontSize: '1.875rem' }} />}
            </IconButton>
          </Grid>
          <Collapse in={activity} style={{ width: '100%', overflowY: 'auto' }}>
            <Divider sx={{ margin: 0 }} />
            {dataRow.other_charges_calculation && (
              <Card sx={{ margin: '4px', padding: '8px', textAlign: 'left' }}>
                <table style={{ width: '100%', fontSize: '13px', textAlign: 'left' }}>
                  <tbody dangerouslySetInnerHTML={{ __html: dataRow.other_charges_calculation }} />
                </table>
              </Card>
            )}
          </Collapse>
        </Grid>
      </Card>
    </Box>
  )
}

export default DetailPurchaseInvoice
