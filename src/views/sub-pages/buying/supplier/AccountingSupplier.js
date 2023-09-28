// ** React Import
import React from 'react'

// ** Mui Import
import { Box, Card, Divider, Grid, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'

const Accounting = ({ dataRow, handleUpdateData }) => {
  const [age, setAge] = useState('')

  const handleChange = event => {
    setAge(event.target.value)
  }

  const handleTextChange = event => {
    handleUpdateData(event.target.name, event.target.value)
  }

  const columns = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'Company', headerName: 'Company', width: 150 },
    { field: 'DefaultAccount', headerName: 'Default Account', width: 150 }
  ]

  const rows = [
    {
      id: 1,
      User: '',
      DefaultAccount: ''
    }
  ]

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
    <Box>
      <Card sx={styles.card}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={styles.box}>
              <Typography>Default Payment Terms Template</Typography>
              <TextField
                fullWidth
                variant='outlined'
                name='item_group'
                value={dataRow?.payment_terms}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>
            <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
            <Typography sx={{ marginBottom: 1, mb: 5 }}>Default Accounts</Typography>
            <Typography variant='body2' sx={{ marginBottom: 1 }}>
              Accounts
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 1 }}>
              Mention if non-standard payable account
            </Typography>
            <Box>
              <DataGrid
                sx={{ mt: 6 }}
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
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default Accounting
