// ** React Import
import React, { useState } from 'react'

// ** Mui Import
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  TextareaAutosize,
  Typography
} from '@mui/material'
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const DetailItem = ({ dataRow }) => {
  const [collapseDescription, setCollapseDescription] = useState(false)

  const handleClickDescription = () => {
    setCollapseDescription(!collapseDescription)
  }

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  const handleCheckboxChange = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
  }

  return (
    <Box>
      <Grid container spacing={2} width={'100%'}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography sx={{ margin: 1 }}>Item Name :</Typography>
          <TextField size='small' variant='filled' value={dataRow.item_name} fullWidth />

          <Typography sx={{ marginBottom: 2 }}>Item Group :</Typography>
          <TextField size='small' variant='filled' label='' value={dataRow.item_group || ''} fullWidth />

          <Typography sx={{ marginBottom: 2 }}>Default Unit of Measure :</Typography>
          <TextField size='small' variant='filled' label='' value={dataRow.stock_uo || ''} fullWidth />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormControlLabel
            sx={{ mt: 2 }}
            control={<Checkbox checked={Boolean(dataRow[0]?.disabled) || false} />}
            label='Disabled'
          />

          <FormControlLabel
            sx={{ mt: 2 }}
            control={<Checkbox checked={Boolean(dataRow[0]?.allow_alternative_item) || false} />}
            label=' Allow Alternative Item'
          />

          <FormControlLabel
            sx={{ mt: 2 }}
            control={<Checkbox checked={Boolean(dataRow[0]?.is_stock_item) || false} />}
            label='Maintain Stock'
          />
          <FormControlLabel
            sx={{ mt: 2 }}
            control={<Checkbox checked={Boolean(dataRow[0]?.has_variants) || false} />}
            label='Maintain Stock'
          />

          <Typography sx={{ marginBottom: 2 }}>Valuation Rate</Typography>
          <TextField size='small' variant='filled' label='' value={dataRow.valuation_rate || ''} fullWidth />

          <FormControlLabel
            sx={{ mt: 2 }}
            control={<Checkbox checked={Boolean(dataRow[0]?.is_fixed_asset) || false} />}
            label='Is Fixed Asset'
          />

          <Typography sx={{ marginBottom: 2 }}>Over Delivery/Receipt Allowance (%) :</Typography>
          <TextField size='small' variant='filled' label='' value={dataRow.over_delivery_receipt_allowance || ''} />

          <Typography sx={{ marginBottom: 2 }}>Over Billing Allowance (%) :</Typography>
          <TextField size='small' variant='filled' label='' value={dataRow.over_billing_allowance || ''} />
        </Grid>
      </Grid>
      <Box sx={{ mt: 10, display: 'flex' }}>
        <Button size='small' variant='filled' label='' onClick={handleClickDescription}>
          <Typography variant='h6'>Description</Typography>
        </Button>
        <Box>
          <CardActions className='card-action-dense'>
            <IconButton size='small' onClick={handleClickDescription}>
              {collapseDescription ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </IconButton>
          </CardActions>
        </Box>
      </Box>
      <Box>
        <Collapse in={collapseDescription}>
          <Divider sx={{ margin: 0 }} />
          <CardContent>
            <Box>
              <Typography variant='subtitle2'>Description</Typography>
              <TextareaAutosize
                style={{ minHeight: '200px', width: '100%' }}
                size='small'
                variant='filled'
                label=''
                value={dataRow.description}
              />
            </Box>
            <Box>
              <Typography variant='subtitle1'>Brand</Typography>
              <TextField size='small' variant='filled' label='' />
            </Box>
          </CardContent>
        </Collapse>
      </Box>
      <Box>
        <Typography variant='h6' sx={{ m: 2 }}>
          Add Comment
        </Typography>
        <TextField size='small' variant='filled' label='' multiline rows={4} fullWidth />
        <Typography variant='subtitle2'>Ctrl+Enter to add comment</Typography>
        <Button>add comment</Button>
      </Box>
    </Box>
  )
}

export default DetailItem
