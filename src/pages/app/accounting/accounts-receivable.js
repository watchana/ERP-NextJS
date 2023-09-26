import React, { useEffect, useState } from 'react'

// ** Mui Import
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
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

const AccountsReceivable = ({
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
    { type: 'textDropdown', label: 'Company', data: dataCompany },
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

  return (
    <LayoutOnePageFilter title='Accounts Receivable' buttonTopRight={button}>
      <InputListRenderer inputConfigs={inputConfigs} onDataChange={handleDataChange} />
      <Divider />
      <DataGrid rows={[]} columns={[]} style={{ height: '50vh' }} />
    </LayoutOnePageFilter>
  )
}

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
