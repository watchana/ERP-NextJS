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
import { useEffect, useState } from 'react'

const OperationBOM = ({ dataRow, setDataRow }) => {
  const [getOperationsBOM, setGetOperationsBOM] = useState([])
  const [getTableOperation, setGetTableOperation] = useState([])
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleRowClick = params => {
    setOpen(true)
    setGetTableOperation(params.row)
  }

  const handleCheckbox = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
    setDataRow({ ...dataRow, [event.target.name]: event.target.checked === true ? 1 : 0 })
  }

  function formatCurrency(params) {
    const formattedValue = new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2
    }).format(params.value)

    return formattedValue
  }

  const checkboxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }

  const columns = [
    { field: 'idx', headerName: 'No', width: 70 },
    { field: 'operation', headerName: 'Operation', width: 200 },
    { field: '', headerName: 'Workstation Type', width: 150 },
    { field: 'time_in_mins', headerName: 'Operation Time ', width: 150 },
    {
      field: 'Fixed Time',
      headerName: 'Fixed Time',
      width: 100,
      renderCell: params => <Checkbox checked={getTableOperation.fixed_time === 1} onChange={handleCheckbox} disabled />
    },
    { field: 'operating_cost', headerName: 'Operating Cost (THB)', width: 200, valueFormatter: formatCurrency },
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
            setGetTableOperation(params.row)
            console.log(params.row)
          }}
        >
          Edit
        </Button>
      )
    }
  ]

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}BOM/${dataRow.name}`, {
        headers: {
          Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
        }
      })
      .then(res => {
        setGetOperationsBOM(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [dataRow])

  if (getOperationsBOM.length === 0) {
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
    <Card sx={{ p: 4 }}>
      <Grid>
        <Box>
          <Typography sx={{ fontWeight: 'bold' }}>Operations</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Grid sx={checkboxStyle}>
                <Checkbox
                  checked={dataRow.with_operations === 1 ? true : false}
                  name='with_operations'
                  onChange={handleCheckbox}
                />
                <Typography variant='subtitle2'>With Operations</Typography>
              </Grid>
              <Typography variant='subtitle2'>Manage cost of operations</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={styles.box}>
                <Typography sx={{ margin: 1 }}>Transfer Material Against</Typography>
                <TextField
                  sx={styles.textField}
                  variant='outlined'
                  fullWidth
                  value={dataRow.transfer_material_against || ''}
                />
              </Box>

              <Grid sx={checkboxStyle}>
                <Checkbox
                  checked={dataRow.fg_based_operating_cost === 1 ? true : false}
                  name='fg_based_operating_cost'
                  onChange={handleCheckbox}
                />
                <Typography variant='subtitle2'>FG based Operating Cost</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Box>
            <Typography>Operations</Typography>
            <DataGrid
              rows={getOperationsBOM.operations}
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
              <Typography variant='h6'>{getTableOperation.idx}</Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography sx={{ margin: 1 }}>Operation</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
                        value={getTableOperation.operation || ''}
                        fullWidth
                      />
                    </Box>

                    <Grid sx={checkboxStyle}>
                      <Checkbox
                        checked={dataRow.fixed_time === 1 ? true : false}
                        name='fixed_time'
                        onChange={handleCheckbox}
                        disabled
                      />
                      <Typography variant='subtitle2'>Fixed Time</Typography>
                    </Grid>
                    <Typography variant='subtitle2'>Operation time does not depend on quantity to produce</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.box}>
                      <Typography sx={{ margin: 1 }}>Workstation Type</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
                        value={getTableOperation.workstation || ''}
                        fullWidth
                        disabled
                      />
                    </Box>

                    <Box sx={styles.box}>
                      <Typography sx={{ margin: 1 }}>Operation Time </Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
                        value={getTableOperation.time_in_mins || ''}
                        fullWidth
                        disabled
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ my: 8 }}>
                  <Typography sx={{ fontWeight: 'bold' }}>Costing</Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box sx={styles.box}>
                      <Typography sx={{ margin: 1 }}>Hour Rate (THB)</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
                        value={
                          getTableOperation?.hour_rate === '0.0'
                            ? '฿ 0.0'
                            : `฿ ${parseFloat(getTableOperation?.hour_rate).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}`
                        }
                        name='hour_rate'
                        disabled
                        fullWidth
                      />
                    </Box>

                    <Box sx={styles.box}>
                      <Typography sx={{ margin: 1 }}>Base Hour Rate (THB)</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
                        value={
                          getTableOperation?.base_hour_rate === '0.0'
                            ? '฿ 0.0'
                            : `฿ ${parseFloat(getTableOperation?.base_hour_rate).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}`
                        }
                        disabled
                        name='base_hour_rate'
                        fullWidth
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Box sx={styles.box}>
                      <Typography sx={{ margin: 1 }}>Operating Cost (THB)</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
                        value={
                          getTableOperation?.operating_cost === '0.0'
                            ? '฿ 0.0'
                            : `฿ ${parseFloat(getTableOperation?.operating_cost).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}`
                        }
                        name='operating_cost'
                        disabled
                        fullWidth
                      />
                    </Box>

                    <Box sx={styles.box}>
                      <Typography sx={{ margin: 1 }}>Operating Cost (THB)</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
                        value={
                          getTableOperation?.base_operating_cost === '0.0'
                            ? '฿ 0.0'
                            : `฿ ${parseFloat(getTableOperation?.base_operating_cost).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}`
                        }
                        name='base_operating_cost'
                        disabled
                        fullWidth
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Box sx={styles.box}>
                      <Typography sx={{ margin: 1 }}>Batch Size</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
                        value={getTableOperation.batch_size || ''}
                        fullWidth
                        disabled
                      />
                    </Box>
                    <Box sx={styles.box}>
                      <Grid sx={checkboxStyle}>
                        <Checkbox
                          checked={dataRow.set_cost_based_on_bom_qty === 1 ? true : false}
                          name='set_cost_based_on_bom_qty'
                          onChange={handleCheckbox}
                          disabled
                        />
                        <Typography variant='subtitle2'>Set Operating Cost Based On BOM Quantity</Typography>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ my: 6 }}>
                  <Typography sx={{ fontWeight: 'bold' }}>More Information</Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box sx={styles.box}>
                      <Typography sx={{ margin: 1 }}>Description</Typography>
                      <TextField
                        sx={styles.textField}
                        variant='outlined'
                        value={getTableOperation.description || ''}
                        fullWidth
                        disabled
                      />
                    </Box>
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

export default OperationBOM
