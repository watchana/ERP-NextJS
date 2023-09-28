// ** React Import
import React, { useEffect, useState } from 'react'

// ** Mui Import
import {
  Box,
  TextField,
  Typography,
  Checkbox,
  Button,
  CardActions,
  Divider,
  CardContent,
  FormGroup,
  FormControlLabel,
  Grid,
  Card,
  CardHeader,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import Collapse from '@mui/material/Collapse'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import IconButton from '@mui/material/IconButton'

const DetailCustomer = ({ dataRow, setDataRow }) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  const [collapseInternal, setCollapseInternal] = useState(false)
  const [collapseMarket, setCollapseSecMarket] = useState(false)
  const [dataCustomerType, setDataCustomerType] = useState(false)

  const handleChange = event => {
    setDataCustomerType(event.target.value)
  }

  const handleClickMarket = () => {
    setCollapseSecMarket(!collapseMarket)
  }

  const [isCompanyCheck, setIsCompanyCheck] = useState(false)

  const handleClickInternal = () => {
    setCollapseInternal(!collapseInternal)
  }

  const handleCompanyCheck = event => {
    setIsCompanyCheck(event.target.checked)
  }

  const handleTextChange = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setDataRow({ ...dataRow, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    console.log('data', dataRow)
  }, [dataRow])

  const companyType = [{ label: 'Company' }, { label: 'Individual' }]

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
      <Card sx={styles.card}>
        <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Typography>Customer Name</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              size='small'
              variant='filled'
              value={dataRow.customer_name || ''}
              onChange={handleTextChange}
              name='customer_name'
              fullWidth
            />
            <Typography>Customer Type</Typography>
            <FormControl variant='filled' fullWidth size='small' sx={{ minHeight: 26 }}>
              <InputLabel id='demo-simple-select-filled-label'></InputLabel>
              <Select
                sx={{ marginBottom: 5 }}
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                value={dataCustomerType}
                onChange={handleChange}
              >
                <MenuItem value={10}>Billing</MenuItem>
                <MenuItem value={20}>Shipping</MenuItem>
              </Select>
            </FormControl>

            <Typography>Customer Group</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              size='small'
              variant='filled'
              label=''
              onChange={handleTextChange}
              value={dataRow.customer_group || ''}
              name='customer_group'
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Typography>Territory</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              size='small'
              variant='filled'
              label=''
              value={dataRow.territory || ''}
              onChange={handleTextChange}
              name='territory'
              fullWidth
            />
            <Typography>From Lead</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              size='small'
              variant='filled'
              label=''
              value={dataRow.lead_name || ''}
              onChange={handleTextChange}
              name='lead_name'
              fullWidth
            />
            <Typography>From Opportunity</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              size='small'
              variant='filled'
              label=''
              value={dataRow.opportunity_name || ''}
              onChange={handleTextChange}
              name='opportunity_name'
              fullWidth
            />
            <Typography>Account Manager</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              size='small'
              variant='filled'
              label=''
              value={dataRow.account_manager || ''}
              onChange={handleTextChange}
              name='account_manager'
              fullWidth
            />
          </Grid>
        </Grid>
        <Divider sx={{ margin: 0, mb: 5 }} />
        <Typography sx={{ fontWeight: 'bold', my: 6 }}> Description</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Typography>Billing Currency</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              size='small'
              variant='filled'
              label=''
              value={dataRow.default_currency || ''}
              onChange={handleTextChange}
              name='default_currency'
              fullWidth
            />
            <Typography>Default Price List</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              size='small'
              variant='filled'
              label=''
              value={dataRow.default_price_list || ''}
              onChange={handleTextChange}
              name='default_price_list'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Typography>Default Company Bank Account</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              size='small'
              variant='filled'
              label=''
              value={dataRow.default_bank_account || ''}
              onChange={handleTextChange}
              name='default_bank_account'
              fullWidth
            />
          </Grid>
        </Grid>

        <Divider sx={{ margin: 0, mb: 5 }} />

        <Grid container sx={{ mb: 5 }}>
          <Box sx={{ width: '100%' }}>
            <Button sx={{ fontWeight: 'bold', p: 0 }} size='small' variant='filled' onClick={handleClickInternal}>
              Internal Customer
            </Button>
            <IconButton size='small' onClick={handleClickInternal}>
              {collapseInternal ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </IconButton>
          </Box>

          <Grid container>
            <Collapse in={collapseInternal} width={'100%'} style={{ width: '100%' }}>
              <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={isCompanyCheck} onChange={handleCompanyCheck} />}
                      variant='body2'
                      label='Is Your Company Address'
                    />
                    {isCompanyCheck && (
                      <Grid>
                        <Typography>Represents Company *</Typography>
                        <TextField
                          sx={{ marginBottom: 5 }}
                          label=''
                          variant='outlined'
                          fullWidth
                          size='small'
                          value={dataRow.represents_company || ''}
                          onChange={handleTextChange}
                          name='represents_company'
                        />
                      </Grid>
                    )}
                  </FormGroup>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Grid>

        <Grid container sx={{ mb: 5 }}>
          <Grid sx={{ width: '100%' }}>
            <Button variant='filled' onClick={handleClickMarket} sx={{ fontWeight: 'bold', p: 0 }}>
              More Infomation
            </Button>
            <IconButton size='small' onClick={handleClickMarket}>
              {collapseMarket ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </IconButton>

            <Grid container>
              <Collapse in={collapseMarket} width={'100%'} style={{ width: '100%' }}>
                <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography>Market Segment</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      label=''
                      value={dataRow.market_segment}
                      onChange={handleTextChange}
                      name='market_segment'
                      fullWidth
                    />

                    <Typography>industry</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      label=''
                      value={dataRow.industry}
                      onChange={handleTextChange}
                      name='industry'
                      fullWidth
                    />

                    <Typography>Website</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      label=''
                      value={dataRow.website}
                      onChange={handleTextChange}
                      name='website'
                      fullWidth
                    />

                    <Typography>Print Language</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      label=''
                      value={dataRow.language}
                      onChange={handleTextChange}
                      name='language'
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography>Customer Details</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      multiline
                      rows={13}
                      fullWidth
                      value={dataRow.customer_details}
                      onChange={handleTextChange}
                      name='customer_details'
                    />
                    <Typography variant='subtitle2'>Additional information regarding the customer.</Typography>
                  </Grid>
                </Grid>
              </Collapse>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default DetailCustomer
