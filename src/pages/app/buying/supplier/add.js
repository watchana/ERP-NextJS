import { Box, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { green } from '@mui/material/colors' // นำเข้าสีเขียวจาก Material-UI

function GitHubContributionsGraph() {
  // สร้างข้อมูล GitHub contributions ของคุณ
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

  return (
    <Box>
      <Typography>GitHub Contributions</Typography>
      <select value={selectedYear} onChange={handleYearChange}>
        <option value=''>All Years</option>
        {allYears.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <CalendarHeatmap
        startDate={new Date(`${selectedYear || allYears[0]}-01-01`)}
        endDate={new Date(`${selectedYear || allYears[0]}-12-31`)}
        values={contributionsData}
        classForValue={value => {
          if (!value) {
            return 'color-empty'
          }

          const date = new Date(value.date)
          const dayOfWeek = date.getDay() // 0=Sunday, 1=Monday, ..., 6=Saturday

          // Check if the day is Monday to Friday (1 to 5)
          if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            return `color-github-contributions-${green['A400']}`
          } else {
            return 'color-empty' // Set to empty for other days (Saturday and Sunday)
          }
        }}
        titleForValue={value => {
          if (!value) {
            return 'No contributions on this day'
          }
          const date = new Date(value.date)
          const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })

          return `Contributions on ${formattedDate}: ${value.count}`
        }}
      />
    </Box>
  )
}

export default GitHubContributionsGraph
