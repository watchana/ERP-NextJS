//Import React
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
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

//import Icon
import { ChevronDown, ChevronUp } from 'mdi-material-ui'
import IconButton from '@mui/material/IconButton'

const ConfigulationPage = ({ dataRow }) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  const [collapseSerial, setCollapseSerial] = useState(false)

  const handleClickSerial = () => [setCollapseSerial(!collapseSerial)]

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

  const checkboxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }

  return (
    <Grid>
      <Card sx={styles.card}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Grid sx={checkboxStyle}>
                <Checkbox
                  checked={dataRow.allow_alternative_item === 1 ? true : false}
                  name='allow_alternative_item'
                  onChange={handleCheckboxChange}
                  disabled
                />
                <Typography variant='subtitle2'>Allow Alternative Item</Typography>
              </Grid>

              <Grid sx={checkboxStyle}>
                <Checkbox
                  checked={dataRow.use_multi_level_bom === 1 ? true : false}
                  name='use_multi_level_bom'
                  onChange={handleCheckboxChange}
                  disabled
                />
                <Typography variant='subtitle2'>Use Multi-Level BOM</Typography>
              </Grid>
              <Typography variant='subtitle2'>Plan material for sub-assemblies</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Grid sx={checkboxStyle}>
                <Checkbox
                  checked={dataRow.skip_transfer === 1 ? true : false}
                  name='skip_transfer'
                  onChange={handleCheckboxChange}
                  disabled
                />
                <Typography variant='subtitle2'>Skip Material Transfer to WIP Warehouse</Typography>
              </Grid>
              <Typography variant='subtitle2'>Check if material transfer entry is not required</Typography>
            </Box>

            <Box sx={styles.box}>
              <Grid sx={checkboxStyle}>
                <Checkbox
                  checked={dataRow.update_consumed_material_cost_in_project === 1 ? true : false}
                  name='update_consumed_material_cost_in_project'
                  onChange={handleCheckboxChange}
                  disabled
                />
                <Typography variant='subtitle2'>Update Consumed Material Cost In Project</Typography>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Typography variant='h6'>Warehouse</Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography>Work-in-Progress Warehouse</Typography>
              <TextField sx={styles.textField} variant='outlined' value={dataRow.wip_warehouse || ''} fullWidth />
              <Typography variant='subtitle2'>This is a location where operations are executed.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={styles.box}>
              <Typography>Target Warehouse</Typography>
              <TextField sx={styles.textField} variant='outlined' value={dataRow.fg_warehouse || ''} fullWidth />
              <Typography variant='subtitle2'>This is a location where final product stored.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 'bold', p: 0 }}> Serial No and Batch for Finished Good</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider sx={{ margin: 0 }} />
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex' }}>
                <Checkbox {...label} checked={dataRow.has_serial_no} onChange={handleCheckboxChange} />
                <Typography sx={{ mt: 2 }}>Has Serial No</Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Checkbox {...label} checked={dataRow.has_batch_no} onChange={handleCheckboxChange} />
                <Typography sx={{ mt: 2 }}>Has Batch No</Typography>
              </Box>
            </Box>
          </CardContent>
        </AccordionDetails>
      </Accordion>
    </Grid>
  )
}

export default ConfigulationPage
