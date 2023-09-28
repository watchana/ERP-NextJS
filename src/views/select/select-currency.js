import React, { useEffect, useState } from 'react'

// ** Mui Import
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'

// ** Axios Import
import axios from 'axios'

const SelectCurrency = ({ currency, setCurrency }) => {
  const [currencyList, setCurrencyList] = useState('')

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}Currency?fields=["*"]&filters=[["enabled", "=", 1]]`, {
        headers: {
          Authorization: `${process.env.NEXT_PUBLIC_API_TOKEN}`
        }
      })
      .then(response => {
        setCurrencyList(response.data.data)
        console.log(response.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const handleChange = event => {
    setCurrency(event.target.value)
  }

  if (!currencyList) {
    return <TextField disabled label='Error' fullWidth />
  }

  return (
    <FormControl fullWidth key={'currency'}>
      <InputLabel>Currency</InputLabel>
      <Select value={currency} label='Currency' onChange={handleChange}>
        {currencyList.map(item => (
          <MenuItem key={item.name} value={item.name}>
            {item.currency_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectCurrency
