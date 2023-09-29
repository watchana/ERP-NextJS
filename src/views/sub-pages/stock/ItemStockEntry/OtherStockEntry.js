import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
  InputAdornment,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

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
    <Grid>
      <Card sx={styles.card}>
        <Box>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 'bold', p: 0 }}> Printing Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Divider sx={{ margin: 0 }} />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Box sx={styles.box}>
                        <Typography sx={{ margin: 1 }}>Print Heading</Typography>
                        <TextField
                          sx={styles.textFieldStyle}
                          variant='outlined'
                          value={dataRow.select_print_heading}
                          fullWidth
                          onChange={handleTextChange}
                          name='select_print_heading'
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* End Collapse Printing Settings */}
        <Box>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 'bold', p: 0 }}> More Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Divider sx={{ margin: 0 }} />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box sx={styles.box}>
                        <Typography sx={{ margin: 1 }}>Is Opening</Typography>
                        <TextField
                          sx={styles.textField}
                          variant='outlined'
                          value={dataRow.is_opening}
                          fullWidth
                          onChange={handleTextChange}
                          name='is_opening'
                          disabled
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={styles.box}>
                        <Typography sx={{ margin: 1 }}>Per Transferred</Typography>
                        <TextField
                          sx={styles.textField}
                          variant='outlined'
                          value={`${dataRow?.per_transferred === '0.0' ? ' 0.0' : dataRow?.per_transferred}%`}
                          name='per_transferred'
                          onChange={handleTextChange}
                          fullWidth
                          disabled
                        />
                      </Box>

                      <Box sx={styles.box}>
                        <Typography sx={{ margin: 1 }}>Total Amount</Typography>
                        <TextField
                          sx={styles.textField}
                          variant='outlined'
                          value={
                            dataRow?.total_amount === '0.0'
                              ? '฿0.0'
                              : dataRow?.total_amount.toLocaleString('en-US', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                })
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <Typography>฿</Typography>
                              </InputAdornment>
                            )
                          }}
                          fullWidth
                          onChange={handleTextChange}
                          name='total_amount'
                          disabled
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Card>
    </Grid>
  )
}

export default OtherStockEntry
