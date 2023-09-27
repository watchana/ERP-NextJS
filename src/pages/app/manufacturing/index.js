// ** React Imports
import React from 'react'

// ** MUI Imports
import { Grid, Box } from '@mui/material'

// ** Components Imports
import CardGuideVue from 'src/views/sub-pages/CardGuideVue'
import CardYourShortcut from 'src/views/sub-pages/CardYourShortcut'
import CardReportMenu from 'src/views/sub-pages/CardReportMenu'

// ** dummy data
import { ManufacturingShortcut, ManufacturingReport } from 'src/dummy/manufacturing'

const ManufacturingPage = () => {
  return (
    <Box>
      <Grid container rowSpacing={5}>
        <Grid item sm={12}>
          {/* <CardGuideVue MenuButton={StockMenuButton} RightSideContent={StockContent} /> */}
        </Grid>
        <Grid item sm={12}>
          <CardYourShortcut menus={ManufacturingShortcut} />
        </Grid>
        <Grid item sm={12}>
          <CardReportMenu menus={ManufacturingReport} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ManufacturingPage
