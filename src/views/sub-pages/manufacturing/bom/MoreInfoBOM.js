import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Card
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { BorderBottom } from 'mdi-material-ui'
import { useEffect, useState } from 'react'

const MoreInfoBOM = ({ dataRow, setDataRow }) => {
  const [getMoreInfoTable, setGetMoreInfoTable] = useState([])

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleCheckboxChange = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
  }

  const handleRowClick = params => {
    setOpen(true)
    setGetMoreInfoTable(params.row)
  }

  const columns = [
    { field: 'idx', headerName: 'No', width: 70 },
    { field: 'item_code', headerName: 'Item Code', width: 150 },
    { field: 'item_name', headerName: 'Item Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'stock_qty', headerName: 'Stock Qty', width: 150 },
    { field: 'rate', headerName: 'Rate', width: 150 },
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
            setGetMoreInfoTable(params.row)
            console.log(params.row)
          }}
        >
          Edit
        </Button>
      )
    }
  ]

  const [getDataMoreInfo, setGetDataMoreInfo] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}BOM/${dataRow.name}`, {
        headers: {
          Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
        }
      })
      .then(res => {
        setGetDataMoreInfo(res.data.data)
      })
  }, [dataRow])

  if (getDataMoreInfo.length === 0) {
    return 'waiting...'
  }

  const checkboxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
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
    <Card sx={{ p: 4 }}>
      <Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={styles.box}>
              <Typography>Item Name</Typography>
              <TextField sx={styles.textField} variant='outlined' label='' value={dataRow.item_name || ''} fullWidth />
            </Box>

            <Box sx={styles.box}>
              <Typography>Item Description</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                label=''
                value={dataRow.description || ''}
                fullWidth
              />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Typography sx={{ fontWeight: 'bold' }}>Quality Inspection</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Grid sx={checkboxStyle}>
              <Checkbox
                checked={dataRow.inspection_required === 1 ? true : false}
                name='inspection_required'
                onChange={handleCheckbox}
                disabled
              />
              <Typography variant='subtitle2'>Quality Inspection Required</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Typography sx={{ fontWeight: 'bold' }}>Materials Required (Exploded)</Typography>
        </Box>

        <Typography>Item Description</Typography>
        <DataGrid
          rows={getDataMoreInfo.exploded_items}
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
              <Typography variant='h6'>{getMoreInfoTable.idx}</Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box sx={styles.textField}>
                      <Typography>Item Code</Typography>
                      <TextField
                        sx={styles.box}
                        variant='outlined'
                        value={getMoreInfoTable.item_code || ''}
                        fullWidth
                      />
                    </Box>
                    <Box sx={styles.box}>
                      <Typography>Item Name</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
                        value={getMoreInfoTable.item_name || ''}
                        fullWidth
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Grid container spacing={3} sx={{ mt: 10 }}>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography>Description</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
                        value={getMoreInfoTable.description || ''}
                        fullWidth
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mt: 4, ml: 30, width: 100, height: 100, backgroundColor: '#e0e0e0' }}></Box>
                  </Grid>
                </Grid>
                <Grid container spacing={3} sx={{ mt: 10 }}>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography>Stock Qty</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
                        value={getMoreInfoTable.stock_qty || ''}
                        fullWidth
                      />
                    </Box>

                    <Box sx={styles.box}>
                      <Typography>Rate</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
                        value={getMoreInfoTable.rate || ''}
                        fullWidth
                      />
                    </Box>

                    <Box sx={styles.box}>
                      <Typography>Qty Consumed Per Unit</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
                        value={getMoreInfoTable.qty_consumed_per_unit || ''}
                        fullWidth
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography>Stock UOM</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
                        value={getMoreInfoTable.stock_uom || ''}
                        fullWidth
                      />
                    </Box>

                    <Typography>Amount</Typography>
                    <TextField
                      sx={styles.textField}
                      variant='outlined'
                      value={getMoreInfoTable.amount || ''}
                      fullWidth
                    />

                    <Grid sx={checkboxStyle}>
                      <Checkbox
                        checked={getMoreInfoTable.include_item_in_manufacturing === 1 ? true : false}
                        name='include_item_in_manufacturing'
                        onChange={handleCheckbox}
                        disabled
                      />
                      <Typography variant='subtitle2'>Include Item In Manufacturing</Typography>
                    </Grid>

                    <Grid sx={checkboxStyle}>
                      <Checkbox
                        checked={getMoreInfoTable.sourced_by_supplier === 1 ? true : false}
                        name='sourced_by_supplier'
                        onChange={handleCheckbox}
                        disabled
                      />
                      <Typography variant='subtitle2'>Sourced by Supplier</Typography>
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

export default MoreInfoBOM
