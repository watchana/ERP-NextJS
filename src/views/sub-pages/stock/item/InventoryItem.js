import React from 'react'

// ** MUI Imports
import {
  Box,
  Button,
  Card,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** MDI Imports
import { ChevronDown, ChevronUp } from 'mdi-material-ui'

const columnsBarcode = [
  { field: 'idx', headerName: 'No', width: 70 },
  { field: 'barcode', headerName: 'Barcode', width: 150 },
  { field: 'barcode_type', headerName: 'Barcode Type', width: 200 },
  { field: 'uom', headerName: 'UOM', width: 200 },
  { field: 'edit', headerName: 'Edit', width: 200, renderCell: () => <Button>Edit</Button> }
]

const columnsAutoReorder = [
  { field: 'idx', headerName: 'No', width: 70 },
  { field: 'check_in', headerName: 'Check in (group)', width: 150 },
  { field: 'request_for', headerName: 'Request for', width: 150 },
  { field: 'reorder_level', headerName: 'Re-order Level', width: 150 },
  { field: 'reorder_qty', headerName: 'Re-order Qty', width: 150 },
  { field: 'material_request_type', headerName: 'Material Request Type', width: 150 },
  { field: 'edit', headerName: 'Edit', width: 200, renderCell: () => <Button>Edit</Button> }
]

const columnsUOM = [
  { field: 'idx', headerName: 'No', width: 70 },
  { field: 'uom', headerName: 'UOM', width: 150 },
  { field: 'conversion_factor', headerName: 'Conversion Factor', width: 150 },
  { field: 'edit', headerName: 'Edit', width: 200, renderCell: () => <Button>Edit</Button> }
]

const InventoryItem = ({ dataRow, handleUpdateData }) => {
  const theme = useTheme()

  const [openAutoReorder, setOpenAutoReorder] = React.useState(false)
  const [openUnitsOfMeasure, setOpenUnitsOfMeasure] = React.useState(false)
  const [openSerialNosBatches, setOpenSerialNosBatches] = React.useState(false)

  const BoxStyle = {
    marginBlock: 2,
    mt: 4
  }

  const handleCheckboxChange = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
    handleUpdateData(event.target.name, event.target.checked === true ? 1 : 0)
  }

  const handleTextChange = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    handleUpdateData(event.target.name, event.target.value)
  }

  return (
    <Box>
      <Card
        sx={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          p: 2
        }}
      >
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant='body1' sx={{ marginBlock: 2 }}>
              Inventory Settings
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box sx={BoxStyle}>
                  <Typography variant='subtitle2' sx={{ my: 2 }}>
                    Shelf Life In Days
                  </Typography>
                  <TextField
                    fullWidth
                    variant='outlined'
                    name='shelf_life_in_days'
                    value={dataRow.shelf_life_in_days}
                    onChange={handleTextChange}
                    sx={{
                      backgroundColor: theme.palette.grey[100]
                    }}
                  />
                </Box>

                <Box sx={BoxStyle}>
                  <Typography variant='subtitle2' sx={{ my: 2 }}>
                    End of Life
                  </Typography>
                  <TextField
                    fullWidth
                    variant='outlined'
                    name='end_of_life'
                    value={dataRow.end_of_life}
                    onChange={handleTextChange}
                    sx={{
                      backgroundColor: theme.palette.grey[100]
                    }}
                  />
                </Box>

                <Box sx={BoxStyle}>
                  <Typography variant='subtitle2' sx={{ my: 2 }}>
                    Default Material Request Type
                  </Typography>
                  <TextField
                    fullWidth
                    variant='outlined'
                    sx={{
                      backgroundColor: theme.palette.grey[100]
                    }}
                  />
                </Box>

                <Box sx={BoxStyle}>
                  <Typography variant='subtitle2' sx={{ my: 2 }}>
                    Valuation Method
                  </Typography>
                  <TextField
                    fullWidth
                    variant='outlined'
                    sx={{
                      backgroundColor: theme.palette.grey[100]
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={BoxStyle}>
                  <Typography variant='subtitle2' sx={{ my: 2 }}>
                    Warranty Period (in days)
                  </Typography>
                  <TextField
                    fullWidth
                    variant='outlined'
                    sx={{
                      backgroundColor: theme.palette.grey[100]
                    }}
                  />
                </Box>

                <Box sx={BoxStyle}>
                  <Typography variant='subtitle2' sx={{ my: 2 }}>
                    Weight Per Unit
                  </Typography>
                  <TextField
                    fullWidth
                    variant='outlined'
                    name='weight_per_unit'
                    value={dataRow.weight_per_unit}
                    onChange={handleTextChange}
                    sx={{
                      backgroundColor: theme.palette.grey[100]
                    }}
                  />
                </Box>

                <Box sx={BoxStyle}>
                  <Typography variant='subtitle2' sx={{ my: 2 }}>
                    Weight UOM
                  </Typography>
                  <TextField
                    fullWidth
                    disabled
                    variant='outlined'
                    name='weight_uom'
                    value={dataRow.weight_uom}
                    onChange={handleTextChange}
                    sx={{
                      backgroundColor: theme.palette.grey[100]
                    }}
                  />
                </Box>

                <Box sx={BoxStyle}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Boolean(dataRow.allow_negative_stock)}
                        name='allow_negative_stock'
                        onChange={handleCheckboxChange}
                      />
                    }
                    label='Allow Negative Stock'
                  />
                </Box>
              </Grid>
            </Grid>

            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Typography variant='body1' sx={{ marginBlock: 2 }}>
              Barcodes
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2' sx={{ my: 2 }}>
                Barcode
              </Typography>
              <DataGrid
                sx={{ height: dataRow.taxes.length === 0 ? 300 : 'auto' }}
                rows={dataRow.barcodes}
                columns={columnsBarcode}
                getRowId={row => row.name}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 }
                  }
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            </Box>
            <Button variant='contained' size='small' sx={{ my: 2 }}>
              Add Row
            </Button>
            <Divider />
          </Grid>

          {/* Auto Reorder */}
          <Grid item xs={12}>
            <Box
              display='flex'
              alignItems='center'
              onClick={() => setOpenAutoReorder(prev => !prev)}
              style={{ cursor: 'pointer' }}
            >
              Auto re-order
              {openAutoReorder ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </Box>
            <Collapse in={openAutoReorder}>
              <Box sx={{ p: 2 }}>
                <Typography variant='subtitle2' sx={{ my: 2 }}>
                  Reorder level based on Warehouse
                </Typography>
                <Typography variant='subtitle2' sx={{ my: 2 }}>
                  Will also apply for variants unless overrridden
                </Typography>
                <Box>
                  <DataGrid
                    sx={{ height: dataRow.taxes.length === 0 ? 300 : 'auto' }}
                    rows={[]}
                    columns={columnsAutoReorder}
                    getRowId={row => row.name}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 }
                      }
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                  />
                </Box>
                <Button variant='contained' size='small' sx={{ my: 2 }}>
                  Add Row
                </Button>
              </Box>
            </Collapse>

            <Divider />
          </Grid>

          {/*  Units of Measure */}
          <Grid item xs={12}>
            <Box
              display='flex'
              alignItems='center'
              onClick={() => setOpenUnitsOfMeasure(prev => !prev)}
              style={{ cursor: 'pointer' }}
            >
              Units of Measure
              {openUnitsOfMeasure ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </Box>
            <Collapse in={openUnitsOfMeasure}>
              <Box sx={{ p: 2 }}>
                <Typography variant='subtitle2' sx={{ my: 2 }}>
                  UOMs
                </Typography>
                <Typography variant='subtitle2' sx={{ my: 2 }}>
                  Will also apply for variants
                </Typography>
                <Box>
                  <DataGrid
                    sx={{ height: dataRow.taxes.length === 0 ? 300 : 'auto' }}
                    rows={dataRow.uoms}
                    columns={columnsUOM}
                    getRowId={row => row.name}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 5 }
                      }
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                  />
                </Box>
                <Button variant='contained' size='small' sx={{ my: 2 }}>
                  Add Row
                </Button>
              </Box>
            </Collapse>

            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Box
              display='flex'
              alignItems='center'
              onClick={() => setOpenSerialNosBatches(prev => !prev)}
              style={{ cursor: 'pointer' }}
            >
              Serial Nos and Batches
              {openSerialNosBatches ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </Box>
            <Collapse in={openSerialNosBatches}>
              <Box sx={{ mt: 3 }}>
                <Divider />
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(dataRow.has_batch_no)}
                          name='has_batch_no'
                          onChange={handleCheckboxChange}
                        />
                      }
                      label='Has Batch No'
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(dataRow.has_serial_no)}
                          name='has_serial_no'
                          onChange={handleCheckboxChange}
                        />
                      }
                      label='Has Serial No'
                    />
                  </Grid>
                </Grid>
              </Box>
            </Collapse>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default InventoryItem
