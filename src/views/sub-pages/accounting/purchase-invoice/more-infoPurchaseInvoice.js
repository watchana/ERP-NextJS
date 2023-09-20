import {
  Box,
  Button,
  Card,
  CardActions,
  Checkbox,
  Collapse,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import { ChevronDown, ChevronUp } from 'mdi-material-ui'
import { useState } from 'react'

const MoreInfoPurchaseInvoice = ({ dataRow, setDataRow }) => {
  const [collapseStatus, setCollapseStatus] = useState(false)
  const [collapseAccouting, setCollapseAccouting] = useState(false)
  const [collapseSubscription, setCollapseSubscription] = useState(false)

  const handleCollapseStatus = () => {
    setCollapseStatus(!collapseStatus)
  }

  const handleCollapesAccouting = () => {
    setCollapseAccouting(!collapseAccouting)
  }

  const handleSubscription = () => {
    setCollapseSubscription(!collapseSubscription)
  }

  const handleTextChange = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setDataRow({ ...dataRow, [event.target.name]: event.target.value })
  }

  return (
    <Card sx={{ p: 4 }}>
      <Grid>
        <Grid>
          <Box sx={{ display: 'flex' }}>
            <Button size='small' variant='filled' label='' onClick={handleCollapseStatus}>
              Additional Discount
            </Button>
            <Box>
              <CardActions className='card-action-dense'>
                <IconButton size='small' onClick={handleCollapseStatus}>
                  {collapseStatus ? (
                    <ChevronUp sx={{ fontSize: '1.875rem' }} />
                  ) : (
                    <ChevronDown sx={{ fontSize: '1.875rem' }} />
                  )}
                </IconButton>
              </CardActions>
            </Box>
          </Box>

          <Collapse in={collapseStatus}>
            <Divider sx={{ margin: 0 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography sx={{ margin: 1 }}>Status</Typography>
                <TextField size='small' variant='filled' value={dataRow.status} fullWidth name='status' disabled />
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
        <Grid>
          <Box sx={{ display: 'flex' }}>
            <Button size='small' variant='filled' label='' onClick={handleCollapesAccouting}>
              Accounting Details
            </Button>
            <Box>
              <CardActions className='card-action-dense'>
                <IconButton size='small' onClick={handleCollapesAccouting}>
                  {collapseAccouting ? (
                    <ChevronUp sx={{ fontSize: '1.875rem' }} />
                  ) : (
                    <ChevronDown sx={{ fontSize: '1.875rem' }} />
                  )}
                </IconButton>
              </CardActions>
            </Box>
          </Box>

          <Collapse in={collapseAccouting}>
            <Divider sx={{ margin: 0 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography sx={{ margin: 1 }}>Credit To</Typography>
                <TextField size='small' variant='filled' value={dataRow.credit_to} fullWidth name='credit_to' />

                <Typography sx={{ margin: 1 }}>Is Opening Entry</Typography>
                <TextField
                  size='small'
                  variant='filled'
                  value={dataRow.is_opening}
                  fullWidth
                  name='is_opening'
                  disabled
                />
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </Grid>
    </Card>
  )
}

export default MoreInfoPurchaseInvoice
