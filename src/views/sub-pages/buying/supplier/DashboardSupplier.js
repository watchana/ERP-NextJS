// ** React Import
import React, { useEffect, useState } from 'react'

// ** Mui Import
import {
  Grid,
  Box,
  Divider,
  Card,
  Skeleton,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField
} from '@mui/material'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const Dashboard_sup = ({ dataRow, handleUpdateData }) => {
  const handleTextChange = event => {
    handleUpdateData(event.target.name, event.target.value)
  }

  useEffect(() => {
    console.log('dataRow', dataRow)
  }, [dataRow])

  if (!dataRow) return <Skeleton variant='rounded' width={210} height={60} />

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
    <Box sx={styles.box}>
      <Card sx={styles.card}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Description</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ p: 2 }}>
                  <Divider />
                  <Typography variant='subtitle2'>Description</Typography>
                  <TextField
                    fullWidth
                    multiline
                    size='small'
                    variant='outlined'
                    rows={4}
                    value={dataRow.description}
                    name='description'
                    onChange={handleTextChange}
                    sx={styles.textField}
                  />

                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Brand</Typography>
                    <TextField
                      fullWidth
                      disabled
                      size='small'
                      variant='outlined'
                      name='brand'
                      value={dataRow.brand}
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Description</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ p: 2 }}>
                  <Divider />
                  <Typography variant='subtitle2'>Description</Typography>
                  <TextField
                    fullWidth
                    multiline
                    size='small'
                    variant='outlined'
                    rows={4}
                    value={dataRow.description}
                    name='description'
                    onChange={handleTextChange}
                    sx={styles.textField}
                  />

                  <Box sx={styles.box}>
                    <Typography variant='subtitle1'>Brand</Typography>
                    <TextField
                      fullWidth
                      disabled
                      size='small'
                      variant='outlined'
                      name='brand'
                      value={dataRow.brand}
                      onChange={handleTextChange}
                      sx={styles.textField}
                    />
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default Dashboard_sup
