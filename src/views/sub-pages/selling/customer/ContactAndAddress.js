// ** React Import
import React, { useState } from 'react'

// ** Mui Import
import { Box, TextField, Typography, Checkbox, Button, Grid } from '@mui/material'
import Address_Contact from './Primary_Address_Contact/Address_Contact'

const ContactAndAddress = ({ dataRow }) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  const [age, setAge] = useState('')

  const handleChange = event => {
    setAge(event.target.value)
  }

  return (
    <Grid>
      {/* ////////////////////////////////////// แถวที่ 1 ///////////////////////////////////////////// */}
      <Grid container spacing={2}>
        <Grid item sx={{ width: '100%' }}>
          <Address_Contact dataRow={dataRow} />
        </Grid>

        <Grid item>
          {/* ////////////// ไม่ได้ใส่ขนาดของ GRID เพราะจำทำให้ DORPDOWN -ขนาดไม่เท่า TEXT////////////////// */}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ContactAndAddress
