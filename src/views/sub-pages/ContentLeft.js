// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import {
  Box,
  Card,
  Chip,
  Button,
  Typography,
  Divider,
  Grid,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  ButtonGroup,
  SvgIcon,
  IconButton,
  Menu,
  MenuItem,
  TablePagination,
  Pagination,
  Select
} from '@mui/material'
import { red } from '@mui/material/colors'

// ** Icons
import Image from 'next/image'
import sortAscending from 'public/images/icons/sort-ascending.png'
import sortDescending from 'public/images/icons/sort-descending.png'

const ContentLeft = ({ data, setData, handleRowClick, doctype, docStatusName }) => {
  // ** States
  const errorColor = red[500]
  const [showData, setShowData] = useState(data)

  // ** Sort Type
  const [sort, setSort] = useState('desc')
  const sortOptions = ['Last Updated On', `${doctype} Name`, 'ID', 'Created On', 'Most Used']
  const [anchorEl, setAnchorEl] = useState(null)
  const [sortOption, setSortOption] = useState('Last Updated On')
  const sortOptionOpen = Boolean(anchorEl)

  // ** Pagination
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(showData.length / rowsPerPage)

  // ** เรียงลำดับข้อมูล โดยใช้เงื่อนไข asc หรือ desc
  const handleSortClick = sort => {
    setSort(sort)
  }

  // ** เปิดเมนูเลือกการเรียงลำดับ
  const handleSortOptionClick = event => {
    setAnchorEl(event.currentTarget)
  }

  // ** ปิดเมนูเลือกการเรียงลำดับ
  const handleSortOptionClose = value => {
    setAnchorEl(null)
    setSortOption(value)
  }

  // ** เรียงลำดับข้อมูล
  useEffect(() => {
    console.log('sort', sort)
    let copiedData = [...data] // สำเนาข้อมูล

    const sortData = () => {
      switch (sortOption) {
        case 'Last Updated On':
          return (a, b) => new Date(a.modified) - new Date(b.modified)
        case `${doctype} Name`:
          return (a, b) => a.name.localeCompare(b.name)
        case 'ID':
          return (a, b) => a.id - b.id
        case 'Created On':
          return (a, b) => new Date(a.creation) - new Date(b.creation)
        case 'Most Used':
          // ยังไม่ได้ระบุการเรียงลำดับสำหรับ 'Most Used'
          return (a, b) => 0
        default:
          return (a, b) => 0
      }
    }

    setPage(1)

    if (sort === 'asc') {
      copiedData.sort(sortData())
    } else {
      copiedData.sort((a, b) => sortData()(b, a))
    }

    // เพิ่มเงื่อนไขเพื่อป้องกัน loop
    if (JSON.stringify(data) !== JSON.stringify(copiedData)) {
      setData(copiedData)
      setShowData(copiedData)
    }
  }, [sort, sortOption, doctype, data, setData])

  // ** ค้นหาข้อมูล โดยใช้ชื่อเป็นเงื่อนไข
  const handleIDSearch = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    const value = event.target.value

    if (value === '') {
      setShowData(data)
    } else {
      {
        // ค้นหาคำที่คล้ายคลึงกับคำที่คุณค้นหา
        const matches = data.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))

        setShowData(matches)
      }
    }
  }

  // ** เลือกจำนวนแถวต่อหน้า
  const handleRowPerPageSelect = event => {
    setRowsPerPage(event.target.value)
  }

  // ** เลือกหน้าที่จะแสดง
  const handlePageChange = (event, value) => {
    setPage(value)
  }

  // ** ตัดข้อมูลให้เหลือเฉพาะข้อมูลในหน้าปัจจุบัน
  const displayedData = showData.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  return (
    <Box sx={{ px: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 5 }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          {doctype}
        </Typography>
        <Button variant='contained' color='primary' size='small'>
          Create {doctype}
        </Button>
      </Box>
      <Box sx={{ backgroundColor: 'background.paper', borderRadius: '10px', pb: -1 }}>
        <Grid container spacing={2} rowSpacing={2}>
          <Grid item xs={12} sm={6} sx={{ p: 2, ml: 2 }}>
            <TextField fullWidth variant='outlined' size='small' label='ID Search' onChange={handleIDSearch} />
          </Grid>
          <Grid item xs sx={{ p: 2, justifyContent: 'end', display: 'flex' }}>
            <ButtonGroup variant='outlined'>
              {sort === 'asc' ? (
                <IconButton
                  sx={{
                    width: 40,
                    height: 40,
                    borderTopLeftRadius: '4px',
                    borderBottomLeftRadius: '4px',
                    borderBottomRightRadius: '0',
                    borderTopRightRadius: '0',
                    border: 1
                  }}
                  onClick={() => handleSortClick('desc')}
                >
                  <Image src={sortAscending} alt='sortAscending' />
                </IconButton>
              ) : (
                <IconButton
                  sx={{
                    width: 40,
                    height: 40,
                    borderTopLeftRadius: '4px',
                    borderBottomLeftRadius: '4px',
                    borderBottomRightRadius: '0',
                    borderTopRightRadius: '0',
                    border: 1
                  }}
                  onClick={() => handleSortClick('asc')}
                >
                  <Image src={sortDescending} alt='sortDescending' />
                </IconButton>
              )}
              <Button
                id='basic-button'
                aria-controls={sortOptionOpen ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={sortOptionOpen ? 'true' : undefined}
                onClick={handleSortOptionClick}
              >
                {sortOption}
              </Button>
              <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={sortOptionOpen}
                onClose={() => handleSortOptionClose(sortOption)}
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}
              >
                {sortOptions.map(option => (
                  <MenuItem key={option} onClick={() => handleSortOptionClose(option)}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </ButtonGroup>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* แสดงข้อมูล data row */}
          <Grid item xs={12} sx={{ p: 2, ml: 2, mb: -4 }}>
            <Box>
              {displayedData.map((item, index) => (
                <Box key={item.name} sx={{ pb: -1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      px: 2
                    }}
                    onClick={() => handleRowClick(item)}
                  >
                    <Typography variant='body1' sx={{ fontWeight: 'Bold' }}>
                      {item.name}
                    </Typography>
                    {item[docStatusName] === 0 ? (
                      <Chip label='Enable' color='success' size='small' />
                    ) : (
                      <Chip label='Disable' size='small' sx={{ bgcolor: errorColor, color: 'white' }} />
                    )}
                  </Box>
                  <Divider />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* แสดงผล page และ row per page */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignSelf: 'flex-end', alignItems: 'center', marginBlock: 2 }}>
            <Typography variant='body2'>Row per page:</Typography>
            <Select
              sx={{ width: 70, ml: 2 }}
              size='small'
              value={rowsPerPage}
              onChange={handleRowPerPageSelect}
              color='primary'
            >
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: 'flex', alignSelf: 'flex-end', alignItems: 'center', marginBlock: 2 }}>
            <Pagination
              count={totalPages}
              variant='outlined'
              shape='rounded'
              page={page}
              onChange={handlePageChange}
              color={'primary'}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ContentLeft
