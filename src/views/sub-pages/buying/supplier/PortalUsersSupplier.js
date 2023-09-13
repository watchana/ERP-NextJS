import { Box, Grid, Typography, Card } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const PortalUserSupplier = () => {
  const columns = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'User', headerName: 'User', width: 150 }
  ]

  const rows = [
    {
      id: 1,
      User: 'Sidw'
    }
  ]

  return (
    <Box>
      <Card
        sx={{
          borderTopLeftRadius: 0, // กำหนด borderRadius สำหรับมุมบนซ้าย
          borderTopRightRadius: 0, // กำหนด borderRadius สำหรับมุมบนขวา
          p: 2,
          mb: 2
        }}
      >
        <Grid item sm={12} md={12} lg={12}>
          <Typography>Supplier Portal Users</Typography>
          <DataGrid
            sx={{ width: '50%', mt: 6 }}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }
              }
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </Grid>
      </Card>
    </Box>
  )
}

export default PortalUserSupplier
