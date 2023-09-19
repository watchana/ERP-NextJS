import { Box, TextField, Typography, Checkbox, Button, Card, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { useEffect, useState } from 'react'

const PotalUserCustomer = ({ dataRow }) => {
  const columns = [
    { field: 'idx', headerName: 'No', width: 70 },
    { field: 'user', headerName: 'User', width: 150 }
  ]

  const [getPortalUser, setGetProtalUser] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}Customer/${dataRow.name}`, {
        headers: {
          Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
        }
      })
      .then(res => {
        setGetProtalUser(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [dataRow])

  if (Object.values(getPortalUser)?.length === 0) {
    return 'waiting...'
  }

  return (
    <Grid>
      <Card sx={{ width: '100%', p: 5 }}>
        <Box>
          <Box>
            <Typography>Customer Portal Users</Typography>
            <DataGrid
              rows={getPortalUser.portal_users}
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
            <Box>
              <Button>Add row</Button>
            </Box>
          </Box>
        </Box>
      </Card>
    </Grid>
  )
}

export default PotalUserCustomer
