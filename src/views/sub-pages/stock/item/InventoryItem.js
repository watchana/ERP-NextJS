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
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// ** MUI X Imports
import { DataGrid } from '@mui/x-data-grid'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

// import isBefore from 'dayjs/plugin/isBefore'

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
import { auto } from '@popperjs/core'

const InventoryItem = ({ dataRow, handleUpdateData }) => {
  const endOfLifeDate = dayjs(dataRow.end_of_life)

  const heightValueBarcodes = dataRow?.barcodes?.length === 0 || dataRow?.barcodes === undefined ? 300 : 'auto'

  const heightValueAutoReorder =
    dataRow?.auto_reorder?.length === 0 || dataRow?.auto_reorder === undefined ? 300 : 'auto'
  const heightValueUOM = dataRow?.uoms?.length === 0 || dataRow?.uoms === undefined ? 300 : 'auto'

  const styles = {
    dataGrid: {
      barcodes: {
        height: heightValueBarcodes
      },
      autoReorder: {
        height: heightValueAutoReorder
      },
      uoms: {
        height: heightValueUOM
      }
    },
    BoxStyle: {
      marginBlock: 2,
      mt: 4
    }
  }

  const handleCheckboxChange = event => {
    handleUpdateData(event.target.name, event.target.checked === true ? 1 : 0)
  }

  const handleTextChange = event => {
    handleUpdateData(event.target.name, event.target.value)
  }

  const handleDateChange = (name, date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD')
    handleUpdateData(name, formattedDate)
  }

  if (!dataRow) return <Skeleton variant='rounded' width={210} height={60} />

  return (
    <Box>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Inventory Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{
                          backgroundColor: 'grey.100',
                          width: '100%'
                        }}
                        views={['year', 'month', 'day']}
                        value={endOfLifeDate}
                        onChange={date => handleDateChange('end_of_life', date)}
                      />
                    </LocalizationProvider>
                  </Box>

                  <Box sx={styles.BoxStyle}>
                    <Typography variant='subtitle2' sx={{ my: 2 }}>
                      Default Material Request Type
                    </Typography>
                    <Select
                      fullWidth
                      name='default_material_request_type'
                      value={dataRow.default_material_request_type}
                      onChange={handleTextChange}
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
                      onChange={handleTextChange}
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
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Barcodes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ p: 2 }}>
            <Typography variant='subtitle2' sx={{ my: 2 }}>
              Barcodes
            </Typography>
            <DataGrid
              sx={styles.dataGrid.barcodes}
              rows={[]}
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
            <Button variant='contained' size='small' sx={{ my: 2 }}>
              Add Row
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

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
                sx={styles.dataGrid.autoReorder}
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
                style={styles.dataGrid.uoms}
                rows={dataRow?.uoms || []}
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
    </Box>
  )
}

export default InventoryItem
