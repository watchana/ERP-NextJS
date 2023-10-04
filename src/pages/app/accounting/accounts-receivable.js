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

const AccountsReceivable = ({
  resData,
  dataCompany,
  dataFinanceBook,
  dataCostCenter,
  dataCustomer,
  dataCustomerGroup,
  dataPaymentTerm,
  dataSalesPartner,
  dataSalesPerson,
  dataTerritory
}) => {
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

  const [data, setData] = useState([])

  // ? สำหรับเพิ่ม input ในหน้าต่าง
  const inputConfigs = [
    { type: 'textDropdown', label: 'Company', name: 'company', data: dataCompany },
    { type: 'date', label: 'Posting Date', name: 'postingDate' },
    { type: 'textDropdown', label: 'Finance Book', name: 'financeBook', data: dataFinanceBook },
    { type: 'textDropdown', label: 'Cost Center', name: 'costCenter', data: dataCostCenter },
    { type: 'textDropdown', label: 'Customer', name: 'customer', data: dataCustomer },
    { type: 'textDropdown', label: 'Receivable Account', name: 'receivableAccount', data: dataCustomer },
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
    { type: 'textDropdown', label: 'Customer Group', name: 'customerGroup', data: dataCustomerGroup },
    { type: 'textDropdown', label: 'Payment Terms Template', name: 'paymentTermsTemplate', data: dataPaymentTerm },
    { type: 'textDropdown', label: 'Sales Partner', name: 'salesPartner', data: dataSalesPartner },
    { type: 'textDropdown', label: 'Sales Person', name: 'salesPerson', data: dataSalesPerson },
    { type: 'textDropdown', label: 'Territory', name: 'territory', data: dataTerritory },
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

  const handleDataChange = (name, value) => {
    setFilterConfig(prevData => ({ ...prevData, [name]: value }))
  }

  useEffect(() => {
    console.log('filterConfig:', filterConfig)

    const thresholdDate = dayjs(filterConfig.postingDate).subtract(30, 'day')

    const filteredData = resData.filter(row => {
      if (filterConfig.ageingBasedOn === 'Due Date') {
        return dayjs(row.due_date).isAfter(thresholdDate)
      } else if (filterConfig.ageingBasedOn === 'Posting Date') {
        return dayjs(row.posting_date).isAfter(thresholdDate)
      }

      return true // If neither conditions are met, don't filter out the row
    })

    setData(filteredData)
  }, [filterConfig, resData])

  console.log('data:', resData)

  return (
    <LayoutOnePageFilter title='Accounts Receivable' buttonTopRight={button}>
      <InputListRenderer inputConfigs={inputConfigs} filterConfig={filterConfig} onDataChange={handleDataChange} />
      <Divider />
      <DataGrid rows={data} columns={columns} getRowId={row => row.name} />
    </LayoutOnePageFilter>
  )
}

// ? สำหรับเรียกข้อมูลจาก API
const fetchData = endpoint => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    headers: { Authorization: process.env.NEXT_PUBLIC_API_TOKEN }
  })
}

// ? SSR
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

    const responses = await Promise.all(endpoints.map(endpoint => fetchData(endpoint)))

    const responsesData = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/method/frappe.erpapp.test.getAccountsReceivable`,
      {
        headers: { Authorization: process.env.NEXT_PUBLIC_API_TOKEN }
      }
    )

    const responsesCustomer = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/resource/Customer?fields=["*"]&limit=500&order_by=creation%20desc`,
      {
        headers: { Authorization: process.env.NEXT_PUBLIC_API_TOKEN }
      }
    )

    const resData = responsesData.data.message

    const resDataWithCustomer = resData.map(row => {
      const customer = responsesCustomer.data.data.find(customer => customer.name === row.party)

      return { ...row, customer: customer ? customer : null }
    })

    const [
      resDataCompany,
      resDataFinanceBook,
      resDataCostCenter,
      resDataCustomer,
      resDataCustomerGroup,
      resDataPaymentTerm,
      resDataSalesPartner,
      resDataSalesPerson,
      resDataTerritory
    ] = responses

    return {
      props: {
        resData: resDataWithCustomer,
        dataCompany: resDataCompany.data.data,
        dataFinanceBook: resDataFinanceBook.data.data,
        dataCostCenter: resDataCostCenter.data.data,
        dataCustomer: resDataCustomer.data.data,
        dataCustomerGroup: resDataCustomerGroup.data.data,
        dataPaymentTerm: resDataPaymentTerm.data.data,
        dataSalesPartner: resDataSalesPartner.data.data,
        dataSalesPerson: resDataSalesPerson.data.data,
        dataTerritory: resDataTerritory.data.data
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error)

    return {
      props: {
        resData: [],
        dataCompany: [],
        dataFinanceBook: [],
        dataCostCenter: [],
        dataCustomer: [],
        dataCustomerGroup: [],
        dataPaymentTerm: [],
        dataSalesPartner: [],
        dataSalesPerson: [],
        dataTerritory: []
      }
    }
  }
}

export default AccountsReceivable
