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

const Costing = ({ dataRow }) => {
  return (
    <Card sx={{ p: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography>Operating Cost (THB)</Typography>
          <TextField
            size='small'
            variant='filled'
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

          <Typography>Raw Material Cost (THB)</Typography>
          <TextField
            size='small'
            variant='filled'
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

          <Typography>Scrap Material Cost (THB)</Typography>
          <TextField
            size='small'
            variant='filled'
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
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography>Total Cost (THB)</Typography>
          <TextField
            size='small'
            variant='filled'
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
        </Grid>
      </Grid>
    </Card>
  )
}

export default Costing
