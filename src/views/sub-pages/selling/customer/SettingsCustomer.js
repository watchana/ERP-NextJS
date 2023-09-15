import { Box, TextField, Typography, Checkbox, Button, Grid, FormControlLabel, Card } from '@mui/material'

const SettingsCustomer = ({ dataRow, setDataRow }) => {
  const handleCheckboxChange = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
    setDataRow({ ...dataRow, [event.target.name]: event.target.checked === true ? 1 : 0 })
  }

  const checkboxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }

  return (
    <Grid>
      <Card sx={{ width: '100%', p: 5 }}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={6} lg={6}>
            <Grid item xs={12} sx={checkboxStyle}>
              <Checkbox
                checked={dataRow.so_required === 1 ? true : false}
                name='so_required'
                onChange={handleCheckboxChange}
              />
              <Typography variant='subtitle2'>Allow Sales Invoice Creation Without Sales Order</Typography>
            </Grid>

            <Grid item xs={12} sx={checkboxStyle}>
              <Checkbox
                checked={dataRow.dn_required === 1 ? true : false}
                name='dn_required'
                onChange={handleCheckboxChange}
              />
              <Typography variant='subtitle2'>Allow Sales Invoice Creation Without Delivery Note</Typography>
            </Grid>
          </Grid>

          <Grid item sm={12} md={6} lg={6}>
            <Grid item xs={12} sx={checkboxStyle}>
              <Checkbox
                checked={dataRow.is_frozen === 1 ? true : false}
                name='is_frozen'
                onChange={handleCheckboxChange}
              />
              <Typography variant='subtitle2'>Is Frozen</Typography>
            </Grid>
            <Grid item xs={12} sx={checkboxStyle}>
              <Checkbox
                checked={dataRow.disabled === 1 ? true : false}
                name='disabled'
                onChange={handleCheckboxChange}
              />
              <Typography variant='subtitle2'>Disabled</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}

export default SettingsCustomer
