import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Checkbox,
  CardActions,
  Divider,
  CardContent,
  FormGroup,
  FormControlLabel,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextareaAutosize,
  IconButton,
  Collapse,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

//import Icon
import { ChevronDown, ChevronUp } from 'mdi-material-ui'

const WebsiteBOM = ({ dataRow }) => {
  const [isShowWebsiteCheck, setIsShowWebsiteCheck] = useState(false)
  const [collapsSpacifications, setCollapesSpacifications] = useState(false)
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  const handleCheckShowWebsite = event => {
    setIsShowWebsiteCheck(event.target.checked)
  }

  const handleCickSpacifications = () => {
    setCollapesSpacifications(!collapsSpacifications)
  }

  const handleCheckboxChange = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
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
    <Card sx={styles.card}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={isShowWebsiteCheck} onChange={handleCheckShowWebsite} />}
              variant='body2'
              label='Show in Website'
              sx={{ ml: 0.2 }}
            />
            <Box>
              <Typography>Route</Typography>
              <TextareaAutosize
                variant='outlined'
                label=''
                value={dataRow.route}
                style={{ minHeight: '200px', width: '100%' }}
              />
            </Box>
            {isShowWebsiteCheck && (
              <Box sx={{ width: '100%', mt: 8 }}>
                <Typography>Web site image</Typography>
                <Button>Attach</Button>
                <Typography variant='subtitle2' sx={{ width: '100%' }}>
                  Item Image (if not slideshow)
                </Typography>
                <Grid item xs={12} sx={{ mt: 6 }}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: 'bold', p: 0 }}> Website Specifications</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Divider sx={{ margin: 0 }} />
                      <CardContent>
                        <Box sx={{ display: 'flex' }}>
                          <Checkbox {...label} checked={dataRow.show_items} onChange={handleCheckboxChange} />
                          <Typography variant='subtitle2' sx={{ mt: 2 }}>
                            Show Items
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                          <Checkbox {...label} checked={dataRow.show_operations} onChange={handleCheckboxChange} />
                          <Typography variant='subtitle2' sx={{ mt: 2 }}>
                            Show Operations
                          </Typography>
                        </Box>
                        <Box sx={{ width: '100%' }}>
                          <Typography>Website Description</Typography>
                          <TextareaAutosize
                            style={{ minHeight: '200px', width: '100%' }}
                            size='small'
                            variant='filled'
                            label=''
                            value={dataRow.web_long_description}
                          />
                        </Box>
                      </CardContent>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Box>
            )}
          </FormGroup>
        </Grid>
      </Grid>
    </Card>
  )
}

export default WebsiteBOM
