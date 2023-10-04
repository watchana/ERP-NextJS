// ** React Import
import React, { useEffect, useState } from 'react'

// ** Mui Import
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Skeleton,
  TextField,
  Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const DetailItem = ({ dataRow, handleUpdateData }) => {
  const [valuationRateOpen, setValuationRateOpen] = useState(dataRow.is_stock_item === 1 ? true : false)

  const handleCheckboxChange = event => {
    const { name } = event.target
    if (name === 'is_stock_item') {
      setValuationRateOpen(!valuationRateOpen)
    }
    handleUpdateData(name, event.target.checked === true ? 1 : 0)
  }

  const handleTextChange = event => {
    handleUpdateData(event.target.name, event.target.value)
  }

  useEffect(() => {
    console.log('dataRow', dataRow)
  }, [dataRow])

  if (!dataRow) return <Skeleton variant='rounded' width={210} height={60} />

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
          <Grid item sm={12} md={6}>
            <Box sx={styles.box}>
              <Typography>Item Name</Typography>
              <TextField
                fullWidth
                variant='outlined'
                name='item_name'
                value={dataRow.item_name}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>

            <Box sx={styles.box}>
              <Typography>Item Group</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='item_group'
                value={dataRow.item_group}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>

            <Box sx={styles.box}>
              <Typography>Default Unit of Measure</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='stock_uom'
                value={dataRow.stock_uom}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>
          </Grid>

          <Grid item sm={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Grid container>
              <Grid item xs={12} sm={6} md={12}>
                <FormControlLabel
                  control={
                    <Checkbox checked={Boolean(dataRow.disabled)} name='disabled' onChange={handleCheckboxChange} />
                  }
                  label='Disabled'
                />
              </Grid>

              <Grid item xs={12} sm={6} md={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Boolean(dataRow.allow_alternative_item)}
                      name='allow_alternative_item'
                      onChange={handleCheckboxChange}
                    />
                  }
                  label='Allow Alternative Item'
                />
              </Grid>

              <Grid item xs={12} sm={6} md={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Boolean(dataRow.is_stock_item)}
                      name='is_stock_item'
                      onChange={handleCheckboxChange}
                    />
                  }
                  label='Maintain Stock'
                />
              </Grid>

              <Grid item xs={12} sm={6} md={12}>
                <FormControlLabel
                  control={<Checkbox disabled checked={Boolean(dataRow.has_variants)} />}
                  label='Has Variants'
                />
              </Grid>
            </Grid>

            {valuationRateOpen && (
              <Box sx={styles.box}>
                <Typography>Valuation Rate</Typography>
                <TextField
                  fullWidth
                  variant='outlined'
                  type='number'
                  name='valuation_rate'
                  value={dataRow.valuation_rate}
                  onChange={handleTextChange}
                  sx={styles.textField}
                />
              </Box>
            )}

            <Box sx={styles.box}>
              <FormControlLabel
                control={
                  <Checkbox
                    disabled
                    checked={Boolean(dataRow.is_fixed_asset)}
                    name='is_fixed_asset'
                    onChange={handleCheckboxChange}
                  />
                }
                label='Has Variants'
              />
            </Box>

            <Box sx={styles.box}>
              <Typography>Over Delivery / Receipt Allowance (%)</Typography>
            </Box>

            <Box sx={styles.box}>
              <Typography>Over Billing Allowance (%)</Typography>
              <TextField
                fullWidth
                variant='outlined'
                type='number'
                name='over_billing_allowance'
                value={dataRow.over_billing_allowance}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>
          </Grid>
        </Grid>
      </Card>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ p: 2 }}>
            <Divider />
            <Typography variant='subtitle2'>Description</Typography>
            <TextField
              fullWidth
              multiline
              size='small'
              variant='outlined'
              rows={4}
              value={dataRow.description}
              name='description'
              onChange={handleTextChange}
              sx={styles.textField}
            />

            <Box>
              <Typography variant='subtitle1'>Brand</Typography>
              <TextField
                fullWidth
                disabled
                size='small'
                variant='outlined'
                name='brand'
                value={dataRow.brand}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default DetailItem
