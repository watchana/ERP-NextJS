import React from 'react'

// ** Mui Import
import { Box, Card, Typography } from '@mui/material'

// ** Custom Components
import ButtonReload from '../button/ButtonReload'
import ButtonMore from '../button/ButtonMore'

const styles = {
  boxTopBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  boxTopBarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 1
  },
  cardContent: {
    padding: 3,
    marginBlock: 3
  }
}

const ButtonTopRightBar = ({ buttonList = [] }) => {
  return (
    <Box sx={styles.boxTopBarRight}>
      {buttonList.map((buttonData, index) => (
        <React.Fragment key={buttonData.id || index}>{buttonData.component}</React.Fragment>
      ))}
      <ButtonReload />
      <ButtonMore />
    </Box>
  )
}

const LayoutOnePageFilter = ({ title, buttonTopRight, children }) => {
  return (
    <>
      <Box sx={styles.boxTopBar}>
        <Typography variant='h6'>{title}</Typography>
        <ButtonTopRightBar buttonList={buttonTopRight} />
      </Box>
      <Card sx={styles.cardContent}>{children}</Card>
    </>
  )
}

export default LayoutOnePageFilter
