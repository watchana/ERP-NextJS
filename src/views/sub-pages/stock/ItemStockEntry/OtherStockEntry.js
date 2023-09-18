import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Collapse,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'

//Import Icon
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const OtherStockEntry = ({ dataRow, setDataRow }) => {
  const [collapsePrinting, setCollapsePrinting] = useState(false)
  const [collapseInformation, setCollapseInformation] = useState(false)

  const handleClickPrinting = () => {
    setCollapsePrinting(!collapsePrinting)
  }

  const handleClickInformation = () => {
    setCollapseInformation(!collapseInformation)
  }

  const handleTextChange = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setDataRow({ ...dataRow, [event.target.name]: event.target.value })
  }

  return (
    <Grid>
      <Card>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex' }}>
            <Button size='small' variant='filled' label='' onClick={handleClickPrinting}>
              <Typography>Printing Settings</Typography>
            </Button>
          </Box>
          <Box>
            <CardActions className='card-action-dense'>
              <IconButton size='small' onClick={handleClickPrinting}>
                {collapsePrinting ? (
                  <ChevronUp sx={{ fontSize: '1.875rem' }} />
                ) : (
                  <ChevronDown sx={{ fontSize: '1.875rem' }} />
                )}
              </IconButton>
            </CardActions>
          </Box>
        </Box>
        <Box>
          <Collapse in={collapsePrinting}>
            <Divider sx={{ margin: 0 }} />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography sx={{ margin: 1 }}>Print Heading</Typography>
                  <TextField
                    size='small'
                    variant='filled'
                    value={dataRow.select_print_heading}
                    fullWidth
                    onChange={handleTextChange}
                    name='select_print_heading'
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Collapse>
        </Box>
        {/* End Collapse Printing Settings */}
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex' }}>
            <Button size='small' variant='filled' label='' onClick={handleClickInformation}>
              <Typography>More Information</Typography>
            </Button>
          </Box>
          <Box>
            <CardActions className='card-action-dense'>
              <IconButton size='small' onClick={handleClickInformation}>
                {collapseInformation ? (
                  <ChevronUp sx={{ fontSize: '1.875rem' }} />
                ) : (
                  <ChevronDown sx={{ fontSize: '1.875rem' }} />
                )}
              </IconButton>
            </CardActions>
          </Box>
        </Box>
        <Box>
          <Collapse in={collapseInformation}>
            <Divider sx={{ margin: 0 }} />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography sx={{ margin: 1 }}>Is Opening</Typography>
                  <TextField
                    size='small'
                    variant='filled'
                    value={dataRow.is_opening}
                    fullWidth
                    onChange={handleTextChange}
                    name='is_opening'
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography sx={{ margin: 1 }}>Per Transferred</Typography>
                  <TextField
                    size='small'
                    variant='filled'
                    value={dataRow.per_transferred}
                    fullWidth
                    onChange={handleTextChange}
                    name='per_transferred'
                  />

                  <Typography sx={{ margin: 1 }}>Total Amount</Typography>
                  <TextField
                    size='small'
                    variant='filled'
                    value={dataRow.total_amount}
                    fullWidth
                    onChange={handleTextChange}
                    name='total_amount'
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Collapse>
        </Box>
      </Card>
    </Grid>
  )
}

export default OtherStockEntry
