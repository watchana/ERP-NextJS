// ** React Imports
import React from 'react'

// ** MUI imports
import { Box, Button, Card, Typography } from '@mui/material'

const DashboardItem = () => {
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
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          Header Three
        </Typography>
        <Typography variant='body2' sx={{ marginBottom: 4 }}>
          Icing cake macaroon macaroon jelly chocolate bar. Chupa chups dessert dessert soufflé chocolate bar jujubes
          gummi bears lollipop.
        </Typography>
        <Button variant='contained'>Button Three</Button>
      </Card>
    </Box>
  )
}

export default DashboardItem
