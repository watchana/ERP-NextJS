// ** React Imports
import React from 'react'

// ** Axios Imports
import axios from 'axios'
import SubPages from 'src/views/sub-pages/SubPages'

// ** Dummy Data
import { SalesInvoiceContentMenu } from 'src/dummy/contentPages/salesInvoice'

// ** Custom Components

// ** Layouts
import DetailSalesInvoice from 'src/components/ContentPages/SalesInvoice/DetailSalesInvoice'
import Payments from 'src/components/ContentPages/SalesInvoice/PaymentsSalesinvoice'
import ContactAddressSalesinvoice from 'src/components/ContentPages/SalesInvoice/ContactAddressSalesinvoice'
import SubPageLayout from 'src/@core/layouts/SubPageLayout'
import TermsSalesInvoice from 'src/components/ContentPages/SalesInvoice/TermsSalesInvoice'
import MoreinfoSalesinvoice from 'src/components/ContentPages/SalesInvoice/MoreinfoSalesinvoice'

const SalesInvoice = ({ data }) => {
  const [dataRow, setDataRow] = React.useState({})

  const showContent = [
    <DetailSalesInvoice key={'detail'} dataRow={dataRow} />,
    <Payments key={'payments'} dataRow={dataRow} />,
    <ContactAddressSalesinvoice key={'accounting'} dataRow={dataRow} />,
    <TermsSalesInvoice key={'trems'} dataRow={dataRow} />,
    <MoreinfoSalesinvoice key={'moerinfo'} dataRow={dataRow} />
  ]

  return (
    <SubPages
      data={data}
      menuContent={SalesInvoiceContentMenu}
      showContent={showContent}
      dataRow={dataRow}
      setDataRow={setDataRow}
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
