// ** MUI Imports
import { Box, Card, Chip, Button, Typography } from '@mui/material'

// ** Components

const ContentLeft = ({ menuColumn, dataRow, handleRowClick }) => {
  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          Item
        </Typography>
      </Box>
      <Card>
        {dataRow.map((item, index) => (
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', border: 1 }}
            key={item.name}
            onClick={() => handleRowClick(item)}
          >
            <Button variant='outlined' fullWidth sx={{ justifyContent: 'space-between', textAlign: 'left' }}>
              <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                {item.name}
              </Typography>
              <Chip label={'enable'} size='small' />
            </Button>
          </Box>
        ))}
      </Card>
    </Box>
  )
}

export default ContentLeft
