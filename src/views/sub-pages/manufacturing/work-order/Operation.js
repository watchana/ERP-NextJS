//Import React
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Card
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Operation = ({ dataRow }) => {
  const [getDataOperation, setGetDataOperation] = useState('')
  const [getRowOperation, setGetRowOperation] = useState('')
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleRowClick = params => {
    setOpen(true)
    setGetRowOperation(params.row)
  }

  const column = [
    { field: 'idx', headerName: 'No', width: 150 },
    { field: 'operation', headerName: 'Operation', width: 150 },
    { field: 'completed_qty', headerName: 'Completed Qty', width: 150 },
    { field: 'process_loss_qty', headerName: 'Process Loss Qty', width: 150 },
    { field: 'bom', headerName: 'BOM', width: 150 },
    { field: 'workstation', headerName: 'Workstation', width: 150 },
    { field: 'time_in_mins', headerName: 'Time', width: 150 },
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
            setGetRowOperation(params.row)
            handleClickOpen(true)
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
      .get(`${process.env.NEXT_PUBLIC_API_URL}Work Order/${dataRow.name}`, {
        headers: {
          Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
        }
      })
      .then(res => {
        setGetDataOperation(res.data.data)
      })
  }, [dataRow])

  if (getDataOperation.length === 0) {
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
    <Card sx={styles.card}>
      <Box>
        <Typography variant='h6'>Operations</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={styles.box}>
            <Typography>Transfer Material Against</Typography>
            <TextField
              sx={styles.textField}
              variant='outlined'
              value={dataRow.transfer_material_against || ''}
              fullWidth
            />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={styles.box}>
            <Typography>Operations</Typography>
            <DataGrid
              rows={getDataOperation.operations}
              columns={column}
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
        </Grid>
      </Grid>

      <Box sx={{ mt: 8 }}>
        <Typography variant='h6'>Time</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={styles.box}>
            <Typography>Planned Start Date</Typography>
            <TextField variant='outlined' value={dataRow.planned_start_date || ''} sx={styles.textField} fullWidth />
            <Typography variant='subtitle2'>Asia/Kolkata</Typography>
          </Box>

          <Box sx={styles.box}>
            <Typography>Planned End Date</Typography>
            <TextField sx={styles.textField} variant='outlined' value={dataRow.planned_end_date || ''} fullWidth />
            <Typography variant='subtitle2'>Asia/Kolkata</Typography>
          </Box>

          <Box sx={styles.box}>
            <Typography>Expected Delivery Date</Typography>
            <TextField
              variant='outlined'
              value={dataRow.expected_delivery_date || ''}
              sx={styles.textField}
              fullWidth
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={styles.box}>
            <Typography>Actual Start Date</Typography>
            <TextField variant='outlined' value={dataRow.actual_start_date || ''} sx={styles.textField} fullWidth />
            <Typography variant='subtitle2'>Asia/Kolkata</Typography>
          </Box>

          <Box sx={styles.box}>
            <Typography>Actual End Date</Typography>
            <TextField variant='outlined' value={dataRow.actual_end_date || ''} sx={styles.textField} fullWidth />
            <Typography variant='subtitle2'>Asia/Kolkata</Typography>
          </Box>

          <Box sx={styles.box}>
            <Typography>Lead Time</Typography>
            <TextField variant='outlined' value={dataRow.lead_time || ''} sx={styles.textField} fullWidth />
            <Typography variant='subtitle2'>In Mins</Typography>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 8 }}>
        <Typography variant='h6'>Operation Cost</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={styles.box}>
            <Typography>Planned Operating Cost</Typography>
            <TextField
              variant='outlined'
              value={dataRow.planned_operating_cost || ''}
              sx={styles.textField}
              fullWidth
            />
          </Box>

          <Box sx={styles.box}>
            <Typography>Actual Operating Cost</Typography>
            <TextField variant='outlined' value={dataRow.actual_operating_cost || ''} sx={styles.textField} fullWidth />
          </Box>

          <Box sx={styles.box}>
            <Typography>Additional Operating Cost</Typography>
            <TextField
              variant='outlined'
              value={dataRow.additional_operating_cost || ''}
              sx={styles.textField}
              fullWidth
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={styles.box}>
            <Typography>Corrective Operation Cost</Typography>
            <TextField
              variant='outlined'
              value={dataRow.corrective_operation_cost || ''}
              sx={styles.textField}
              fullWidth
            />
            <Typography variant='subtitle2'>From Corrective Job Card</Typography>
          </Box>

          <Box>
            <Typography>Total Operating Cost</Typography>
            <TextField variant='outlined' value={dataRow.total_operating_cost || ''} sx={styles.textField} fullWidth />
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ mt: 6, display: 'flex' }}>
        <Box sx={{ ml: 30 }}></Box>
      </Box>
      <Box sx={{ mt: 6, display: 'flex' }}></Box>
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
            <Typography variant='h6'>{getRowOperation.idx}</Typography>
          </DialogTitle>

          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography>Operation</Typography>
                    <TextField
                      variant='outlined'
                      value={getRowOperation.operation || ''}
                      sx={styles.textField}
                      fullWidth
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography>Status</Typography>
                    <TextField
                      variant='outlined'
                      value={getRowOperation.status || ''}
                      sx={styles.textField}
                      fullWidth
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography>Completed Qty</Typography>
                    <TextField
                      variant='outlined'
                      value={getRowOperation.completed_qty || ''}
                      sx={styles.textField}
                      fullWidth
                    />
                    <Typography variant='subtitle2'>Operation completed for how many finished goods?</Typography>
                  </Box>

                  <Box sx={styles.box}>
                    <Typography>Process Loss Qty</Typography>
                    <TextField
                      fullWidth
                      variant='outlined'
                      value={getRowOperation.process_loss_qty || ''}
                      sx={styles.textField}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography>BOM</Typography>
                    <TextField variant='outlined' value={getRowOperation.bom || ''} sx={styles.textField} fullWidth />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography>Workstation Type</Typography>
                    <TextField
                      fullWidth
                      variant='outlined'
                      value={getRowOperation.workstation_type || ''}
                      sx={styles.textField}
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography>Workstation</Typography>
                    <TextField
                      fullWidth
                      variant='outlined'
                      value={getRowOperation.workstation || ''}
                      sx={styles.textField}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 6 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography>Operation Description</Typography>
                    <TextField
                      fullWidth
                      variant='outlined'
                      value={getRowOperation.description || ''}
                      sx={styles.textField}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Box>
                <Box sx={{ mt: 16 }}>
                  <Typography variant='h6'>Estimated Time and Cost</Typography>
                </Box>

                <Box sx={{ display: 'flex', mt: 4 }}>
                  <Box>
                    <Typography>Operation Description</Typography>
                    <TextField
                      size='small'
                      variant='filled'
                      value={getRowOperation.description || ''}
                      sx={{ width: 300 }}
                    />
                    <Typography variant='subtitle2'>Asia/Kolkata</Typography>
                  </Box>
                  <Box sx={{ ml: 30 }}>
                    <Typography>Planned End Time</Typography>
                    <TextField
                      size='small'
                      variant='filled'
                      value={getRowOperation.planned_end_time || ''}
                      sx={{ width: 300 }}
                    />
                    <Typography variant='subtitle2'>Asia/Kolkata</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', mt: 4 }}>
                  <Box>
                    <Typography>Hour Rate</Typography>
                    <TextField
                      size='small'
                      variant='filled'
                      value={getRowOperation.hour_rate || ''}
                      sx={{ width: 300 }}
                    />
                  </Box>
                  <Box sx={{ ml: 30 }}>
                    <Typography>Batch Size</Typography>
                    <TextField
                      size='small'
                      variant='filled'
                      value={getRowOperation.batch_size || ''}
                      sx={{ width: 300 }}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', mt: 4 }}>
                  <Box>
                    <Typography>Time</Typography>
                    <TextField
                      size='small'
                      variant='filled'
                      value={getRowOperation.time_in_mins || ''}
                      sx={{ width: 300 }}
                    />
                    <Typography variant='subtitle2'>In Minutes</Typography>
                  </Box>
                  <Box sx={{ ml: 30 }}>
                    <Typography>Planned Operating Cost</Typography>
                    <TextField
                      size='small'
                      variant='filled'
                      value={getRowOperation.planned_operating_cost || ''}
                      sx={{ width: 300 }}
                    />
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box sx={{ mt: 8 }}>
                  <Typography variant='h6'>Actual Time and Cost</Typography>
                </Box>
                <Box sx={{ display: 'flex', mt: 4 }}>
                  <Box>
                    <Typography>Actual Start Time</Typography>
                    <TextField
                      size='small'
                      variant='filled'
                      value={getRowOperation.actual_start_time || ''}
                      sx={{ width: 300 }}
                    />
                    <Typography variant='subtitle2'>Updated via 'Time Log' (In Minutes)</Typography>
                    <Typography variant='subtitle2'>Asia/Kolkata</Typography>
                  </Box>
                  <Box sx={{ ml: 30 }}>
                    <Typography>Actual End Time</Typography>
                    <TextField
                      size='small'
                      variant='filled'
                      value={getRowOperation.actual_end_time || ''}
                      sx={{ width: 300 }}
                    />
                    <Typography variant='subtitle2'>Updated via 'Time Log' (In Minutes)</Typography>
                    <Typography variant='subtitle2'>Asia/Kolkata</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', mt: 4 }}>
                  <Box>
                    <Typography>Actual Operation Time</Typography>
                    <TextField
                      size='small'
                      variant='filled'
                      value={getRowOperation.actual_operation_time || ''}
                      sx={{ width: 300 }}
                    />
                    <Typography variant='subtitle2'>Updated via 'Time Log' (In Minutes)</Typography>
                  </Box>
                  <Box sx={{ ml: 30 }}>
                    <Typography>Actual Operating Cost</Typography>
                    <TextField
                      size='small'
                      variant='filled'
                      value={getRowOperation.actual_operating_cost || ''}
                      sx={{ width: 300 }}
                    />
                    <Typography variant='subtitle2'>(Hour Rate / 60) * Actual Operation Time</Typography>
                  </Box>
                </Box>
              </Box>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Box>
    </Card>
  )
}

export default Operation
