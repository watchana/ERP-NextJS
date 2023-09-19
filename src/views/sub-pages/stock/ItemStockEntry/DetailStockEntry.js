//Import React and MUI
import {
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
  TextField,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'

//Icon mdi
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'

const DetailStockEntry = ({ dataRow, setDataRow }) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const [collapseBOM, setCollapseBOM] = useState(false)
  const [collapseWarehouse, setCollapseWarehouse] = useState(false)
  const [collapseDiscription, setCollapseDiscription] = useState(false)
  const [collapseAccouting, setCollapseAccouting] = useState(false)
  const [collapseMoreInfo, setCollpseMoreInfo] = useState(false)

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickBOM = () => {
    setCollapseBOM(!collapseBOM)
  }

  const handleClickWarehouse = () => {
    setCollapseWarehouse(!collapseWarehouse)
  }

  const handleClickDiscription = () => {
    setCollapseDiscription(!collapseDiscription)
  }

  const handleAccouting = () => {
    setCollapseAccouting(!collapseAccouting)
  }

  const handleClickMoreInfo = () => {
    setCollpseMoreInfo(!collapseMoreInfo)
  }

  const handleRowClick = params => {
    setOpen(true)
    setGetItem(params.row)
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
    { field: 'basic_rate', headerName: 'Basic Rate(as per Stock UOM)', width: 150 },
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

  return (
    <Card>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography sx={{ margin: 1 }}>Stock Entry Type</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.stock_entry_type}
            fullWidth
            onChange={handleTextChange}
            name='stock_entry_type'
          />

          <Typography sx={{ margin: 1 }}>Work Order</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.work_order}
            fullWidth
            onChange={handleTextChange}
            name='work_order'
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography sx={{ margin: 1 }}>Posting Date</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.posting_date}
            fullWidth
            onChange={handleTextChange}
            name='posting_date'
          />

          <Typography sx={{ margin: 1 }}>Posting Time</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.posting_time}
            fullWidth
            onChange={handleTextChange}
            name='posting_time'
          />
          <Typography sx={{ margin: 1 }}>Asia/Kolkata</Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid item xs={12} sx={checkboxStyle}>
            <Checkbox
              checked={dataRow.inspection_required === 1 ? true : false}
              name='inspection_required'
              onChange={handleCheckbox}
            />
            <Typography variant='subtitle2'>Inspection Required</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid>
        <Grid sx={{ mt: 10, display: 'flex' }}>
          <Button size='small' variant='filled' label='' onClick={handleClickBOM}>
            BOM Info
          </Button>
          <Box>
            <CardActions className='card-action-dense'>
              <IconButton size='small' onClick={handleClickBOM}>
                {collapseBOM ? (
                  <ChevronUp sx={{ fontSize: '1.875rem' }} />
                ) : (
                  <ChevronDown sx={{ fontSize: '1.875rem' }} />
                )}
              </IconButton>
            </CardActions>
          </Box>
        </Grid>
        <Collapse in={collapseBOM}>
          <Divider sx={{ margin: 0 }} />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Grid item xs={12} sx={checkboxStyle}>
                  <Checkbox checked={dataRow.from_bom === 1 ? true : false} name='from_bom' onChange={handleCheckbox} />
                  <Typography variant='subtitle2'>From BOM</Typography>
                </Grid>

                <Grid item xs={12} sx={checkboxStyle}>
                  <Checkbox
                    checked={dataRow.use_multi_level_bom === 1 ? true : false}
                    name='use_multi_level_bom'
                    onChange={handleCheckbox}
                  />
                  <Typography variant='subtitle2'>Use Multi-Level BOM</Typography>
                </Grid>
                <Typography variant='subtitle2'>Including items for sub assemblies</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography sx={{ margin: 1 }}>Finished Good Quantity</Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={dataRow.fg_completed_qty}
                  fullWidth
                  onChange={handleTextChange}
                  name='fg_completed_qty'
                />

                <Typography>As per Stock UOM</Typography>
                <Button>Get Item</Button>
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ margin: 1 }}>BOM No</Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={dataRow.bom_no}
                  fullWidth
                  onChange={handleTextChange}
                  name='bom_no'
                />
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </Grid>

      <Grid>
        <Box sx={{ mt: 5, display: 'flex' }}>
          <Button size='small' variant='filled' label='' onClick={handleClickWarehouse}>
            <Typography>Default Warehouse</Typography>
          </Button>
          <Box>
            <CardActions className='card-action-dense'>
              <IconButton size='small' onClick={handleClickWarehouse}>
                {collapseWarehouse ? (
                  <ChevronUp sx={{ fontSize: '1.875rem' }} />
                ) : (
                  <ChevronDown sx={{ fontSize: '1.875rem' }} />
                )}
              </IconButton>
            </CardActions>
          </Box>
        </Box>
        <Grid>
          <Collapse in={collapseWarehouse}>
            <Divider sx={{ margin: 0 }} />
            <CardContent>
              <Grid item xs={12}>
                <Typography sx={{ margin: 1 }}>Default Target Warehouse</Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={dataRow.to_warehouse}
                  fullWidth
                  onChange={handleTextChange}
                  name='to_warehouse'
                />
                <Typography variant='subtitle2' sx={{ margin: 1 }}>
                  Sets 'Target Warehouse' in each row of the items table.
                </Typography>
              </Grid>
            </CardContent>
          </Collapse>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
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
          <Typography sx={{ margin: 1 }}>Total Outgoing Value (Consumption)</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.total_outgoing_value}
            fullWidth
            onChange={handleTextChange}
            name='total_outgoing_value'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography sx={{ margin: 1 }}>Total Incoming Value (Receipt)</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.total_incoming_value}
            fullWidth
            onChange={handleTextChange}
            name='total_incoming_value'
          />

          <Typography sx={{ margin: 1 }}>otal Value Difference (Incoming - Outgoing)</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.value_difference}
            fullWidth
            onChange={handleTextChange}
            name='value_difference'
          />
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
        <DialogTitle id='Editing Row #1'>{'Editing Row #1'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Grid container spacing={3} sx={{ mt: 6 }}>
              <Grid item xs={12} md={6}>
                <Typography variant='subtitle1'>Source Warehouse</Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={getItem.s_warehouse}
                  fullWidth
                  onChange={handleTextChangeItem}
                  name='s_warehouse'
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant='subtitle1'>Target Warehouse</Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={getItem.t_warehouse}
                  fullWidth
                  onChange={handleTextChangeItem}
                  name='t_warehouse'
                />
              </Grid>
            </Grid>
            <Divider sx={{ margin: 0, mt: 10 }} />

            <Grid container spacing={3} sx={{ mt: 6 }}>
              <Grid item xs={12} md={6}>
                <Typography variant='subtitle1'>Item Code</Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={getItem.item_code}
                  fullWidth
                  onChange={handleTextChangeItem}
                  name='item_code'
                />

                <Typography variant='subtitle1'>Item Name</Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={getItem.item_name}
                  fullWidth
                  onChange={handleTextChangeItem}
                  name='item_name'
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid item xs={12} sx={checkboxStyle}>
                  <Checkbox
                    checked={dataRow.is_finished_item === 1 ? true : false}
                    name='is_finished_item'
                    onChange={handleCheckbox}
                  />
                  <Typography variant='subtitle2'>Is Finished Item</Typography>
                </Grid>

                <Grid item xs={12} sx={checkboxStyle}>
                  <Checkbox
                    checked={dataRow.is_scrap_item === 1 ? true : false}
                    name='is_scrap_item'
                    onChange={handleCheckbox}
                  />
                  <Typography variant='subtitle2'>Is Scrap Item</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Box>
              <Box sx={{ mt: 5, display: 'flex' }}>
                <Button size='small' variant='filled' label='' onClick={handleClickDiscription}>
                  <Typography>Default Warehouse</Typography>
                </Button>

                <CardActions className='card-action-dense'>
                  <IconButton size='small' onClick={handleClickDiscription}>
                    {collapseDiscription ? (
                      <ChevronUp sx={{ fontSize: '1.875rem' }} />
                    ) : (
                      <ChevronDown sx={{ fontSize: '1.875rem' }} />
                    )}
                  </IconButton>
                </CardActions>
              </Box>
            </Box>

            <Box>
              <Collapse in={collapseDiscription}>
                <Divider sx={{ margin: 0 }} />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant='subtitle1'>Description</Typography>
                      <TextField
                        size='small'
                        variant='filled'
                        value={getItem.description}
                        fullWidth
                        onChange={handleTextChangeItem}
                        name='description'
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant='subtitle1'>Item Group</Typography>
                      <TextField
                        size='small'
                        variant='filled'
                        value={getItem.item_group}
                        fullWidth
                        onChange={handleTextChangeItem}
                        name='item_group'
                      />

                      <Box sx={{ width: 100, height: 100, backgroundColor: '#e0e0e0', mt: 6 }}></Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Collapse>
            </Box>

            <Typography variant='h6'>Quantity</Typography>
            <Grid container spacing={3} sx={{ mt: 6 }}>
              <Grid item xs={12} md={6}>
                <Typography variant='subtitle1'>Qty*</Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={getItem.qty}
                  fullWidth
                  onChange={handleTextChangeItem}
                  name='qty'
                />

                <Grid item xs={12} sx={checkboxStyle}>
                  <Checkbox
                    checked={dataRow.retain_sample === 1 ? true : false}
                    name='retain_sample'
                    onChange={handleCheckbox}
                  />
                  <Typography variant='subtitle2'>Retain Sample</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='subtitle1'>UOM*</Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={getItem.uom}
                  fullWidth
                  onChange={handleTextChangeItem}
                  name='uom'
                />
              </Grid>
            </Grid>

            <Grid sx={{ mt: 6 }}>
              <Typography variant='h6'>Rates</Typography>
            </Grid>

            <Grid container spacing={3} sx={{ mt: 4 }}>
              <Grid item xs={12} md={6}>
                <Typography variant='subtitle1'>Basic Rate (as per Stock UOM)</Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={getItem.basic_rate}
                  fullWidth
                  onChange={handleTextChangeItem}
                  name='basic_rate'
                />

                <Typography variant='subtitle1'>Additional Cost</Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={getItem.additional_cost}
                  fullWidth
                  onChange={handleTextChangeItem}
                  name='additional_cost'
                />

                <Typography variant='subtitle1'>Valuation Rate</Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={getItem.valuation_rate}
                  fullWidth
                  onChange={handleTextChangeItem}
                  name='valuation_rate'
                />

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
                <Typography variant='subtitle1'>Basic Amount</Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={getItem.basic_amount}
                  fullWidth
                  onChange={handleTextChangeItem}
                  name='basic_amount'
                />

                <Typography variant='subtitle1'>Amount</Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={getItem.amount}
                  fullWidth
                  onChange={handleTextChangeItem}
                  name='amount'
                />
              </Grid>
            </Grid>

            <Box>
              <Typography variant='h6' sx={{ mt: 6 }}>
                Serial No / Batch
              </Typography>
            </Box>
            <Box>
              <Chip label='Add Serial / Batch No' />
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant='h6' sx={{ mt: 6 }}>
                  Accounting
                </Typography>
                <Typography variant='subtitle1' sx={{ mt: 2 }}>
                  Difference Account
                </Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={getItem.expense_account}
                  fullWidth
                  onChange={handleTextChangeItem}
                  name='expense_account'
                />
              </Grid>
            </Grid>
            <Box>
              <Box sx={{ mt: 5, display: 'flex' }}>
                <Button size='small' variant='filled' label='' onClick={handleAccouting}>
                  <Typography>Accounting</Typography>
                </Button>
                <CardActions className='card-action-dense'>
                  <IconButton size='small' onClick={handleAccouting}>
                    {collapseAccouting ? (
                      <ChevronUp sx={{ fontSize: '1.875rem' }} />
                    ) : (
                      <ChevronDown sx={{ fontSize: '1.875rem' }} />
                    )}
                  </IconButton>
                </CardActions>
              </Box>
            </Box>
            <Box>
              <Collapse in={collapseAccouting}>
                <Divider sx={{ margin: 0 }} />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant='subtitle1'>Cost Center</Typography>
                      <TextField
                        size='small'
                        variant='filled'
                        value={getItem.cost_center}
                        fullWidth
                        onChange={handleTextChangeItem}
                        name='cost_center'
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Collapse>
            </Box>
            <Box>
              <Box sx={{ mt: 5, display: 'flex' }}>
                <Button size='small' variant='filled' label='' onClick={handleClickMoreInfo}>
                  <Typography>More Information</Typography>
                </Button>
                <CardActions className='card-action-dense'>
                  <IconButton size='small' onClick={handleClickMoreInfo}>
                    {collapseMoreInfo ? (
                      <ChevronUp sx={{ fontSize: '1.875rem' }} />
                    ) : (
                      <ChevronDown sx={{ fontSize: '1.875rem' }} />
                    )}
                  </IconButton>
                </CardActions>
              </Box>
            </Box>
            <Box>
              <Collapse in={collapseMoreInfo}>
                <Divider sx={{ margin: 0 }} />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant='subtitle1'>Actual Qty (at source/target)</Typography>
                      <TextField
                        size='small'
                        variant='filled'
                        value={getItem.actual_qty}
                        fullWidth
                        onChange={handleTextChangeItem}
                        name='actual_qty'
                      />

                      <Typography variant='subtitle1'>Transferred Qty</Typography>
                      <TextField
                        size='small'
                        variant='filled'
                        value={getItem.transferred_qty}
                        fullWidth
                        onChange={handleTextChangeItem}
                        name='transferred_qty'
                      />

                      <Grid item xs={12} sx={checkboxStyle}>
                        <Checkbox
                          checked={dataRow.allow_alternative_item === 1 ? true : false}
                          name='allow_alternative_item'
                          onChange={handleCheckbox}
                        />
                        <Typography variant='subtitle2'>Allow Alternative Item</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Collapse>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Insert Below</Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default DetailStockEntry
