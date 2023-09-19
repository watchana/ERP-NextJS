import { Box, Button, Grid, TextField, Typography, Card } from '@mui/material'

const AdditionalCosts = ({ dataRow, setDataRow }) => {
  const handleTextChange = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setDataRow({ ...dataRow, [event.target.name]: event.target.value })
  }

  return (
    <Card>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography sx={{ margin: 1 }}>Total Additional Costs</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.total_additional_costs}
            fullWidth
            onChange={handleTextChange}
            name='total_additional_costs'
          />
        </Grid>
      </Grid>
    </Card>
  )
}

export default AdditionalCosts
