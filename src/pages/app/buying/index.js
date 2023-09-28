// ** React Imports
import React from 'react'

// ** MUI Imports
import { Grid, Box } from '@mui/material'

// ** Components Imports
import CardGuideVue from 'src/views/sub-pages/CardGuideVue'
import CardYourShortcut from 'src/views/sub-pages/CardYourShortcut'
import CardReportMenu from 'src/views/sub-pages/CardReportMenu'

// ** dummy data
import { BuyingMenuButton, BuyingContent, BuyingYourShortcut, BuyingReport } from 'src/dummy/buying'

const CardSupport = () => {
  return (
    <Box>
      <Grid container rowSpacing={5}>
        <Grid item sm={12}>
          <CardGuideVue MenuButton={BuyingMenuButton} RightSideContent={BuyingContent} />
        </Grid>
        <Grid item sm={12}>
          <CardYourShortcut menus={BuyingYourShortcut} />
        </Grid>
        <Grid item sm={12}>
          <CardReportMenu menus={BuyingReport} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default CardSupport
