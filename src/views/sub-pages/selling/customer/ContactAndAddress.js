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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'

import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import { ChevronDown, ChevronUp } from 'mdi-material-ui'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ContactAndAddress = ({ dataRow, setDataRow, handleUpdateData }) => {
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

  const [dataAddr, setDataAddr] = useState({})
  const [dataContact, setDataContact] = useState('')
  const [getDataLinks, setGetDataLinks] = useState([])
  const [getDataContact, setGetDataContact] = useState([])

  // const handleChangeAddress = event => {
  //   setDataAddr(event.target.value)
  // }

  // const handleChangeContact = event => {
  //   setDataContact(event.target.value)
  // }

  const checkboxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }

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
    setDataAddr({ ...dataAddr, [event.target.name]: event.target.checked === true ? 1 : 0 })
  }

  const handleCheckboxChangeCont = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
    setDataContact({ ...dataContact, [event.target.name]: event.target.checked === true ? 1 : 0 })
  }

  const handleTextChangeAddress = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setDataAddr({ ...dataAddr, [event.target.name]: event.target.value })
  }

  const handleTextChangeContact = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setDataContact({ ...dataContact, [event.target.name]: event.target.value })
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
                    <DialogContent>
                      <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Box sx={styles.box}>
                            <Typography sx={{ margin: 1 }}>Address Title</Typography>
                            <TextField
                              sx={styles.textField}
                              variant='outlined'
                              value={dataAddr.address_title}
                              fullWidth
                              onChange={handleTextChangeAddress}
                              name='address_title'
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography sx={{ marginBottom: 1 }}>Address Type</Typography>
                            <FormControl variant='outlined' fullWidth sx={styles.textField}>
                              <InputLabel id='demo-simple-select-filled-label'></InputLabel>
                              <Select
                                labelId='demo-simple-select-filled-label'
                                id='demo-simple-select-filled'
                                // value={age}
                                // onChange={handleChangeAddress}
                              >
                                <MenuItem value={1}>Billing</MenuItem>
                                <MenuItem value={2}>Shipping</MenuItem>
                                <MenuItem value={3}>Office</MenuItem>
                                <MenuItem value={4}>Personal</MenuItem>
                                <MenuItem value={5}>Plant</MenuItem>
                                <MenuItem value={6}>Postal</MenuItem>
                                <MenuItem value={7}>Shop</MenuItem>
                                <MenuItem value={8}>Subsidiary</MenuItem>
                                <MenuItem value={9}>Warehouse</MenuItem>
                                <MenuItem value={10}>Current</MenuItem>
                                <MenuItem value={11}>Permanent</MenuItem>
                                <MenuItem value={12}>Other</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>

                          <Box sx={styles.box}>
                            <Typography sx={{ margin: 1 }}>Address Line 1 </Typography>
                            <TextField
                              sx={styles.textField}
                              variant='outlined'
                              type='text'
                              fullWidth
                              value={dataAddr.address_line1}
                              onChange={handleTextChangeAddress}
                              name='address_line1'
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography sx={{ margin: 1 }}>Address Line 2 </Typography>
                            <TextField
                              sx={styles.textField}
                              variant='outlined'
                              type='text'
                              fullWidth
                              value={dataAddr.address_line2}
                              onChange={handleTextChangeAddress}
                              name='address_line2'
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography sx={{ margin: 1 }}>City/Town </Typography>
                            <TextField
                              sx={styles.textField}
                              variant='outlined'
                              type='text'
                              fullWidth
                              value={dataAddr.city}
                              onChange={handleTextChangeAddress}
                              name='city'
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography sx={{ margin: 1 }}>County </Typography>
                            <TextField
                              sx={styles.textField}
                              variant='outlined'
                              type='text'
                              fullWidth
                              value={dataAddr.county}
                              onChange={handleTextChangeAddress}
                              name='county'
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography sx={{ margin: 1 }}>State/Province </Typography>
                            <TextField
                              sx={styles.textField}
                              variant='outlined'
                              type='text'
                              fullWidth
                              value={dataAddr.state}
                              onChange={handleTextChangeAddress}
                              name='state'
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography sx={{ margin: 1 }}>Country </Typography>
                            <TextField
                              sx={styles.textField}
                              variant='outlined'
                              type='text'
                              fullWidth
                              value={dataAddr.country}
                              onChange={handleTextChangeAddress}
                              name='country'
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography sx={{ margin: 1 }}>Postal Code </Typography>
                            <TextField
                              sx={styles.textField}
                              variant='outlined'
                              type='text'
                              fullWidth
                              value={dataAddr.pincode}
                              onChange={handleTextChangeAddress}
                              name='pincode'
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Box sx={styles.box}>
                            <Typography sx={{ margin: 1 }}>Email Address</Typography>
                            <TextField
                              sx={styles.textField}
                              variant='outlined'
                              type='text'
                              fullWidth
                              value={dataAddr.email_id}
                              onChange={handleTextChangeAddress}
                              name='email_id'
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography sx={{ margin: 1 }}>Phone </Typography>
                            <TextField
                              sx={styles.textField}
                              variant='outlined'
                              type='text'
                              fullWidth
                              value={dataAddr.phone}
                              onChange={handleTextChangeAddress}
                              name='phone'
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography sx={{ margin: 1 }}>Fax </Typography>
                            <TextField
                              sx={styles.textField}
                              variant='outlined'
                              type='text'
                              fullWidth
                              value={dataAddr.fax}
                              onChange={handleTextChangeAddress}
                              name='fax'
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography sx={{ margin: 1 }}>Tax Category </Typography>
                            <TextField
                              sx={styles.textField}
                              variant='outlined'
                              type='text'
                              fullWidth
                              value={dataAddr.tax_category}
                              onChange={handleTextChangeAddress}
                              name='tax_category'
                            />
                          </Box>

                          <Grid sx={checkboxStyle}>
                            <Checkbox
                              checked={dataAddr.is_primary_address === 1 ? true : false}
                              name='is_primary_address'
                              onChange={handleCheckboxChangeAddr}
                            />
                            <Typography variant='subtitle2'>Preferred Billing Address</Typography>
                          </Grid>

                          <Grid sx={checkboxStyle}>
                            <Checkbox
                              checked={dataAddr.is_shipping_address === 1 ? true : false}
                              name='is_shipping_address'
                              onChange={handleCheckboxChangeAddr}
                            />
                            <Typography variant='subtitle2'>Preferred Shipping Address</Typography>
                          </Grid>
                          <Grid sx={checkboxStyle}>
                            <Checkbox
                              checked={dataAddr.disabled === 1 ? true : false}
                              name='disabled'
                              onChange={handleCheckboxChangeAddr}
                            />
                            <Typography variant='subtitle2'>Disabled</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={6} lg={6} sx={{ mt: 6 }}>
                          <Typography variant='h6'>Reference</Typography>

                          <Grid sx={checkboxStyle}>
                            <Checkbox
                              checked={dataAddr.is_your_company_address === 1 ? true : false}
                              name='is_your_company_address'
                              onChange={handleCheckboxChangeAddr}
                            />
                            <Typography variant='subtitle2'>Is Your Company Address</Typography>
                          </Grid>
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
                          <Box sx={styles.box}>
                            <Typography sx={{ marginBottom: 1 }}>First Name</Typography>
                            <TextField
                              sx={styles.textField}
                              variant='outlined'
                              type='text'
                              fullWidth
                              value={dataContact.first_name}
                              onChange={handleTextChangeContact}
                              name='first_name'
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography sx={{ margin: 1 }}>Middle Name </Typography>
                            <TextField
                              sx={styles.textField}
                              variant='outlined'
                              type='text'
                              fullWidth
                              value={dataContact.middle_name}
                              onChange={handleTextChangeContact}
                              name='middle_name'
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography sx={{ margin: 1 }}>Last Name </Typography>
                            <TextField
                              sx={styles.textField}
                              variant='outlined'
                              type='text'
                              fullWidth
                              value={dataContact.last_name}
                              onChange={handleTextChangeContact}
                              name='last_name'
                            />
                          </Box>
                          <Box sx={styles.box}>
                            <Typography sx={{ margin: 1 }}>User Id </Typography>
                            <TextField
                              sx={styles.textField}
                              variant='outlined'
                              type='text'
                              fullWidth
                              value={dataContact.user}
                              onChange={handleTextChangeContact}
                              name='user'
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography sx={{ margin: 1 }}>Address</Typography>
                            <TextField
                              sx={styles.textField}
                              variant='outlined'
                              type='text'
                              fullWidth
                              value={dataContact.address}
                              onChange={handleTextChangeContact}
                              name='address'
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Box sx={styles.box}>
                            <Typography sx={{ marginBottom: 1 }}>Status</Typography>
                            <FormControl variant='outlined' fullWidth sx={styles.textField}>
                              <InputLabel id='demo-simple-select-filled-label'></InputLabel>
                              <Select
                                labelId='demo-simple-select-filled-label'
                                id='demo-simple-select-filled'
                                // value={age}
                                // onChange={handleChangeContact}
                              >
                                <MenuItem value={1}>Passive</MenuItem>
                                <MenuItem value={2}>Open</MenuItem>
                                <MenuItem value={3}>Replied</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>

                          <Box sx={styles.box}>
                            <Typography sx={{ margin: 1 }}>Salutation </Typography>
                            <TextField
                              sx={styles.textField}
                              variant='outlined'
                              type='text'
                              fullWidth
                              value={dataContact.salutation}
                              onChange={handleTextChangeContact}
                              name='salutation'
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography sx={{ margin: 1 }}>Designation </Typography>
                            <TextField
                              sx={styles.textField}
                              variant='outlined'
                              type='text'
                              fullWidth
                              value={dataContact.designation}
                              onChange={handleTextChangeContact}
                              name='designation'
                            />
                          </Box>
                          <Box sx={styles.box}>
                            <Typography sx={{ margin: 1 }}>Gender </Typography>
                            <TextField
                              sx={styles.textField}
                              variant='outlined'
                              type='text'
                              fullWidth
                              value={dataContact.gender}
                              onChange={handleTextChangeContact}
                              name='gender'
                            />
                          </Box>
                          <Box sx={styles.box}>
                            <Typography sx={{ margin: 1 }}>Company Name </Typography>
                            <TextField
                              sx={styles.textField}
                              variant='outlined'
                              type='text'
                              fullWidth
                              value={dataContact.company_name}
                              onChange={handleTextChangeContact}
                              name='company_name'
                            />
                          </Box>
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
                                <Box>
                                  <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                      <Typography sx={{ fontWeight: 'bold', p: 0 }}>Google Contacts</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
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

                                        <Grid item xs={12} sm={12} md={6} lg={6} sx={{ mt: 4 }}>
                                          <Grid sx={checkboxStyle}>
                                            <Checkbox
                                              checked={dataContact.pulled_from_google_contacts === 1 ? true : false}
                                              name='pulled_from_google_contacts'
                                              onChange={handleCheckboxChangeCont}
                                            />
                                            <Typography variant='subtitle2'>Pulled from Google Contacts</Typography>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </AccordionDetails>
                                  </Accordion>
                                </Box>

                                <Divider sx={{ margin: 0 }} />
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
                              <Grid sx={checkboxStyle}>
                                <Checkbox
                                  checked={dataContact.is_primary_contact === 1 ? true : false}
                                  name='is_primary_contact'
                                  onChange={handleCheckboxChangeCont}
                                />
                                <Typography variant='subtitle2'>Is Primary Contact</Typography>
                              </Grid>

                              <Grid sx={checkboxStyle}>
                                <Checkbox
                                  checked={dataContact.is_billing_contact === 1 ? true : false}
                                  name='is_billing_contact'
                                  onChange={handleCheckboxChangeCont}
                                />
                                <Typography variant='subtitle2'>Is Billing Contact</Typography>
                              </Grid>
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
                            <Grid sx={checkboxStyle}>
                              <Checkbox
                                checked={dataContact.unsubscribed === 1 ? true : false}
                                name='unsubscribed'
                                onChange={handleCheckboxChangeCont}
                              />
                              <Typography variant='subtitle2'>Unsubscribed</Typography>
                            </Grid>
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
                    <Box sx={styles.box}>
                      <Typography sx={{ margin: 1 }}>Customer Primary Contact</Typography>
                      <TextField
                        sx={styles.TextField}
                        variant='outlined'
                        onChange={handleTextChangeContact}
                        name='customer_primary_contact'
                        fullWidth
                        multiline
                      />
                      <Typography sx={{ marginBottom: 2 }}>
                        Reselect, if the chosen contact is edited after save
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item>
                  {/* ////////////////////////////////////// แถวที่ 1 ///////////////////////////////////////////// */}
                  <Grid sx={{ mt: 4 }}>
                    <Box sx={styles.box}>
                      <Typography sx={{ marginBottom: 2 }}>Customer Primary Address</Typography>
                      <TextField
                        sx={styles.TextField}
                        variant='outlined'
                        label=''
                        onChange={handleTextChangeAddress}
                        name='customer_primary_address'
                        fullWidth
                        multiline
                      />
                      <Typography sx={{ marginBottom: 2 }}>
                        Reselect, if the chosen address is edited after save
                      </Typography>
                    </Box>
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
