// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { Box, Card, Chip, Button, Typography, Divider, Grid, TextField } from '@mui/material'

// ** Components

const ContentLeft = ({ menuColumn, data, handleRowClick, doctype, docStatusName }) => {
  const [dataFilter, setDataFilter] = useState(data)

  const handleIDSearch = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    const value = event.target.value

    if (value === '') {
      setDataFilter(data)
    } else {
      {
        // ค้นหาคำที่คล้ายคลึงกับคำที่คุณค้นหา
        const matches = data.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))

        setDataFilter(matches)
      }
    }
  }

  return (
    <Box sx={{ px: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 5 }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          {doctype}
        </Typography>
        <Button variant='contained' color='primary' size='small'>
          Create {doctype}
        </Button>
      </Box>
      <Box sx={{ backgroundColor: 'background.paper', borderTopRightRadius: '10px', borderTopLeftRadius: '10px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} sx={{ p: 2, ml: 2 }}>
            <TextField fullWidth variant='outlined' size='small' label='ID Search' onChange={handleIDSearch} />
          </Grid>
          <Grid item xs sx={{ p: 2, ml: 2, justifyContent: 'center', display: 'flex' }}>
            <Button> test </Button>
          </Grid>
        </Grid>
        <Divider />
        {dataFilter.map((item, index) => (
          <Box key={item.name}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                px: 2
              }}
              onClick={() => handleRowClick(item)}
            >
              <Typography variant='h6'>{item.name}</Typography>
              {item[docStatusName] === 0 ? (
                <Chip label='Enable' color='success' size='small' />
              ) : (
                <Chip label='Disable' color='error' size='small' />
              )}
            </Box>
            <Divider />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default ContentLeft
