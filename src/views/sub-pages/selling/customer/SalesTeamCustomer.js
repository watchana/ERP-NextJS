import { Box, TextField, Typography, Card, Button, Grid, Divider } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { useEffect, useState } from 'react'

const SalesTeamCustomer = ({ dataRow }) => {
  const columns = [
    { field: 'idx', headerName: 'No', width: 70 },
    { field: 'sales_person', headerName: 'Sales Person', width: 150 },
    { field: 'allocated_percentage', headerName: 'Contribution (%)', width: 300 },
    {
      field: 'commission_rate',
      headerName: 'Commission Rate',
      width: 300
    }
  ]

  const [getSales, setGetSales] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}Customer/${dataRow.name}`, {
        headers: {
          Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
        }
      })
      .then(res => {
        setGetSales(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [dataRow])

  if (Object.values(getSales)?.length === 0) {
    return 'waiting...'
  }

  return (
    <Grid>
      <Card sx={{ width: '100%', p: 5 }}>
        <Grid>
          <Grid item xs={12}>
            <Typography>Sales Team</Typography>
            <DataGrid
              rows={getSales.sales_team}
              columns={columns}
              getRowId={row => row.name}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 }
                }
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 10 }}>
          <Divider sx={{ margin: 0, my: 5, width: '100%', ml: 3 }} />
          <Grid item xs={12}>
            <Typography sx={{ marginBottom: 2 }}>Sales Partner</Typography>
            <TextField size='small' variant='filled' label='' value={dataRow.default_sales_partner} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ marginBottom: 2 }}>Commission Rate</Typography>
            <TextField size='small' variant='filled' label='' value={dataRow.default_commission_rate} fullWidth />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}

export default SalesTeamCustomer
