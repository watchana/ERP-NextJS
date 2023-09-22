import React from 'react'

// ** MUI Imports
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { DataGrid } from '@mui/x-data-grid'

// ** MDI Imports
import { ChevronDown, ChevronUp } from 'mdi-material-ui'

// ** Columns for DataGrid
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

// ** data selection
import { defaultMaterialRequestType, valuationMethod } from 'src/dummy/sub-pages/stock/itemPage'

const InventoryItem = ({ dataRow, handleUpdateData }) => {
  const [openAutoReorder, setOpenAutoReorder] = React.useState(false)
  const [openUnitsOfMeasure, setOpenUnitsOfMeasure] = React.useState(false)
  const [openSerialNosBatches, setOpenSerialNosBatches] = React.useState(false)

  const styles = {
    dataGridHeight: {
      height: '300px'
    },
    BoxStyle: {
      marginBlock: 2,
      mt: 4
    }
  }

  const handleCheckboxChange = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
    handleUpdateData(event.target.name, event.target.checked === true ? 1 : 0)
  }

  const handleTextChange = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    handleUpdateData(event.target.name, event.target.value)
  }

  const handleSelectChange = event => {
    console.log('Select ถูกเปลี่ยนแปลงเป็น:', event.target.value)
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
                <Box sx={styles.BoxStyle}>
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
                      backgroundColor: 'grey.100'
                    }}
                  />
                </Box>

                <Box sx={styles.BoxStyle}>
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
                      backgroundColor: 'grey.100'
                    }}
                  />
                </Box>

                <Box sx={styles.BoxStyle}>
                  <Typography variant='subtitle2' sx={{ my: 2 }}>
                    Default Material Request Type
                  </Typography>
                  <Select
                    fullWidth
                    name='default_material_request_type'
                    value={dataRow.default_material_request_type}
                    onChange={handleSelectChange}
                    sx={{
                      backgroundColor: 'grey.100'
                    }}
                  >
                    {defaultMaterialRequestType.map(item => (
                      <MenuItem key={item.id} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>

                <Box sx={styles.BoxStyle}>
                  <Typography variant='subtitle2' sx={{ my: 2 }}>
                    Valuation Method
                  </Typography>
                  <Select
                    fullWidth
                    name='valuation_method'
                    value={dataRow.valuation_method}
                    onChange={handleSelectChange}
                    sx={{
                      backgroundColor: 'grey.100'
                    }}
                  >
                    {valuationMethod.map(item => (
                      <MenuItem key={item.id} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={styles.BoxStyle}>
                  <Typography variant='subtitle2' sx={{ my: 2 }}>
                    Warranty Period (in days)
                  </Typography>
                  <TextField
                    fullWidth
                    variant='outlined'
                    sx={{
                      backgroundColor: 'grey.100'
                    }}
                  />
                </Box>

                <Box sx={styles.BoxStyle}>
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
                      backgroundColor: 'grey.100'
                    }}
                  />
                </Box>

                <Box sx={styles.BoxStyle}>
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
                      backgroundColor: 'grey.100'
                    }}
                  />
                </Box>

                <Box sx={styles.BoxStyle}>
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
          </Grid>
        </Grid>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Auto re-order</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Divider />
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
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Units of Measure</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Typography variant='subtitle2' sx={{ my: 2 }}>
                UOMs
              </Typography>
              <Typography variant='subtitle2' sx={{ my: 2 }}>
                Will also apply for variants
              </Typography>
              <Box>
                <DataGrid
                  className={dataRow.taxes.length === 0 ? 'dataGridHeight' : ''}
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
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Serial Nos and Batches</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Divider />
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexGrow: 1 }}>
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
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexGrow: 1 }}>
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
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Card>
    </Box>
  )
}

export default InventoryItem
