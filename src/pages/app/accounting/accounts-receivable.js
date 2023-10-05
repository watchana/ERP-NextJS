import React, { useEffect, useState } from 'react'

// ** Mui Import
import { Button, Divider } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import dayjs from 'dayjs'

// ** Custom Components
import LayoutOnePageFilter from 'src/views/sub-pages/LayoutOnePageFilter'
import InputListRenderer from 'src/views/input/InputListRenderer'
import axios from 'axios'

// ? สำหรับเพิ่มปุ่มด้านบนขวาของหน้าต่าง
const button = [
  {
    component: <Button>test1</Button>,
    id: 'button1'
  },
  {
    component: <Button>test2</Button>,
    id: 'button2'
  }
]

const columns = [
  { field: 'id', headerName: '', width: 70 },
  {
    field: 'posting_date',
    headerName: 'Posting Date',
    width: 130,
    valueFormatter: params => {
      return dayjs(params.value).format('DD-MM-YYYY')
    }
  },
  { field: 'party', headerName: 'Customer', width: 250 },
  { field: 'account', headerName: 'Receivable Account', width: 400 },
  {
    field: 'customer',
    headerName: 'Customer Contact',
    width: 130,
    valueGetter: params => params.row.customer?.customer_primary_contact
  },
  { field: 'cost_center', headerName: 'Cost Center', width: 130 },
  { field: 'voucher_type', headerName: 'Voucher Type', width: 130 },
  { field: 'voucher_no', headerName: 'Voucher No', width: 130 },
  { field: 'due_date', headerName: 'Due Date', width: 130 },
  {
    field: 'invoiceAmount',
    headerName: 'Invoice Amount',
    width: 130,
    valueGetter: params => (params.row.amount > 0 ? params.row.amount : '')
  },
  {
    field: 'paidAmount',
    headerName: 'Paid Amount',
    width: 130,
    valueGetter: params => (params.row.amount < 0 ? -params.row.amount : '')
  },
  { field: 'credit_Note', headerName: 'Credit Note', width: 130 },
  {
    field: 'outstanding_amount',
    headerName: 'Outstanding Amount',
    width: 130,
    valueGetter: params => params.row.amount
  },
  {
    field: 'age',
    headerName: 'Age (Days)',
    width: 130,
    valueGetter: params => {
      const dueDate = dayjs(params.row.due_date)
      const today = dayjs()
      const diff = today.diff(dueDate, 'day')

      return diff
    }
  },
  {
    field: '0-30',
    headerName: '0-30',
    width: 130,
    valueGetter: params => {
      const dueDate = dayjs(params.row.due_date)
      const today = dayjs()
      const diff = today.diff(dueDate, 'day')

      return diff >= 0 && diff <= 30 ? params.row.amount : ''
    }
  },
  {
    field: 'account_currency',
    headerName: 'Currency',
    width: 130
  },
  {
    field: 'customer_lpo',
    headerName: 'Customer LPO',
    width: 130
  },
  {
    field: 'territory',
    headerName: 'Territory',
    width: 130,
    valueGetter: params => params.row.customer?.territory
  },
  {
    field: 'customer_group',
    headerName: 'Customer Group',
    width: 130,
    valueGetter: params => params.row.customer?.customer_group
  }
]

const AccountsReceivable = ({ responseData }) => {
  const [filterConfig, setFilterConfig] = useState({
    company: '',
    postingDate: dayjs().format('YYYY-MM-DD'),
    financeBook: '',
    costCenter: '',
    customer: '',
    receivableAccount: '',
    ageingBasedOn: 'Due Date',
    ageingRange1: 30,
    ageingRange2: 60,
    ageingRange3: 90,
    ageingRange4: 120,
    customerGroup: '',
    paymentTermsTemplate: '',
    salesPartner: '',
    salesPerson: '',
    territory: '',
    currency: '',
    groupByCustomer: false,
    basedOnPaymentTerms: false,
    showFuturePayments: false,
    showLinkedDeliveryNotes: false,
    showSalesPerson: false,
    showRemarks: false
  })

  const [data, setData] = useState(responseData.additionalData)

  // ? สำหรับเพิ่ม input ในหน้าต่าง
  const inputConfigs = [
    { type: 'textDropdown', label: 'Company', name: 'company', data: responseData.dataCompany },
    { type: 'date', label: 'Posting Date', name: 'postingDate' },
    { type: 'textDropdown', label: 'Finance Book', name: 'financeBook', data: responseData.dataFinanceBook },
    { type: 'textDropdown', label: 'Cost Center', name: 'costCenter', data: responseData.dataCostCenter },
    { type: 'textDropdown', label: 'Customer', name: 'customer', data: responseData.dataCustomer },
    { type: 'textDropdown', label: 'Receivable Account', name: 'receivableAccount', data: responseData.dataCustomer },
    {
      type: 'select',
      label: 'Ageing Based On',
      name: 'ageingBasedOn',
      value: filterConfig.ageingBasedOn,
      data: [{ name: 'Posting Date' }, { name: 'Due Date' }]
    },
    { type: 'text', label: 'Ageing Range 1', name: 'ageingRange1' },
    { type: 'text', label: 'Ageing Range 2', name: 'ageingRange2' },
    { type: 'text', label: 'Ageing Range 3', name: 'ageingRange3' },
    { type: 'text', label: 'Ageing Range 4', name: 'ageingRange4' },
    { type: 'textDropdown', label: 'Customer Group', name: 'customerGroup', data: responseData.dataCustomerGroup },
    {
      type: 'textDropdown',
      label: 'Payment Terms Template',
      name: 'paymentTermsTemplate',
      data: responseData.dataPaymentTerm
    },
    { type: 'textDropdown', label: 'Sales Partner', name: 'salesPartner', data: responseData.dataSalesPartner },
    { type: 'textDropdown', label: 'Sales Person', name: 'salesPerson', data: responseData.dataSalesPerson },
    { type: 'textDropdown', label: 'Territory', name: 'territory', data: responseData.dataTerritory },
    { type: 'checkbox', label: 'Group By Customer', name: 'groupByCustomer' },
    {
      type: 'checkbox',
      label: 'Based On Payment Terms',
      name: 'basedOnPaymentTerms'
    },
    {
      type: 'checkbox',
      label: 'Show Future Payments',
      name: 'showFuturePayments'
    },
    {
      type: 'checkbox',
      label: 'Show Linked Delivery Notes',
      name: 'showLinkedDeliveryNotes'
    },
    { type: 'checkbox', label: 'Show Sales Person', name: 'showSalesPerson' },
    { type: 'checkbox', label: 'Show Remarks', name: 'showRemarks' }
  ]

  // ** สำหรับแก้ไขค่าใน filterConfig จาก input
  const handleDataChange = (name, value) => {
    setFilterConfig(prevData => ({ ...prevData, [name]: value }))
  }

  // ** filter data ตามเงื่อนไขที่กำหนดใน filterConfig
  useEffect(() => {
    console.log('filterConfig:', filterConfig)

    const thresholdDate = dayjs(filterConfig.postingDate).subtract(30, 'day')

    const filteredData = responseData?.additionalData.filter(row => {
      if (filterConfig.ageingBasedOn === 'Due Date') {
        return dayjs(row.due_date).isAfter(thresholdDate)
      } else if (filterConfig.ageingBasedOn === 'Posting Date') {
        return dayjs(row.posting_date).isAfter(thresholdDate)
      }

      return true // If neither conditions are met, don't filter out the row
    })

    setData(filteredData)
  }, [filterConfig, responseData])

  console.log('data:', responseData)

  return (
    <LayoutOnePageFilter title='Accounts Receivable' buttonTopRight={button}>
      <InputListRenderer inputConfigs={inputConfigs} filterConfig={filterConfig} onDataChange={handleDataChange} />
      <Divider />
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={row => row.name}
        style={{ height: data.length > 0 ? 'auto' : 300 }}
      />
    </LayoutOnePageFilter>
  )
}

const fetchData = async endpoint => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      headers: { Authorization: process.env.NEXT_PUBLIC_API_TOKEN }
    })

    return response.data
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error)
    throw error // Re-throw the error to handle it later in getServerSideProps
  }
}

export async function getServerSideProps() {
  try {
    const endpoints = [
      'Company',
      'Finance Book',
      'Cost Center',
      'Customer',
      'Customer Group',
      'Payment Term',
      'Sales Partner',
      'Sales Person',
      'Territory'
    ]

    // Fetch data from multiple endpoints concurrently
    const responses = await Promise.all(endpoints.map(endpoint => fetchData(endpoint)))

    // Make an additional Axios request to a specific endpoint
    const additionalData = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/method/frappe.erpapp.test.getAccountsReceivable`,
      {
        headers: { Authorization: process.env.NEXT_PUBLIC_API_TOKEN }
      }
    )

    // Combine all responses into an object
    const responseData = {}
    endpoints.forEach((endpoint, index) => {
      responseData[`${endpoint.toLowerCase()}Data`] = responses[index].data
    })

    // Add the additional data to responseData
    responseData.additionalData = additionalData.data.message

    // Return the data as props
    return {
      props: {
        responseData
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error)

    // In case of an error, return an empty object as props
    return {
      props: {
        responseData: {}
      }
    }
  }
}

export default AccountsReceivable
