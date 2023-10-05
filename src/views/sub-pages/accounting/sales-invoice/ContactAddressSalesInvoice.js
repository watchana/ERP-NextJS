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
  CardActions,
  MenuItem,
  Select
} from '@mui/material'

import DorpdownButton from 'src/components/Button/Dorpdown_Text/Dorpdown_text'

import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import { ChevronDown, ChevronUp } from 'mdi-material-ui'
import SalesInvoice from 'src/pages/app/accounting/sales-invoice'
import { AddressType } from 'src/dummy/sub-pages/accounting/salesInvoice'

const ContactAddressSalesinvoice = ({ dataRow, handleUpdateData }) => {
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

  const handleClickInternalCustomer = () => {
    setInternalSupplier(!internalCustomer)
  }

  const handleClickMoreInformation = () => {
    setCurrencyPrice(!moreInformation)
  }

  const handleCheckboxChange = event => {
    setIsInternalSupplier(event.target.checked)
  }

  const [state, setState] = React.useState({
    Preferred_Billing_Address: true,
    Preferred_Shipping_Addressn: false,
    Disabled: false
  })

  const handleTextChange = event => {
    handleUpdateData(event.target.name, event.target.value)
  }

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

  const [dataAddress, setDataAddress] = useState('')
  const [dataCustomer, setDataCustomer] = useState([])
  const [isInternalCustomer, setIsInternalSupplier] = useState(false)

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}Address?filters=[["Dynamic Link","link_name", "=", "${dataRow.customer}"]]&fields=["*"]`,
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

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}Customer/${dataRow.customer}`, {
        headers: {
          Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
        }
      })
      .then(res => {
        const formattedData = [res.data.data]

        // กำหนดค่าให้ dataCustomer เป็น formattedData
        setDataCustomer(formattedData)
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
  // })
  // useEffect(() => {
  //   console.log('Customer', dataCustomer)
  // }, [dataCustomer])

  return (
    <Box>
      <Card sx={styles.card}>
        {/* ////////////////////////////////////// แถวที่ 1 ///////////////////////////////////////////// */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CardHeader title='Billing Address' />
            <CardContent>
              <Typography>Customer Address</Typography>
              <Card sx={{ padding: '16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                <Typography variant='body2'>
                  {dataAddress[0]?.address_line1 && ` ${dataAddress[0]?.address_line1}`}
                </Typography>
                <Grid container justifyContent='flex-end'>
                  <Button onClick={handleEditClickCustomerAddress}>แก้ไข</Button>
                </Grid>
              </Card>

              <CardActions className='card-action-dense'>
                <Dialog
                  open={isOpenDetaiContact}
                  onClose={() => setIsOpenCustomerAddress(false)}
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
                  <DialogTitle>Edit Address1</DialogTitle>
                  <DialogContent>
                    <Card sx={styles.card}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Box sx={styles.box}>
                            <Typography>Address Title</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='address_title'
                              value={dataAddress[0]?.address_title}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.BoxStyle}>
                            <Typography variant='subtitle2' sx={{ my: 2 }}>
                              Address Type
                            </Typography>
                            <Select
                              fullWidth
                              name='address_type'
                              value={dataAddress[0]?.address_type || ''}
                              onChange={handleSelectChange}
                              sx={{
                                backgroundColor: 'grey.100'
                              }}
                            >
                              {AddressType.map(salesinvoice => (
                                <MenuItem key={salesinvoice.id} value={salesinvoice.name}>
                                  {salesinvoice.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>Address Line 1 *</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='address_line1'
                              value={dataAddress[0]?.address_line1 || ''}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>Address Line 2 *</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='address_line2'
                              value={dataAddress[0]?.address_line2 || ''}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>City / Town</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='city'
                              value={dataAddress[0]?.city || ''}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>County</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='city'
                              value={dataAddress[0]?.county || ''}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>State / Province</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='state'
                              value={dataAddress[0]?.state || ''}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>Country</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='country'
                              value={dataAddress[0]?.country || ''}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Box sx={styles.box}>
                            <Typography>Postal Code</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='country'
                              value={dataAddress[0]?.pincode || ''}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Box sx={styles.box}>
                            <Typography>Email Address</Typography>
                            <TextField
                              fullWidth
                              variant='outlined'
                              name='email_id'
                              value={dataAddress[0]?.email_id || ''}
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
                              value={dataAddress[0]?.phone || ''}
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
                              value={dataAddress[0]?.fax || ''}
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
                              value={dataAddress[0]?.tax_category || ''}
                              onChange={handleTextChange}
                              sx={styles.textField}
                            />
                          </Box>

                          <Grid item sx={{ display: 'flex', flexDirection: 'column', mt: 5 }}>
                            <FormControlLabel
                              sx={{ mt: 2 }}
                              control={<Checkbox checked={Boolean(dataAddress[0]?.is_primary_address) || false} />}
                              label='Preferred Billing Address'
                            />
                            <FormControlLabel
                              sx={{ mt: 2 }}
                              control={<Checkbox checked={Boolean(dataAddress[0]?.is_shipping_address) || false} />}
                              label='Preferred Shipping Address'
                            />
                            <FormControlLabel
                              sx={{ mt: 2 }}
                              control={<Checkbox checked={Boolean(dataAddress[0]?.disabled) || false} />}
                              label='Disabled'
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Card>

                    <DataGrid
                      sx={{ width: 'full', mt: 6, height: 'auto' }}
                      rows={dataCustomer}
                      columns={column}
                      getRowId={row => row.name}
                    />

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
                      open={isOpenEditLinkName}
                      onClose={() => setIsOpenEditLinkName(false)}
                    >
                      <DialogTitle>Edit Data</DialogTitle>
                      <DialogContent>
                        {linkName && (
                          <Card sx={{ width: '100%', p: 5 }}>
                            <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                              <CardMedia
                                sx={{ height: '11.5rem', width: '11.5rem' }}
                                image='/images/img/logo_stk.png'
                              />
                              <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                  <Typography>Customer Name *</Typography>
                                  <TextField
                                    sx={{ marginBottom: 5 }}
                                    size='small'
                                    variant='filled'
                                    fullWidth
                                    value={linkName?.customer_name || ''}
                                  />

                                  <Typography>Customer Type *</Typography>
                                  <TextField
                                    sx={{ marginBottom: 5 }}
                                    size='small'
                                    variant='filled'
                                    fullWidth
                                    value={linkName?.customer_type || ''}
                                  />
                                  <Typography>Customer Grop *</Typography>
                                  <TextField
                                    sx={{ marginBottom: 5 }}
                                    size='small'
                                    variant='filled'
                                    fullWidth
                                    value={linkName?.customer_group || ''}
                                  />
                                  <Typography>Territory *</Typography>
                                  <TextField
                                    sx={{ marginBottom: 5 }}
                                    size='small'
                                    variant='filled'
                                    fullWidth
                                    value={linkName?.territory || ''}
                                  />
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                  <Typography>From Lead</Typography>
                                  <TextField
                                    sx={{ marginBottom: 5 }}
                                    size='small'
                                    variant='filled'
                                    fullWidth
                                    value={linkName?.lead_name || ''}
                                  />
                                  <Typography>From Opportunity</Typography>
                                  <TextField
                                    sx={{ marginBottom: 5 }}
                                    size='small'
                                    variant='filled'
                                    fullWidth
                                    value={linkName?.opportunity_name || ''}
                                  />
                                  <Typography>Account Manager</Typography>
                                  <TextField
                                    sx={{ marginBottom: 5 }}
                                    size='small'
                                    variant='filled'
                                    fullWidth
                                    value={linkName?.account_manager || ''}
                                  />
                                </Grid>
                              </Grid>
                              <Divider sx={{ margin: 0, my: 5, width: '100%', ml: 3 }} />

                              <Grid container>
                                <Typography size='small' sx={{ fontWeight: 'bold' }}>
                                  Defaults
                                </Typography>
                              </Grid>

                              <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                  <Typography>Billing Currency </Typography>
                                  <TextField
                                    sx={{ marginBottom: 5 }}
                                    size='small'
                                    variant='filled'
                                    fullWidth
                                    value={linkName?.default_currency || ''}
                                  />
                                  <Typography>Default Company Bank Account</Typography>
                                  <TextField
                                    sx={{ marginBottom: 5 }}
                                    size='small'
                                    variant='filled'
                                    fullWidth
                                    value={linkName?.default_bank_account || ''}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                  <Typography>Default Price List</Typography>
                                  <TextField
                                    sx={{ marginBottom: 5 }}
                                    size='small'
                                    variant='filled'
                                    fullWidth
                                    value={linkName?.default_price_list || ''}
                                  />
                                </Grid>
                              </Grid>
                              <Divider sx={{ margin: 0, my: 5, width: '100%', ml: 3 }} />
                              <Grid container>
                                <Box sx={{ width: '100%' }}>
                                  <Button
                                    sx={{ fontWeight: 'bold', p: 0 }}
                                    variant='filled'
                                    onClick={handleClickInternalCustomer}
                                  >
                                    Internal Customer
                                  </Button>
                                  <IconButton size='small' onClick={handleClickInternalCustomer}>
                                    {internalCustomer ? (
                                      <ChevronUp sx={{ fontSize: '1.875rem' }} />
                                    ) : (
                                      <ChevronDown sx={{ fontSize: '1.875rem' }} />
                                    )}
                                  </IconButton>
                                </Box>

                                <Collapse in={internalCustomer}>
                                  <Divider sx={{ margin: 0 }} />
                                  <CardContent>
                                    <FormGroup>
                                      <FormControlLabel
                                        control={
                                          <Checkbox checked={isInternalCustomer} onChange={handleCheckboxChange} />
                                        }
                                        variant='body2'
                                        label='Is Internal Customer'
                                      />
                                      {isInternalCustomer && (
                                        <TextField label='Represents Company *' variant='outlined' />
                                      )}
                                    </FormGroup>
                                  </CardContent>
                                </Collapse>
                              </Grid>
                              <Grid container sx={{ mb: 5 }}>
                                <Box sx={{ width: '100%' }}>
                                  <Button
                                    variant='filled'
                                    onClick={handleClickMoreInformation}
                                    sx={{ fontWeight: 'bold', p: 0 }}
                                  >
                                    More Information
                                  </Button>
                                  <IconButton size='small' onClick={handleClickMoreInformation}>
                                    {moreInformation ? (
                                      <ChevronUp sx={{ fontSize: '1.875rem' }} />
                                    ) : (
                                      <ChevronDown sx={{ fontSize: '1.875rem' }} />
                                    )}
                                  </IconButton>
                                </Box>

                                {/* /                   แสดงข่อมูลชุด ที่อยู่ในdopdown                               / */}
                                <Grid container>
                                  <Collapse in={moreInformation} width={'100%'} style={{ width: '100%' }}>
                                    <Divider sx={{ margin: 0, width: '100%' }} />
                                    <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
                                      <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <Typography>Market Segment</Typography>
                                        <TextField
                                          sx={{ marginBottom: 5 }}
                                          size='small'
                                          variant='filled'
                                          fullWidth
                                          value={linkName?.market_segment || ''}
                                        />
                                        <Typography>Industry</Typography>
                                        <TextField
                                          sx={{ marginBottom: 5 }}
                                          size='small'
                                          variant='filled'
                                          fullWidth
                                          value={linkName?.industry || ''}
                                        />
                                        <Typography>Website</Typography>
                                        <TextField
                                          sx={{ marginBottom: 5 }}
                                          size='small'
                                          variant='filled'
                                          fullWidth
                                          value={linkName?.website || ''}
                                        />
                                        <Typography>Print Language</Typography>
                                        <TextField
                                          sx={{ marginBottom: 5 }}
                                          size='small'
                                          variant='filled'
                                          fullWidth
                                          value={linkName?.language || ''}
                                        />
                                      </Grid>
                                      <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <CardContent sx={{ width: '100%' }}>
                                          <Card sx={{ p: 5 }}>
                                            <Typography style={styles.lineBreakText} variant='body2'>
                                              {dataCustomer[0]?.customer_details}
                                            </Typography>
                                          </Card>
                                        </CardContent>
                                      </Grid>
                                    </Grid>
                                  </Collapse>
                                </Grid>
                              </Grid>
                              <Divider sx={{ margin: 0, mb: 5 }} />
                            </Grid>
                          </Card>
                        )}
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => setIsOpenEditLinkName(false)}>Close</Button>
                        {/* เพิ่มปุ่ม "Save" เพื่อบันทึกการแก้ไข */}
                      </DialogActions>
                    </Dialog>

                    <Card sx={{ width: '100%', p: 5 }}>
                      <Typography variant=''>Add a comment:</Typography>
                      <TextField size='small' variant='filled' label='' multiline rows={8} fullWidth />
                    </Card>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setIsOpenCustomerAddress(false)}>ยกเลิก</Button>
                    <Button onClick={handleSaveClickCustomerAddress}>บันทึก</Button>
                  </DialogActions>
                </Dialog>
              </CardActions>

              <Typography>Address</Typography>
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
                  <Button onClick={handleEditClickAddress}>แก้ไข</Button>
                </Grid>
              </Card>
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
                        <Grid item xs={12} md={6}>
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
                      value={dataRow?.contact_person}
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography>Contact</Typography>
                    <TextField
                      fullWidth
                      disabled
                      variant='outlined'
                      name='contact_display'
                      value={dataRow?.contact_display}
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
                      name='territory'
                      value={dataRow?.territory}
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>
                </Grid>
              </Grid>

              {/* ////////////////////////////////////// แถวที่ 1 ///////////////////////////////////////////// */}
            </CardContent>
            <CardHeader title='Shipping Address' />
            <CardContent>
              <Typography>Customer Address</Typography>
              <Card sx={{ padding: '16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                <Typography variant='body2'>{dataAddress[0]?.name}</Typography>
              </Card>
              <Typography sx={{ mt: 5 }}>Shipping Address</Typography>
              <Card sx={{ padding: '16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                <CardContent sx={{ width: '100%' }}>
                  <Typography variant='body2'>{dataAddress[0]?.address_line1 || ''}</Typography>
                  <Typography variant='body2'>{dataAddress[0]?.pincode || ''}</Typography>
                  <Typography variant='body2'>{dataAddress[0]?.city || ''}</Typography>
                  <Typography variant='body2'>{dataAddress[0]?.state || ''}</Typography>
                  <Typography variant='body2'>{dataAddress[0]?.pincode || ''}</Typography>
                  <Typography variant='body2'>{dataAddress[0]?.country || ''}</Typography>
                  <Typography variant='body2'>Phone: {dataAddress[0]?.phone || ''} </Typography>
                  <Typography variant='body2'>Fax: {dataAddress[0]?.fax || ''} </Typography>
                  <Typography variant='body2'>Email: {dataAddress[0]?.email_id || ''}</Typography>
                </CardContent>
              </Card>

              <Grid item sx={12}>
                <Box sx={styles.box}>
                  <Typography>Dispatch Address Name</Typography>
                  <TextField
                    fullWidth
                    variant='outlined'
                    name='dispatch_address_name'
                    value={dataAddress[0]?.dispatch_address_name}
                    onChange={handleTextChange}
                    sx={styles.textField}
                  />
                </Box>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default ContactAddressSalesinvoice
