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
  IconButton,
  Collapse,
  Chip,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import { ChevronDown, ChevronUp } from 'mdi-material-ui'
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ConnectionsBOM = ({ dataRow }) => {
  const [collapsConnection, setCollapesConnection] = useState(false)

  const handleChickConnection = () => {
    setCollapesConnection(!collapsConnection)
  }

  return (
    <Card>
      <Grid>
        <Box>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 'bold', p: 0 }}>Website Specifications</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider sx={{ margin: 0 }} />
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Box sx={{ width: '33%' }}>
                    <Typography>Stock</Typography>
                    <Box sx={{ display: 'flex', mt: 2 }}>
                      <Chip label='Item' />
                      <Chip label='+' />
                    </Box>
                    <Box sx={{ display: 'flex', mt: 2 }}>
                      <Chip label='Stock Entry' />
                      <Chip label='+' />
                    </Box>
                    <Box sx={{ display: 'flex', mt: 2 }}>
                      <Chip label='Quality Inspection' />
                    </Box>
                  </Box>
                  <Box sx={{ width: '33%' }}>
                    <Typography>Manufacture</Typography>
                    <Box sx={{ display: 'flex', mt: 2 }}>
                      <Chip label='BOM' />
                      <Chip label='+' />
                    </Box>
                    <Box sx={{ display: 'flex', mt: 2 }}>
                      <Chip label='Work Order' />
                      <Chip label='+' />
                    </Box>
                    <Box sx={{ display: 'flex', mt: 2 }}>
                      <Chip label='Job Card' />
                      <Chip label='+' />
                    </Box>
                  </Box>
                  <Box sx={{ width: '33%' }}>
                    <Typography>Subcontract</Typography>
                    <Box sx={{ display: 'flex', mt: 2 }}>
                      <Chip label='Purchase Order' />
                      <Chip label='+' />
                    </Box>
                    <Box sx={{ display: 'flex', mt: 2 }}>
                      <Chip label='Purchase Receipt' />
                      <Chip label='+' />
                    </Box>
                    <Box sx={{ display: 'flex', mt: 2 }}>
                      <Chip label='Purchase Invoice' />
                      <Chip label='+' />
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Grid>
    </Card>
  )
}

export default ConnectionsBOM
