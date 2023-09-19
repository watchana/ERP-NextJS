// ** React Imports
import React from 'react'

// ** Axios Imports
import axios from 'axios'
import SubPages from 'src/views/sub-pages/SubPages'

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
import ChartofAccounts from 'src/views/sub-pages/accounting/account/ChartofAccounts'

const Account = ({ data }) => {
  const [dataRow, setDataRow] = React.useState({})
  const [dataList, setDataList] = React.useState(data)

  const showContent = [
    <ChartofAccounts key={'detail'} dataRow={dataRow} />,
    <Payments key={'payments'} dataRow={dataRow} />,
    <ContactAddressSalesinvoice key={'accounting'} dataRow={dataRow} />,
    <TermsSalesInvoice key={'trems'} dataRow={dataRow} />,
    <MoreinfoSalesinvoice key={'moerinfo'} dataRow={dataRow} />
  ]

  return (
    <SubPages
      data={dataList}
      setData={setDataList}
      menuContent={SalesInvoiceContentMenu}
      showContent={showContent}
      dataRow={dataRow}
      setDataRow={setDataRow}
      doctype='Account'
      docStatusName='disabled'
    />
  )
}

Account.getLayout = page => <SubPageLayout>{page}</SubPageLayout>

// nextJS SSR
export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}Account?fields=["*"]&limit=500`, {
    headers: {
      Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
    }
  })
  const data = res.data.data

  return {
    props: { data: data }
  }
}

export default Account
