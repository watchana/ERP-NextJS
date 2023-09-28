// ** React Import
import React, { useEffect, useState } from 'react'

// ** Mui Import
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  TextareaAutosize,
  Typography
} from '@mui/material'

import Icon from '@mdi/react'
import { mdiMenuDown } from '@mdi/js'

// ** Dropdown
import {
  AccountDropdownType,
  AccountDropdownFrozen,
  AccountDropdownBalanceMustBe
} from 'src/dummy/sub-pages/accounting/account'

const ChartofAccounts = ({ dataRow, handleUpdateData }) => {
  const handleCheckboxChange = event => {
    const { name } = event.target
    if (name === 'is_stock_item') {
      setValuationRateOpen(!valuationRateOpen)
    }
    handleUpdateData(name, event.target.checked === true ? 1 : 0)
  }

  const handleTextChange = event => {
    handleUpdateData(event.target.name, event.target.value)
  }

  useEffect(() => {
    console.log('dataRow', dataRow)
  }, [dataRow])

  const styles = {
    card: {
      p: 2
    },
    textField: {
      bgcolor: 'grey.100'
    },
    box: {
      marginBlock: 2,
      mt: 4
    },
    redAsterisk: {
      color: 'red'
    },
    gridItem: {
      p: 1,
      width: '100%'
    }
  }

  if (!dataRow) return <Skeleton variant='rounded' width={210} height={60} />

  return (
    <Box>
      <Card sx={styles.card}>
        <Grid container spacing={2} sx={{ m: 0, p: 0, display: 'flex', width: '100%' }}>
          <Grid item sm={12} md={6} sx={styles.gridItem}>
            <Box sx={styles.box}>
              <FormControlLabel
                control={
                  <Checkbox checked={Boolean(dataRow.Disabled)} name='Disabled' onChange={handleCheckboxChange} />
                }
                label='Disabled'
              />
            </Box>

            <Box sx={styles.box}>
              <Typography>Account Number</Typography>
              <TextField
                fullWidth
                variant='outlined'
                name='account_number'
                value={dataRow.account_number}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>

            <Box sx={styles.box}>
              <FormControlLabel
                control={
                  <Checkbox
                    disabled
                    checked={Boolean(dataRow.is_group)}
                    name='is_group'
                    onChange={handleCheckboxChange}
                  />
                }
                label='is_group'
              />
            </Box>

            <Box sx={styles.box}>
              <Typography>
                company <span style={styles.redAsterisk}>*</span>
              </Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='company'
                value={dataRow.company}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>

            <Box sx={styles.box}>
              <Typography>Root Type</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='root_type'
                value={dataRow.root_type}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>

            <Box sx={styles.box}>
              <Typography>Report Type</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='report_type'
                value={dataRow.report_type}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>

            <Box sx={styles.box}>
              <Typography>Currency</Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='account_currency'
                value={dataRow.account_currency}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>
          </Grid>

          <Grid item sm md={6} sx={styles.gridItem}>
            <Box sx={styles.box}>
              <Typography>
                Parent Account <span style={styles.redAsterisk}>*</span>
              </Typography>
              <TextField
                fullWidth
                disabled
                variant='outlined'
                name='parent_account'
                value={dataRow.parent_account}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>

            <Box sx={styles.BoxStyle}>
              <Typography sx={{ my: 2 }}>Account Type</Typography>
              <Select
                fullWidth
                name='account_type'
                value={dataRow.account_type}
                onChange={handleTextChange}
                sx={{
                  backgroundColor: 'grey.100'
                }}
              >
                {AccountDropdownType.map(item => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant='subtitle2' sx={{ marginBottom: 5 }}>
                Setting Account Type helps in selecting this Account in transactions.
              </Typography>
            </Box>

            <Box sx={styles.BoxStyle}>
              <Typography sx={{ my: 2 }}>Frozen</Typography>
              <Select
                fullWidth
                name='freeze_account'
                value={dataRow.freeze_account}
                onChange={handleTextChange}
                sx={{
                  backgroundColor: 'grey.100'
                }}
              >
                {AccountDropdownFrozen.map(item => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant='subtitle2' sx={{ marginBottom: 5 }}>
                If the account is frozen, entries are allowed to restricted users.
              </Typography>
            </Box>

            <Box sx={styles.BoxStyle}>
              <Typography sx={{ my: 2 }}>Balance must be</Typography>
              <Select
                fullWidth
                name='balance_must_be'
                value={dataRow.balance_must_be}
                onChange={handleTextChange}
                sx={{
                  backgroundColor: 'grey.100'
                }}
              >
                {AccountDropdownBalanceMustBe.map(item => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Box sx={styles.box}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(dataRow.include_in_gross)}
                    name='include_in_gross'
                    onChange={handleCheckboxChange}
                  />
                }
                label='Include in gross'
              />
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default ChartofAccounts
