// ** React Imports
import React from 'react'

// ** MUI imports
import { Box, Grid, Card, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const DashboardItem = ({ dataRow }) => {
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
