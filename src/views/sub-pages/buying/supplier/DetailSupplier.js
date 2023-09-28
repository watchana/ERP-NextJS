// ** React Import
import React from 'react'

// ** Mui Import
import {
  Box,
  Grid,
  TextField,
  Typography,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextareaAutosize,
  Card,
  MenuItem,
  Select,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// ** data selection
import { SupplierType } from 'src/dummy/contentPages/supplierPage'

const DetailSupplier = ({ dataRow, handleUpdateData }) => {
  const [age, setAge] = useState('')

  // ** State
  const [isInternalSupplier, setIsInternalSupplier] = useState(false) // New state for checkbox

  const handleCheckboxChange = event => {
    handleUpdateData(event.target.name, event.target.checked === true ? 1 : 0),
      setIsInternalSupplier(event.target.checked)
  }

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

  return (
    <Box>
      <Card sx={styles.card}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography>Supplier Name</Typography>
              <TextField
                fullWidth
                variant='outlined'
                name='item_name'
                value={dataRow?.supplier_name}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>

            <Box sx={styles.box}>
              <Typography>Country</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='item_group'
                value={dataRow?.country}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={styles.box}>
              <Typography>Supplier Group *</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='item_group'
                value={dataRow?.supplier_group}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>

            <Box sx={styles.BoxStyle}>
              <Typography variant='subtitle2' sx={{ my: 2 }}>
                Pupplier Type
              </Typography>
              <Select
                fullWidth
                name='supplier_type'
                value={dataRow.supplier_type}
                onChange={handleSelectChange}
                sx={{
                  backgroundColor: 'grey.100'
                }}
              >
                {SupplierType.map(supplier => (
                  <MenuItem key={supplier.id} value={supplier.name}>
                    {supplier.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <FormControlLabel
              sx={{ mt: 2 }}
              control={<Checkbox checked={Boolean(dataRow?.is_transporter) || false} />}
              label='Is Transporter'
            />
          </Grid>
          <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
        </Grid>
        <Typography size='xsall' sx={{ fontWeight: 'bold' }}>
          Defaults
        </Typography>

        {/* ////////////////////////////////////// แถวที่ 2 ///////////////////////////////////////////// */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography>Billing Currency</Typography>
              <TextField
                fullWidth
                variant='outlined'
                name='default_currency'
                value={dataRow.default_currency}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>

            <Box sx={styles.box}>
              <Typography>Default Company Bank Account</Typography>
              <TextField
                fullWidth
                variant='outlined'
                name='default_bank_account'
                value={dataRow.default_bank_account}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={styles.box}>
              <Typography>Price List</Typography>
              <TextField
                fullWidth
                variant='outlined'
                name='default_price_list'
                value={dataRow.default_price_list}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ margin: 0, my: 7, width: '100%' }} />

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Internal Supplier</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ p: 2 }}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={isInternalSupplier} onChange={handleCheckboxChange} />}
                  variant='body2'
                  label='Is Internal Supplier'
                />
                {isInternalSupplier && (
                  <TextField
                    fullWidth
                    variant='outlined'
                    name='represents_company'
                    value={dataRow.represents_company}
                    onChange={handleTextChange}
                    sx={styles.textField}
                  />
                )}
              </FormGroup>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography> More Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2} width={'100%'}>
                <Grid item xs={12}>
                  <Typography>Supplier Details</Typography>

                  <TextareaAutosize
                    fullWidth={false}
                    style={{
                      minHeight: '200px',
                      width: '100%',
                      maxWidth: '100%',
                      minWidth: '300px',
                      overflow: 'hidden'
                    }}
                    multiline
                    size='xsall'
                    variant='outlined'
                    rows={4}
                    value={dataRow.supplier_details}
                    name='supplier_details'
                    onChange={handleTextChange}
                    sx={styles.textField}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={styles.box}>
                    <Typography>Website</Typography>
                    <TextField
                      fullWidth
                      variant='outlined'
                      name='website'
                      value={dataRow.website}
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>

                  <Box sx={styles.box}>
                    <Typography>Print Language</Typography>
                    <TextField
                      fullWidth
                      variant='outlined'
                      name='language'
                      value={dataRow.language}
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
      </Card>
    </Box>
  )
}

export default DetailSupplier
