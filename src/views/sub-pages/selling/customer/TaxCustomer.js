import { Box, TextField, Typography, Card, Button, Grid } from '@mui/material'

const TaxCustomer = ({ dataRow, setDataRow }) => {
  const handleTextChange = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setDataRow({ ...dataRow, [event.target.name]: event.target.value })
  }

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
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Typography sx={{ marginBottom: 2 }}>Tax ID</Typography>
            <TextField
              size='small'
              variant='filled'
              label=''
              value={dataRow.tax_id || ''}
              fullWidth
              onChange={handleTextChange}
              name='tax_id'
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Typography sx={{ marginBottom: 2 }}>Tax Category</Typography>
            <TextField
              size='small'
              variant='filled'
              label=''
              value={dataRow.tax_category || ''}
              fullWidth
              onChange={handleTextChange}
              name='tax_category'
            />

            <Typography sx={{ marginBottom: 2 }}>Tax Withholding Category</Typography>
            <TextField
              size='small'
              variant='filled'
              label=''
              value={dataRow.tax_withholding_category || ''}
              fullWidth
              onChange={handleTextChange}
              name='tax_withholding_category'
            />
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default TaxCustomer
