import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Checkbox,
  CardActions,
  Divider,
  CardContent,
  FormGroup,
  FormControlLabel,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Card,
  InputAdornment
} from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { useEffect, useState } from 'react'

//Import Icon
import { ChevronUp } from 'mdi-material-ui'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import IconButton from '@mui/material/IconButton'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'

const ProductItemBOM = ({ dataRow, setDataRow }) => {
  const [collapseConfig, setCollapseConfig] = useState([])
  const [getDataItem, setGetDataItem] = useState([])
  const [getItemTable, setGetItemTable] = useState([])
  const [collapseDiscription, setCollapseDiscription] = useState([])
  const [open, setOpen] = useState(false)

  function formatCurrency(params) {
    const formattedValue = new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2
    }).format(params.value)

    return formattedValue
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChickConfig = () => {
    setCollapseConfig(!collapseConfig)
  }

  const handleChickDiscription = () => {
    setCollapseDiscription(!collapseDiscription)
  }

  const handleRowClick = params => {
    setOpen(true)
    setGetItemTable(params.row)
  }

  // const handleCheckboxChange = event => {
  //   console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
  // }

  const handleCheckboxChange = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
    setDataRow({ ...dataRow, [event.target.name]: event.target.checked === true ? 1 : 0 })
  }

  // const handleTextChange = event => {
  //   console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
  //   setDataRow({ ...dataRow, [event.target.name]: event.target.value })
  // }

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}BOM/${dataRow.name}`, {
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

  const columns = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'item_code', headerName: 'Item Code', width: 150 },
    { field: 'qty', headerName: 'Qty', width: 150 },
    { field: 'uom', headerName: 'UOM', width: 150 },
    { field: 'rate', headerName: 'Rate(THB)', width: 150, valueFormatter: formatCurrency },
    { field: 'amount', headerName: 'Amount (THB)', width: 150, valueFormatter: formatCurrency },
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
            setGetItemTable(params.row)
            console.log(params.row)
          }}
        >
          Edit
        </Button>
      )
    }
  ]

  if (getDataItem.length === 0) {
    return 'waiting...'
  }

  const checkboxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }

  return (
    <Card sx={{ p: 4 }}>
      <Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography>Item</Typography>
            <TextField size='small' variant='filled' label='' value={dataRow.item || ''} fullWidth />
            <Typography variant='subtitle2' sx={{ marginBottom: 5 }}>
              Item to be manufactured or repacked
            </Typography>

            <Typography>Item UOM</Typography>
            <TextField
              size='small'
              variant='filled'
              label=''
              fullWidth
              value={dataRow.uom || ''}
              sx={{ marginBottom: 5 }}
            />

            <Typography>Quantity</Typography>
            <TextField size='small' variant='filled' label='' value={dataRow.quantity} fullWidth disabled />
            <Typography variant='subtitle2'>
              Quantity of item obtained after manufacturing / repacking from given quantities of raw materials
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid sx={checkboxStyle}>
              <Checkbox
                checked={dataRow.is_active === 1 ? true : false}
                name='is_active'
                onChange={handleCheckboxChange}
              />
              <Typography variant='subtitle2'>Is Active</Typography>
            </Grid>

            <Grid sx={checkboxStyle}>
              <Checkbox
                checked={dataRow.is_default === 1 ? true : false}
                name='is_default'
                onChange={handleCheckboxChange}
              />
              <Typography variant='subtitle2'>Is Default</Typography>
            </Grid>

            <Grid sx={checkboxStyle}>
              <Checkbox
                checked={dataRow.allow_alternative_item === 1 ? true : false}
                name='allow_alternative_item'
                onChange={handleCheckboxChange}
                disabled
              />
              <Typography variant='subtitle2'>Allow Alternative Item</Typography>
            </Grid>

            <Grid sx={checkboxStyle}>
              <Checkbox
                checked={dataRow.set_rate_of_sub_assembly_item_based_on_bom === 1 ? true : false}
                name='set_rate_of_sub_assembly_item_based_on_bom'
                onChange={handleCheckboxChange}
              />
              <Typography variant='subtitle2'>Set rate of sub-assembly item based on BOM</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid sx={{ mt: 10, display: 'flex' }}>
          <Button size='small' variant='filled' label='' onClick={handleChickConfig} sx={{ fontWeight: 'bold' }}>
            Cost Configuration
          </Button>
          <Box>
            <IconButton size='small' onClick={handleChickConfig}>
              {collapseConfig ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </IconButton>
          </Box>
        </Grid>
        <Box>
          <Collapse in={collapseConfig}>
            <Divider sx={{ margin: 0 }} />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography>Rate Of Materials Based On</Typography>
                  <FormControl variant='filled' fullWidth size='small' sx={{ minHeight: 26 }}>
                    <InputLabel id='demo-simple-select-filled-label'></InputLabel>
                    <Select
                      sx={{ marginBottom: 5 }}
                      labelId='demo-simple-select-filled-label'
                      id='demo-simple-select-filled'

                      // value={dataCustomerType}
                      // onChange={handleChange}
                    >
                      <MenuItem value={10}>Valuation Rate</MenuItem>
                      <MenuItem value={20}>Last Purchase Rate</MenuItem>
                      <MenuItem value={30}>Price List</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography>Currency</Typography>
                  <TextField size='small' variant='filled' label='' value={dataRow.currency} fullWidth />
                </Grid>
              </Grid>
            </CardContent>
          </Collapse>
        </Box>
        <Box>
          <Box sx={{ mt: 6 }}>
            <Typography variant='h6'>Raw Materials</Typography>
          </Box>
          <Box sx={{ mt: 8 }}>
            <Typography>Item</Typography>
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
          </Box>
        </Box>

        <Box>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
            maxWidth={'lg'}
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
            <DialogTitle id='Editing Row #' sx={{ display: 'flex' }}>
              {'Editing Row #'}
              <Typography variant='h6'>{getItemTable.idx}</Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                <Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography>Item Code</Typography>
                      <TextField
                        size='small'
                        variant='filled'
                        value={getItemTable.item_code || ''}
                        fullWidth
                        sx={{ mb: 5 }}
                      />

                      <Typography>Item Name</Typography>
                      <TextField
                        size='small'
                        variant='filled'
                        value={getItemTable.item_name || ''}
                        fullWidth
                        disabled
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Grid sx={checkboxStyle}>
                        <Checkbox
                          checked={dataRow.do_not_explode === 1 ? true : false}
                          name='do_not_explode'
                          onChange={handleCheckboxChange}
                          disabled
                        />
                        <Typography variant='subtitle2'>Do Not Explode</Typography>
                      </Grid>

                      <Grid sx={checkboxStyle}>
                        <Checkbox
                          checked={dataRow.allow_alternative_item === 1 ? true : false}
                          name='allow_alternative_item'
                          onChange={handleCheckboxChange}
                          disabled
                        />
                        <Typography variant='subtitle2'>Allow Alternative Item</Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Box>
                    <Box sx={{ mt: 10, display: 'flex' }}>
                      <Button
                        size='small'
                        variant='filled'
                        label=''
                        onClick={handleChickDiscription}
                        sx={{ fontWeight: 'bold' }}
                      >
                        Discription
                      </Button>
                      <CardActions className='card-action-dense'>
                        <IconButton size='small' onClick={handleChickDiscription}>
                          {collapseDiscription ? (
                            <ChevronUp sx={{ fontSize: '1.875rem' }} />
                          ) : (
                            <ChevronDown sx={{ fontSize: '1.875rem' }} />
                          )}
                        </IconButton>
                      </CardActions>
                    </Box>
                  </Box>

                  <Collapse in={collapseDiscription}>
                    <Divider sx={{ margin: 0 }} />
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Typography>Item Description</Typography>
                          <TextField
                            size='small'
                            variant='filled'
                            value={getItemTable.description || ''}
                            fullWidth
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box sx={{ height: 100, width: 100, backgroundColor: '#e0e0e0' }}></Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Collapse>

                  <Box sx={{ ml: 2, mt: 6 }}>
                    <Typography sx={{ fontWeight: 'bold' }}>Quantity and Rate</Typography>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography>Qty</Typography>
                      <TextField size='small' variant='filled' value={getItemTable.qty || ''} fullWidth disabled />

                      <Typography>UOM</Typography>
                      <TextField size='small' variant='filled' value={getItemTable.uom || ''} fullWidth disabled />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography>Stock Qty</Typography>
                      <TextField
                        size='small'
                        variant='filled'
                        value={getItemTable.stock_qty || ''}
                        fullWidth
                        disabled
                      />

                      <Typography>Stock UOM</Typography>
                      <TextField
                        size='small'
                        variant='filled'
                        value={getItemTable.stock_uom || ''}
                        fullWidth
                        disabled
                      />

                      <Typography>Conversion Factor</Typography>
                      <TextField
                        size='small'
                        variant='filled'
                        value={getItemTable.conversion_factor || ''}
                        fullWidth
                        disabled
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ ml: 2, my: 6 }}>
                    <Typography sx={{ fontWeight: 'bold' }}>Rate & Amount</Typography>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography>Rate (THB)</Typography>
                      <TextField
                        size='small'
                        variant='filled'
                        value={
                          getItemTable?.rate === '0.0'
                            ? '฿ 0.0'
                            : `฿ ${parseFloat(getItemTable?.rate).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}`
                        }
                        fullWidth
                        name='rate'
                        disabled
                      />

                      <Typography>Basic Rate (THB)</Typography>
                      <TextField
                        size='small'
                        variant='filled'
                        value={
                          getItemTable?.base_rate === '0.0'
                            ? '฿ 0.0'
                            : `฿ ${parseFloat(getItemTable?.base_rate).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}`
                        }
                        fullWidth
                        name='base_rate'
                        disabled
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography>Amount (THB)</Typography>
                      <TextField
                        size='small'
                        variant='filled'
                        value={
                          getItemTable?.amount === '0.0'
                            ? '฿ 0.0'
                            : `฿ ${parseFloat(getItemTable?.amount).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}`
                        }
                        fullWidth
                        name='amount'
                        disabled
                      />

                      <Typography>Amount (THB)</Typography>
                      <TextField
                        size='small'
                        variant='filled'
                        value={
                          getItemTable?.base_amount === '0.0'
                            ? '฿ 0.0'
                            : `฿ ${parseFloat(getItemTable?.base_amount).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}`
                        }
                        fullWidth
                        name='base_amount'
                        disabled
                      />
                    </Grid>

                    <Divider sx={{ margin: 0, my: 5, width: '100%', ml: 3 }} />

                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Grid sx={checkboxStyle}>
                          <Checkbox
                            checked={getItemTable.has_variants === 1 ? true : false}
                            name='has_variants'
                            onChange={handleCheckboxChange}
                            disabled
                          />
                          <Typography variant='subtitle2'>Has Variants</Typography>
                        </Grid>

                        <Grid sx={checkboxStyle}>
                          <Checkbox
                            checked={getItemTable.include_item_in_manufacturing === 1 ? true : false}
                            name='include_item_in_manufacturing'
                            onChange={handleCheckboxChange}
                            disabled
                          />
                          <Typography variant='subtitle2'>Include Item In Manufacturing</Typography>
                        </Grid>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Grid sx={checkboxStyle}>
                          <Checkbox
                            checked={getItemTable.sourced_by_supplier === 1 ? true : false}
                            name='sourced_by_supplier'
                            onChange={handleCheckboxChange}
                            disabled
                          />
                          <Typography variant='subtitle2'>Sourced by Supplier</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <DialogActions>
                  <Button onClick={handleClose} autoFocus>
                    Insert Below
                  </Button>
                </DialogActions>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Box>
      </Grid>
    </Card>
  )
}

export default ProductItemBOM
