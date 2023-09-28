import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Checkbox,
  CardActions,
  Divider,
  CardContent,
  FormGroup,
  FormControlLabel,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Card
} from '@mui/material'

const ScapAndProcessLoss = ({ dataRow }) => {
  return (
    <Card sx={{ p: 4 }}>
      <Grid>
        <Box>
          <Typography sx={{ fontWeight: 'bold' }}>Process Loss</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 5 }}>% Process Loss</Typography>
            <TextField
              size='small'
              variant='filled'
              label=''
              value={dataRow.process_loss_percentage || ''}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 5 }}>Process Loss Qty</Typography>
            <TextField
              size='small'
              variant='filled'
              label=''
              value={dataRow.process_loss_qty || ''}
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default ScapAndProcessLoss
