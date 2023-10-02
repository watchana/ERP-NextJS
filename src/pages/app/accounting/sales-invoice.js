// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Axios Imports
import axios from 'axios'
import LayoutTwoPage from 'src/views/sub-pages/LayoutTwoPage'

// ** Dummy Data
import { SalesInvoiceContentMenu } from 'src/dummy/contentPages/salesInvoice'

// ** Custom Components
import DetailSalesInvoice from 'src/views/sub-pages/accounting/sales-invoice/DetailSalesInvoice'
import Payments from 'src/views/sub-pages/accounting/sales-invoice/PaymentsSalesInvoice'
import ContactAddressSalesinvoice from 'src/views/sub-pages/accounting/sales-invoice/ContactAddressSalesInvoice'
import TermsSalesInvoice from 'src/views/sub-pages/accounting/sales-invoice/TermsSalesInvoice'
import MoreinfoSalesinvoice from 'src/views/sub-pages/accounting/sales-invoice/MoreinfoSalesInvoice'

// ** Layouts
import SubPageLayout from 'src/@core/layouts/SubPageLayout'

const SalesInvoice = ({ data }) => {
  const [dataRow, setDataRow] = React.useState({})
  const [dataList, setDataList] = React.useState(data)
  const [dataUpdate, setDataUpdate] = React.useState([])
  const [editStatus, setEditStatus] = React.useState(false)

  // ? function to update dataRow and store the required values in dataUpdated.
  const handleUpdateData = async (field, value) => {
    setDataRow({ ...dataRow, [field]: value })
    setDataUpdate({ ...dataUpdate, [field]: value })
    setEditStatus(true)
  }

  useEffect(() => {
    console.log('dataUpdate: ', dataUpdate)
  }, [dataUpdate])

  const showContent = [
    <DetailSalesInvoice key={'detail'} dataRow={dataRow} handleUpdateData={handleUpdateData} />,
    <Payments key={'payments'} dataRow={dataRow} handleUpdateData={handleUpdateData} />,
    <ContactAddressSalesinvoice key={'accounting'} dataRow={dataRow} handleUpdateData={handleUpdateData} />,
    <TermsSalesInvoice key={'trems'} dataRow={dataRow} handleUpdateData={handleUpdateData} />,
    <MoreinfoSalesinvoice key={'moerinfo'} dataRow={dataRow} handleUpdateData={handleUpdateData} />
  ]

  return (
    <LayoutTwoPage
      data={dataList}
      setData={setDataList}
      statusUpdate={false}
      menuContent={SalesInvoiceContentMenu}
      showContent={showContent}
      dataRow={dataRow}
      setDataRow={setDataRow}
      doctype='Sales Invoice'
      docStatusName='disabled'
      dataUpdate={dataUpdate}
      setDataUpdate={setDataUpdate}
      editStatus={editStatus}
      setEditStatus={setEditStatus}
    />
  )
}

// nextJS SSR
export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}Sales%20Invoice?fields=["*"]`, {
    headers: {
      Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
    }
  })
  const data = res.data.data

  return {
    props: { data: data }
  }
}

export default SalesInvoice
