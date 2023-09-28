// ** React Imports
import React from 'react'

// ** Axios Imports
import axios from 'axios'
import LayoutTwoPage from 'src/views/sub-pages/LayoutTwoPage'

// ** Dummy Data
import { PaymentEntryMenu } from 'src/dummy/contentPages/paymentEntryPage'

// ** Custom Components
import PaymentEntry from 'src/views/sub-pages/accounting/payment-entry/payment-entry'

// ** Layouts
import SubPageLayout from 'src/@core/layouts/SubPageLayout'

const PurchaseInvoice = ({ data }) => {
  const [dataRow, setDataRow] = React.useState({})
  const [dataList, setDataList] = React.useState(data)

  const showContent = [<PaymentEntry key={'detail'} dataRow={dataRow} setDataRow={setDataRow} />]

  return (
    <LayoutTwoPage
      data={dataList}
      setData={setDataList}
      menuContent={PaymentEntryMenu}
      showContent={showContent}
      dataRow={dataRow}
      setDataRow={setDataRow}
      doctype='Payment Entry'
      docStatusName='disabled'
      noTabContent={[]}
    />
  )
}

PurchaseInvoice.getLayout = page => <SubPageLayout>{page}</SubPageLayout>

// nextJS SSR
export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}Payment Entry?fields=["*"]`, {
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
