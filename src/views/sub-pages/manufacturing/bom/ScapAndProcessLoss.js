import { Box, Button, Grid, TextField, Typography, Card } from '@mui/material'

const ScapAndProcessLoss = ({ dataRow }) => {
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
      <Grid>
        <Box>
          <Typography sx={{ fontWeight: 'bold' }}>Process Loss</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography sx={{ mt: 5 }}>% Process Loss</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                label=''
                value={dataRow.process_loss_percentage || ''}
                fullWidth
                disabled
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography sx={{ mt: 5 }}>Process Loss Qty</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                label=''
                value={dataRow.process_loss_qty || ''}
                fullWidth
                disabled
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default ScapAndProcessLoss
