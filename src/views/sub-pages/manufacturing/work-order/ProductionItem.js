import { Box, Button, Grid, TextField, Typography, Checkbox, Card, Divider } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const ProductionItemPage = ({ dataRow, setDataRow }) => {
  const [getRequiredItem, setGetRequiredItem] = useState([])
  const [getRequiredRow, setGetRuquiredRow] = useState([])
  const [open, setOpen] = useState(false)
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}Work Order/${dataRow.name}`, {
        headers: {
          Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
        }
      })
      .then(res => {
        setGetRequiredItem(res.data.data)
      })
  }, [dataRow])

  const handleRowClick = params => {
    setOpen(true)
    setGetRuquiredRow(params.row)
  }

  const handleCheckboxChange = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
    setDataRow({ ...dataRow, [event.target.name]: event.target.checked === true ? 1 : 0 })
  }

  const columnsApp = [
    { field: 'idx', headerName: 'No', width: 80 },
    { field: 'item_code', headerName: 'Item Code', width: 140 },
    { field: 'source_warehouse', headerName: 'Source Warehouse', width: 140 },
    { field: 'required_qty', headerName: 'Required Qty', width: 140 },
    { field: 'transferred_qty', headerName: 'Transferred Qty', width: 140 },
    { field: 'consumed_qty', headerName: 'Consumed Qty', width: 140 },
    { field: 'returned_qty', headerName: 'Returned Qty', width: 140 },
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
            setGetRuquiredRow(params.row)
            handleClickOpen(true)
            console.log(params.row)
          }}
        >
          Edit
        </Button>
      )
    }
  ]

  if (getRequiredItem.length === 0) {
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

  const checkboxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }

  return (
    <Card sx={styles.card}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={styles.box}>
            <Typography sx={{ margin: 1 }}>Status*</Typography>
            <TextField sx={styles.textField} variant='outlined' value={dataRow.status || ''} fullWidth />
          </Box>

          <Box sx={styles.box}>
            <Typography sx={{ margin: 1 }}>Item To Manufacture*</Typography>
            <TextField sx={styles.textField} variant='outlined' value={dataRow.production_item || ''} fullWidth />
          </Box>

          <Box sx={styles.box}>
            <Typography sx={{ margin: 1 }}>Item Name</Typography>
            <TextField sx={styles.textField} variant='outlined' value={dataRow.item_name || ''} fullWidth />
          </Box>

          <Box sx={styles.box}>
            <Typography sx={{ margin: 1 }}>BOM No</Typography>
            <TextField sx={styles.textField} variant='outlined' value={dataRow.bom_no || ''} fullWidth />
          </Box>

          <Box sx={styles.box}>
            <Typography sx={{ margin: 1 }}>Sales Order</Typography>
            <TextField sx={styles.textField} variant='outlined' value={dataRow.sales_order || ''} fullWidth />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={styles.box}>
            <Typography sx={{ margin: 1 }}>Company*</Typography>
            <TextField sx={styles.textField} variant='outlined' value={dataRow.company || ''} fullWidth />
          </Box>

          <Box sx={styles.box}>
            <Typography sx={{ margin: 1 }}>Qty To Manufacture*</Typography>
            <TextField sx={styles.textField} variant='outlined' value={dataRow.qty || ''} fullWidth />
          </Box>

          <Box sx={styles.box}>
            <Typography sx={{ margin: 1 }}>Material Transferred for Manufacturing</Typography>
            <TextField
              sx={styles.textField}
              variant='outlined'
              value={dataRow.material_transferred_for_manufacturing || ''}
              fullWidth
            />
          </Box>

          <Box sx={styles.box}>
            <Typography sx={{ margin: 1 }}>Manufactured Qty</Typography>
            <TextField sx={styles.textField} variant='outlined' value={dataRow.produced_qty || ''} fullWidth />
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ margin: 0, my: 5, width: '100%', ml: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>Required Items</Typography>
          <DataGrid
            rows={getRequiredItem.required_items}
            columns={columnsApp}
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
        </Grid>
      </Grid>
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
        <DialogTitle id='Editing Row'>
          {'Editing Row #'}
          {getRequiredRow.idx}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={styles.box}>
                  <Typography variant='subtitle1'>Item Code</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={getRequiredRow.item_code || ''}
                    fullWidth
                  />
                </Box>

                <Box sx={styles.box}>
                  <Typography variant='subtitle1'>Source Warehouse</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={getRequiredRow.source_warehouse || ''}
                    fullWidth
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={styles.box}>
                  <Typography variant='subtitle1'>Item Name</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={getRequiredRow.item_name || ''}
                    fullWidth
                  />
                </Box>

                <Box sx={styles.box}>
                  <Typography variant='subtitle1'>Description</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={getRequiredRow.description || ''}
                    fullWidth
                  />
                </Box>

                <Box sx={styles.box}>
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
                      checked={dataRow.include_item_in_manufacturing === 1 ? true : false}
                      name='include_item_in_manufacturing'
                      onChange={handleCheckboxChange}
                      disabled
                    />
                    <Typography variant='subtitle2'>Include Item In Manufacturing</Typography>
                  </Grid>
                </Box>
              </Grid>
            </Grid>

            <Box>
              <Typography variant='h6'>Qty</Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={styles.box}>
                  <Typography variant='subtitle1'>Required Qty</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={getRequiredRow.required_qty || ''}
                    fullWidth
                  />
                </Box>

                <Box sx={styles.box}>
                  <Typography variant='subtitle1'>Rate</Typography>
                  <TextField sx={styles.textField} variant='outlined' value={getRequiredRow.rate || ''} fullWidth />
                </Box>

                <Box sx={styles.box}>
                  <Typography variant='subtitle1'>Amount</Typography>
                  <TextField sx={styles.textField} variant='outlined' value={getRequiredRow.amount || ''} fullWidth />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={styles.box}>
                  <Typography variant='subtitle1'>Description</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={getRequiredRow.description || ''}
                    fullWidth
                  />
                </Box>

                <Box sx={styles.box}>
                  <Typography variant='subtitle1'>Consumed Qty</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={getRequiredRow.consumed_qty || ''}
                    fullWidth
                  />
                </Box>

                <Box sx={styles.box}>
                  <Typography variant='subtitle1'>Returned Qty</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={getRequiredRow.returned_qty || ''}
                    fullWidth
                  />
                </Box>

                <Box sx={styles.box}>
                  <Typography variant='subtitle1'>Available Qty at Source Warehouse</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={getRequiredRow.available_qty_at_source_warehouse || ''}
                    fullWidth
                  />
                </Box>

                <Box sx={styles.box}>
                  <Typography variant='subtitle1'>Available Qty at WIP Warehouse</Typography>
                  <TextField
                    sx={styles.textField}
                    variant='outlined'
                    value={getRequiredRow.available_qty_at_wip_warehouse || ''}
                    fullWidth
                  />
                </Box>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Insert Below
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default ProductionItemPage
