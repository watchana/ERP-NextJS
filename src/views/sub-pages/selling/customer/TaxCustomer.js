import { Box, TextField, Typography, Checkbox, Button, Grid } from '@mui/material'

const TaxCustomer = ({ dataRow }) => {
  return (
    <Grid>
      <Grid container spacing={2}>
        <Grid item sm={12} md={12} lg={6}>
          <Typography sx={{ marginBottom: 2 }}>Tax ID</Typography>
          <TextField size='small' variant='filled' label='' value={dataRow.tax_id || ''} fullWidth />
        </Grid>

        <Grid item sm={12} md={12} lg={6}>
          <Typography sx={{ marginBottom: 2 }}>Tax Category</Typography>
          <TextField size='small' variant='filled' label='' value={dataRow.tax_category || ''} fullWidth />

          <Typography sx={{ marginBottom: 2 }}>tax_withholding_category</Typography>
          <TextField size='small' variant='filled' label='' value={dataRow.tax_withholding_category || ''} fullWidth />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TaxCustomer
