// ** React Import
import React from 'react'

import { useState } from 'react'

import { useEffect } from 'react'

// ** Mui Import
import {
  Grid,
  Card,
  TextField,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  CardMedia,
  Divider,
  IconButton,
  Collapse,
  FormGroup,
  CardHeader,
  CardContent,
  Button,
  DialogActions,
  FormControlLabel,
  Checkbox,
  CardActions
} from '@mui/material'

import DorpdownButton from 'src/components/Button/Dorpdown_Text/Dorpdown_text'

import axios from 'axios'

const ContactAndAddressPurchaseInvoice = ({ dataRow }) => {
  const [isOpenDetailAddress, setIsOpenDetailAddress] = useState(false)
  const [isOpenDetaiContact, setIsOpenCustomerAddress] = useState(false)
  const [internalCustomer, setInternalSupplier] = useState(false)
  const [moreInformation, setCurrencyPrice] = useState(false)

  const handleEditClickCustomerAddress = () => {
    setIsOpenCustomerAddress(true)
  }

  const handleSaveClickCustomerAddress = () => {
    setIsOpenCustomerAddress(false)
  }

  const handleEditClickAddress = () => {
    setIsOpenDetailAddress(true)
  }

  const handleSaveClickAddress = () => {
    setIsOpenDetailAddress(false)
  }

  const handleTextChange = event => {
    handleUpdateData(event.target.name, event.target.value)
  }

  const [state, setState] = React.useState({
    Preferred_Billing_Address: true,
    Preferred_Shipping_Addressn: false,
    Disabled: false
  })

  // const handleCheckboxChange = event => {
  //   console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
  // }

  const column = [
    { field: 'doctype', headerName: 'Link Document Typee *', width: 200 },
    {
      field: 'name',
      headerName: 'Link Name *',
      width: 250,
      renderCell: params => (
        <Button sx={{ color: 'black' }} onClick={() => handleEditLinkName(params.row)}>
          {dataCustomer[0]?.name}
        </Button>
      )
    },

    { field: 'customer_name', headerName: 'Link Title', width: 250 }
  ]

  const [isOpenEditLinkName, setIsOpenEditLinkName] = useState(false)
  const [linkName, setLinkName] = useState(null)

  const handleEditLinkName = row => {
    setLinkName(row)
    setIsOpenEditLinkName(true)
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

  const [dataAddress, setDataAddress] = useState('')
  const [dataCustomer, setDataCustomer] = useState([])
  const [dataContact, setsetDataContact] = useState(false)

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}Address?filters=[["Dynamic Link","link_name", "=", "${dataRow.title}"]]&fields=["*"]`,
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
        `${process.env.NEXT_PUBLIC_API_URL}Contact?filters=[["Dynamic Link","link_name", "=", "${dataRow.customer}"]]&fields=["*"]`,
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

  // useEffect(() => {
  //   console.log('Supplier', dataRow)
  // })
  // useEffect(() => {
  //   console.log('Address', dataAddress)
  // }, [dataAddress])
  // useEffect(() => {
  //   console.log('Customer', dataCustomer)
  // }, [dataCustomer])
  // useEffect(() => {
  //   console.log('dataContact', dataContact)
  // }, [dataContact])

  return (
    <Box>
      <Card sx={styles.card}>
        {/* ////////////////////////////////////// แถวที่ 1 ///////////////////////////////////////////// */}
        <Grid container spacing={3}>
          <CardHeader title='Supplier Address' />
          <Grid item xs={12}>
            <CardContent>
              <Typography sx={{ fontWeight: 'bold' }}>Select Supplier Address</Typography>
              <Card sx={{ padding: '16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                <Grid container justifyContent='flex-end'>
                  <table style={{ width: '100%', fontSize: '14px' }}>
                    <tbody dangerouslySetInnerHTML={{ __html: dataRow.address_display }} />
                  </table>
                  <Button onClick={handleEditClickAddress}>แก้ไข</Button>
                </Grid>
                <CardActions className='card-action-dense'>
                  <Dialog
                    open={isOpenDetailAddress}
                    onClose={handleSaveClickAddress}
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
                    {' '}
                    <DialogTitle>Edit Address</DialogTitle>
                    <DialogContent>
                      <Card sx={{ width: '100%', p: 5 }}>
                        <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Grid item sm={12} md={6} lg={6}>
                            <Typography sx={{ margin: 1 }}>Address Title</Typography>
                            <TextField
                              fullWidth
                              size='small'
                              variant='filled'
                              value={dataAddress[0]?.address_title || ''}
                              onChange={e => setAddressTitle(e.target.value)}
                            />

                            <Typography sx={{ marginBottom: 2 }}>Address Type</Typography>
                            <Box fullWidth>
                              <DorpdownButton />
                            </Box>

                            <Typography sx={{ margin: 1 }}>Address Line 1 </Typography>
                            <TextField
                              fullWidth
                              size='small'
                              variant='filled'
                              type='text'
                              value={dataAddress[0]?.address_line1 || ''}
                              onChange={e => setAddress_L1(e.target.value)}
                            />

                            <Typography sx={{ margin: 1 }}>Address Line 2 </Typography>
                            <TextField
                              fullWidth
                              size='small'
                              variant='filled'
                              type='text'
                              value={dataAddress[0]?.address_line2 || ''}
                              onChange={e => setAddress_L2(e.target.value)}
                            />

                            <Typography sx={{ margin: 1 }}>City/Town </Typography>
                            <TextField
                              fullWidth
                              size='small'
                              variant='filled'
                              type='text'
                              value={dataAddress[0]?.city || ''}
                              onChange={e => setCityTown(e.target.value)}
                            />

                            <Typography sx={{ margin: 1 }}>County </Typography>
                            <TextField
                              fullWidth
                              size='small'
                              variant='filled'
                              type='text'
                              value={dataAddress[0]?.county || ''}
                              onChange={e => setCounty(e.target.value)}
                            />

                            <Typography sx={{ margin: 1 }}>State/Province </Typography>
                            <TextField
                              fullWidth
                              size='small'
                              variant='filled'
                              type='text'
                              value={dataAddress[0]?.state || ''}
                              onChange={e => setStateProvince(e.target.value)}
                            />

                            <Typography sx={{ margin: 1 }}>County </Typography>
                            <TextField
                              fullWidth
                              size='small'
                              variant='filled'
                              type='text'
                              value={dataAddress[0]?.country || ''}
                              onChange={e => setCounty_E(e.target.value)}
                            />

                            <Typography sx={{ margin: 1 }}>Postal Code </Typography>
                            <TextField
                              fullWidth
                              size='small'
                              variant='filled'
                              type='text'
                              value={dataAddress[0]?.pincode || ''}
                              onChange={e => setPostalCode(e.target.value)}
                            />
                          </Grid>
                          <Grid item sm={12} md={6} lg={6}>
                            <Typography sx={{ marginBottom: 2 }}>Email Address</Typography>
                            <TextField
                              fullWidth
                              size='small'
                              variant='filled'
                              type='text'
                              value={dataAddress[0]?.email_id || ''}
                              onChange={e => setEmailAddress(e.target.value)}
                            />

                            <Typography sx={{ margin: 1 }}>Phone </Typography>
                            <TextField
                              fullWidth
                              size='small'
                              variant='filled'
                              type='text'
                              value={dataAddress[0]?.phone || ''}
                              onChange={e => setPhone(e.target.value)}
                            />

                            <Typography sx={{ margin: 1 }}>Fax </Typography>
                            <TextField
                              fullWidth
                              size='small'
                              variant='filled'
                              type='text'
                              value={dataAddress[0]?.fax || ''}
                              onChange={e => setFax(e.target.value)}
                            />

                            <Typography sx={{ margin: 1 }}>Tax Category </Typography>
                            <TextField
                              fullWidth
                              size='small'
                              variant='filled'
                              type='text'
                              value={dataAddress[0]?.tax_category || ''}
                              onChange={e => setTaxCategory(e.target.value)}
                            />
                          </Grid>
                        </Grid>
                      </Card>

                      <Card sx={{ width: '100%', p: 5 }}>
                        <Typography variant=''>Add a comment:</Typography>
                        <TextField size='small' variant='filled' label='' multiline rows={8} fullWidth />
                      </Card>

                      <DialogActions sx={{ m: 2, display: 'flex', justifyContent: 'end' }}>
                        <Button onClick={() => setIsOpenDetailAddress(false)}>ยกเลิก</Button>
                        <Button onClick={handleSaveClickAddress}>บันทึก</Button>
                      </DialogActions>
                    </DialogContent>
                  </Dialog>
                </CardActions>
              </Card>
            </CardContent>
          </Grid>
          <Grid item xs={12}>
            <CardContent>
              <Typography sx={{ fontWeight: 'bold' }}>Address</Typography>
              <Card sx={{ padding: '16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                <Typography variant='body2'>
                  {dataAddress[0]?.address_line1 && ` ${dataAddress[0]?.address_line1}`}
                </Typography>
              </Card>
              <Divider sx={{ margin: 0, my: 5 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography>Contact Person</Typography>
                    <TextField
                      fullWidth
                      disabled
                      variant='outlined'
                      name='contact_person'
                      value={dataRow?.contact_person || ''}
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography>Contact </Typography>
                    <TextField
                      fullWidth
                      disabled
                      variant='outlined'
                      name='contact_display'
                      value={dataRow?.contact_display || ''}
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={styles.box}>
                    <Typography>Territory</Typography>
                    <TextField
                      fullWidth
                      disabled
                      variant='outlined'
                      name='contact_mobile'
                      value={dataRow?.contact_mobile || ''}
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography>Contact Email</Typography>
                    <TextField
                      fullWidth
                      disabled
                      variant='outlined'
                      name='contact_email'
                      value={dataRow?.contact_email || ''}
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default ContactAndAddressPurchaseInvoice
