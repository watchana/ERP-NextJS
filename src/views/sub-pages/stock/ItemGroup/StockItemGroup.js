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
import axios from 'axios'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import ChevronUp from 'mdi-material-ui/ChevronUp'
import { useEffect, useState } from 'react'

//Import Custom Components

const StockItemGroup = ({ dataRow, setDataRow }) => {
  const [IsShowWebsite, setIsShowWebsite] = useState([])
  const [collapseWebsite, setCollapseWebsite] = useState([])

  const [getAllRowItemGroup, setGetAllRowItemGroup] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}Item Group/${dataRow.name}`, {
        headers: {
          Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
        }
      })
      .then(res => {
        setGetAllRowItemGroup(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [dataRow])

  // if (Object.values(getAllRowItemGroup)?.length === 0) {
  //   return 'waiting...'
  // }

  useEffect(() => {
    console.log('Group', dataRow)
  }, [dataRow])

  const columnsGroup = [
    { field: 'idx', headerName: 'No', width: 70 },
    { field: 'company', headerName: 'Company', width: 150 },
    { field: 'default_warehouse', headerName: 'Default Warehouse', width: 300 },
    {
      field: 'default_price_list',
      headerName: 'Default Price List',
      width: 300
    }
  ]

  const columns = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'item_tax_template', headerName: 'Item Tax Template', width: 150 },
    { field: 'tax_category', headerName: 'Tax Category', width: 300 },
    {
      field: 'valid_from',
      headerName: 'Valid From',
      width: 300
    },
    { field: 'minimum_net_rate', headerName: 'Minimum Net Rate', width: 300 },
    { field: 'maximum_net_rate', headerName: 'Maximum Net Rate', width: 300 }
  ]

  const columnsFields = [
    { field: 'label', headerName: 'Label', width: 150 },
    { field: 'description', headerName: 'Description', width: 150 }
  ]

  const columnsAttr = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'fieldname', headerName: 'Attribute', width: 150 }
  ]

  const columnsWeb = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'attribute', headerName: 'Label', width: 150 }
  ]

  const handleClickWebsite = () => {
    setCollapseWebsite(!collapseWebsite)
  }

  const handleShowWebsite = event => {
    setIsShowWebsite(event.target.checked)
  }

  const handleTextChange = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setDataRow({ ...dataRow, [event.target.name]: event.target.value })
  }

  const handleCheckbox = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
    setDataRow({ ...dataRow, [event.target.name]: event.target.checked === true ? 1 : 0 })
  }

  const checkboxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='h6'>General Settings</Typography>

            <Typography sx={{ margin: 1 }}>Parent Item Group</Typography>
            <TextField
              size='small'
              variant='filled'
              value={dataRow.parent_item_group || ''}
              fullWidth
              onChange={handleTextChange}
              name='parent_item_group'
            />
            <Grid item xs={12} sx={checkboxStyle}>
              <Checkbox checked={dataRow.is_group === 1 ? true : false} name='is_group' onChange={handleCheckbox} />
              <Typography variant='subtitle2'>Is Group</Typography>
            </Grid>

            <Typography variant='subtitle2'>Only leaf nodes are allowed in transaction</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='h6'>Defaults</Typography>

            <Typography variant='subtitle2'>Item Group Defaults</Typography>
            <DataGrid
              rows={getAllRowItemGroup}
              columns={columnsGroup}
              getRowId={row => row.name}
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

          <Grid item xs={12} sx={{ mt: 30 }}>
            <Typography variant='h6'>Item Tax</Typography>
            <Typography variant='subtitle2'>Taxes</Typography>
            <DataGrid
              rows={getAllRowItemGroup}
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

          <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 30 }}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={IsShowWebsite} onChange={handleShowWebsite} />}
                variant='body2'
                label='Show in Website'
              />
              <Typography variant='subtitle2'>Make Item Group visible in website</Typography>
              {IsShowWebsite && (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={6} lg={6} sx={{ mt: 4 }}>
                    <Typography sx={{ margin: 1 }}>Route</Typography>
                    <TextField
                      size='small'
                      variant='filled'
                      value={dataRow.route || ''}
                      fullWidth
                      onChange={handleTextChange}
                      name='route'
                    />

                    <Typography sx={{ marginBottom: 2 }}>Weightage</Typography>
                    <TextField
                      size='small'
                      variant='filled'
                      label=''
                      value={dataRow.weightage || ''}
                      fullWidth
                      onChange={handleTextChange}
                      name='weightage'
                    />

                    <Typography sx={{ mt: 8 }}>Description</Typography>
                    <TextareaAutosize
                      style={{ minHeight: '200px', width: '100%' }}
                      size='small'
                      variant='filled'
                      label=''
                      value={dataRow.description}
                      onChange={handleTextChange}
                      name='description'
                    />
                    <Grid item xs={12} sx={checkboxStyle}>
                      <Checkbox
                        checked={dataRow.include_descendants === 1 ? true : false}
                        name='include_descendants'
                        onChange={handleCheckbox}
                      />
                      <Typography variant='subtitle2'>Include Descendants</Typography>
                    </Grid>

                    <Typography variant='subtitle2'>Include Website Items belonging to child Item Groups</Typography>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6} sx={{ mt: 4 }}>
                    <Typography sx={{ margin: 1 }}>Title</Typography>
                    <TextField
                      size='small'
                      variant='filled'
                      value={dataRow.website_title || ''}
                      fullWidth
                      onChange={handleTextChange}
                      name='website_title'
                    />

                    <Typography sx={{ marginBottom: 2 }}>Slideshow</Typography>
                    <TextField
                      size='small'
                      variant='filled'
                      label=''
                      value={dataRow.slideshow || ''}
                      fullWidth
                      onChange={handleTextChange}
                      name='slideshow'
                    />
                    <Typography variant='subtitle2'>Show this slideshow at the top of the page</Typography>

                    <Typography sx={{ mt: 4 }}>Website Specifications</Typography>
                    <DataGrid
                      sx={{ height: '40%' }}
                      rows={getAllRowItemGroup}
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

                  <Grid item xs={12} sx={{ mt: 4, display: 'flex' }}>
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
                        <Grid item xs={12}>
                          <Typography>Item Fields</Typography>
                          <DataGrid
                            rows={getAllRowItemGroup}
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

                        <Grid item xs={12} sx={{ mt: 10 }}>
                          <Typography>Attributes</Typography>
                          <DataGrid
                            rows={getAllRowItemGroup}
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
