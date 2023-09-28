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
  Skeleton,
  TextField,
  TextareaAutosize,
  Typography
} from '@mui/material'

import Icon from '@mdi/react'
import { mdiMenuDown } from '@mdi/js'

const ChartofAccounts = ({ dataRow, setDataRow }) => {
  const [collapseDescription, setCollapseDescription] = useState(false)

  const handleCheckboxChange = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
    setDataRow({ ...dataRow, [event.target.name]: event.target.checked === true ? 1 : 0 })
  }

  const handleTextChange = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setDataRow({ ...dataRow, [event.target.name]: event.target.value })
  }

  const [anchorElType, setAnchorElType] = useState(null)
  const [selectedType, setSelectedType] = useState('')

  const handleMenuOpenType = event => {
    setAnchorElType(event.currentTarget)
  }

  const handleMenuCloseType = () => {
    setAnchorElType(null)
  }

  const handleTypeChange = value => {
    setSelectedType(value)
    handleMenuCloseType()
  }

  const accountDorpdownType = [
    { value: '', label: 'None' },
    { value: 'Accumulated Description', label: 'Accumulated Description' },
    { value: 'Asset Received But Not Billed', label: 'Asset Received But Not Billed' },
    { value: 'Bank', label: 'Bank' },
    { value: 'Cash', label: 'Cash' },
    { value: 'Chargeable', label: 'Chargeable' },
    { value: 'Capital Work in Progress', label: 'Capital Work in Progress' },
    { value: 'Cost of Goods Sold', label: 'Cost of Goods Sold' },
    { value: 'Depreciation', label: 'Depreciation' },
    { value: 'Equity', label: 'Equity' },
    { value: 'Expense Account', label: 'Expense Account' },
    { value: 'Expenses Included In Asset Valuation', label: 'Expenses Included In Asset Valuation' },
    { value: 'Expenses Included In Valuation', label: 'Expenses Included In Valuation' },
    { value: 'Fixed Asset', label: 'Fixed Asset' },
    { value: 'Income Account', label: 'Income Account' },
    { value: 'Payable', label: 'Payable' },
    { value: 'Receivable', label: 'Receivable' },
    { value: 'Round Off', label: 'Round Off' },
    { value: 'Stock', label: 'Stock' },
    { value: 'Stock Adjustment', label: 'Stock Adjustment' },
    { value: 'Stock Received But Not Billed', label: 'Stock Received But Not Billed' },
    { value: 'Service Received But Not Billed', label: 'Service Received But Not Billed' },
    { value: 'Tax', label: 'Tax' },
    { value: 'Temporary', label: 'Temporary' }
  ]

  const [anchorElFrozen, setAnchorElFrozen] = useState(null)
  const [selectedFrozen, setSelectedFrozen] = useState('')

  const handleMenuOpenFrozen = event => {
    setAnchorElFrozen(event.currentTarget)
  }

  const handleMenuCloseFrozen = () => {
    setAnchorElFrozen(null)
  }

  const handleFrozenChange = value => {
    setSelectedFrozen(value)
    handleMenuCloseFrozen()
  }

  const accountDropdownFrozen = [
    { value: '', label: 'None' },
    { value: 'No', label: 'No' },
    { value: 'Yes', label: 'Yes' }
  ]

  const [anchorElBalanceMustBe, setAnchorElBalanceMustBe] = useState(null)
  const [selectedBalanceMustBe, setSelectedBalanceMustBe] = useState('')

  const handleMenuOpenBalanceMustBe = event => {
    setAnchorElBalanceMustBe(event.currentTarget)
  }

  const handleBalanceMustBe = value => {
    setSelectedBalanceMustBe(value)
    handleMenuCloseFrozen()
  }

  const handleMenuCloseBalanceMustBe = () => {
    setAnchorElBalanceMustBe(null)
  }

  const accountDorpdownBalanceMustBe = [
    { value: '', label: 'None' },
    { value: 'Debit ', label: 'Debit' },
    { value: 'Credit', label: 'Credit' }
  ]

  useEffect(() => {
    console.log('dataRow', dataRow)
  }, [dataRow])

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
      mt: 4
    },
    redAsterisk: {
      color: 'red'
    },
    gridItem: {
      p: 0
    }
  }

  if (!dataRow) return <Skeleton variant='rounded' width={210} height={60} />

  return (
    <Box>
      <Card sx={styles.card}>
        <Grid container spacing={3}>
          <Grid item sm={12} md={6} sx={styles.gridItem}>
            <Box sx={styles.box}>
              <FormControlLabel
                control={
                  <Checkbox checked={Boolean(dataRow.disabled)} name='disabled' onChange={handleCheckboxChange} />
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
                  <Checkbox checked={Boolean(dataRow.is_group)} name='is_group' onChange={handleCheckboxChange} />
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
                variant='outlined'
                name='account_currency'
                value={dataRow.account_currency}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>
          </Grid>
          <Grid item sm={12} md={6} sx={styles.gridItem}>
            <Box sx={styles.box}>
              <Typography>
                Parent Account <span style={styles.redAsterisk}>*</span>
              </Typography>
              <TextField
                fullWidth
                variant='outlined'
                name='parent_account'
                value={dataRow.parent_account}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>

            {/* !! */}
            <Typography>Account Type</Typography>
            <TextField
              fullWidth
              size='small'
              variant='filled'
              value={selectedType || dataRow.account_type}
              onClick={handleMenuOpenType}
              InputProps={{
                endAdornment: (
                  <span onClick={handleMenuOpenType} style={{ cursor: 'pointer' }}>
                    <Icon path={mdiMenuDown} size={1} />
                  </span>
                )
              }}
            />
            <Menu
              anchorEl={anchorElType}
              open={Boolean(anchorElType)}
              onClose={handleMenuCloseType}
              PaperProps={{
                style: {
                  maxHeight: 250, // ความสูงสูงสุดของ dropdown
                  width: 350 // ความกว้างของ dropdown
                }
              }}
            >
              {accountDorpdownType.map(option => (
                <MenuItem key={option.value} value={option.value} onClick={() => handleTypeChange(option.value)}>
                  {option.label}
                </MenuItem>
              ))}
            </Menu>

            <Typography sx={{ marginBottom: 5 }}>
              Setting Account Type helps in selecting this Account in transactions.
            </Typography>

            <Typography>Frozen</Typography>
            <TextField
              fullWidth
              size='small'
              variant='filled'
              value={selectedFrozen || dataRow.freeze_account}
              name='description'
              onClick={handleMenuOpenFrozen}
              InputProps={{
                endAdornment: (
                  <span onClick={handleMenuOpenFrozen} style={{ cursor: 'pointer' }}>
                    <Icon path={mdiMenuDown} size={1} />
                  </span>
                )
              }}
            />
            <Menu
              anchorEl={anchorElFrozen}
              open={Boolean(anchorElFrozen)}
              onClose={handleMenuCloseFrozen}
              PaperProps={{
                style: {
                  maxHeight: 250, // ความสูงสูงสุดของ dropdown
                  width: 350 // ความกว้างของ dropdown
                }
              }}
            >
              {accountDropdownFrozen.map(option => (
                <MenuItem key={option.value} value={option.value} onClick={() => handleFrozenChange(option.value)}>
                  {option.label}
                </MenuItem>
              ))}
            </Menu>

            <Typography sx={{ marginBottom: 5 }}>
              If the account is frozen, entries are allowed to restricted users.
            </Typography>

            <Typography>Balance must be</Typography>
            <TextField
              fullWidth
              size='small'
              variant='filled'
              value={selectedBalanceMustBe || dataRow.freeze_account}
              name='description'
              onClick={handleMenuOpenBalanceMustBe}
              InputProps={{
                endAdornment: (
                  <span onClick={handleMenuOpenBalanceMustBe} style={{ cursor: 'pointer' }}>
                    <Icon path={mdiMenuDown} size={1} />
                  </span>
                )
              }}
            />
            <Menu
              anchorEl={anchorElBalanceMustBe}
              open={Boolean(anchorElBalanceMustBe)}
              onClose={handleMenuCloseBalanceMustBe}
              PaperProps={{
                style: {
                  maxHeight: 250, // ความสูงสูงสุดของ dropdown
                  width: 350 // ความกว้างของ dropdown
                }
              }}
            >
              {accountDorpdownBalanceMustBe.map(option => (
                <MenuItem key={option.value} value={option.value} onClick={() => handleBalanceMustBe(option.value)}>
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
            <FormControlLabel
              control={<Checkbox checked={Boolean(dataRow.balance_must_be) || false} />}
              label='Include in gross'
            />
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default ChartofAccounts
