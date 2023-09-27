import { IconButton, useTheme } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

const ButtonMore = () => {
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
      <MoreHorizIcon sx={{ width: '20px', height: '20px' }} />
    </IconButton>
  )
}

export default ButtonMore
