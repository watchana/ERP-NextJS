// ** React Import
import React, { useEffect, useState } from 'react'

// ** Mui Import
import {
  Grid,
  Box,
  Divider,
  Card,
  Skeleton,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
  Select,
  MenuItem,
  Chip
} from '@mui/material'

import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { green } from '@mui/material/colors'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { GridExpandMoreIcon } from '@mui/x-data-grid'

const styles = {
  card: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    p: 2
  },
  textField: {
    bgcolor: 'grey.100'
  },
  box: {
    marginBlock: 2,
    mt: 2
  }
}

const Dashboard_sup = ({ dataRow, handleUpdateData }) => {
  // ทดลองต่าที่แสดงจุดใน ปฏิทิน
  const initialContributionsData = [
    { date: '2022-02-01', count: 5 },
    { date: '2023-01-02', count: 0 },
    { date: '2023-01-03', count: 10 },
    { date: '2023-03-03', count: 10 },
    { date: '2024-06-03', count: 10 },
    { date: '2024-02-03', count: 10 },
    { date: '2024-03-03', count: 10 },
    { date: '2025-05-03', count: 10 },
    { date: '2025-05-05', count: 10 },
    { date: '2026-05-08', count: 10 }
  ]

  const [selectedYear, setSelectedYear] = useState('')
  const [contributionsData, setContributionsData] = useState(initialContributionsData)

  const allYears = Array.from(new Set(initialContributionsData.map(item => item.date.slice(0, 4)))).sort(
    (a, b) => b - a
  )

  useEffect(() => {
    // ตั้งค่า selectedYear เป็นปีปัจจุบัน
    const currentYear = new Date().getFullYear()
    setSelectedYear(currentYear.toString())
  }, [])

  const handleYearChange = event => {
    const year = event.target.value
    setSelectedYear(year)
    const filteredData = initialContributionsData.filter(item => item.date.startsWith(year))
    setContributionsData(filteredData)
  }

  useEffect(() => {
    console.log('dataRow', dataRow)
  }, [dataRow])

  if (!dataRow) return <Skeleton variant='rounded' width={210} height={60} />

  const styles = {
    card: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      p: 2
    },
    textField: {
      bgcolor: 'grey.100'
    },
    box: {
      marginBlock: 2
    }
  }

  module.exports = {
    images: {
      domains: ['thethaiger.com']
    }
  }

  return (
    <Box sx={styles.box}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Activity</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box item textAlign='right'>
            <Select
              width={'50px'}
              value={selectedYear}
              onChange={handleYearChange}
              sx={{
                backgroundColor: 'grey.100',
                fontSize: '10px',
                height: '30px', // ปรับความสูงลง
                width: '100px', // ปรับความกว้างลง
                maxWidth: '100%', // จำกัดความกว้างสูงสุดให้เป็น 100%
                textAlign: 'left'
              }}
            >
              {allYears.map(year => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <CalendarHeatmap
            startDate={new Date(`${selectedYear || allYears[0]}-01-01`)}
            endDate={new Date(`${selectedYear || allYears[0]}-12-31`)}
            values={contributionsData}
            classForValue={value => {
              if (!value) {
                return 'color-empty'
              }

              return `color-github-contributions-${green['A400']}` // ใช้สีเขียวจาก Material-UI
            }}
            titleForValue={value => {
              if (!value) {
                return 'No contributions on this day'
              }
              const date = new Date(value.date)

              const formattedDate = date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })

              return `Contributions on ${formattedDate}: ${value.count}`
            }}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
          <Typography>Connections</Typography>
        </AccordionSummary>
        <Divider sx={{ margin: 0, my: 1, width: '100%' }} />
        <AccordionDetails>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Typography sx={{ fontWeight: 'bold' }}>Procurement</Typography>
                    <Box sx={styles.box}>
                      <Chip label='Request for Quotation' />
                      <Chip label='+' />
                    </Box>
                    <Box sx={styles.box}>
                      <Chip label='Supplier Quotation' />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography sx={{ fontWeight: 'bold' }}>Orders</Typography>
                    <Box sx={styles.box}>
                      <Chip label=' Purchase Order' />
                    </Box>
                    <Box sx={styles.box}>
                      <Chip label='Purchase Receipt' />
                      <Chip label='+' />
                    </Box>
                    <Box sx={styles.box}>
                      <Chip label='Journal Entry' />
                      <Chip label='+' />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography sx={{ fontWeight: 'bold' }}>Payments</Typography>
                    <Box sx={styles.box}>
                      <Chip label='Purchase Invoice' />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={3} sx={{ mt: 10 }}>
                  <Grid item xs={12} sm={4}>
                    <Typography>Pricing</Typography>
                    <Box sx={styles.box}>
                      <Chip label='Auto Repeat' />
                      <Chip label='+' />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography>Allowed Items</Typography>
                    <Box sx={styles.box}>
                      <Chip label='Auto Repeat' />
                      <Chip label='+' />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default Dashboard_sup
