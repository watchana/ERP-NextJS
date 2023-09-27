import React from 'react'

// ** Mui Import
import { IconButton, useTheme } from '@mui/material'

// ** Mui Icons
import RefreshIcon from '@mui/icons-material/Refresh'

const ButtonReload = () => {
  const theme = useTheme()

  return (
    <IconButton
      color='primary'
      style={{
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '20%',
        border: `1px solid ${theme.palette.primary.main}`,
        backgroundColor: theme.palette.primary.contrastText
      }}
    >
      <RefreshIcon sx={{ width: '20px', height: '20px' }} />
    </IconButton>
  )
}

export default ButtonReload
