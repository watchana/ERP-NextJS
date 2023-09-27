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
  { field: 'posting_date', headerName: 'Posting Date', width: 130 },
  { field: 'company', headerName: 'Company', width: 130 },
  { field: 'account', headerName: 'Receivable Account', width: 130 },
  { field: 'customer', headerName: 'Customer', width: 130 },
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
    width: 130
  },
  {
    field: 'customer_group',
    headerName: 'Customer Group',
    width: 130
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
    postingDate: dayjs(),
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

  // ? สำหรับเพิ่ม input ในหน้าต่าง
  const inputConfigs = [
    { type: 'textDropdown', label: 'Company', name: 'company', value: filterConfig.company, data: dataCompany },
    { type: 'date', label: 'Posting Date', value: filterConfig.postingDate },
    { type: 'textDropdown', label: 'Finance Book', data: dataFinanceBook },
    { type: 'textDropdown', label: 'Cost Center', data: dataCostCenter },
    { type: 'textDropdown', label: 'Customer', data: dataCustomer },
    { type: 'textDropdown', label: 'Receivable Account', data: dataCustomer },
    {
      type: 'select',
      label: 'Ageing Based On',
      name: 'ageingBasedOn',
      value: filterConfig.ageingBasedOn,
      data: [{ name: 'Posting Date' }, { name: 'Due Date' }]
    },
    { type: 'text', label: 'Ageing Range 1', name: 'ageingRange1', value: filterConfig.ageingRange1 },
    { type: 'text', label: 'Ageing Range 2', name: 'ageingRange2', value: filterConfig.ageingRange2 },
    { type: 'text', label: 'Ageing Range 3', name: 'ageingRange3', value: filterConfig.ageingRange3 },
    { type: 'text', label: 'Ageing Range 4', name: 'ageingRange4', value: filterConfig.ageingRange4 },
    { type: 'textDropdown', label: 'Customer Group', data: dataCustomerGroup },
    { type: 'textDropdown', label: 'Payment Terms Template', data: dataPaymentTerm },
    { type: 'textDropdown', label: 'Sales Partner', data: dataSalesPartner },
    { type: 'textDropdown', label: 'Sales Person', data: dataSalesPerson },
    { type: 'textDropdown', label: 'Territory', data: dataTerritory },
    { type: 'checkbox', label: 'Group By Customer', name: 'groupByCustomer', value: filterConfig.groupByCustomer },
    {
      type: 'checkbox',
      label: 'Based On Payment Terms',
      name: 'basedOnPaymentTerms',
      value: filterConfig.basedOnPaymentTerms
    },
    {
      type: 'checkbox',
      label: 'Show Future Payments',
      name: 'showFuturePayments',
      value: filterConfig.showFuturePayments
    },
    {
      type: 'checkbox',
      label: 'Show Linked Delivery Notes',
      name: 'showLinkedDeliveryNotes',
      value: filterConfig.showLinkedDeliveryNotes
    },
    { type: 'checkbox', label: 'Show Sales Person', name: 'showSalesPerson', value: filterConfig.showSalesPerson },
    { type: 'checkbox', label: 'Show Remarks', name: 'showRemarks', value: filterConfig.showRemarks }
  ]

  const handleDataChange = (name, value) => {
    setFilterConfig(prevData => ({ ...prevData, [name]: value }))
  }

  useEffect(() => {
    console.log('filterConfig:', filterConfig)
  }, [filterConfig])

  console.log('dataCompany:', dataCompany)

  const data = resData.filter(row => row.delinked === 0)

  return (
    <LayoutOnePageFilter title='Accounts Receivable' buttonTopRight={button}>
      <InputListRenderer inputConfigs={inputConfigs} onDataChange={handleDataChange} />
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

    const resData = responsesData.data.message

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
        resData: resData,
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
