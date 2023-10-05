// ** React Imports
import React from 'react'

// ** MUI imports
import { Box, Grid, Card, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const DashboardItem = ({ dataRow }) => {
  return (
    <Box>
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
    </Box>
  )
}

export default DashboardItem
