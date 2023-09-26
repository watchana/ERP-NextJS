import React from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Mui Import
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

// ** Mui X Import
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

// ** Custom Components
import SelectCurrency from '../select/select-currency'

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  {
    title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964
  },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  {
    title: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983
  },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  {
    title: 'Eternal Sunshine of the Spotless Mind',
    year: 2004
  },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 }
]

const InputListRenderer = ({ inputConfigs, onDataChange }) => {
  const router = useRouter()
  const theme = useTheme()

  const InputList = inputConfigs.map(input => {
    if (input.type === 'text') {
      return (
        <TextField
          size='small'
          key={input.label}
          label={input.label}
          value={input.value}
          onChange={event => onDataChange(event.target.name, event.target.value)}
          fullWidth
        />
      )
    } else if (input.type === 'textDropdown') {
      return (
        <Autocomplete
          key={input.label}
          size='small'
          value={input.value} // Control the value
          onChange={(event, value) => {
            if (value === `+ Create a new ${input.label}`) {
              // ทำการ route ไปยังหน้าที่คุณต้องการ
              // สมมติว่าคุณต้องการไปยัง `/create/${input.label.toLowerCase()}`
              router.push(`/create/${input.label.toLowerCase()}`)
            } else {
              // จัดการการเปลี่ยนแปลงค่าอย่างปกติ (หากต้องการ)
              onDataChange(input.label, value)
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
          freeSolo
          disableClearable
          options={[
            ...(input.data?.map(option => option.name) ?? []),
            `+ Create a new ${input.label}`,
            '+ Advanced Search'
          ]}
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
      )
    } else if (input.type === 'checkbox') {
      // checkbox ในรูปแบบของ boolean
      return (
        <FormControlLabel
          key={input.label}
          control={
            <Checkbox
              value={input.value}
              name={input.name}
              onChange={event => onDataChange(event.target.name, event.target.checked)}
            />
          }
          label={input.label}
        />
      )
    } else if (input.type === 'select' && input.label === 'Currency') {
      return <SelectCurrency key={input.label} currency={input.value} setCurrency={input.setValue} />
    } else if (input.type === 'select') {
      // ? select
      return (
        <FormControl fullWidth key={input.label}>
          <InputLabel id={input.label}>{input.label}</InputLabel>
          <Select
            labelId='input.label'
            size='small'
            value={input.value}
            label={input.label}
            name={input.name}
            onChange={event => onDataChange(event.target.name, event.target.value)}
          >
            {input.data.map(item => (
              <MenuItem key={item.name} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )
    } else if (input.type === 'date') {
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs} key={input.label}>
          <DatePicker
            sx={{
              backgroundColor: 'grey.100',
              '& .MuiInputBase-root': {
                height: '40px'
              }
            }}
            format='DD-MM-YYYY'
            value={input.value}
            onChange={date => onDataChange(input.name, date.format('DD-MM-YYYY'))}
            renderInput={params => <TextField {...params} size='small' variant='outlined' />}
          />
        </LocalizationProvider>
      )
    } else {
      console.warn(`Unknown input type: ${input.type}`)

      return null
    }
  })

  return (
    <Grid container spacing={2} rowSpacing={3}>
      {InputList.map((InputComponent, index) => (
        <Grid item xs={12} sm={4} md={3} lg={2} key={index}>
          {InputComponent}
        </Grid>
      ))}
    </Grid>
  )
}

export default InputListRenderer
