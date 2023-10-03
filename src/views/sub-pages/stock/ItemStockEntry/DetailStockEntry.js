//Import React and MUI
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Chip,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

//Icon mdi
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'

const DetailStockEntry = ({ dataRow, setDataRow }) => {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleRowClick = params => {
    setOpen(true)
    setGetItem(params.row)
  }

  function formatDate(dateString) {
    const dateObject = new Date(dateString)
    const day = dateObject.getDate().toString().padStart(2, '0')
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0')
    const year = dateObject.getFullYear()

    return `${day}-${month}-${year}`
  }
  const formattedDate = formatDate(dataRow.posting_date)

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

  const [getDataItem, setGetDataItem] = useState('')
  const [getItem, setGetItem] = useState('')

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}Stock Entry/${dataRow.name}`, {
        headers: {
          Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
        }
      })
      .then(res => {
        setGetDataItem(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [dataRow])

  if (Object.values(getDataItem)?.length === 0) {
    return 'waiting...'
  }

  const columns = [
    { field: 'idx', headerName: 'No', width: 150 },
    { field: 's_warehouse', headerName: 'Source Warehouse', width: 150 },
    { field: 't_warehouse', headerName: 'Target Warehouse', width: 150 },
    { field: 'item_code', headerName: 'Item Code*', width: 150 },
    { field: 'qty', headerName: 'Qty*', width: 150 },
    { field: 'basic_rate', headerName: 'Basic Rate(as per Stock UOM)', width: 150, valueFormatter: formatCurrency },
    {
      field: 'Edit',
      headerName: 'Edit',
      width: 50,
      renderCell: (
        params //ทั้งหมดมี button edit
      ) => (
        <Button
          variant='text'
          onClick={() => {
            setGetItem(params.row)
            setOpen(true)
            console.log(params.row)
          }}
        >
          Edit
        </Button>
      )
    }
  ]

  const checkboxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }

  const handleTextChange = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setDataRow({ ...dataRow, [event.target.name]: event.target.value })
  }

  const handleTextChangeItem = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setGetItem({ ...getItem, [event.target.name]: event.target.value })
  }

  const handleCheckbox = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
    setDataRow({ ...dataRow, [event.target.name]: event.target.checked === true ? 1 : 0 })
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
      <Card sx={{ p: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography sx={{ margin: 1 }}>Stock Entry Type</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                value={dataRow.stock_entry_type}
                fullWidth
                name='stock_entry_type'
              />
            </Box>

            <Box sx={styles.box}>
              <Typography sx={{ margin: 1 }}>Work Order</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                value={dataRow.work_order}
                fullWidth
                name='work_order'
              />
            </Box>

            <Grid sx={checkboxStyle}>
              <Checkbox
                checked={dataRow.inspection_required === 1 ? true : false}
                name='inspection_required'
                onChange={handleCheckbox}
                disabled
              />
              <Typography variant='subtitle2'>Inspection Required</Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography sx={{ margin: 1 }}>Posting Date</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                value={formattedDate}
                fullWidth
                onChange={handleTextChange}
                name='formattedDate'
                disabled
              />
            </Box>

            <Box sx={styles.box}>
              <Typography sx={{ margin: 1 }}>Posting Time</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                value={formattedTime}
                fullWidth
                onChange={handleTextChange}
                name='formattedTime'
                disabled
              />
            </Box>
            <Typography sx={{ margin: 1 }}>Asia/Kolkata</Typography>
          </Grid>
        </Grid>
      </Card>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 'bold', p: 0 }}> BOM Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider sx={{ margin: 0 }} />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Grid item xs={12} sx={checkboxStyle}>
                  <Checkbox
                    checked={dataRow.from_bom === 1 ? true : false}
                    name='from_bom'
                    onChange={handleCheckbox}
                    disabled
                  />
                  <Typography variant='subtitle2'>From BOM</Typography>
                </Grid>

                <Grid item xs={12} sx={checkboxStyle}>
                  <Checkbox
                    checked={dataRow.use_multi_level_bom === 1 ? true : false}
                    name='use_multi_level_bom'
                    onChange={handleCheckbox}
                    disabled
                  />
                  <Typography variant='subtitle2'>Use Multi-Level BOM</Typography>
                </Grid>
                <Typography variant='subtitle2'>Including items for sub assemblies</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={styles.box}>
                  <Typography sx={{ margin: 1 }}>Finished Good Quantity</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={dataRow.fg_completed_qty}
                    fullWidth
                    onChange={handleTextChange}
                    name='fg_completed_qty'
                    disabled
                  />
                </Box>

                <Typography>As per Stock UOM</Typography>
                <Button>Get Item</Button>
              </Grid>
              <Grid item xs={12}>
                <Box sx={styles.box}>
                  <Typography sx={{ margin: 1 }}>BOM No</Typography>
                  <TextField sx={styles.textField} variant='outlined' value={dataRow.bom_no} fullWidth name='bom_no' />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 'bold', p: 0 }}> Default Warehouse</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid>
            <Divider sx={{ margin: 0 }} />
            <CardContent>
              <Grid item xs={12}>
                <Box sx={styles.box}>
                  <Typography sx={{ margin: 1 }}>Default Target Warehouse</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={dataRow.to_warehouse}
                    fullWidth
                    name='to_warehouse'
                  />
                  <Typography variant='subtitle2' sx={{ margin: 1 }}>
                    Sets 'Target Warehouse' in each row of the items table.
                  </Typography>
                </Box>
              </Grid>
            </CardContent>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Card sx={styles.card}>
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12}>
            <Typography variant='h6' sx={{ ml: 2 }}>
              Items
            </Typography>

            <Typography variant='subtitle1' sx={{ ml: 2 }}>
              Items
            </Typography>

            <DataGrid
              rows={getDataItem.items}
              columns={columns}
              getRowId={row => row.name}
              onRowClick={handleRowClick}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 }
                }
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
            <Button>Download</Button>
            <Button>Update Rate and Availability</Button>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 30 }}>
          <Grid item xs={12} lg={6}>
            <Box sx={styles.box}>
              <Typography sx={{ margin: 1 }}>Total Outgoing Value (Consumption)</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                value={
                  dataRow?.total_outgoing_value === '0.0'
                    ? '฿0.0'
                    : dataRow?.total_outgoing_value.toLocaleString('en-US', {
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
                fullWidth
                onChange={handleTextChange}
                name='total_incoming_value'
                disabled
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box sx={styles.box}>
              <Typography sx={{ margin: 1 }}>Total Incoming Value (Receipt)</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                value={
                  dataRow?.total_incoming_value === '0.0'
                    ? '฿0.0'
                    : dataRow?.total_incoming_value.toLocaleString('en-US', {
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
                fullWidth
                onChange={handleTextChange}
                name='total_incoming_value'
                disabled
              />
            </Box>

            <Box sx={styles.box}>
              <Typography sx={{ margin: 1 }}>Total Value Difference (Incoming - Outgoing)</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                value={
                  dataRow?.value_difference === '0.0'
                    ? '฿0.0'
                    : dataRow?.value_difference.toLocaleString('en-US', {
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
                name='value_difference'
                onChange={handleTextChange}
                fullWidth
                disabled
              />
            </Box>
          </Grid>
        </Grid>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          maxWidth={'lg'}
          fullScreen
          PaperProps={{
            style: {
              width: '60%',
              height: '60%',
              margin: 0,
              maxWidth: 'none',
              maxHeight: 'none'
            }
          }}
        >
          <DialogTitle id='Editing Row #1'>
            {'Editing Row #'}
            {getItem.idx}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              <Grid container spacing={3} sx={{ mt: 6 }}>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Source Warehouse</Typography>
                    <TextField
                      sx={styles.textField}
                      variant='outlined'
                      value={getItem.s_warehouse}
                      fullWidth
                      name='s_warehouse'
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Target Warehouse</Typography>
                    <TextField
                      sx={styles.textField}
                      variant='outlined'
                      value={getItem.t_warehouse}
                      fullWidth
                      name='t_warehouse'
                    />
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ margin: 0, mt: 10 }} />

              <Grid container spacing={3} sx={{ mt: 6 }}>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Item Code</Typography>
                    <TextField
                      sx={styles.textField}
                      variant='outlined'
                      value={getItem.item_code}
                      fullWidth
                      name='item_code'
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Item Name</Typography>
                    <TextField
                      sx={styles.textField}
                      variant='outlined'
                      value={getItem.item_name}
                      fullWidth
                      onChange={handleTextChangeItem}
                      name='item_name'
                      disabled
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6} sx={{ mt: 8 }}>
                  <Grid item xs={12} sx={checkboxStyle}>
                    <Checkbox
                      checked={dataRow.is_finished_item === 1 ? true : false}
                      name='is_finished_item'
                      onChange={handleCheckbox}
                      disabled
                    />
                    <Typography variant='subtitle2'>Is Finished Item</Typography>
                  </Grid>

                  <Grid item xs={12} sx={checkboxStyle}>
                    <Checkbox
                      checked={dataRow.is_scrap_item === 1 ? true : false}
                      name='is_scrap_item'
                      onChange={handleCheckbox}
                      disabled
                    />
                    <Typography variant='subtitle2'>Is Scrap Item</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Box>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 'bold', p: 0 }}> Default Warehouse</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Divider sx={{ margin: 0 }} />
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Box sx={styles.box}>
                            <Typography variant='subtitle1'>Description</Typography>
                            <TextField
                              sx={styles.textField}
                              variant='outlined'
                              value={getItem.description}
                              fullWidth
                              onChange={handleTextChangeItem}
                              name='description'
                              disabled
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box sx={styles.box}>
                            <Typography variant='subtitle1'>Item Group</Typography>
                            <TextField
                              sx={styles.textField}
                              variant='outlined'
                              value={getItem.item_group}
                              fullWidth
                              onChange={handleTextChangeItem}
                              name='item_group'
                              disabled
                            />
                          </Box>

                          <Box sx={{ width: 100, height: 100, backgroundColor: '#e0e0e0', mt: 6 }}></Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </AccordionDetails>
                </Accordion>
              </Box>

              <Typography sx={{ fontWeight: 'bold', mt: 6 }}>Quantity</Typography>
              <Grid container spacing={3} sx={{ mt: 6 }}>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Qty*</Typography>
                    <TextField
                      sx={styles.textField}
                      variant='outlined'
                      value={getItem.qty}
                      fullWidth
                      onChange={handleTextChangeItem}
                      name='qty'
                      disabled
                    />
                  </Box>

                  <Grid item xs={12} sx={checkboxStyle}>
                    <Checkbox
                      checked={dataRow.retain_sample === 1 ? true : false}
                      name='retain_sample'
                      onChange={handleCheckbox}
                      disabled
                    />
                    <Typography variant='subtitle2'>Retain Sample</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>UOM*</Typography>
                    <TextField
                      sx={styles.textField}
                      variant='outlined'
                      value={getItem.uom}
                      fullWidth
                      onChange={handleTextChangeItem}
                      name='uom'
                    />
                  </Box>
                </Grid>
              </Grid>

              <Grid sx={{ mt: 6 }}>
                <Typography sx={{ fontWeight: 'bold' }}>Rates</Typography>
              </Grid>

              <Grid container spacing={3} sx={{ mt: 4 }}>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Basic Rate (as per Stock UOM)</Typography>
                    <TextField
                      sx={styles.textField}
                      variant='outlined'
                      value={
                        getItem?.basic_rate === '0.0'
                          ? '฿ 0.0'
                          : `฿ ${parseFloat(getItem?.basic_rate).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}`
                      }
                      fullWidth
                      onChange={handleTextChangeItem}
                      name='basic_rate'
                      disabled
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Additional Cost</Typography>
                    <TextField
                      sx={styles.textField}
                      variant='outlined'
                      value={
                        getItem?.additional_cost === '0.0'
                          ? '฿ 0.0'
                          : `฿ ${parseFloat(getItem?.additional_cost).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}`
                      }
                      fullWidth
                      onChange={handleTextChangeItem}
                      name='additional_cost'
                      disabled
                    />
                  </Box>
                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Valuation Rate</Typography>
                    <TextField
                      sx={styles.textField}
                      variant='outlined'
                      value={
                        getItem?.valuation_rate === '0.0'
                          ? '฿ 0.0'
                          : `฿ ${parseFloat(getItem?.valuation_rate).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}`
                      }
                      fullWidth
                      onChange={handleTextChangeItem}
                      name='valuation_rate'
                      disabled
                    />
                  </Box>

                  <Grid item xs={12} sx={checkboxStyle}>
                    <Checkbox
                      checked={dataRow.allow_zero_valuation_rate === 1 ? true : false}
                      name='allow_zero_valuation_rate'
                      onChange={handleCheckbox}
                    />
                    <Typography variant='subtitle2'> Allow Zero Valuation Rate</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Basic Amount</Typography>
                    <TextField
                      sx={styles.textField}
                      variant='outlined'
                      value={
                        getItem?.basic_amount === '0.0'
                          ? '฿ 0.0'
                          : `฿ ${parseFloat(getItem?.basic_amount).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}`
                      }
                      fullWidth
                      onChange={handleTextChangeItem}
                      name='basic_amount'
                      disabled
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Amount</Typography>
                    <TextField
                      sx={styles.textField}
                      variant='outlined'
                      value={
                        getItem?.amount === '0.0'
                          ? '฿ 0.0'
                          : `฿ ${parseFloat(getItem?.amount).toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}`
                      }
                      fullWidth
                      onChange={handleTextChangeItem}
                      name='amount'
                      disabled
                    />
                  </Box>
                </Grid>
              </Grid>

              <Box>
                <Typography sx={{ fontWeight: 'bold', mt: 6 }}>Serial No / Batch</Typography>
              </Box>
              <Box>
                <Chip label='Add Serial / Batch No' />
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography sx={{ fontWeight: 'bold', mt: 6 }}>Accounting</Typography>
                  <Box sx={styles.box}>
                    <Typography variant='subtitle1' sx={{ mt: 2 }}>
                      Difference Account
                    </Typography>
                    <TextField
                      sx={styles.textField}
                      variant='outlined'
                      value={getItem.expense_account}
                      fullWidth
                      name='expense_account'
                    />
                  </Box>
                </Grid>
              </Grid>
              <Box>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 'bold', p: 0 }}> Accounting Dimensions</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box>
                      <Divider sx={{ margin: 0 }} />
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Box sx={styles.box}>
                              <Typography variant='subtitle1'>Cost Center</Typography>
                              <TextField
                                sx={styles.textField}
                                variant='outlined'
                                value={getItem.cost_center}
                                fullWidth
                                name='cost_center'
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>

              <Box>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 'bold', p: 0 }}> More Information</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box>
                      <Divider sx={{ margin: 0 }} />
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Box sx={styles.box}>
                              <Typography variant='subtitle1'>Actual Qty (at source/target)</Typography>
                              <TextField
                                sx={styles.textField}
                                variant='outlined'
                                value={getItem.actual_qty}
                                fullWidth
                                onChange={handleTextChangeItem}
                                name='actual_qty'
                                disabled
                              />
                            </Box>

                            <Box sx={styles.box}>
                              <Typography variant='subtitle1'>Transferred Qty</Typography>
                              <TextField
                                sx={styles.textField}
                                variant='outlined'
                                value={getItem.transferred_qty}
                                fullWidth
                                onChange={handleTextChangeItem}
                                name='transferred_qty'
                                disabled
                              />
                            </Box>

                            <Grid item xs={12} sx={checkboxStyle}>
                              <Checkbox
                                checked={dataRow.allow_alternative_item === 1 ? true : false}
                                name='allow_alternative_item'
                                onChange={handleCheckbox}
                                disabled
                              />
                              <Typography variant='subtitle2'>Allow Alternative Item</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Insert Below</Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Box>
  )
}

export default DetailStockEntry
