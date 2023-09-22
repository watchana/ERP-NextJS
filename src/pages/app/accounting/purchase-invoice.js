// ** React Imports
import React from 'react'

// ** Axios Imports
import axios from 'axios'
import SubPages from 'src/views/sub-pages/SubPages'

// ** Dummy Data
import { PurchaseInvoiceContentMenu } from 'src/dummy/contentPages/purchaseInvoice'

// ** Custom Components
import DetailPurchaseInvoice from 'src/views/sub-pages/accounting/purchase-invoice/detailPurchaseInvoice'
import PaymentsPurchaseInvoice from 'src/views/sub-pages/accounting/purchase-invoice/paymentPurchaseInvoice'
import ContactAndAddressPurchaseInvoice from 'src/views/sub-pages/accounting/purchase-invoice/contact-and-address'
import TermsPurchaseInvoice from 'src/views/sub-pages/accounting/purchase-invoice/termsPurchaseInvoice'
import MoreInfoPurchaseInvoice from 'src/views/sub-pages/accounting/purchase-invoice/more-infoPurchaseInvoice'
import ConnectionPurchaseInvoice from 'src/views/sub-pages/accounting/purchase-invoice/connectionPurchaseInvoice'

// ** Layouts
import SubPageLayout from 'src/@core/layouts/SubPageLayout'

const PurchaseInvoice = ({ data }) => {
  const [dataRow, setDataRow] = React.useState({})
  const [dataList, setDataList] = React.useState(data)

  const showContent = [
    <DetailPurchaseInvoice key={'detail'} dataRow={dataRow} setDataRow={setDataRow} />,
    <PaymentsPurchaseInvoice key={'payments'} dataRow={dataRow} setDataRow={setDataRow} />,
    <ContactAndAddressPurchaseInvoice key={'contact'} dataRow={dataRow} setDataRow={setDataRow} />,
    <TermsPurchaseInvoice key={'terms'} dataRow={dataRow} setDataRow={setDataRow} />,
    <MoreInfoPurchaseInvoice key={'moreinfo'} dataRow={dataRow} setDataRow={setDataRow} />,
    <ConnectionPurchaseInvoice key={'connect'} dataRow={dataRow} setDataRow={setDataRow} />
  ]

  return (
    <SubPages
      data={dataList}
      setData={setDataList}
      menuContent={PurchaseInvoiceContentMenu}
      showContent={showContent}
      dataRow={dataRow}
      setDataRow={setDataRow}
      doctype='Purchase Invoice'
      docStatusName='disabled'
    />
  )
}

PurchaseInvoice.getLayout = page => <SubPageLayout>{page}</SubPageLayout>

// nextJS SSR
export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}Purchase%20Invoice?fields=["*"]`, {
    headers: {
      Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
    }
  })
  const data = res.data.data

  return {
    props: { data: data }
  }
}

export default PurchaseInvoice
