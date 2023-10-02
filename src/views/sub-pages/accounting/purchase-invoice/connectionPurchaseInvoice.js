import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActions,
  Checkbox,
  Chip,
  Collapse,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import { GridExpandMoreIcon } from '@mui/x-data-grid'
import { ChevronDown, ChevronUp } from 'mdi-material-ui'
import { useState } from 'react'

const ConnectionPurchaseInvoice = ({ dataRow, setDataRow }) => {
  const [collapseConnect, setCollapseConnect] = useState(false)

  const handleCollapseConnect = () => {
    setCollapseConnect(!collapseConnect)
  }

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
      <Accordion>
        <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
          <Typography>Status</Typography>
        </AccordionSummary>
        <Divider sx={{ margin: 0, my: 1, width: '100%' }} />
        <AccordionDetails>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={styles.box}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                      <Typography>Payment</Typography>
                      <Grid sx={{ display: 'flex', m: 2 }}>
                        <Chip label='Payment Entry' />
                        <Chip label='+' />
                      </Grid>

                      <Grid sx={{ display: 'flex', m: 2 }}>
                        <Chip label='Payment Request' />
                      </Grid>

                      <Grid sx={{ display: 'flex', m: 2 }}>
                        <Chip label='Journal Entry' />
                        <Chip label='+' />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                      <Typography>Reference</Typography>
                      <Chip label=' Purchase Order' />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={4}>
                      <Typography>Returns</Typography>
                      <Grid>
                        <Chip label='Purchase Invoice' />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid spacing={3} sx={{ mt: 10 }}>
                    <Grid item xs={12}>
                      <Typography>Subscription</Typography>
                      <Chip label='Auto Repeat' />
                      <Chip label='+' />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default ConnectionPurchaseInvoice
