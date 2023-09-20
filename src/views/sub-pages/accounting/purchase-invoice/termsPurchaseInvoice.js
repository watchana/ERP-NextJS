import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { useEffect, useState } from 'react'

const { Card, Grid, Typography } = require('@mui/material')

const TermsPurchaseInvoice = ({ dataRow }) => {
  const [dataPayment, setDataPayment] = useState([])

  const columns = [
    { field: 'idx', headerName: 'No', width: 150 },
    { field: 'payment_term', headerName: 'Payment Term', width: 150 },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'due_date', headerName: 'Due Date', width: 150 },
    { field: 'invoice_portion', headerName: 'Invoice Portion', width: 150 },
    { field: 'payment_amount', headerName: 'Payment Amount (THB)', width: 150 }
  ]

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}Purchase Invoice/${dataRow.name}`, {
        headers: {
          Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
        }
      })
      .then(res => {
        setDataPayment(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [dataRow])

  if (Object.values(dataPayment)?.length === 0) {
    return 'waiting...'
  }

  return (
    <Card sx={{ p: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h6'>Payment Terms</Typography>
          <Typography variant='subtitle2'>Payment Schedule</Typography>
          <DataGrid
            rows={dataPayment.payment_schedule}
            columns={columns}
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
    </Card>
  )
}

export default TermsPurchaseInvoice
