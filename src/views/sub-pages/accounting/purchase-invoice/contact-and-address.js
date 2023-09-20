import { Box, Card, CardContent, Grid, TextField, Typography } from '@mui/material'

const ContactAndAddressPurchaseInvoice = ({ dataRow, setDataRow }) => {
  const handleTextChange = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setDataRow({ ...dataRow, [event.target.name]: event.target.value })
  }

  return (
    <Card sx={{ p: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant='h6'>Supplier Address</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ margin: 1 }}>supplier_address</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.supplier_address || ''}
            fullWidth
            onChange={handleTextChange}
            name='supplier_address'
          />

          <Card sx={{ my: 6 }}>
            {/* sx={{ marginBottom: 3.25 }} */}
            <CardContent sx={{ width: '100%' }}>
              <Box>
                <table style={{ width: '100%', fontSize: '14px' }}>
                  <tbody dangerouslySetInnerHTML={{ __html: dataRow.address_display }} />
                </table>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={{ margin: 1 }}>Contact Person</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.contact_person}
            fullWidth
            onChange={handleTextChange}
            name='contact_person'
            disabled
          />

          <Typography sx={{ margin: 1 }}>Contact</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.contact_display}
            fullWidth
            onChange={handleTextChange}
            name='contact_display'
            disabled
          />

          <Typography sx={{ margin: 1 }}>Mobile No</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.contact_mobile}
            fullWidth
            onChange={handleTextChange}
            name='contact_mobile'
            disabled
          />

          <Typography sx={{ margin: 1 }}>Contact Email</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.contact_email}
            fullWidth
            onChange={handleTextChange}
            name='contact_email'
            disabled
          />
        </Grid>
      </Grid>
    </Card>
  )
}

export default ContactAndAddressPurchaseInvoice
