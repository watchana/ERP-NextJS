import {
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
import { ChevronDown, ChevronUp } from 'mdi-material-ui'
import { useState } from 'react'

const ConnectionPurchaseInvoice = ({ dataRow, setDataRow }) => {
  const [collapseConnect, setCollapseConnect] = useState(false)

  const handleCollapseConnect = () => {
    setCollapseConnect(!collapseConnect)
  }

  return (
    <Card sx={{ p: 4 }}>
      <Grid>
        <Box sx={{ display: 'flex' }}>
          <Button size='small' variant='filled' label='' onClick={handleCollapseConnect}>
            Additional Info
          </Button>
          <Box>
            <CardActions className='card-action-dense'>
              <IconButton size='small' onClick={handleCollapseConnect}>
                {collapseConnect ? (
                  <ChevronUp sx={{ fontSize: '1.875rem' }} />
                ) : (
                  <ChevronDown sx={{ fontSize: '1.875rem' }} />
                )}
              </IconButton>
            </CardActions>
          </Box>
        </Box>

        <Collapse in={collapseConnect}>
          <Divider sx={{ margin: 0 }} />

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
        </Collapse>
      </Grid>
    </Card>
  )
}

export default ConnectionPurchaseInvoice
