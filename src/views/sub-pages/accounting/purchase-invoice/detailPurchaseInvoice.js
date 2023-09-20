import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Collapse,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { ChevronDown, ChevronUp } from 'mdi-material-ui'
import { useEffect, useState } from 'react'

const DetailPurchaseInvoice = ({ dataRow, setDataRow }) => {
  const [collapseCurry, setCollapseCurry] = useState(false)
  const [collapseAdditional, setCollapeAdditional] = useState(false)

  const handleCollapseCurry = () => {
    setCollapseCurry(!collapseCurry)
  }

  const handleCollapseAdditional = () => {
    setCollapeAdditional(!collapseAdditional)
  }

  const handleTextChange = event => {
    console.log('Text ถูกเปลี่ยนแปลงเป็น:', event.target.value)
    setDataRow({ ...dataRow, [event.target.name]: event.target.value })
  }

  const handleCheckbox = event => {
    console.log('Checkbox ถูกเปลี่ยนแปลงเป็น:', event.target.checked)
    setDataRow({ ...dataRow, [event.target.name]: event.target.checked === true ? 1 : 0 })
  }

  const checkboxStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }

  const [dataPurchaseInvoice, setDataPurchaseInvoice] = useState([])

  const columnsPurchase = [
    { field: 'item_code', headerName: 'Item', width: 150 },
    { field: 'qty', headerName: 'Accepted Qty', width: 300 },
    { field: 'rate', headerName: 'Rate', width: 300 },
    { field: 'rate', headerName: 'Rate (THB)', width: 300 },
    { field: 'total', headerName: 'Total (THB)', width: 300 }
  ]

  const columnsPurchaseTaxes = [
    { field: 'idx', headerName: 'No', width: 150 },
    { field: 'charge_type', headerName: 'Type', width: 150 },
    { field: 'account_head', headerName: 'Account Head', width: 300 },
    { field: 'rate', headerName: 'Rate', width: 150 },
    { field: 'tax_amount', headerName: 'Amount (THB)', width: 300 },
    { field: 'total', headerName: 'Total (THB)', width: 300 }
  ]

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}Purchase Invoice/${dataRow.name}`, {
        headers: {
          Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
        }
      })
      .then(res => {
        setDataPurchaseInvoice(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [dataRow])

  if (Object.values(dataPurchaseInvoice)?.length === 0) {
    return 'waiting...'
  }

  return (
    <Card sx={{ p: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Typography sx={{ margin: 1 }}>Supplier</Typography>
          {/* คลิกแล้วสามารถลิงค์ไปยัง Supplier */}
          <TextField
            size='small'
            variant='filled'
            value={dataRow.supplier}
            fullWidth
            onChange={handleTextChange}
            name='supplier'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Typography sx={{ margin: 1 }}>Date</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.posting_date}
            fullWidth
            onChange={handleTextChange}
            name='posting_date'
            disabled
          />

          <Typography sx={{ margin: 1 }}>Posting Time</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.posting_time}
            fullWidth
            onChange={handleTextChange}
            name='posting_time'
            disabled
          />

          <Typography sx={{ margin: 1 }}>Due Date</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.due_date}
            fullWidth
            onChange={handleTextChange}
            name='due_date'
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Grid item xs={12} md={4}>
            <Grid item xs={12} sx={checkboxStyle}>
              <Checkbox
                checked={dataRow.is_paid === 1 ? true : false}
                name='is_paid'
                onChange={handleCheckbox}
                disabled
              />
              <Typography variant='subtitle2'>Is Paid</Typography>
            </Grid>
          </Grid>

          <Grid sx={checkboxStyle}>
            <Checkbox
              checked={dataRow.is_return === 1 ? true : false}
              name='is_return'
              onChange={handleCheckbox}
              disabled
            />
            <Typography variant='subtitle2'>Is Return (Debit Note)</Typography>
          </Grid>

          <Grid sx={checkboxStyle}>
            <Checkbox
              checked={dataRow.apply_tds === 1 ? true : false}
              name='apply_tds'
              onChange={handleCheckbox}
              disabled
            />
            <Typography variant='subtitle2'>Apply Tax Withholding Amount</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid>
        <Box sx={{ mt: 10, display: 'flex' }}>
          <Button size='small' variant='filled' label='' onClick={handleCollapseCurry}>
            BOM Info
          </Button>
          <Box>
            <CardActions className='card-action-dense'>
              <IconButton size='small' onClick={handleCollapseCurry}>
                {collapseCurry ? (
                  <ChevronUp sx={{ fontSize: '1.875rem' }} />
                ) : (
                  <ChevronDown sx={{ fontSize: '1.875rem' }} />
                )}
              </IconButton>
            </CardActions>
          </Box>
        </Box>

        <Collapse in={collapseCurry}>
          <Divider sx={{ margin: 0 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography sx={{ margin: 1 }}>currency</Typography>
              <TextField
                size='small'
                variant='filled'
                value={dataRow.currency}
                fullWidth
                onChange={handleTextChange}
                name='currency'
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography sx={{ margin: 1 }}>Price List</Typography>
              {/* คลิกแล้วสามารถลิงค์ไปยัง Supplier */}
              <TextField
                size='small'
                variant='filled'
                value={dataRow.buying_price_list}
                fullWidth
                onChange={handleTextChange}
                name='buying_price_list'
              />

              <Grid sx={checkboxStyle}>
                <Checkbox
                  checked={dataRow.ignore_pricing_rule === 1 ? true : false}
                  name='ignore_pricing_rule'
                  onChange={handleCheckbox}
                  disabled
                />
                <Typography variant='subtitle2'>Ignore Pricing Rule</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography variant='h6' sx={{ p: 2 }}>
            Items
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Grid sx={checkboxStyle}>
            <Checkbox
              checked={dataRow.update_stock === 1 ? true : false}
              name='update_stock'
              onChange={handleCheckbox}
              disabled
            />
            <Typography variant='subtitle2'>Update Stock</Typography>
          </Grid>

          <Grid sx={checkboxStyle}>
            <Checkbox
              checked={dataRow.is_subcontracted === 1 ? true : false}
              name='is_subcontracted'
              onChange={handleCheckbox}
              disabled
            />
            <Typography variant='subtitle2'>Is Subcontracted</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>Items</Typography>
          <DataGrid
            rows={dataPurchaseInvoice.items}
            columns={columnsPurchase}
            getRowId={row => row.name}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }
              }
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography sx={{ margin: 1 }}>Total Quantity</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.total_qty}
            fullWidth
            onChange={handleTextChange}
            name='total_qty'
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography sx={{ margin: 1 }}>Total (THB)</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.total}
            fullWidth
            onChange={handleTextChange}
            name='total'
            disabled
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12}>
          <Typography>Purchase Taxes and Charges</Typography>
          <DataGrid
            rows={dataPurchaseInvoice.taxes}
            columns={columnsPurchaseTaxes}
            getRowId={row => row.name}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }
              }
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography sx={{ margin: 1 }}>Taxes and Charges Added (THB)</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.taxes_and_charges_added}
            fullWidth
            onChange={handleTextChange}
            name='taxes_and_charges_added'
            disabled
          />

          <Typography sx={{ margin: 1 }}>Taxes and Charges Deducted (THB)</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.taxes_and_charges_deducted}
            fullWidth
            onChange={handleTextChange}
            name='taxes_and_charges_deducted'
            disabled
          />

          <Typography sx={{ margin: 1 }}>Total Taxes and Charges (THB)</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.total_taxes_and_charges}
            fullWidth
            onChange={handleTextChange}
            name='total_taxes_and_charges'
            disabled
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h6' sx={{ p: 2 }}>
            Totals
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography sx={{ margin: 1 }}>Grand Total (THB)</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.grand_total}
            fullWidth
            onChange={handleTextChange}
            name='grand_total'
            disabled
          />

          <Grid sx={checkboxStyle}>
            <Checkbox
              checked={dataRow.use_company_roundoff_cost_center === 1 ? true : false}
              name='use_company_roundoff_cost_center'
              onChange={handleCheckbox}
              disabled
            />
            <Typography variant='subtitle2'>Use Company Default Round Off Cost Center</Typography>
          </Grid>

          <Grid sx={checkboxStyle}>
            <Checkbox
              checked={dataRow.disable_rounded_total === 1 ? true : false}
              name='disable_rounded_total'
              onChange={handleCheckbox}
              disabled
            />
            <Typography variant='subtitle2'>Disable Rounded Total</Typography>
          </Grid>

          <Typography sx={{ margin: 1 }}>In Words (THB)</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.in_words}
            fullWidth
            onChange={handleTextChange}
            name='in_words'
            disabled
          />

          <Typography sx={{ margin: 1 }}>Outstanding Amount (THB)</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.outstanding_amount}
            fullWidth
            onChange={handleTextChange}
            name='outstanding_amount'
            disabled
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography sx={{ margin: 1 }}>Rounding Adjustment (THB)</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.rounding_adjustment}
            fullWidth
            onChange={handleTextChange}
            name='rounding_adjustment'
            disabled
          />

          <Typography sx={{ margin: 1 }}>Rounded Total (THB)</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.rounded_total}
            fullWidth
            onChange={handleTextChange}
            name='rounded_total'
            disabled
          />

          <Typography sx={{ margin: 1 }}>Total Advance (THB)</Typography>
          <TextField
            size='small'
            variant='filled'
            value={dataRow.total_advance}
            fullWidth
            onChange={handleTextChange}
            name='total_advance'
            disabled
          />
        </Grid>
      </Grid>
      <Grid>
        <Box sx={{ mt: 10, display: 'flex' }}>
          <Button size='small' variant='filled' label='' onClick={handleCollapseAdditional}>
            Additional Discount
          </Button>
          <Box>
            <CardActions className='card-action-dense'>
              <IconButton size='small' onClick={handleCollapseAdditional}>
                {collapseAdditional ? (
                  <ChevronUp sx={{ fontSize: '1.875rem' }} />
                ) : (
                  <ChevronDown sx={{ fontSize: '1.875rem' }} />
                )}
              </IconButton>
            </CardActions>
          </Box>
        </Box>

        <Collapse in={collapseAdditional}>
          <Divider sx={{ margin: 0 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography sx={{ margin: 1 }}>Apply Additional Discount On</Typography>
              <TextField
                size='small'
                variant='filled'
                value={dataRow.apply_discount_on}
                fullWidth
                onChange={handleTextChange}
                name='apply_discount_on'
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography sx={{ margin: 1 }}>Additional Discount Percentage</Typography>
              <TextField
                size='small'
                variant='filled'
                value={dataRow.additional_discount_percentage}
                fullWidth
                onChange={handleTextChange}
                name='additional_discount_percentage'
                disabled
              />

              <Typography sx={{ margin: 1 }}>Additional Discount Amount (THB)</Typography>
              <TextField
                size='small'
                variant='filled'
                value={dataRow.discount_amount}
                fullWidth
                onChange={handleTextChange}
                name='discount_amount'
                disabled
              />
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
    </Card>
  )
}

export default DetailPurchaseInvoice
