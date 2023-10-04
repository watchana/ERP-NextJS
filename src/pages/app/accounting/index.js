// ** React Imports
import React from 'react'

// ** MUI Imports
import { Grid, Box } from '@mui/material'

// ** Components Imports
import CardGuideVue from 'src/views/sub-pages/CardGuideVue'
import CardYourShortcut from 'src/views/sub-pages/CardYourShortcut'
import CardReportMenu from 'src/views/sub-pages/CardReportMenu'

// ** dummy data
import { AccountingMenuButton, AccountingContent, AccountingYourShortcut, AccountingReport } from 'src/dummy/accounting'

const AccountPage = () => {
  return (
    <Box>
      <Grid container rowSpacing={5}>
        <Grid item sm={12}>
          <CardGuideVue menuButton={AccountingMenuButton} rightSideContent={AccountingContent} />
        </Grid>
        <Grid item sm={12}>
          <CardYourShortcut menus={AccountingYourShortcut} />
        </Grid>
        <Grid item sm={12}>
          <CardReportMenu menus={AccountingReport} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default AccountPage
