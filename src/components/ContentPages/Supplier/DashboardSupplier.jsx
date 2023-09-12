// ** React Import
import React from 'react'

// ** Mui Import
import {
  TextareaAutosize,
  Grid,
  Typography,
  Box,
  Button,
  TextField,
  CardContent,
  IconButton,
  Collapse,
  Divider
} from '@mui/material'
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { useState } from 'react'

const Dashboard_sup = ({ dataRow }) => {
  // ** State
  const [activity, setActivity] = useState(false)
  const [connections, setConnections] = useState(false)

  const handleClickActivity = () => {
    setActivity(!activity)
  }

  const handleClickConnections = () => {
    setConnections(!connections)
  }

  return (
    <Box>
      <Grid container sx={{ mt: 10 }}>
        <Grid item sx={{ width: '100%' }}>
          <Button size='small' variant='filled' label='' onClick={handleClickActivity}>
            Activity
          </Button>
          <IconButton size='small' onClick={handleClickActivity}>
            {activity ? <ChevronUp sx={{ fontSize: '1.875rem' }} /> : <ChevronDown sx={{ fontSize: '1.875rem' }} />}
          </IconButton>
        </Grid>
        <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
        <Collapse in={activity}>
          <Divider sx={{ margin: 0 }} />
          <CardContent></CardContent>
        </Collapse>
      </Grid>
      <Grid container>
        <Grid item sx={{ width: '100%' }}>
          <Button size='small' variant='filled' label='' onClick={handleClickConnections}>
            Connections
          </Button>
          <IconButton size='small' onClick={handleClickConnections}>
            {connections ? <ChevronUp sx={{ fontSize: '1.875rem' }} /> : <ChevronDown sx={{ fontSize: '1.875rem' }} />}
          </IconButton>
        </Grid>
        <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
        <Collapse in={connections}>
          <Divider sx={{ margin: 0 }} />
          <CardContent></CardContent>
        </Collapse>
      </Grid>
      <Grid>
        <Typography variant=''>Add a comment:</Typography>
        <TextField size='small' variant='filled' label='' multiline rows={4} fullWidth value={dataRow.description} />
      </Grid>
    </Box>
  )
}

export default Dashboard_sup
