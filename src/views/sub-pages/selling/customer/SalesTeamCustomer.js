import { Box, TextField, Typography, Card, Button, Grid, Divider } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const SalesTeamCustomer = ({ dataRow }) => {
  const columns = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'SalesPerson', headerName: 'Sales Person', width: 150 },
    { field: 'Contribution', headerName: 'Contribution (%)', width: 300 },
    {
      field: 'ContributionNext',
      headerName: 'Contribution to Net Total',
      width: 300
    },
    {
      field: 'Commission',
      headerName: 'Commission Rate',
      width: 300
    },
    {
      field: 'Incentives',
      headerName: 'Incentives',
      width: 300
    }
  ]

  const rows = [
    { id: 1, SalesPerson: 'Sidw', Contribution: 'Jon', ContributionNext: 'dasd', Commission: 's', Incentives: '1' },
    {
      id: 2,
      SalesPerson: 'Lannister',
      Contribution: 'Cersei',
      ContributionNext: 'dasd',
      Commission: 's',
      Incentives: '1'
    }
  ]

  return (
    <Grid>
      <Card sx={{ width: '100%', p: 5 }}>
        <Grid container spacing={2}>
          <Grid item sx={12} md={12} lg={12}>
            <Typography>Sales Team</Typography>
            <DataGrid rows={rows} columns={columns} />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 10 }}>
          <Divider sx={{ margin: 0, my: 5, width: '100%', ml: 3 }} />
          <Grid item sm={12} md={12} lg={6}>
            <Typography sx={{ marginBottom: 2 }}>Sales Partner</Typography>
            <TextField size='small' variant='filled' label='' value={dataRow.default_sales_partner} fullWidth />
          </Grid>
          <Grid item sx={12} md={12} lg={6}>
            <Typography sx={{ marginBottom: 2 }}>Commission Rate</Typography>
            <TextField size='small' variant='filled' label='' value={dataRow.default_commission_rate} fullWidth />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}

export default SalesTeamCustomer
