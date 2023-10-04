import { Box, Button, Grid, TextField, Typography, Card } from '@mui/material'

const Costing = ({ dataRow }) => {
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
    <Card sx={{ p: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={styles.box}>
            <Typography>Operating Cost (THB)</Typography>
            <TextField
              sx={styles.textField}
              variant='outlined'
              label=''
              value={
                dataRow?.operating_cost === '0.0'
                  ? '฿ 0.0'
                  : `฿ ${parseFloat(dataRow?.operating_cost).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}`
              }
              name='operating_cost'
              fullWidth
            />
          </Box>

          <Box sx={styles.box}>
            <Typography>Raw Material Cost (THB)</Typography>
            <TextField
              sx={styles.textField}
              variant='outlined'
              label=''
              value={
                dataRow?.raw_material_cost === '0.0'
                  ? '฿ 0.0'
                  : `฿ ${parseFloat(dataRow?.raw_material_cost).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}`
              }
              name='raw_material_cost'
              fullWidth
            />
          </Box>

          <Box sx={styles.box}>
            <Typography>Scrap Material Cost (THB)</Typography>
            <TextField
              sx={styles.textField}
              variant='outlined'
              label=''
              value={
                dataRow?.scrap_material_cost === '0.0'
                  ? '฿ 0.0'
                  : `฿ ${parseFloat(dataRow?.scrap_material_cost).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}`
              }
              name='scrap_material_cost'
              fullWidth
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={styles.box}>
            <Typography>Total Cost (THB)</Typography>
            <TextField
              sx={styles.textField}
              variant='outlined'
              label=''
              value={
                dataRow?.total_cost === '0.0'
                  ? '฿ 0.0'
                  : `฿ ${parseFloat(dataRow?.total_cost).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}`
              }
              name='total_cost'
              fullWidth
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}

export default Costing
