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
  AccordionDetails,
  TextField
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// ** Mdi Imports
import { ChevronDown, ChevronUp } from 'mdi-material-ui'

const DashboardItem = ({ dataRow }) => {
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
          <Grid item xs={12}>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Activity</Typography>
              </AccordionSummary>
              <AccordionDetails>test</AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Connections</Typography>
              </AccordionSummary>
              <AccordionDetails>test</AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Stock Levels</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ p: 2 }}>
                  <Typography variant='h6'>No Stock Available Currently</Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default DashboardItem
