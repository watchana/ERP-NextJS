import {
  Box,
  Grid,
  Typography,
  TextField,
  Checkbox,
  Button,
  FormGroup,
  FormControlLabel,
  CardActions,
  IconButton,
  Divider,
  TextareaAutosize,
  Collapse,
  Card,
  CardContent
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import ChevronUp from 'mdi-material-ui/ChevronUp'
import { useState } from 'react'

//Import Custom Components

const StockItemGroup = ({ dataRow }) => {
  const [IsShowWebsite, setIsShowWebsite] = useState([])
  const [collapseWebsite, setCollapseWebsite] = useState([])
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  const columnsGroup = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'Company', headerName: 'Company', width: 150 },
    { field: 'DefaultWarehouse', headerName: 'Default Warehouse', width: 300 },
    {
      field: 'DefaultPriceList',
      headerName: 'Default Price List',
      width: 300
    }
  ]

  const rowsGroup = [{ id: 1, Company: 'Sidw', TaxCategory: 'Jon', DefaultWarehouse: 'dasd', DefaultPriceList: 'List' }]

  const columns = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'ItemTaxTemplate', headerName: 'Item Tax Template', width: 150 },
    { field: 'TaxCategory', headerName: 'Tax Category', width: 300 },
    {
      field: 'ValidFrom',
      headerName: 'Valid From',
      width: 300
    },
    { field: 'MinimumNetRate', headerName: 'Minimum Net Rate', width: 300 },
    { field: 'MaximumNetRate', headerName: 'Maximum Net Rate', width: 300 }
  ]

  const rows = [
    {
      id: 1,
      ItemTaxTemplate: 'Sidw',
      TaxCategory: 'Jon',
      ValidFrom: 'dasd',
      MinimumNetRate: 'dsss',
      MaximumNetRate: 'dada'
    }
  ]

  const columnsFields = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'Fieldname', headerName: 'Fieldname', width: 150 }
  ]

  const rowsFields = [
    {
      id: 1,
      Fieldname: 'Sidw'
    }
  ]

  const columnsAttr = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'Attribute', headerName: 'Attribute', width: 150 }
  ]

  const rowsAttr = [
    {
      id: 1,
      Attribute: 'Sidw'
    }
  ]

  const columnsWeb = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'label', headerName: 'Label', width: 150 },
    { field: 'des', headerName: 'description', width: 150 }
  ]

  const rowsWeb = [
    {
      id: 1,
      label: 'show',
      des: 'description'
    }
  ]

  const handleClickWebsite = () => {
    setCollapseWebsite(!collapseWebsite)
  }

  const handleShowWebsite = event => {
    setIsShowWebsite(event.target.checked)
  }

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item sm={12} md={6} lg={6}>
            <Typography variant='h6'>General Settings</Typography>

            <Typography sx={{ margin: 1 }}>Parent Item Group</Typography>
            <TextField size='small' variant='filled' value={dataRow.parent_item_group || ''} fullWidth />

            <FormControlLabel
              sx={{ mt: 2 }}
              control={<Checkbox checked={Boolean(dataRow[0]?.is_group) || false} />}
              label='Is Group'
            />
            <Typography variant='subtitle2'>Only leaf nodes are allowed in transaction</Typography>
          </Grid>

          <Grid item sm={12} md={12} lg={12}>
            <Typography variant='h6'>Defaults</Typography>

            <Typography variant='subtitle2'>Item Group Defaults</Typography>
            <DataGrid
              rows={rowsGroup}
              columns={columnsGroup}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 }
                }
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
            <Button>Add row</Button>
          </Grid>

          <Grid item sm={12} md={12} lg={12} sx={{ mt: 30 }}>
            <Typography variant='h6'>Item Tax</Typography>
            <Typography variant='subtitle2'>Taxes</Typography>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 }
                }
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
            <Button>Add row</Button>
          </Grid>

          <Grid item sm={12} md={12} lg={12} sx={{ mt: 30 }}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={IsShowWebsite} onChange={handleShowWebsite} />}
                variant='body2'
                label='Show in Website'
              />
              <Typography variant='subtitle2'>Make Item Group visible in website</Typography>
              {IsShowWebsite && (
                <Grid container spacing={3}>
                  <Grid item sm={12} md={6} lg={6} sx={{ mt: 4 }}>
                    <Typography sx={{ margin: 1 }}>Route</Typography>
                    <TextField size='small' variant='filled' value={dataRow.route || ''} fullWidth />

                    <Typography sx={{ marginBottom: 2 }}>Weightage</Typography>
                    <TextField size='small' variant='filled' label='' value={dataRow.weightage || ''} fullWidth />

                    <Typography sx={{ mt: 8 }}>Description</Typography>
                    <TextareaAutosize
                      style={{ minHeight: '200px', width: '100%' }}
                      size='small'
                      variant='filled'
                      label=''
                      value={dataRow.description}
                    />

                    <FormControlLabel
                      sx={{ mt: 2 }}
                      control={<Checkbox checked={Boolean(dataRow[0]?.include_descendants) || false} />}
                      label='Include Descendants'
                    />
                    <Typography variant='subtitle2'>Include Website Items belonging to child Item Groups</Typography>
                  </Grid>

                  <Grid item sm={12} md={6} lg={6} sx={{ mt: 4 }}>
                    <Typography sx={{ margin: 1 }}>Title</Typography>
                    <TextField size='small' variant='filled' value={dataRow.website_title || ''} fullWidth />

                    <Typography sx={{ marginBottom: 2 }}>Slideshow</Typography>
                    <TextField size='small' variant='filled' label='' value={dataRow.slideshow || ''} fullWidth />
                    <Typography variant='subtitle2'>Show this slideshow at the top of the page</Typography>

                    <Typography sx={{ mt: 4 }}>Website Specifications</Typography>
                    <DataGrid
                      sx={{ height: '40%' }}
                      rows={rowsWeb}
                      columns={columnsWeb}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 5 }
                        }
                      }}
                      pageSizeOptions={[5, 10]}
                      checkboxSelection
                    />
                  </Grid>

                  <Grid item sm={12} md={12} lg={12} sx={{ mt: 4, display: 'flex' }}>
                    <Button size='small' variant='filled' label='' onClick={handleClickWebsite}>
                      <Typography>Website Filters</Typography>
                    </Button>
                    <CardActions className='card-action-dense'>
                      <IconButton size='small' onClick={handleClickWebsite}>
                        {collapseWebsite ? (
                          <ChevronUp sx={{ fontSize: '1.875rem' }} />
                        ) : (
                          <ChevronDown sx={{ fontSize: '1.875rem' }} />
                        )}
                      </IconButton>
                    </CardActions>
                  </Grid>
                  <Grid sx={{ width: '100%' }}>
                    <Collapse in={collapseWebsite}>
                      <Divider sx={{ margin: 0 }} />
                      <CardContent>
                        <Grid item sm={12} md={12} lg={12}>
                          <Typography>Item Fields</Typography>
                          <DataGrid
                            rows={rowsFields}
                            columns={columnsFields}
                            initialState={{
                              pagination: {
                                paginationModel: { page: 0, pageSize: 5 }
                              }
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                          />
                          <Button>Add Row</Button>
                        </Grid>

                        <Grid item sm={12} md={12} lg={12} sx={{ mt: 10 }}>
                          <Typography>Attributes</Typography>
                          <DataGrid
                            rows={rowsAttr}
                            columns={columnsAttr}
                            initialState={{
                              pagination: {
                                paginationModel: { page: 0, pageSize: 5 }
                              }
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                          />
                          <Button>Add Row</Button>
                        </Grid>
                      </CardContent>
                    </Collapse>
                  </Grid>
                </Grid>
              )}
            </FormGroup>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StockItemGroup
