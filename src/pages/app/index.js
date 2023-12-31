// ** React Imports
import React from 'react'

// ** MUI Imports
import { Grid, Box } from '@mui/material'

// ** Components Imports
import CardGuideVue from 'src/views/sub-pages/CardGuideVue'
import CardYourShortcut from 'src/views/sub-pages/CardYourShortcut'
import CardReportMenu from 'src/views/sub-pages/CardReportMenu'

// ** dummy data
import { HomeMenuButton, HomeContent, HomeReport, HomeShortcut } from 'src/dummy/homepage'

const HomePage = () => {
  return (
    <Box>
      <Grid container rowSpacing={5}>
        <Grid item xs={12}>
          <CardGuideVue menuButton={HomeMenuButton} rightSideContent={HomeContent} />
        </Grid>
        <Grid item xs={12}>
          <CardYourShortcut menus={HomeShortcut} />
        </Grid>
        <Grid item xs={12}>
          <CardReportMenu menus={HomeReport} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default HomePage
