import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import SelectCurrency from '../select/select-currency'

const InputListRenderer = ({ inputConfigs, filterConfig, onDataChange }) => {
  const router = useRouter()
  const theme = useTheme()

  // Create refs for each input dynamically
  const refs = inputConfigs.reduce((acc, input) => {
    if (input.type === 'textDropdown') {
      acc[input.name] = React.createRef()
    }

    return acc
  }, {})

  return (
    <Grid container spacing={2} rowSpacing={3}>
      {inputConfigs.map(input => {
        const commonOptions = [
          ...(input.data?.map(option => option.name) ?? []),
          `+ Create a new ${input.label}`,
          '+ Advanced Search'
        ]

        switch (input.type) {
          case 'text':
            return (
              <Grid item xs={12} sm={4} md={3} lg={2} key={input.label}>
                <TextField
                  size='small'
                  label={input.label}
                  value={filterConfig[input.name]}
                  name={input.name}
                  onChange={event => onDataChange(event.target.name, event.target.value)}
                  fullWidth
                />
              </Grid>
            )

          case 'textDropdown':
            return (
              <Grid item xs={12} sm={4} md={3} lg={2} key={input.label}>
                <Autocomplete
                  name={input.name}
                  ref={refs[input.name]}
                  size='small'
                  value={filterConfig[input.name]}
                  onBlur={() => {
                    const inputValue = refs[input.name]?.current?.querySelector('input').value
                    if (!commonOptions.includes(inputValue)) {
                      onDataChange(input.name, '')
                    }
                  }}
                  onChange={(event, value) => {
                    if (value === `+ Create a new ${input.label}`) {
                      router.push(`/create/${input.label.toLowerCase()}`)
                    } else {
                      onDataChange(input.name, value)
                    }
                  }}
                  renderOption={(props, option, { selected }) => {
                    const isSpecialOption = option === `+ Create a new ${input.label}` || option === '+ Advanced Search'

                    return (
                      <li
                        {...props}
                        style={{
                          backgroundColor: isSpecialOption ? theme.palette.primary.main : undefined,
                          color: isSpecialOption ? theme.palette.primary.contrastText : undefined,
                          marginBlock: 1,
                          borderRadius: 10
                        }}
                      >
                        {option}
                      </li>
                    )
                  }}
                  filterOptions={(options, { inputValue }) => {
                    const searchTerm = inputValue.toLowerCase()

                    const filteredOptions = options.filter(
                      option =>
                        option.toLowerCase().includes(searchTerm) ||
                        [`+ Create a new ${input.label}`, '+ Advanced Search'].includes(option)
                    )

                    return [
                      ...filteredOptions.filter(
                        option => ![`+ Create a new ${input.label}`, '+ Advanced Search'].includes(option)
                      ),
                      `+ Create a new ${input.label}`,
                      '+ Advanced Search'
                    ]
                  }}
                  freeSolo
                  disableClearable
                  options={commonOptions}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label={input.label}
                      InputProps={{
                        ...params.InputProps,
                        type: 'search'
                      }}
                    />
                  )}
                />
              </Grid>
            )

          case 'date':
            return (
              <Grid item xs={12} sm={4} md={3} lg={2} key={input.label}>
                <LocalizationProvider dateAdapter={AdapterDayjs} key={input.label}>
                  <DatePicker
                    sx={{
                      backgroundColor: 'grey.100',
                      '& .MuiInputBase-root': {
                        height: '40px'
                      }
                    }}
                    format='DD-MM-YYYY'
                    value={filterConfig[input.name]}
                    onChange={date => onDataChange(input.name, date.format('DD-MM-YYYY'))}
                    renderInput={params => <TextField {...params} size='small' variant='outlined' />}
                  />
                </LocalizationProvider>
              </Grid>
            )

          case 'select':
            return (
              <Grid item xs={12} sm={4} md={3} lg={2} key={input.label}>
                <FormControl size='small' fullWidth>
                  <InputLabel id={input.label}>{input.label}</InputLabel>
                  <Select
                    labelId={input.label}
                    name={input.name}
                    value={filterConfig[input.name]}
                    onChange={event => onDataChange(input.name, event.target.value)}
                  >
                    {input.data.map(option => (
                      <MenuItem key={option.name} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )

          case 'checkbox':
            return (
              <Grid item xs={12} sm={4} md={3} lg={2} key={input.label}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={input.name}
                      checked={filterConfig[input.name]}
                      onChange={event => onDataChange(event.target.name, event.target.checked)}
                    />
                  }
                  label={input.label}
                />
              </Grid>
            )

          case 'currency':
            return (
              <Grid item xs={12} sm={4} md={3} lg={2} key={input.label}>
                <SelectCurrency
                  label={input.label}
                  value={filterConfig[input.name]}
                  onChange={value => onDataChange(input.name, value)}
                />
              </Grid>
            )

          // ... Handle other input types similar to the above

          default:
            console.warn(`Unknown input type: ${input.type}`)

            return null
        }
      })}
    </Grid>
  )
}

export default InputListRenderer
