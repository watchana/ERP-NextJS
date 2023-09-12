// ** React Imports
import React from 'react'

// MUI imports
import { Box, Typography, Checkbox, TextField, Button, FormControlLabel } from '@mui/material'

const ManufacturingItem = ({ dataRow }) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  return (
    <Box>
      <Box>
        <Box sx={{ display: 'flex' }}>
          <FormControlLabel
            sx={{ mt: 2 }}
            control={<Checkbox checked={Boolean(dataRow[0]?.include_item_in_manufacturing) || false} />}
            label='Include Item In Manufacturing'
          />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <FormControlLabel
            sx={{ mt: 2 }}
            control={<Checkbox checked={Boolean(dataRow[0]?.is_sub_contracted_item) || false} />}
            label='Supply Raw Materials for Purchase'
          />
        </Box>
        <Box>
          <Typography variant='subtitle2'>If subcontracted to a vendor</Typography>
        </Box>
      </Box>
      <Box>
        <Box sx={{ mt: 10 }}>
          <Typography>Add a comment</Typography>
          <TextField variant='filled' label='' multiline rows={6} fullWidth />
          <Typography variant='subtitle2'>Ctrl+Enter to add comment</Typography>
        </Box>
        <Box sx={{ mt: 6 }}>
          <Button>Add Comment</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ManufacturingItem
