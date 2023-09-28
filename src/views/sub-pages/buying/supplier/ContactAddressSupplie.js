// ** React Import
import React, { useEffect, useState } from 'react'

// ** Mui Import
import {
  Grid,
  Card,
  TextField,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Select,
  MenuItem
} from '@mui/material'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DorpdownButton from 'src/components/Button/Dorpdown_Text/Dorpdown_text'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit'
import { ChevronDown, ChevronUp } from 'mdi-material-ui'
import { DataGrid } from '@mui/x-data-grid'

// ** data selection
import { AddressType, Status } from 'src/dummy/contentPages/supplierPage'

const Contact_Address = ({ dataRow, handleUpdateData }) => {
  const [age, setAge] = useState('')

  const handleTextChange = event => {
    handleUpdateData(event.target.name, event.target.value)
  }

  const handleCheckboxChange = event => {
    const { name } = event.target
    if (name === 'is_buying_supplier') {
      setValuationRateOpen(!valuationRateOpen)
    }
    handleUpdateData(name, event.target.checked === true ? 1 : 0)
  }

  useEffect(() => {
    console.log('dataRow', dataRow)
  }, [dataRow])

  const handleSelectChange = event => {
    handleUpdateData(event.target.name, event.target.value)
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

  const handleChanges = event => {
    setAge(event.target.value)
  }
  const [isOpenEditLinkAddress, setIsOpenEditLinkAddress] = useState(false)
  const [linkName, setLinkName] = useState(null)
  const [isOpenDetailAddress, setIsOpenDetailAddress] = useState(false)
  const [isOpenDetaiContact, setIsOpenDetailContact] = useState(false)
  const [isPopupOpen, setIsOpenEditLinkContact] = useState(false)
  const [address, setAddress] = useState('')

  const handleEditClickDetailAddress = () => {
    setIsOpenDetailAddress(true)
  }

  const handleSaveClickDetailAddress = () => {
    setIsOpenDetailAddress(false)
  }

  const handleEditClickDetailContact = () => {
    setIsOpenDetailContact(true)
  }

  const handleSaveClickDetailContact = () => {
    setIsOpenDetailContact(false)
  }

  const handleEditClickDetailLinkAddress = () => {
    setIsOpenEditLinkAddress(true)
  }

  const handleSaveClickDetailLinkAddress = () => {
    setIsOpenEditLinkAddress(false)
  }

  const [isHovered, setIsHovered] = useState(false)

  const handleEditClickDetailLinkContact = () => {
    setIsOpenEditLinkContact(true)
  }

  const handleSaveClickDetailLinkContact = () => {
    setIsOpenEditLinkContact(false)
  }

  const [state, setState] = React.useState({
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
  const { Preferred_Billing_Address, Preferred_Shipping_Addressn, Disabled } = state

  const column = [
    { field: 'link_doctype', headerName: 'Link Document Typee *', width: 200 },
    {
      field: 'link_name',
      headerName: 'Link Name *',
      width: 250,
      renderCell: params => (
        <Button sx={{ color: 'black' }} onClick={() => handleEditLinkName(params.row)}>
          {params.row.link_name}
        </Button>
      )
    },

    { field: 'link_title', headerName: 'Link Title', width: 250 }
  ]

  const handleEditLinkName = row => {
    setLinkName(row)
    setIsOpenEditLinkAddress(true)
  }

  const [dataAddress, setDataAddress] = useState('')
  const [dataContact, setDataContact] = useState('')
  const [dataSuppliers, setDataSuppliers] = useState('')
  const [dataDetailAddress, setDataDetailAddress] = useState('')

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}Address?filters=[["Dynamic Link","link_name", "=", "${dataRow.name}"]]&fields=["*"]`,
        {
          headers: {
            Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
          }
        }
      )
      .then(res => {
        setDataAddress(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })

    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}Contact?filters=[["Dynamic Link","link_name", "=", "${dataRow.name}"]]&fields=["*"]`,
        {
          headers: {
            Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
          }
        }
      )
      .then(res => {
        setDataContact(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [dataRow])

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}Address/${dataAddress[0]?.name}`, {
        headers: {
          Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
        }
      })
      .then(res => {
        setDataSuppliers(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [dataAddress])

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}Address?filters=[["name", "=", "123 ถนนเพชรบุรีตัดใหม่ แขวงสีลม เขตบางรัก กรุงเทพฯ 10120-Permanent-1"]]&fields=["*"]`,
        {
          headers: {
            Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
          }
        }
      )
      .then(res => {
        setDataDetailAddress(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    console.log('Supplier 2', dataSuppliers.links)
  })
  useEffect(() => {
    console.log('Address', dataAddress)
  }, [dataAddress])
  useEffect(() => {
    console.log('Contact', dataContact)
  })
  useEffect(() => {
    console.log('DetailAddress', dataDetailAddress)
  })

  return (
    <Box>
      <Card sx={styles.card}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CardHeader title='Address and Contacts' />
            <CardContent>
              <Card sx={{ padding: '16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                <Typography variant='body2'>
                  {dataAddress[0]?.address_line1 && ` ${dataAddress[0]?.address_line1}`}
                </Typography>
                <Typography variant='body2'>
                  {dataAddress[0]?.pincode && `Pincode: ${dataAddress[0]?.pincode}`}
                </Typography>
                <Typography variant='body2'>{dataAddress[0]?.city && ` ${dataAddress[0]?.city}`}</Typography>
                <Typography variant='body2'>{dataAddress[0]?.state && ` ${dataAddress[0]?.state}`}</Typography>
                <Typography variant='body2'>{dataAddress[0]?.country && ` ${dataAddress[0]?.country}`}</Typography>
                <Typography sx={{ mt: 5 }} variant='body2'>
                  {dataAddress[0]?.phone && `Phone: ${dataAddress[0]?.phone}`}
                </Typography>
                <Typography variant='body2'>{dataAddress[0]?.fax && `Fax: ${dataAddress[0]?.fax}`}</Typography>
                <Typography variant='body2'>
                  {dataAddress[0]?.email_id && `Email: ${dataAddress[0]?.email_id}`}
                </Typography>

                <Grid container justifyContent='flex-end'>
                  <Button onClick={handleEditClickDetailAddress}>แก้ไข</Button>
                </Grid>
              </Card>
              <CardActions className='card-action-dense'>
                <Dialog
                  open={isOpenDetailAddress}
                  onClose={handleSaveClickDetailAddress}
                  fullScreen
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
                  <DialogTitle>Edit Address</DialogTitle>
                  <DialogContent>
                    <Card sx={styles.card}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Box sx={styles.box}>
                            <Typography>Address Title</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='stock_uom'
                              value={dataAddress[0]?.address_title}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography variant='subtitle2' sx={{ my: 2 }}>
                              Pupplier Type
                            </Typography>
                            <Select
                              fullWidth
                              name='address_type'
                              value={dataRow.address_type}
                              onChange={handleSelectChange}
                              sx={{
                                backgroundColor: 'grey.100'
                              }}
                            >
                              {AddressType.map(supplier => (
                                <MenuItem key={supplier.id} value={supplier.name}>
                                  {supplier.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>Address Line 1 </Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='address_line1'
                              value={dataAddress[0]?.address_line1}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>Address Line 2</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='address_line2'
                              value={dataAddress[0]?.address_line2}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>City/Town</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='city'
                              value={dataAddress[0]?.city}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>County</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='county'
                              value={dataAddress[0]?.county}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>State/Province</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='state'
                              value={dataAddress[0]?.state}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>County</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='country'
                              value={dataAddress[0]?.country}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>Postal Code</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='pincode'
                              value={dataAddress[0]?.pincode}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>
                        </Grid>

                        <Grid item sm={12} md={6} lg={6}>
                          <Box sx={styles.box}>
                            <Typography>Email Address</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='email_id'
                              value={dataAddress[0]?.email_id}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>Phone</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='phone'
                              value={dataAddress[0]?.phone}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>Fax</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='fax'
                              value={dataAddress[0]?.fax}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>Tax Category</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='tax_category'
                              value={dataAddress[0]?.tax_category}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Grid container>
                            <Grid item xs={12} sm={6} md={12}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={Boolean(dataRow.is_primary_address)}
                                    name='Preferred Billing Address'
                                    onChange={handleCheckboxChange}
                                  />
                                }
                                label='Preferred Billing Address'
                              />
                            </Grid>

                            <Grid item xs={12} sm={6} md={12}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={Boolean(dataRow.is_shipping_addresss)}
                                    name='Preferred Shipping Address'
                                    onChange={handleCheckboxChange}
                                  />
                                }
                                label='Preferred Shipping Address'
                              />
                            </Grid>

                            <Grid item xs={12} sm={6} md={12}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={Boolean(dataRow.disabled)}
                                    name='Disabled'
                                    onChange={handleCheckboxChange}
                                  />
                                }
                                label='Disabled'
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Card>
                    <Card sx={styles.card}>
                      <DataGrid
                        sx={{ width: 'full', mt: 6, height: 'auto' }}
                        rows={dataSuppliers?.links}
                        columns={column}
                        getRowId={row => row.name}
                      />
                    </Card>

                    <Dialog
                      fullScreen
                      PaperProps={{
                        style: {
                          width: '80%',
                          height: '80%',
                          margin: 0,
                          maxWidth: 'none',
                          maxHeight: 'none'
                        }
                      }}
                      open={isOpenEditLinkAddress}
                      onClose={() => setIsOpenEditLinkAddress(false)}
                    >
                      <CardHeader title={dataAddress[0]?.address_title} />
                      <Divider sx={{ margin: 0, my: 5, width: '100%', ml: 3 }} />
                      <Typography variant='body1' sx={{ ml: 5 }}>
                        Address and Contacts
                      </Typography>
                      <CardContent sx={{ width: '100%' }}>
                        <Card sx={styles.card}>
                          <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                            <Grid item sm={12} md={6} lg={6}>
                              <Card
                                sx={{
                                  padding: '16px',
                                  border: '1px solid #ccc',
                                  borderRadius: '4px',
                                  backgroundColor: '#f9f9f9'
                                }}
                              >
                                <Typography variant='body2'>
                                  {dataAddress[0]?.address_line1 && ` ${dataAddress[0]?.address_line1}`}
                                </Typography>
                                <Typography variant='body2'>
                                  {dataAddress[0]?.pincode && `Pincode: ${dataAddress[0]?.pincode}`}
                                </Typography>
                                <Typography variant='body2'>
                                  {dataAddress[0]?.city && ` ${dataAddress[0]?.city}`}
                                </Typography>
                                <Typography variant='body2'>
                                  {dataAddress[0]?.state && ` ${dataAddress[0]?.state}`}
                                </Typography>
                                <Typography variant='body2'>
                                  {dataAddress[0]?.country && ` ${dataAddress[0]?.country}`}
                                </Typography>
                                <Typography sx={{ mt: 5 }} variant='body2'>
                                  {dataAddress[0]?.phone && `Phone: ${dataAddress[0]?.phone}`}
                                </Typography>
                                <Typography variant='body2'>
                                  {dataAddress[0]?.fax && `Fax: ${dataAddress[0]?.fax}`}
                                </Typography>
                                <Typography variant='body2'>
                                  {dataAddress[0]?.email_id && `Email: ${dataAddress[0]?.email_id}`}
                                </Typography>
                              </Card>
                            </Grid>
                            <Grid item sm={12} md={6} lg={6}>
                              <Card
                                sx={{
                                  padding: '16px',
                                  border: '1px solid #ccc',
                                  borderRadius: '4px',
                                  backgroundColor: '#f9f9f9'
                                }}
                              >
                                <Typography variant='body2'>{dataContact[0]?.first_name}</Typography>
                                <Typography variant='body2' sx={{ mt: 5 }}></Typography>
                                <Typography variant='body2'>{dataContact[0]?.address}</Typography>
                                <Typography variant='body2'>{dataContact[0]?.mobile_no}</Typography>
                                <Typography variant='body2'>{dataContact[0]?.email_id}</Typography>
                              </Card>
                            </Grid>
                          </Grid>
                        </Card>
                        <Divider sx={{ margin: 0, my: 5, width: '100%', ml: 3 }} />
                        <Card sx={styles.card}>
                          <Typography sx={{ fontWeight: 'bold' }}>Primary Address and Contact</Typography>

                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <Box sx={styles.box}>
                                <Typography>Supplier Primary Contact</Typography>
                                <TextField
                                  fullWidth
                                  variant='outlined'
                                  name='customer_name'
                                  value={linkName?.supplier_primary_contact || ''}
                                  onChange={handleTextChange}
                                  sx={styles.textField}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Box sx={styles.box}>
                                <Typography>Supplier Primary Address</Typography>
                                <TextField
                                  fullWidth
                                  variant='outlined'
                                  name='supplier_primary_address'
                                  value={linkName?.supplier_primary_address || ''}
                                  onChange={handleTextChange}
                                  sx={styles.textField}
                                />
                              </Box>
                            </Grid>
                          </Grid>
                        </Card>
                      </CardContent>

                      <DialogActions sx={{ m: 2, display: 'flex', justifyContent: 'end' }}>
                        <Button onClick={() => setIsOpenEditLinkAddress(false)}>ยกเลิก</Button>
                        <Button onClick={handleSaveClickDetailLinkAddress}>บันทึก</Button>
                      </DialogActions>
                    </Dialog>
                    <Card sx={{ width: '100%', p: 5 }}>
                      <Typography variant=''>Add a comment:</Typography>
                      <TextField size='small' variant='filled' label='' multiline rows={4} fullWidth />
                    </Card>

                    <DialogActions sx={{ m: 2, display: 'flex', justifyContent: 'end' }}>
                      <Button onClick={() => setIsOpenDetailAddress(false)}>ยกเลิก</Button>
                      <Button onClick={handleSaveClickDetailAddress}>บันทึก</Button>
                    </DialogActions>
                  </DialogContent>
                </Dialog>
              </CardActions>

              <Card sx={{ padding: '16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                <Typography variant='body2'>{dataContact[0]?.first_name}</Typography>
                <Typography variant='body2' sx={{ mt: 5 }}></Typography>
                <Typography variant='body2'>{dataContact[0]?.address}</Typography>
                <Typography variant='body2'>{dataContact[0]?.mobile_no}</Typography>
                <Typography variant='body2'>{dataContact[0]?.email_id}</Typography>

                <Grid container justifyContent='flex-end'>
                  <Button onClick={handleEditClickDetailContact}>แก้ไข</Button>
                </Grid>
              </Card>

              <CardActions className='card-action-dense'>
                <Dialog
                  open={isOpenDetaiContact}
                  onClose={() => setIsOpenDetailContact(false)}
                  fullScreen
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
                  <DialogContent>
                    <DialogTitle>Edit Contact</DialogTitle>
                    <Card sx={{ width: '100%', p: 5 }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Box sx={styles.box}>
                            <Typography>First Name</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='first_name'
                              value={dataContact[0]?.first_name}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>Middle Name </Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='middle_name'
                              value={dataContact[0]?.middle_name}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>Last Name </Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='last_name'
                              value={dataContact[0]?.last_name}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>Email Address </Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='email_id'
                              value={dataContact[0]?.email_id}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>User Id </Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='user'
                              value={dataContact[0]?.user}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>
                          <Box sx={styles.box}>
                            <Typography sx={{ margin: 1 }}>Address </Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='user'
                              sx={styles.textField}
                              value={dataContact[0]?.address}
                              onChange={e => setAddress(e.target.value)}
                              onMouseEnter={() => setIsHovered(true)}
                              onMouseLeave={() => setIsHovered(false)}
                              InputProps={{
                                endAdornment: dataContact[0]?.address && isHovered && (
                                  <IconButton onClick={handleEditClickDetailLinkContact} edge='end'>
                                    <EditIcon />
                                  </IconButton>
                                )
                              }}
                            />
                          </Box>
                          <Dialog open={isPopupOpen} onClose={handleSaveClickDetailLinkContact}>
                            <DialogTitle>Edit Address</DialogTitle>
                            <DialogContent>
                              <TextField
                                size='small'
                                variant='filled'
                                type='text'
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                fullWidth
                              />
                            </DialogContent>
                          </Dialog>
                          <Dialog
                            open={isPopupOpen}
                            onClose={handleSaveClickDetailLinkContact}
                            fullScreen
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
                            <DialogTitle>Edit Address</DialogTitle>
                            <DialogContent>
                              <Card sx={styles.card}>
                                <Grid container spacing={3}>
                                  <Grid item xs={12} md={6}>
                                    <Box sx={styles.box}>
                                      <Typography>Address Title</Typography>
                                      <TextField
                                        fullWidth
                                        variant='outlined'
                                        name='name'
                                        value={dataDetailAddress[0]?.name}
                                        onChange={handleTextChange}
                                        sx={styles.textField}
                                      />
                                    </Box>

                                    <Box sx={styles.box}>
                                      <Typography variant='subtitle2' sx={{ my: 2 }}>
                                        Pupplier Type
                                      </Typography>
                                      <Select
                                        fullWidth
                                        name='address_type'
                                        value={dataDetailAddress[0]?.address_type}
                                        onChange={handleSelectChange}
                                        sx={{
                                          backgroundColor: 'grey.100'
                                        }}
                                      >
                                        {AddressType.map(supplier => (
                                          <MenuItem key={supplier.id} value={supplier.name}>
                                            {supplier.name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </Box>

                                    <Box sx={styles.box}>
                                      <Typography>Address Line 1 </Typography>
                                      <TextField
                                        fullWidth
                                        variant='outlined'
                                        name='address_line1'
                                        value={dataDetailAddress[0]?.address_line1}
                                        onChange={handleTextChange}
                                        sx={styles.textField}
                                      />
                                    </Box>

                                    <Box sx={styles.box}>
                                      <Typography>Address Line 2 </Typography>
                                      <TextField
                                        fullWidth
                                        variant='outlined'
                                        name='address_line2'
                                        value={dataDetailAddress[0]?.address_line2}
                                        onChange={handleTextChange}
                                        sx={styles.textField}
                                      />
                                    </Box>

                                    <Box sx={styles.box}>
                                      <Typography>City/Town </Typography>
                                      <TextField
                                        fullWidth
                                        variant='outlined'
                                        name='city'
                                        value={dataDetailAddress[0]?.city}
                                        onChange={handleTextChange}
                                        sx={styles.textField}
                                      />
                                    </Box>

                                    <Box sx={styles.box}>
                                      <Typography>County </Typography>
                                      <TextField
                                        fullWidth
                                        variant='outlined'
                                        name='county'
                                        value={dataDetailAddress[0]?.county}
                                        onChange={handleTextChange}
                                        sx={styles.textField}
                                      />
                                    </Box>

                                    <Box sx={styles.box}>
                                      <Typography>State/Province </Typography>
                                      <TextField
                                        fullWidth
                                        variant='outlined'
                                        name='state'
                                        value={dataDetailAddress[0]?.state}
                                        onChange={handleTextChange}
                                        sx={styles.textField}
                                      />
                                    </Box>

                                    <Box sx={styles.box}>
                                      <Typography>County </Typography>
                                      <TextField
                                        fullWidth
                                        variant='outlined'
                                        name='county'
                                        value={dataDetailAddress[0]?.county}
                                        onChange={handleTextChange}
                                        sx={styles.textField}
                                      />
                                    </Box>

                                    <Box sx={styles.box}>
                                      <Typography>Country </Typography>
                                      <TextField
                                        fullWidth
                                        variant='outlined'
                                        name='country'
                                        value={dataDetailAddress[0]?.country}
                                        onChange={handleTextChange}
                                        sx={styles.textField}
                                      />
                                    </Box>

                                    <Box sx={styles.box}>
                                      <Typography>Postal Code </Typography>
                                      <TextField
                                        fullWidth
                                        variant='outlined'
                                        name='pincode'
                                        value={dataDetailAddress[0]?.pincode}
                                        onChange={handleTextChange}
                                        sx={styles.textField}
                                      />
                                    </Box>
                                  </Grid>
                                  <Grid item sm={12} md={6} lg={6}>
                                    <Box sx={styles.box}>
                                      <Typography>Email Address </Typography>
                                      <TextField
                                        fullWidth
                                        variant='outlined'
                                        name='email_id'
                                        value={dataDetailAddress[0]?.email_id}
                                        onChange={handleTextChange}
                                        sx={styles.textField}
                                      />
                                    </Box>

                                    <Box sx={styles.box}>
                                      <Typography>Phone </Typography>
                                      <TextField
                                        fullWidth
                                        variant='outlined'
                                        name='phone'
                                        value={dataDetailAddress[0]?.phone}
                                        onChange={handleTextChange}
                                        sx={styles.textField}
                                      />
                                    </Box>

                                    <Box sx={styles.box}>
                                      <Typography>Fax </Typography>
                                      <TextField
                                        fullWidth
                                        variant='outlined'
                                        name='fax'
                                        value={dataDetailAddress[0]?.fax}
                                        onChange={handleTextChange}
                                        sx={styles.textField}
                                      />
                                    </Box>

                                    <Box sx={styles.box}>
                                      <Typography>Tax Category </Typography>
                                      <TextField
                                        fullWidth
                                        variant='outlined'
                                        name='tax_category'
                                        value={dataDetailAddress[0]?.tax_category}
                                        onChange={handleTextChange}
                                        sx={styles.textField}
                                      />
                                    </Box>

                                    <FormGroup>
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked={Preferred_Billing_Address}
                                            onChange={handleChange}
                                            name='Preferred_Billing_Address'
                                          />
                                        }
                                        label='Preferred Billing Address'
                                      />
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
                                        control={
                                          <Checkbox
                                            checked={Disabled}
                                            onChange={handleChange}
                                            name='Preferred Billing Address'
                                          />
                                        }
                                        label='Disabled'
                                      />
                                    </FormGroup>
                                  </Grid>
                                </Grid>
                              </Card>
                              <Card sx={{ width: '100%', p: 5 }}>
                                <Typography variant=''>Add a comment:</Typography>
                                <TextField size='small' variant='filled' label='' multiline rows={4} fullWidth />
                              </Card>

                              <DialogActions sx={{ m: 2, display: 'flex', justifyContent: 'end' }}>
                                <Button onClick={() => setIsOpenEditLinkContact(false)}>ยกเลิก</Button>
                                <Button onClick={handleSaveClickDetailLinkContact}>บันทึก</Button>
                              </DialogActions>
                            </DialogContent>
                          </Dialog>
                        </Grid>

                        <Grid item sm={12} md={6}>
                          <Box sx={styles.box}>
                            <Typography>Status </Typography>
                            <Select
                              fullWidth
                              variant='outlined'
                              name='status'
                              value={dataAddress[0]?.status}
                              onChange={handleSelectChange}
                              sx={styles.textField}
                            >
                              {Status.map(supplier => (
                                <MenuItem key={supplier.id} value={supplier.name}>
                                  {supplier.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>Salutation</Typography>
                            <TextField
                              fullWidth
                              disabled
                              variant='outlined'
                              name='salutation'
                              value={dataContact[0]?.salutation}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>Designation</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='designation'
                              value={dataContact[0]?.designation}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>Gender</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='gender'
                              value={dataContact[0]?.gender}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>Mobile No</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='mobile_no'
                              value={dataContact[0]?.mobile_no}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>Company Name</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='companyName'
                              value={dataContact[0]?.companyName}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Card>
                    <Card sx={{ width: '100%', p: 5 }}>
                      <Typography variant=''>Add a comment:</Typography>
                      <TextField size='small' variant='filled' label='' multiline rows={4} fullWidth />
                    </Card>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setIsOpenDetailContact(false)}>ยกเลิก</Button>
                    <Button onClick={handleSaveClickDetailContact}>บันทึก</Button>
                  </DialogActions>
                </Dialog>
              </CardActions>

              <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
              <CardHeader title='Primary Address and Contact' />

              {/* ////////////////////////////////////// แถวที่ 1 ///////////////////////////////////////////// */}

              <Box sx={styles.box}>
                <Typography>Supplier Primary Contact</Typography>
                <TextField
                  fullWidth
                  variant='outlined'
                  name='supplier_primary_contact'
                  value={dataRow.supplier_primary_contact}
                  onChange={handleTextChange}
                  sx={styles.textField}
                />
                <Typography>Reselect, if the chosen contact is edited after save</Typography>
              </Box>
              <Box sx={styles.box}>
                <Typography>Mobile No</Typography>
                <TextField
                  fullWidth
                  disabled
                  variant='outlined'
                  name='mobile_no'
                  value={dataRow.mobile_no}
                  onChange={handleTextChange}
                  sx={styles.textField}
                />
              </Box>
              <Box sx={styles.box}>
                <Typography>Email Id</Typography>
                <TextField
                  fullWidth
                  disabled
                  variant='outlined'
                  name='email_id'
                  value={dataRow.email_id}
                  onChange={handleTextChange}
                  sx={styles.textField}
                />
              </Box>

              <Box sx={styles.box}>
                <Typography>Supplier Primary Address</Typography>
                <TextField
                  fullWidth
                  disabled
                  variant='outlined'
                  name='supplier_primary_address'
                  value={dataRow.supplier_primary_address}
                  onChange={handleTextChange}
                  sx={styles.textField}
                />
              </Box>
              <Box sx={styles.box}>
                {dataRow.primary_address && <Typography>Primary Address</Typography>}
                {dataRow.primary_address ? (
                  <Card>
                    <div
                      style={{
                        width: '100%',
                        fontSize: '14px',
                        textAlign: 'left',
                        padding: '16px', // กำหนดระยะขอบของข้อมูล
                        border: '1px solid #ccc', // เพิ่มกรอบข้อมูล
                        borderRadius: '4px', // กำหนดมุมขอบข้อมูล
                        backgroundColor: '#f9f9f9' // กำหนดสีพื้นหลัง
                      }}
                      dangerouslySetInnerHTML={{ __html: dataRow.primary_address }}
                    />
                  </Card>
                ) : null}
              </Box>
            </CardContent>
            <CardActions className='card-action-dense'></CardActions>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default Contact_Address
