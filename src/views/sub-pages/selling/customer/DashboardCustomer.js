// ** React Imports
import React from 'react'

import { useState } from 'react'

// ** MUI imports

import {
  Box,
  Button,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  Grid,
  Card,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails
} from '@mui/material'
import { ChevronDown, ChevronUp } from 'mdi-material-ui'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

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
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 'bold', p: 0 }}> Acrivity</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Divider sx={{ margin: 0 }} />
                <CardContent>test</CardContent>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>

        <Divider sx={{ margin: 0, my: 5, width: '100%' }} />

        <Grid container>
          <Box sx={{ width: '100%' }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 'bold', p: 0 }}> Stats</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Divider sx={{ margin: 0 }} />
                <CardContent>test</CardContent>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>

        <Divider sx={{ margin: 0, my: 5, width: '100%' }} />

        <Box sx={{ width: '100%' }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 'bold', p: 0 }}> Connections</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider sx={{ margin: 0 }} />
              <CardContent>test</CardContent>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
      </Card>
    </Box>
  )
}

export default DashboardCustomer
