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
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import Icon from '@mdi/react'
import { mdiMenuDown } from '@mdi/js'

const ChartofAccounts = ({ dataRow, setDataRow }) => {
  const [collapseDescription, setCollapseDescription] = useState(false)

  const handleClickDescription = () => {
    setCollapseDescription(!collapseDescription)
  }

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

  const [accountDropdownBalanceMustBe, setAccountDropdownBalanceMustBe] = useState('')
  const [anchorElBalanceMustBe, setAnchorElBalanceMustBe] = useState(null)

  const handleAccountDropdownBalanceMustBeChange = event => {
    setAccountDropdownBalanceMustBe(event.target.value)
  }

  const handleMenuOpenBalanceMustBe = event => {
    setAnchorElBalanceMustBe(event.currentTarget)
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

  const checkboxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }

  if (!dataRow) return <Skeleton variant='rounded' width={210} height={60} />

  return (
    <Box>
      <Card
        sx={{
          borderTopLeftRadius: 0, // กำหนด borderRadius สำหรับมุมบนซ้าย
          borderTopRightRadius: 0, // กำหนด borderRadius สำหรับมุมบนขวา
          p: 2,
          mb: 2
        }}
      >
        <Grid container spacing={2} style={{ width: '100%', display: 'flex' }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <FormControlLabel control={<Checkbox checked={dataRow.disabled || false} />} label='Disable' />

            <Typography>Account Number</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              fullWidth
              size='small'
              variant='filled'
              value={dataRow?.account_number || ''}
              name='account_number'
              onChange={handleTextChange}
            />

            <FormControlLabel control={<Checkbox checked={dataRow.is_group || false} />} label='Is Group' />
            <Typography>company *</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              fullWidth
              size='small'
              variant='filled'
              value={dataRow.company || ''}
              name='company'
              onChange={handleTextChange}
            />

            <Typography>Root Type</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              fullWidth
              size='small'
              variant='filled'
              value={dataRow.root_type || ''}
              name='root_type'
              onChange={handleTextChange}
            />

            <Typography>Report Type</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              fullWidth
              size='small'
              variant='filled'
              label=''
              value={dataRow.report_type || ''}
              name='report_type'
              onChange={handleTextChange}
            />

            <Typography>Currency</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              fullWidth
              size='small'
              variant='filled'
              label=''
              value={dataRow.account_currency || ''}
              name='account_currency'
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>Parent Account *</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              fullWidth
              size='small'
              variant='filled'
              label=''
              value={dataRow.parent_account || ''}
              name='parent_account'
              onChange={handleTextChange}
            />

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
            <FormControlLabel
              control={<Checkbox checked={Boolean(dataRow.include_in_gross) || false} />}
              label='Include in gross'
            />
          </Grid>
        </Grid>
        <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
        <Grid item xs={12} sx={{ display: 'flex', marginBlock: 2 }}>
          <Box onClick={handleClickDescription} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 'medium' }}>Description</Typography>
            <IconButton size='small' disabled>
              {collapseDescription ? <ChevronUp /> : <ChevronDown />}
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Collapse in={collapseDescription}>
            <Divider sx={{ margin: 0 }} />
            <CardContent>
              <Typography variant='subtitle2'>Description</Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={dataRow.description || ''}
                name='description'
                onChange={handleTextChange}
              />

              <Box>
                <Typography variant='subtitle1'>Brand</Typography>
                <TextField fullWidth size='small' variant='filled' />
              </Box>
            </CardContent>
          </Collapse>
        </Grid>
      </Card>
    </Box>
  )
}

export default ChartofAccounts
