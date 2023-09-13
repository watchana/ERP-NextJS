import { Box, TextField, Typography, Checkbox, Button, Grid, FormControlLabel } from '@mui/material'

const SettingsCustomer = ({ dataRow }) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  const handleCheckboxChange = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
  }

  return (
    <Grid>
      <Grid container spacing={2}>
        <Grid item sm={12} md={6} lg={6}>
          <Box sx={{ display: 'flex' }}>
            <FormControlLabel
              sx={{ mt: 2 }}
              control={<Checkbox checked={Boolean(dataRow[0]?.so_required) || false} />}
              label='Allow Sales Invoice Creation Without Sales Order'
            />
          </Box>

          <Box sx={{ display: 'flex' }}>
            <FormControlLabel
              sx={{ mt: 2 }}
              control={<Checkbox checked={Boolean(dataRow[0]?.dn_required) || false} />}
              label='Allow Sales Invoice Creation Without Delivery Note'
            />
          </Box>
        </Grid>

        <Grid item sm={12} md={6} lg={6}>
          <Box sx={{ display: 'flex' }}>
            <FormControlLabel
              sx={{ mt: 2 }}
              control={<Checkbox checked={Boolean(dataRow[0]?.is_frozen) || false} />}
              label='Is Frozen'
            />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <FormControlLabel
              sx={{ mt: 2 }}
              control={<Checkbox checked={Boolean(dataRow[0]?.disabled) || false} />}
              label='Disabled'
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SettingsCustomer
