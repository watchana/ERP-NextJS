// ** MUI Imports
import { useState, useEffect } from 'react'

import {
  Autocomplete,
  Card,
  Button,
  Typography,
  CardHeader,
  CardContent,
  CardActions,
  Box,
  Checkbox,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  TextField
} from '@mui/material'

import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import { ChevronDown, ChevronUp } from 'mdi-material-ui'

const ContactAndAddress = ({ dataRow, setDataRow }) => {
  const [isOpenAddress, setIsOpenAddress] = useState(false)
  const [address_title, setAddressTitle] = useState('')
  const [email_address, setEmailAddress] = useState('')
  const [address_type, setAddressType] = useState('')
  const [phone, setPhone] = useState('')
  const [address_l1, setAddress_L1] = useState('')
  const [address_l2, setAddress_L2] = useState('')
  const [fax, setFax] = useState('')
  const [tax_category, setTaxCategory] = useState('')
  const [city_town, setCityTown] = useState('')
  const [county, setCounty] = useState('')
  const [county_E, setCounty_E] = useState('')
  const [state_province, setStateProvince] = useState('')
  const [postal_code, setPostalCode] = useState('')

  const [isOpenContact, setIsOpenContact] = useState(false)
  const [first_name, setFirstName] = useState('')
  const [middle_name, setMiddleName] = useState('')
  const [lsst_name, setLastName] = useState('')
  const [user_id, setUserId] = useState('')
  const [address, setAddress] = useState('')
  const [status, setStatus] = useState('')
  const [salutation, setSalutation] = useState('')
  const [designation, setDesignation] = useState('')
  const [gender, setGender] = useState('')
  const [company_name, setCompanyName] = useState('')

  const [isSynGoogle, setIsSymGoogle] = useState(false)
  const [collapseSynGoogle, setCollapseSynGoogle] = useState(false)

  const handleCollapseSynGoogle = () => {
    setCollapseSynGoogle(!collapseSynGoogle)
  }

  const handleSynGoogle = event => {
    setIsSymGoogle(event.target.checked)
  }

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 }
  ]

  const columns = [
    { field: 'link_doctype', headerName: 'Doc Type', width: 150 },
    { field: 'link_name', headerName: 'Name', width: 150 },
    { field: 'link_title', headerName: 'Title', width: 300 }
  ]

  const columnsEmail = [
    { field: 'idx', headerName: 'No', width: 150 },
    { field: 'email_id', headerName: 'Name', width: 300 }
  ]

  const columnsPhone = [
    { field: 'idx', headerName: 'No', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 300 }
  ]

  const columnsContactLinks = [
    { field: 'link_doctype', headerName: 'Doctype', width: 150 },
    { field: 'link_name', headerName: 'Name', width: 300 },
    { field: 'link_title', headerName: 'Title', width: 300 }
  ]

  const handleEditClickContact = () => {
    setIsOpenContact(true)
  }

  const handleSaveClickContact = () => {
    setIsOpenContact(false)
  }

  const handleEditClickAddress = () => {
    setIsOpenAddress(true)
  }

  const handleSaveClickAddress = () => {
    setIsOpenAddress(false)
  }

  const [state, setState] = useState({
    Preferred_Billing_Address: true,
    Preferred_Shipping_Addressn: false,
    Disabled: false
  })

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    })
  }

  const [dataAddr, setDataAddr] = useState('')
  const [dataContact, setDataContact] = useState('')
  const [getDataLinks, setGetDataLinks] = useState([])
  const [getDataContact, setGetDataContact] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}Address/${dataRow.customer_primary_address}`, {
        headers: {
          Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
        }
      })
      .then(res => {
        setDataAddr(res.data.data)
        setGetDataLinks(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}Contact/${dataRow.customer_primary_contact}`, {
        headers: {
          Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
        }
      })
      .then(res => {
        setDataContact(res.data.data)
        setGetDataContact(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [dataRow])

  if (getDataLinks.length === 0) {
    return 'waiting...'
  }

  const { Preferred_Billing_Address, Preferred_Shipping_Addressn, Disabled } = state

  const handleCheckboxChangeAddr = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
    setDataAddr({ ...dataAddr, [event.target.name]: event.target.checked })
  }

  const handleTextChangeAddress = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setDataAddr({ ...dataAddr, [event.target.name]: event.target.value })
  }

  const handleTextChangeContact = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setDataContact({ ...dataContact, [event.target.name]: event.target.value })
  }

  const checkboxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }

  return (
    <Box>
      <Card
        sx={{
          borderTopLeftRadius: 0, // กำหนด borderRadius สำหรับมุมบนซ้าย
          borderTopRightRadius: 0, // กำหนด borderRadius สำหรับมุมบนขวา
          p: 2,
          mb: 2
        }}
      >
        <CardHeader title='Address and Contacts' />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Card>
                {/* sx={{ marginBottom: 3.25 }} */}
                <CardContent sx={{ width: '100%' }}>
                  <Typography variant='body2'>{dataAddr?.address_title || ''}</Typography>
                  <Typography variant='body2'>{dataAddr?.address_line1 || ''}</Typography>
                  <Typography variant='body2'>{dataAddr?.city || ''}</Typography>
                  <Typography variant='body2'>{dataAddr?.state || ''}</Typography>
                  <Typography variant='body2'>{dataAddr?.pincode || ''}</Typography>
                  <Typography variant='body2'>Phone:{dataAddr?.phone || ''}</Typography>
                  <Typography variant='body2'>Fax: {dataAddr?.Fax || ''}</Typography>
                  <Typography variant='body2'>Email: {dataAddr?.email_id || ''}</Typography>
                </CardContent>
                <CardActions className='card-action-dense'>
                  <Button onClick={handleEditClickAddress}>แก้ไข</Button>
                  <Dialog
                    open={isOpenAddress}
                    onClose={() => setIsOpenAddress(false)}
                    PaperProps={{
                      style: {
                        width: '80%',
                        height: '80%',
                        margin: 0,
                        maxWidth: 'none',
                        maxHeight: 'none'
                      }
                    }}
                  >
                    <DialogTitle>Edit</DialogTitle>
                    <DialogContent sx={{ minWidth: 600, width: '100%', height: '100%' }}>
                      <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Typography sx={{ margin: 1 }}>Address Title</Typography>
                          <TextField
                            size='small'
                            variant='filled'
                            value={dataAddr.address_title}
                            fullWidth
                            onChange={handleTextChangeAddress}
                            name='address_title'
                          />
                          <Typography sx={{ marginBottom: 2 }}>Address Type</Typography>

                          <Autocomplete
                            sx={{ height: 50 }}
                            disablePortal
                            id='combo-box-demo'
                            options={top100Films}
                            fullWidth
                            renderInput={params => <TextField {...params} label='Movie' />}
                          />

                          <Typography sx={{ margin: 1 }}>Address Line 1 </Typography>
                          <TextField
                            size='small'
                            variant='filled'
                            type='text'
                            fullWidth
                            value={dataAddr.address_line1}
                            onChange={handleTextChangeAddress}
                            name='address_line1'
                          />

                          <Typography sx={{ margin: 1 }}>Address Line 2 </Typography>
                          <TextField
                            size='small'
                            variant='filled'
                            type='text'
                            fullWidth
                            value={dataAddr.address_line2}
                            onChange={handleTextChangeAddress}
                            name='address_line2'
                          />

                          <Typography sx={{ margin: 1 }}>City/Town </Typography>
                          <TextField
                            size='small'
                            variant='filled'
                            type='text'
                            fullWidth
                            value={dataAddr.city}
                            onChange={handleTextChangeAddress}
                            name='city'
                          />

                          <Typography sx={{ margin: 1 }}>County </Typography>
                          <TextField
                            size='small'
                            variant='filled'
                            type='text'
                            fullWidth
                            value={dataAddr.county}
                            onChange={handleTextChangeAddress}
                            name='county'
                          />

                          <Typography sx={{ margin: 1 }}>State/Province </Typography>
                          <TextField
                            size='small'
                            variant='filled'
                            type='text'
                            fullWidth
                            value={dataAddr.state}
                            onChange={handleTextChangeAddress}
                            name='state'
                          />

                          <Typography sx={{ margin: 1 }}>Country </Typography>
                          <TextField
                            size='small'
                            variant='filled'
                            type='text'
                            fullWidth
                            value={dataAddr.country}
                            onChange={handleTextChangeAddress}
                            name='country'
                          />

                          <Typography sx={{ margin: 1 }}>Postal Code </Typography>
                          <TextField
                            size='small'
                            variant='filled'
                            type='text'
                            fullWidth
                            value={dataAddr.pincode}
                            onChange={handleTextChangeAddress}
                            name='pincode'
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Typography sx={{ marginBottom: 2 }}>Email Address</Typography>
                          <TextField
                            size='small'
                            variant='filled'
                            type='text'
                            fullWidth
                            value={dataAddr.email_id}
                            onChange={handleTextChangeAddress}
                            name='email_id'
                          />

                          <Typography sx={{ margin: 1 }}>Phone </Typography>
                          <TextField
                            size='small'
                            variant='filled'
                            type='text'
                            fullWidth
                            value={dataAddr.phone}
                            onChange={handleTextChangeAddress}
                            name='phone'
                          />

                          <Typography sx={{ margin: 1 }}>Fax </Typography>
                          <TextField
                            size='small'
                            variant='filled'
                            type='text'
                            fullWidth
                            value={dataAddr.fax}
                            onChange={handleTextChangeAddress}
                            name='fax'
                          />

                          <Typography sx={{ margin: 1 }}>Tax Category </Typography>
                          <TextField
                            size='small'
                            variant='filled'
                            type='text'
                            fullWidth
                            value={dataAddr.tax_category}
                            onChange={handleTextChangeAddress}
                            name='tax_category'
                          />
                          <Grid item xs={12} sx={checkboxStyle}>
                            <Checkbox
                              checked={dataRow.is_primary_address === 1 ? true : false}
                              name='is_primary_address'
                              onChange={handleCheckboxChangeAddr}
                            />
                            <Typography variant='subtitle2'>Preferred Billing Address</Typography>
                          </Grid>
                          {/* <FormGroup>
                            
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={Preferred_Shipping_Addressn}
                                  onChange={handleChange}
                                  name='Preferred_Shipping_Addressn'
                                />
                              }
                              label='Preferred Shipping Addressn'
                            />

                            <FormControlLabel
                              control={<Checkbox checked={Disabled} onChange={handleChange} name='Disabled' />}
                              label='Disabled'
                            />
                          </FormGroup> */}
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Typography variant='h6'>Reference</Typography>

                          <FormControlLabel
                            sx={{ mt: 2 }}
                            control={<Checkbox checked={Boolean(dataRow[0]?.is_your_company_address) || false} />}
                            label='Is Your Company Address'
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Typography>links</Typography>
                          <DataGrid
                            rows={getDataContact.links}
                            columns={columns}
                            getRowId={row => row.name}
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
                      <Card sx={{ width: '100%', p: 5 }}>
                        <Typography variant=''>Add a comment:</Typography>
                        <TextField size='small' variant='filled' label='' multiline rows={8} fullWidth />
                      </Card>
                    </DialogContent>

                    <DialogActions>
                      <Button onClick={() => setIsOpenAddress(false)}>ยกเลิก</Button>
                      <Button onClick={handleSaveClickAddress}>บันทึก</Button>
                    </DialogActions>
                  </Dialog>
                </CardActions>
              </Card>
              {/* End Address Detail */}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Card>
                {/* sx={{ marginBottom: 3.25 }} */}
                <CardContent sx={{ width: '100%' }}>
                  <Typography variant='body2'>{dataContact.first_name}</Typography>
                  <Typography variant='body2'>{dataContact.email_id}</Typography>
                  <Typography variant='body2'>{dataContact.phone}</Typography>
                  <Typography variant='body2'>{dataContact.mobile_no}</Typography>
                  <Typography variant='body2'>{dataContact.address}</Typography>
                </CardContent>
                <CardActions className='card-action-dense'>
                  <Button onClick={handleEditClickContact}>แก้ไข</Button>
                  <Dialog
                    open={isOpenContact}
                    onClose={() => setIsOpenContact(false)}
                    PaperProps={{
                      style: {
                        width: '80%',
                        height: '80%',
                        margin: 0,
                        maxWidth: 'none',
                        maxHeight: 'none'
                      }
                    }}
                  >
                    <DialogTitle>Edit</DialogTitle>
                    <DialogContent sx={{ minWidth: 600, width: '100%', height: '100%' }}>
                      <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Typography sx={{ marginBottom: 2 }}>First Name</Typography>
                          <TextField
                            size='small'
                            variant='filled'
                            type='text'
                            fullWidth
                            value={dataContact.first_name}
                            onChange={handleTextChangeContact}
                            name='first_name'
                          />

                          <Typography sx={{ margin: 1 }}>Middle Name </Typography>
                          <TextField
                            size='small'
                            variant='filled'
                            type='text'
                            fullWidth
                            value={dataContact.middle_name}
                            onChange={handleTextChangeContact}
                            name='middle_name'
                          />

                          <Typography sx={{ margin: 1 }}>Last Name </Typography>
                          <TextField
                            size='small'
                            variant='filled'
                            type='text'
                            fullWidth
                            value={dataContact.last_name}
                            onChange={handleTextChangeContact}
                            name='last_name'
                          />

                          <Typography sx={{ margin: 1 }}>User Id </Typography>
                          <TextField
                            size='small'
                            variant='filled'
                            type='text'
                            fullWidth
                            value={dataContact.user}
                            onChange={handleTextChangeContact}
                            name='user'
                          />

                          <Typography sx={{ margin: 1 }}>Address</Typography>
                          <TextField
                            size='small'
                            variant='filled'
                            type='text'
                            fullWidth
                            value={dataContact.address}
                            onChange={handleTextChangeContact}
                            name='address'
                          />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Typography sx={{ marginBottom: 2 }}>{dataContact.status}</Typography>
                          <Autocomplete
                            sx={{ height: 50 }}
                            disablePortal
                            id='combo-box-demo'
                            options={top100Films}
                            fullWidth
                            renderInput={params => <TextField {...params} label='Movie' />}
                          />

                          <Typography sx={{ margin: 1 }}>Salutation </Typography>
                          <TextField
                            size='small'
                            variant='filled'
                            type='text'
                            fullWidth
                            value={dataContact.salutation}
                            onChange={handleTextChangeContact}
                            name='salutation'
                          />

                          <Typography sx={{ margin: 1 }}>Designation </Typography>
                          <TextField
                            size='small'
                            variant='filled'
                            type='text'
                            fullWidth
                            value={dataContact.designation}
                            onChange={handleTextChangeContact}
                            name='designation'
                          />

                          <Typography sx={{ margin: 1 }}>Gender </Typography>
                          <TextField
                            size='small'
                            variant='filled'
                            type='text'
                            fullWidth
                            value={dataContact.gender}
                            onChange={handleTextChangeContact}
                            name='gender'
                          />

                          <Typography sx={{ margin: 1 }}>Company Name </Typography>
                          <TextField
                            size='small'
                            variant='filled'
                            type='text'
                            fullWidth
                            value={dataContact.company_name}
                            onChange={handleTextChangeContact}
                            name='company_name'
                          />
                        </Grid>
                      </Grid>
                      <Grid>
                        <Box sx={{ display: 'flex', width: '100%' }}>
                          <FormGroup sx={{ width: '100%' }}>
                            <FormControlLabel
                              control={<Checkbox checked={isSynGoogle} onChange={handleSynGoogle} />}
                              variant='body2'
                              label='Sync with Google Contacts'
                              sx={{ ml: 0.2, width: '100%' }}
                            />
                            {isSynGoogle && (
                              <Grid>
                                <Grid>
                                  <Box sx={{ mt: 10, display: 'flex', width: '100%' }}>
                                    <Button size='small' variant='filled' label='' onClick={handleCollapseSynGoogle}>
                                      <Typography>Google Contacts</Typography>
                                    </Button>
                                    <Box>
                                      <CardActions className='card-action-dense'>
                                        <IconButton size='small' onClick={handleCollapseSynGoogle}>
                                          {collapseSynGoogle ? (
                                            <ChevronUp sx={{ fontSize: '1.875rem' }} />
                                          ) : (
                                            <ChevronDown sx={{ fontSize: '1.875rem' }} />
                                          )}
                                        </IconButton>
                                      </CardActions>
                                    </Box>
                                  </Box>
                                  <Grid>
                                    <Collapse in={collapseSynGoogle}>
                                      <Divider sx={{ margin: 0 }} />
                                      <CardContent>
                                        <Grid container spacing={3}>
                                          <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <Typography sx={{ margin: 1 }}>Google Contacts </Typography>
                                            <TextField
                                              fullWidth
                                              size='small'
                                              variant='filled'
                                              type='text'
                                              value={dataContact.google_contacts || ''}
                                              onChange={handleTextChangeContact}
                                              name='google_contacts'
                                            />
                                          </Grid>
                                          <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <FormControlLabel
                                              sx={{ mt: 2 }}
                                              control={
                                                <Checkbox
                                                  checked={
                                                    Boolean(dataContact[0]?.pulled_from_google_contacts) || false
                                                  }
                                                />
                                              }
                                              label='Pulled from Google Contacts'
                                            />
                                          </Grid>
                                        </Grid>
                                      </CardContent>
                                    </Collapse>
                                  </Grid>
                                </Grid>
                              </Grid>
                            )}
                          </FormGroup>
                        </Box>
                        <Grid container spacing={3} sx={{ mt: 5 }}>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant='h6'>Contact Details</Typography>

                            <Typography sx={{ mt: 4 }}>Email IDs</Typography>
                            <DataGrid
                              rows={getDataContact.email_ids}
                              columns={columnsEmail}
                              getRowId={row => row.name}
                              initialState={{
                                pagination: {
                                  paginationModel: { page: 0, pageSize: 5 }
                                }
                              }}
                              pageSizeOptions={[5, 10]}
                              checkboxSelection
                            />
                            <Button>ADD ROW</Button>
                          </Grid>
                        </Grid>
                        <Grid container spacing={3} sx={{ mt: 24 }}>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography sx={{ mt: 4 }}>Contact Numbers</Typography>
                            <DataGrid
                              rows={getDataContact.phone_nos}
                              columns={columnsPhone}
                              getRowId={row => row.name}
                              initialState={{
                                pagination: {
                                  paginationModel: { page: 0, pageSize: 5 }
                                }
                              }}
                              pageSizeOptions={[5, 10]}
                              checkboxSelection
                            />
                            <Button>ADD ROW</Button>
                          </Grid>
                        </Grid>
                        <Grid container spacing={3} sx={{ mt: 24 }}>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant='h6'>Reference</Typography>
                            <Typography sx={{ mt: 4 }}>links</Typography>
                            <DataGrid
                              rows={getDataContact.links}
                              columns={columnsContactLinks}
                              getRowId={row => row.name}
                              initialState={{
                                pagination: {
                                  paginationModel: { page: 0, pageSize: 5 }
                                }
                              }}
                              pageSizeOptions={[5, 10]}
                              checkboxSelection
                            />
                            <Button>ADD ROW</Button>
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              sx={{ mt: 26, display: 'flex', flexDirection: 'column' }}
                            >
                              <FormControlLabel
                                sx={{ mt: 2, ml: 2 }}
                                control={<Checkbox checked={Boolean(dataContact[0]?.is_primary_contact) || false} />}
                                label='Preferred Billing Address'
                              />
                              <FormControlLabel
                                sx={{ mt: 2, ml: 2 }}
                                control={<Checkbox checked={Boolean(dataContact[0]?.is_billing_contact) || false} />}
                                label='Preferred Billing Address'
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid container spacing={3} sx={{ mt: 10 }}>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Typography variant='h6'>More Information</Typography>
                            <Typography sx={{ mt: 4 }}>Department</Typography>
                            <TextField
                              size='small'
                              variant='filled'
                              type='text'
                              fullWidth
                              value={dataContact.department}
                              onChange={handleTextChangeContact}
                              name='department'
                            />
                            <FormControlLabel
                              sx={{ mt: 2, ml: 1 }}
                              control={<Checkbox checked={Boolean(dataContact[0]?.unsubscribed) || false} />}
                              label='Unsubscribed'
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setIsOpenContact(false)}>ยกเลิก</Button>
                      <Button onClick={handleSaveClickContact}>บันทึก</Button>
                    </DialogActions>
                  </Dialog>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          <CardHeader title='Primary Address and Contact' />
          <Grid>
            <Grid>
              {/* ////////////////////////////////////// แถวที่ 1 ///////////////////////////////////////////// */}
              <Grid container spacing={2} sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                <Grid item>
                  <Grid>
                    <Typography sx={{ margin: 1 }}>Customer Primary Contact</Typography>
                    <TextField
                      size='small'
                      variant='filled'
                      value={dataRow.customer_primary_contact}
                      fullWidth
                      multiline
                    />
                    <Typography sx={{ marginBottom: 2 }}>
                      Reselect, if the chosen contact is edited after save
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  {/* ////////////////////////////////////// แถวที่ 1 ///////////////////////////////////////////// */}
                  <Grid sx={{ mt: 4 }}>
                    <Typography sx={{ marginBottom: 2 }}>Customer Primary Address</Typography>
                    <TextField
                      size='small'
                      variant='filled'
                      label=''
                      value={dataRow.customer_primary_address}
                      fullWidth
                      multiline
                    />
                    <Typography sx={{ marginBottom: 2 }}>
                      Reselect, if the chosen address is edited after save
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className='card-action-dense'></CardActions>
      </Card>
    </Box>
  )
}

export default ContactAndAddress
