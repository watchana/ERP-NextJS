// ** React Imports
import React from 'react'

// ** Axios Imports
import axios from 'axios'
import SubPages from 'src/views/sub-pages/SubPages'

// ** Dummy Data

import DetailSupplier from 'src/components/ContentPages/Supplier/DetailSupplier'
import Dashboard_sup from 'src/components/ContentPages/Supplier/DashboardSupplier'
import TaxSupplier from 'src/components/ContentPages/Supplier/TaxSupplier'
import Contact_Address from 'src/components/ContentPages/Supplier/Contact_Address'
import Accounting from 'src/components/ContentPages/Supplier/AccountingSupplier'
import SettingsSupplier from 'src/components/ContentPages/Supplier/SettingsSupplier'
import PortalUserSupplier from 'src/components/ContentPages/Supplier/PortalUsersSupplier'
import SubPageLayout from 'src/@core/layouts/SubPageLayout'
import { SupplierContentMenu } from 'src/dummy/contentPages/supplierPage'

// ** Custom Components

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
