// ** React Imports
import React from 'react'

import { useState } from 'react'

// ** MUI imports

import { Box, Button, CardContent, Collapse, Divider, IconButton, Grid, Card } from '@mui/material'
import { ChevronDown, ChevronUp } from 'mdi-material-ui'

const DashboardCustomer = () => {
  const [acrivity, setInternalActivity] = useState(false)
  const [stats, setInternalStats] = useState(false)
  const [connections, setInternalConnections] = useState(false)

  const handleClickAcrivity = () => {
    setInternalActivity(!acrivity)
  }

  const handleClickStats = () => {
    setInternalStats(!stats)
  }

  const handleClickConnections = () => {
    setInternalConnections(!connections)
  }

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
        <Grid container>
          <Box sx={{ width: '100%' }}>
            <Button sx={{ fontWeight: 'bold', p: 0 }} variant='filled' onClick={handleClickAcrivity}>
              Acrivity
            </Button>
            <IconButton size='small' onClick={handleClickAcrivity}>
              {acrivity ? <ChevronUp sx={{ fontSize: '1.875rem' }} /> : <ChevronDown sx={{ fontSize: '1.875rem' }} />}
            </IconButton>
          </Box>
          <Collapse in={acrivity}>
            <Divider sx={{ margin: 0 }} />
            <CardContent>test</CardContent>
          </Collapse>
        </Grid>

        <Divider sx={{ margin: 0, my: 5, width: '100%' }} />

        <Grid container>
          <Box sx={{ width: '100%' }}>
            <Button sx={{ fontWeight: 'bold', p: 0 }} variant='filled' onClick={handleClickStats}>
              Stats
            </Button>
            <IconButton size='small' onClick={handleClickStats}>
              {stats ? <ChevronUp sx={{ fontSize: '1.875rem' }} /> : <ChevronDown sx={{ fontSize: '1.875rem' }} />}
            </IconButton>
          </Box>
          <Collapse in={stats}>
            <Divider sx={{ margin: 0 }} />
            <CardContent>test</CardContent>
          </Collapse>

          <Divider sx={{ margin: 0, my: 5, width: '100%' }} />

          <Box sx={{ width: '100%' }}>
            <Button sx={{ fontWeight: 'bold', p: 0 }} variant='filled' onClick={handleClickConnections}>
              Connections
            </Button>
            <IconButton size='small' onClick={handleClickConnections}>
              {connections ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </IconButton>
          </Box>

          <Collapse in={connections}>
            <Divider sx={{ margin: 0 }} />
            <CardContent>test</CardContent>
          </Collapse>
        </Grid>
        <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
      </Card>
    </Box>
  )
}

export default DashboardCustomer
