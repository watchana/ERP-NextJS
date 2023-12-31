// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Axios Imports
import axios from 'axios'

// ** Router Imports
import { useRouter } from 'next/router'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'
import {
  contentDefault,
  contentDetailRight,
  contentDetailLeft,
  contentMiddleLeft,
  contentMiddleRight,
  contentUpdate
} from 'src/redux/layoutPageSlice'

// ** MUI Imports
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  IconButton,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material'
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
import FullPageSkeleton from '../FullPageSkeleton'

const IconButtonStyle = { bgcolor: 'white', borderRadius: 1, border: '1px solid #E0E0E0', mx: 0.5 }

const LayoutTwoPage = ({
  data,
  setData,
  menuContent,
  showContent,
  dataRow,
  setDataRow,
  doctype,
  docStatusName,
  editStatus,
  setEditStatus,
  dataUpdate,
  setDataUpdate
}) => {
  const { contentLeftStatus, contentDividerStatus, contentRightStatus, contentLeftGrid, contentRightGrid } =
    useSelector(state => state.layoutPage) || {}

  const dispatch = useDispatch()
  const router = useRouter()
  const isClient = typeof window !== 'undefined'
  const [windowWidth, setWindowWidth] = useState(isClient ? window.innerWidth : 0)

  // ** States
  const [screenMD, setScreenMD] = useState(false)
  const [tabValue, setTabValue] = useState(1)
  const [buttonArrow, setButtonArrow] = useState(true)
  const [saveWarning, setSaveWarning] = useState(false)

  useEffect(() => {
    // เมื่อเปลี่ยน path ไปหน้าอื่น ให้ dispatch action contentDefault()
    const handleRouteChange = url => {
      dispatch(contentDefault())
    }

    // เพิ่ม event listener เพื่อตรวจสอบการเปลี่ยน path
    router.events.on('routeChangeComplete', handleRouteChange)

    // ลบ event listener เมื่อคอมโพเนนต์ถูก unmount
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [dispatch, router])

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

  const StatusChip = ({ editStatus, docStatus }) => {
    if (editStatus) return <Chip label='• Edit' color='warning' sx={{ ml: 1 }} />
    if (docStatus === 0) return <Chip label='• Enabled' color='statusEnabled' sx={{ ml: 1 }} />

    return <Chip label='• Disabled' color='error' sx={{ ml: 1 }} />
  }

  useEffect(() => {
    const handleResize = () => {
      const newWindowWidth = window.innerWidth
      setWindowWidth(newWindowWidth)

      if (window.innerWidth <= 1000) {
        // กำหนดขนาดหน้าจอที่ต้องการให้แสดงเนื้อหาแท็บ

        if (contentRightStatus === true && contentLeftStatus === false) {
          console.log('midRight')
          dispatch(contentMiddleRight())
        } else {
          dispatch(contentMiddleLeft())
        }
        setButtonArrow(true)
        setScreenMD(true)
      } else {
        if (contentRightStatus === true) {
          dispatch(contentDetailRight())
        } else {
          dispatch(contentDefault())
        }
        setScreenMD(false)
      }
    }

    handleResize() // เรียกใช้งานฟังก์ชันครั้งแรกเพื่อตั้งค่าเริ่มต้น

    window.addEventListener('resize', handleResize) // เพิ่มตัวดักการเปลี่ยนขนาดหน้าจอ

    return () => {
      window.removeEventListener('resize', handleResize) // ลบตัวดักเมื่อ component ถูก unmount
    }
  }, [dispatch, contentRightStatus, contentLeftStatus])

  useEffect(() => {
    console.log('windowWidth', windowWidth)
  }, [windowWidth])

  useEffect(() => {
    console.log('data', data)
  }, [data])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleContentSizeChange = () => {
    if (screenMD === false) {
      if (contentRightGrid === 7) {
        dispatch(contentDetailLeft())
      } else {
        dispatch(contentDetailRight())
      }
      setButtonArrow(!buttonArrow)
    }
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

    if (screenMD) {
      dispatch(contentMiddleRight())
    } else {
      dispatch(contentDetailRight())
    }
  }

  const handleContentClose = () => {
    if (screenMD) {
      if (contentRightStatus === true) {
        dispatch(contentMiddleLeft())
      } else {
        dispatch(contentMiddleRight())
      }
    } else {
      dispatch(contentDefault())
    }
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

  const handleSaveClick = async event => {
    console.log('Save Clicked: ', dataRow)
    const dataPreUpdate = await fetchData(doctype, dataRow.name)
    console.log('dataUpdateAAA', dataUpdate)

    if (Object.keys(dataRow).length !== 0 && dataRow.modified === dataPreUpdate.modified) {
      axios
        .put(`${process.env.NEXT_PUBLIC_API_URL}${doctype}/${dataRow.name}`, dataUpdate, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: process.env.NEXT_PUBLIC_API_TOKEN
          }
        })
        .then(res => {
          console.log('res', res)
          setEditStatus(false)
        })
        .catch(err => {
          console.log(err)
        })
      setDataUpdate({})
    } else {
      setSaveWarning(true)
    }
  }

  useEffect(() => {
    console.log('dataRow', dataRow)
  }, [dataRow])

  useEffect(() => {
    console.log('dataUpdate', dataUpdate)
  }, [dataUpdate])

  useEffect(() => {
    console.log('contentRightStatus', contentRightStatus)
    console.log('contentLeftStatus', contentLeftStatus)
    console.log('screenMD', screenMD)
  }, [contentRightStatus, contentLeftStatus, screenMD])

  useEffect(() => {
    console.log('menuContent', menuContent)
  }, [menuContent])

  if (!data) {
    return <FullPageSkeleton />
  }

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={saveWarning}
        onClose={() => setSaveWarning(false)}
        key={'top' + 'center'}
        autoHideDuration={5000}
      >
        <Alert
          onClose={() => setSaveWarning(false)}
          severity='warning'
          sx={{
            width: '100%',
            color: 'black',
            backgroundColor: '#ffdd00',
            '& .MuiAlert-icon': { color: 'black' }
          }}
        >
          Error: Document has been modified after you have opened it (`${dataRow.modified}`, `${dataRow.modified}`).
          Please refresh to get the latest document.
        </Alert>
      </Snackbar>

      {/* ข้อมูลที่แสดงผลข้างซ้าย */}
      <Grid container justifyContent='center' columnSpacing={4}>
        {contentLeftStatus && (
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

        {contentDividerStatus && (
          <Divider orientation='vertical' flexItem onClick={() => handleContentSizeChange()}>
            <IconButton aria-label='delete'>
              {buttonArrow ? <KeyboardDoubleArrowRightIcon /> : <KeyboardDoubleArrowLeftIcon />}
            </IconButton>
          </Divider>
        )}

        {contentRightStatus && (
          <Grid item xs md={contentRightGrid} sx={{ mr: menuContent && menuContent.length > 0 ? 0 : 4 }}>
            <Grid container>
              <Grid item xs={12}>
                <Box
                  sx={{
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2
                  }}
                >
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                      {dataRow.name}
                    </Typography>

                    <StatusChip editStatus={editStatus} docStatus={dataRow[docStatusName]} />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <IconButton sx={IconButtonStyle} onClick={() => handleArrowLeft()}>
                      <KeyboardArrowLeftIcon />
                    </IconButton>
                    <IconButton sx={IconButtonStyle} onClick={() => handleArrowRight()}>
                      <KeyboardArrowRightIcon />
                    </IconButton>
                    <IconButton sx={IconButtonStyle}>
                      <MoreHorizIcon />
                    </IconButton>
                    {/* Save Button */}
                    <IconButton color='success' sx={IconButtonStyle} onClick={handleSaveClick}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton color='error' sx={IconButtonStyle} onClick={handleContentClose}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
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

              <Grid item xs={12}>
                <Card sx={styles.cardComment}>
                  <Typography variant='h6' sx={{ my: 2 }}>
                    Add Comment
                  </Typography>
                  <TextField size='small' variant='filled' multiline rows={4} fullWidth />
                  <Typography variant='subtitle2'>Ctrl+Enter to add comment</Typography>
                  <Button variant='contained' sx={{ marginBlock: 2 }}>
                    comment
                  </Button>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default LayoutTwoPage
