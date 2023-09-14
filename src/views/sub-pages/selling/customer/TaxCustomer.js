import { Box, TextField, Typography, Card, Button, Grid } from '@mui/material'

const TaxCustomer = ({ dataRow }) => {
  return (
    <Box>
      <Card
        sx={{
          borderTopLeftRadius: 0, // กำหนด borderRadius สำหรับมุมบนซ้าย
          borderTopRightRadius: 0, // กำหนด borderRadius สำหรับมุมบนขวา
          p: 2,
          mb: 2
        }}
      >
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} lg={6}>
            <Typography sx={{ marginBottom: 2 }}>Tax ID</Typography>
            <TextField size='small' variant='filled' label='' value={dataRow.tax_id || ''} fullWidth />
          </Grid>

          <Grid item sm={12} md={12} lg={6}>
            <Typography sx={{ marginBottom: 2 }}>Tax Category</Typography>
            <TextField size='small' variant='filled' label='' value={dataRow.tax_category || ''} fullWidth />

            <Typography sx={{ marginBottom: 2 }}>tax_withholding_category</Typography>
            <TextField
              size='small'
              variant='filled'
              label=''
              value={dataRow.tax_withholding_category || ''}
              fullWidth
            />
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default TaxCustomer
