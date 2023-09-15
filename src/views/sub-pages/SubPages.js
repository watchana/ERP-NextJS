// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Axios Imports
import axios from 'axios'

// ** MUI Imports
import { Box, Button, Card, Divider, Grid, IconButton, Tab, Tabs, TextField, Typography } from '@mui/material'
import { TabPanel, TabContext } from '@mui/lab' // Import TabContext

// ** Icons Imports
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import SaveIcon from '@mui/icons-material/Save'

// ** Custom Components
import ContentLeft from 'src/views/sub-pages/ContentLeft'

const IconButtonStyle = { bgcolor: 'white', borderRadius: 1, border: '1px solid #E0E0E0', mx: 0.5 }

const SubPages = ({ data, setData, menuContent, showContent, dataRow, setDataRow, doctype, docStatusName }) => {
  const contentSizeInit = 7

  // ** States
  const [contentSize, setContentSize] = useState(contentSizeInit)
  const [screenMD, setScreenMD] = useState(false)
  const [screenMDSelect, setScreenMDSelect] = useState(false)
  const [sideContentOpen, setSideContentOpen] = useState(false)
  const [tabValue, setTabValue] = useState(1)
  const [buttonArrow, setButtonArrow] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        // กำหนดขนาดหน้าจอที่ต้องการให้แสดงเนื้อหาแท็บ
        setScreenMD(true)
        setContentSize(12)
        setButtonArrow(true)
      } else {
        setScreenMD(false)
        setContentSize(contentSizeInit)
      }
    }

    handleResize() // เรียกใช้งานฟังก์ชันครั้งแรกเพื่อตั้งค่าเริ่มต้น

    window.addEventListener('resize', handleResize) // เพิ่มตัวดักการเปลี่ยนขนาดหน้าจอ

    return () => {
      window.removeEventListener('resize', handleResize) // ลบตัวดักเมื่อ component ถูก unmount
    }
  }, [])

  useEffect(() => {
    console.log('data', data)
  }, [data])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleContentSizeChange = () => {
    if (sideContentOpen === true && contentSize === 7) {
      setContentSize(4)
    } else {
      setContentSize(7)
    }

    setButtonArrow(!buttonArrow)
  }

  const fetchData = (doctype, name) => {
    return axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}${doctype}/${name}`, {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_API_TOKEN
        }
      })
      .then(res => res.data.data)
      .catch(err => {
        console.log(err)
        throw err
      })
  }

  const handleRowClick = async params => {
    console.log('params:', params.name)
    console.log('path: ', `${process.env.NEXT_PUBLIC_API_URL}${doctype}/${params.name}`)

    try {
      const dataRow = await fetchData(doctype, params.name)
      setDataRow(dataRow)
    } catch (err) {
      console.log('Error fetching data:', err)
    }

    setSideContentOpen(true)
    setScreenMDSelect(true)
  }

  const handleContentClose = () => {
    if (screenMD) {
      setContentSize(contentSizeInit)
    } else {
      setSideContentOpen(false)
      setContentSize(contentSizeInit)
    }
    setScreenMDSelect(false)
  }

  const handleArrowLeft = async () => {
    let copiedData = [...data] // สำเนาข้อมูล
    const index = copiedData.findIndex(item => item.name === dataRow.name)
    if (index === 0) {
      console.log('No further records')
    } else {
      console.log('test:', copiedData[index - 1].name)
      let dataRow = await fetchData(doctype, copiedData[index - 1].name)
      setDataRow(dataRow)
    }
  }

  const handleArrowRight = async () => {
    let copiedData = [...data] // สำเนาข้อมูล
    const index = copiedData.findIndex(item => item.name === dataRow.name)
    const lastIndex = copiedData.length - 1
    if (index === lastIndex) {
      console.log('No further records')
    } else {
      console.log('test:', copiedData[index + 1].name)
      let dataRow = await fetchData(doctype, copiedData[index + 1].name)
      setDataRow(dataRow)
    }
  }

  if (!data) {
    return <Box>Loading...</Box>
  }

  return (
    <Box>
      <Grid container justifyContent='center' columnSpacing={4}>
        {(!screenMD || !screenMDSelect) && (
          <Grid item xs>
            <ContentLeft
              data={data}
              setData={setData}
              doctype={doctype}
              docStatusName={docStatusName}
              handleRowClick={handleRowClick}
            />
          </Grid>
        )}

        {sideContentOpen && (
          <>
            {!screenMD && (
              <Divider orientation='vertical' flexItem onClick={() => handleContentSizeChange()}>
                <IconButton aria-label='delete'>
                  {buttonArrow ? <KeyboardDoubleArrowRightIcon /> : <KeyboardDoubleArrowLeftIcon />}
                </IconButton>
              </Divider>
            )}

            {(screenMDSelect || !screenMD) && (
              <Grid item xs md={contentSize}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <Box
                    sx={{
                      flexDirection: 'row',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2
                    }}
                  >
                    <Box>
                      <Typography variant='h6' sx={{ fontWeight: 'bold', display: 'flex', alignSelf: 'center' }}>
                        {dataRow.name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', mr: 3 }}>
                      <IconButton onClick={() => handleArrowLeft()} sx={IconButtonStyle}>
                        <KeyboardArrowLeftIcon />
                      </IconButton>
                      <IconButton onClick={() => handleArrowRight()} sx={IconButtonStyle}>
                        <KeyboardArrowRightIcon />
                      </IconButton>
                      <IconButton sx={IconButtonStyle}>
                        <MoreHorizIcon />
                      </IconButton>
                      <IconButton color='success' sx={IconButtonStyle}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton color='error' sx={IconButtonStyle} onClick={handleContentClose}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box sx={{ mr: 4 }}>
                    <TabContext value={tabValue.toString()}>
                      <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant='scrollable'
                        scrollButtons
                        allowScrollButtonsMobile
                        sx={{
                          backgroundColor: 'primary.light',
                          '& .MuiTab-root.Mui-selected': {
                            color: 'white',
                            backgroundColor: 'primary.main'
                          },
                          borderTopLeftRadius: '10px', // กำหนด borderRadius สำหรับมุมบนซ้าย
                          borderTopRightRadius: '10px' // กำหนด borderRadius สำหรับมุมบนขวา
                        }}
                      >
                        {menuContent?.map(item => (
                          <Tab value={item.id} label={item.name} key={item.id} />
                        ))}
                      </Tabs>
                      {showContent.map((item, index) => (
                        <TabPanel value={(index + 1).toString()} key={index + 1} sx={{ m: -3 }}>
                          {item}
                        </TabPanel>
                      ))}
                    </TabContext>
                    <Card sx={{ marginBlock: 4, p: 2 }}>
                      <Box sx={{ width: '100%' }}>
                        <Typography variant='h6' sx={{ my: 2 }}>
                          Add Comment
                        </Typography>
                        <TextField size='small' variant='filled' label='' multiline rows={4} fullWidth />
                        <Typography variant='subtitle2'>Ctrl+Enter to add comment</Typography>
                        <Button variant='contained' sx={{ marginBlock: 2 }}>
                          comment
                        </Button>
                      </Box>
                    </Card>
                  </Box>
                </Box>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Box>
  )
}

export default SubPages
