import React, { useState } from 'react'

// ** Mui imports
import { Box, Button, Grid, Tab, Tabs, Typography } from '@mui/material'
import { TabContext, TabPanel } from '@mui/lab'
import axios from 'axios'

const LayoutUpdatePage = ({ doctype, menuContent, showContent, dataCreate }) => {
  const [tabValue, setTabValue] = useState(1)

  const styles = {
    tabPanel: {
      backgroundColor: 'primary.light',
      '& .MuiTab-root.Mui-selected': {
        color: 'white',
        backgroundColor: 'primary.main'
      },
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px'
    },
    cardComment: {
      p: 2
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleSave = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}${doctype}`, dataCreate, {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_API_TOKEN
        }
      })
      .then(res => {
        console.log('res: ', res)
      })
      .catch(err => {
        console.log('err: ', err)
      })
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2 }}>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              {doctype}
            </Typography>
            <Button variant='contained' color='primary' size='small' onChange={handleSave}>
              Save
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          {menuContent !== undefined ? (
            <TabContext value={tabValue.toString()}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant='scrollable'
                scrollButtons
                allowScrollButtonsMobile
                sx={styles.tabPanel}
              >
                {menuContent?.map(item => (
                  <Tab value={item.id} label={item.name} key={item.id} />
                ))}
              </Tabs>
              {showContent.map((component, index) => (
                <TabPanel value={(index + 1).toString()} key={index + 1}>
                  <Box sx={{ m: -3, mb: 2 }}>{component}</Box>
                </TabPanel>
              ))}
            </TabContext>
          ) : (
            <Box sx={{ mb: 3 }}>{showContent}</Box>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default LayoutUpdatePage
