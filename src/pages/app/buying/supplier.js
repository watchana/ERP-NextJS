// ** React Imports
import React from 'react'

// ** Axios Imports
import axios from 'axios'

// ** Dummy Data

// ** Custom Components
import SubPages from 'src/views/sub-pages/SubPages'
import DetailSupplier from 'src/views/sub-pages/buying/supplier/DetailSupplier'
import Dashboard_sup from 'src/views/sub-pages/buying/supplier/DashboardSupplier'
import TaxSupplier from 'src/views/sub-pages/buying/supplier/TaxSupplier'
import Contact_Address from 'src/views/sub-pages/buying/supplier/ContactAddressSupplie'
import Accounting from 'src/views/sub-pages/buying/supplier/AccountingSupplier'
import SettingsSupplier from 'src/views/sub-pages/buying/supplier/SettingsSupplier'
import PortalUserSupplier from 'src/views/sub-pages/buying/supplier/PortalUsersSupplier'
import SubPageLayout from 'src/@core/layouts/SubPageLayout'
import { SupplierContentMenu } from 'src/dummy/contentPages/supplierPage'

// ** Layouts

const SupplierPage = ({ data }) => {
  const [dataRow, setDataRow] = React.useState({})

  const showContent = [
    <DetailSupplier key={'detail'} dataRow={dataRow} />,
    <Dashboard_sup key={'payments'} dataRow={dataRow} />,
    <TaxSupplier key={'accounting'} dataRow={dataRow} />,
    <Contact_Address key={'trems'} dataRow={dataRow} />,
    <Accounting key={'moerinfo'} dataRow={dataRow} />,
    <SettingsSupplier key={'moerinfo'} dataRow={dataRow} />,
    <PortalUserSupplier key={'moerinfo'} dataRow={dataRow} />
  ]

  return (
    <SubPages
      data={data}
      menuContent={SupplierContentMenu}
      showContent={showContent}
      dataRow={dataRow}
      setDataRow={setDataRow}
      doctype='Supplier'
    />
  )
}

SupplierPage.getLayout = page => <SubPageLayout>{page}</SubPageLayout>

// nextJS SSR
export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}Supplier?fields=["*"]`, {
    headers: {
      Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
    }
  })
  const data = res.data.data

  return {
    props: { data: data }
  }
}

export default SupplierPage
