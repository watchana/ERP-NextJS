// ** React Imports
import React from 'react'

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

  const showContent = [
    <DetailSalesInvoice key={'detail'} dataRow={dataRow} setDataRow={setDataRow} />,
    <Payments key={'payments'} dataRow={dataRow} setDataRow={setDataRow} />,
    <ContactAddressSalesinvoice key={'accounting'} dataRow={dataRow} setDataRow={setDataRow} />,
    <TermsSalesInvoice key={'trems'} dataRow={dataRow} setDataRow={setDataRow} />,
    <MoreinfoSalesinvoice key={'moerinfo'} dataRow={dataRow} setDataRow={setDataRow} />
  ]

  return (
    <LayoutTwoPage
      data={dataList}
      setData={setDataList}
      menuContent={SalesInvoiceContentMenu}
      showContent={showContent}
      dataRow={dataRow}
      setDataRow={setDataRow}
      doctype='Sales Invoice'
      docStatusName='disabled'
    />
  )
}

SalesInvoice.getLayout = page => <SubPageLayout>{page}</SubPageLayout>

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
