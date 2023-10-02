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
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { useEffect, useState } from 'react'

//Import Icon
import { ChevronUp } from 'mdi-material-ui'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import IconButton from '@mui/material/IconButton'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

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
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography>Item</Typography>
              <TextField sx={styles.textField} variant='outlined' label='' value={dataRow.item || ''} fullWidth />
              <Typography variant='subtitle2'>Item to be manufactured or repacked</Typography>
            </Box>

            <Box sx={styles.box}>
              <Typography>Item UOM</Typography>
              <TextField variant='outlined' label='' fullWidth value={dataRow.uom || ''} sx={styles.textField} />
            </Box>

            <Box sx={styles.box}>
              <Typography>Quantity</Typography>
              <TextField
                variant='outlined'
                label=''
                value={dataRow.quantity || ''}
                fullWidth
                disabled
                sx={styles.textField}
              />
              <Typography variant='subtitle2'>
                Quantity of item obtained after manufacturing / repacking from given quantities of raw materials
              </Typography>
            </Box>
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
      </Card>
      <Grid>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 'bold', p: 0 }}> Cost Configuration</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Divider sx={{ margin: 0 }} />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography>Rate Of Materials Based On</Typography>
                      <FormControl variant='outlined' fullWidth sx={styles.textField}>
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
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography>Currency</Typography>
                      <TextField sx={styles.textField} variant='outlined' label='' value={dataRow.currency} fullWidth />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Card sx={styles.card}>
        <Box>
          <Box sx={{ mt: 6 }}>
            <Typography sx={{ fontWeight: 'bold', p: 0 }}>Raw Materials</Typography>
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
      </Card>
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
                    <Box sx={styles.box}>
                      <Typography>Item Code</Typography>
                      <TextField
                        variant='outlined'
                        value={getItemTable.item_code || ''}
                        fullWidth
                        sx={styles.textField}
                      />
                    </Box>

                    <Box sx={styles.box}>
                      <Typography>Item Name</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
                        value={getItemTable.item_name || ''}
                        fullWidth
                        disabled
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
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
                    </Box>
                  </Grid>
                </Grid>

                <Box>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: 'bold', p: 0 }}> Discription</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
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
                    </AccordionDetails>
                  </Accordion>
                </Box>

                <Box sx={{ ml: 2, mt: 6 }}>
                  <Typography sx={{ fontWeight: 'bold' }}>Quantity and Rate</Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography>Qty</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
                        value={getItemTable.qty || ''}
                        fullWidth
                        disabled
                      />
                    </Box>

                    <Box sx={styles.box}>
                      <Typography>UOM</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
                        value={getItemTable.uom || ''}
                        fullWidth
                        disabled
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography>Stock Qty</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
                        value={getItemTable.stock_qty || ''}
                        fullWidth
                        disabled
                      />
                    </Box>

                    <Box sx={styles.box}>
                      <Typography>Stock UOM</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
                        value={getItemTable.stock_uom || ''}
                        fullWidth
                        disabled
                      />
                    </Box>

                    <Box sx={styles.box}>
                      <Typography>Conversion Factor</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
                        value={getItemTable.conversion_factor || ''}
                        fullWidth
                        disabled
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ ml: 2, my: 6 }}>
                  <Typography sx={{ fontWeight: 'bold' }}>Rate & Amount</Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography>Rate (THB)</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
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
                    </Box>

                    <Box sx={styles.box}>
                      <Typography>Basic Rate (THB)</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
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
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography>Amount (THB)</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
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
                    </Box>
                    <Box sx={styles.box}>
                      <Typography>Amount (THB)</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
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
                    </Box>
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
    </Box>
  )
}

export default ProductItemBOM
