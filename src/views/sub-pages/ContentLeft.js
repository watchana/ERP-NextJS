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
  IconButton
} from '@mui/material'
import { red } from '@mui/material/colors'

// ** Icons
import Image from 'next/image'
import sortAscending from 'public/images/icons/sort-ascending.png'
import sortDescending from 'public/images/icons/sort-descending.png'

const ContentLeft = ({ menuColumn, data, handleRowClick, doctype, docStatusName }) => {
  // ** States
  const errorColor = red[500]
  const [dataFilter, setDataFilter] = useState(data)
  const [showData, setShowData] = useState([])
  const [sort, setSort] = useState('desc')
  const [sortType, setSortType] = useState()

  const handleSortClick = sort => {
    setSort(sort)
  }

  useEffect(() => {
    console.log('sort', sort)
    const copiedData = [...data] // สำเนาข้อมูล
    if (sort === 'asc') {
      console.log('sort จากน้อยไปมาก')

      const sortData = copiedData.sort((a, b) => {
        return a.modified.localeCompare(b.modified)
      })
      setDataFilter(sortData)
      setShowData(sortData)
    } else {
      console.log('sort จากมากไปน้อย')

      const sortData = copiedData.sort((a, b) => {
        return b.modified.localeCompare(a.modified)
      })
      setDataFilter(sortData)
      setShowData(sortData)
    }
  }, [sort, data])

  const handleIDSearch = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    const value = event.target.value

    if (value === '') {
      setShowData(dataFilter)
    } else {
      {
        // ค้นหาคำที่คล้ายคลึงกับคำที่คุณค้นหา
        const matches = data.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))

        setShowData(matches)
      }
    }
  }

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
      <Box sx={{ backgroundColor: 'background.paper', borderTopRightRadius: '10px', borderTopLeftRadius: '10px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} sx={{ p: 2, ml: 2 }}>
            <TextField fullWidth variant='outlined' size='small' label='ID Search' onChange={handleIDSearch} />
          </Grid>
          <Grid item xs sx={{ p: 2, ml: 2, justifyContent: 'end', display: 'flex' }}>
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
              <Button variant='outlined'>Last Updated On</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Divider />
        {showData.map((item, index) => (
          <Box key={item.name}>
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
              <Typography variant='h6'>{item.name}</Typography>
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
    </Box>
  )
}

export default ContentLeft
