// ** React Import
import React, { useEffect, useState } from 'react'

// ** Mui Import
import {
  Box,
  TextField,
  Typography,
  Checkbox,
  Divider,
  CardContent,
  FormGroup,
  FormControlLabel,
  Grid,
  Card,
  CardHeader,
  Autocomplete,
  FormControl,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const DetailCustomer = ({ dataRow, setDataRow, handleUpdateData }) => {
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
    handleUpdateData(event.target.name, event.target.value)
  }

  useEffect(() => {
    console.log('data', dataRow)
  }, [dataRow])

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
          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography>Customer Name</Typography>
              <TextField
                variant='outlined'
                value={dataRow.customer_name || ''}
                onChange={handleTextChange}
                name='customer_name'
                fullWidth
                sx={styles.textField}
              />
            </Box>

            <Box sx={styles.box}>
              <Typography>Customer Type</Typography>
              <FormControl fullWidth>
                <Select
                  sx={{ backgroundColor: 'grey.100' }}
                  labelId='demo-simple-select-filled-label'
                  id='demo-simple-select-filled'
                  value={dataCustomerType}
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Billing</MenuItem>
                  <MenuItem value={20}>Shipping</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={styles.box}>
              <Typography>Customer Group</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                label=''
                onChange={handleTextChange}
                value={dataRow.customer_group || ''}
                name='customer_group'
                fullWidth
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography>Territory</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                label=''
                value={dataRow.territory || ''}
                onChange={handleTextChange}
                name='territory'
                fullWidth
              />
            </Box>

            <Box sx={styles.box}>
              <Typography>From Lead</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                label=''
                value={dataRow.lead_name || ''}
                onChange={handleTextChange}
                name='lead_name'
                fullWidth
              />
            </Box>

            <Box sx={styles.box}>
              <Typography>From Opportunity</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                label=''
                value={dataRow.opportunity_name || ''}
                onChange={handleTextChange}
                name='opportunity_name'
                fullWidth
              />
            </Box>

            <Box sx={styles.box}>
              <Typography>Account Manager</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                label=''
                value={dataRow.account_manager || ''}
                onChange={handleTextChange}
                name='account_manager'
                fullWidth
              />
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ margin: 0, mb: 5 }} />
        <Typography sx={{ fontWeight: 'bold', my: 6 }}> Description</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography>Billing Currency</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                label=''
                value={dataRow.default_currency || ''}
                onChange={handleTextChange}
                name='default_currency'
                fullWidth
              />
            </Box>

            <Box sx={styles.box}>
              <Typography>Default Price List</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                label=''
                value={dataRow.default_price_list || ''}
                onChange={handleTextChange}
                name='default_price_list'
                fullWidth
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography>Default Company Bank Account</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                label=''
                value={dataRow.default_bank_account || ''}
                onChange={handleTextChange}
                name='default_bank_account'
                fullWidth
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ margin: 0, mb: 5 }} />

        <Grid container sx={{ mb: 5 }}>
          <Box sx={{ width: '100%' }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 'bold', p: 0 }}>Internal Customer</Typography>
              </AccordionSummary>
              <AccordionDetails>
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
                            sx={{ marginBottom: 5, bgcolor: 'grey.100' }}
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
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>

        <Grid>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 'bold', p: 0 }}> More Infomation</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Grid container spacing={2} sx={{ mt: 5 }} style={{ width: '100%' }}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Box sx={styles.box}>
                    <Typography>Market Segment</Typography>
                    <TextField
                      sx={styles.textField}
                      variant='outlined'
                      label=''
                      value={dataRow.market_segment}
                      onChange={handleTextChange}
                      name='market_segment'
                      fullWidth
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography>industry</Typography>
                    <TextField
                      sx={styles.textField}
                      variant='outlined'
                      label=''
                      value={dataRow.industry}
                      onChange={handleTextChange}
                      name='industry'
                      fullWidth
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography>Website</Typography>
                    <TextField
                      sx={styles.textField}
                      variant='outlined'
                      label=''
                      value={dataRow.website}
                      onChange={handleTextChange}
                      name='website'
                      fullWidth
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography>Print Language</Typography>
                    <TextField
                      sx={styles.textField}
                      variant='outlined'
                      label=''
                      value={dataRow.language}
                      onChange={handleTextChange}
                      name='language'
                      fullWidth
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Box sx={styles.box}>
                    <Typography>Customer Details</Typography>
                    <TextField
                      sx={styles.textField}
                      size='small'
                      variant='outlined'
                      multiline
                      rows={14}
                      fullWidth
                      value={dataRow.customer_details}
                      onChange={handleTextChange}
                      name='customer_details'
                    />
                    <Typography variant='subtitle2'>Additional information regarding the customer.</Typography>
                  </Box>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Card>
    </Box>
  )
}

export default DetailCustomer
