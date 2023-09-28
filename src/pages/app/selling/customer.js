// ** React Imports
import React, { useEffect } from 'react'

// ** Axios Imports
import axios from 'axios'
import LayoutTwoPage from 'src/views/sub-pages/LayoutTwoPage'

// ** Dummy Data
import { ItemContentMenu, defaultMaterialRequestType } from 'src/dummy/sub-pages/stock/itemPage'
import { CustomerContentMenu } from 'src/dummy/contentPages/customerPage'

// ** Custom Components
import DetailCustomer from 'src/views/sub-pages/selling/customer/DetailCustomer'
import DashboardCustomer from 'src/views/sub-pages/selling/customer/DashboardCustomer'
import ContactAndAddress from 'src/views/sub-pages/selling/customer/ContactAndAddress'
import TaxCustomer from 'src/views/sub-pages/selling/customer/TaxCustomer'
import AccountingCustomer from 'src/views/sub-pages/selling/customer/AccoutingCustomer'
import SalesTeamCustomer from 'src/views/sub-pages/selling/customer/SalesTeamCustomer'
import SettingsCustomer from 'src/views/sub-pages/selling/customer/SettingsCustomer'
import PotalUserCustomer from 'src/views/sub-pages/selling/customer/PortalUsersCustomer'

// ** Layouts
import SubPageLayout from 'src/@core/layouts/SubPageLayout'

const CustomerPage = ({ data }) => {
  const [dataRow, setDataRow] = React.useState({})
  const [dataList, setDataList] = React.useState(data)
  const [dataUpdate, setDataUpdate] = React.useState([])
  const [editStatus, setEditStatus] = React.useState(false)

  const handleUpdateData = async (field, value) => {
    setDataRow({ ...dataRow, [field]: value })
    setDataUpdate({ ...dataUpdate, [field]: value })
    setEditStatus(true)
  }

  useEffect(() => {
    console.log(dataRow)
  }, [dataRow])

  const showContent = [
    <DetailCustomer key='detail' dataRow={dataRow} setDataRow={setDataRow} handleUpdateData={handleUpdateData} />,
    <DashboardCustomer key='dashboard' dataRow={dataRow} />,
    <ContactAndAddress
      key='ContactAndAddress'
      dataRow={dataRow}
      setDataRow={setDataRow}
      handleUpdateData={handleUpdateData}
    />,
    <TaxCustomer key='Tax' dataRow={dataRow} setDataRow={setDataRow} handleUpdateData={handleUpdateData} />,
    <AccountingCustomer
      key='Accounting'
      dataRow={dataRow}
      setDataRow={setDataRow}
      handleUpdateData={handleUpdateData}
    />,
    <SalesTeamCustomer key='salesTeam' dataRow={dataRow} setDataRow={setDataRow} handleUpdateData={handleUpdateData} />,
    <SettingsCustomer key='salesTeam' dataRow={dataRow} setDataRow={setDataRow} />,
    <PotalUserCustomer key='potalUser' dataRow={dataRow} />
  ]

  return (
    <LayoutTwoPage
      data={dataList}
      setData={setDataList}
      menuContent={CustomerContentMenu}
      showContent={showContent}
      dataRow={dataRow}
      setDataRow={setDataRow}
      doctype='Customer'
      docStatusName='disabled'
      dataUpdate={dataUpdate}
      editStatus={editStatus}
      setEditStatus={setEditStatus}
    />
  )
}

// nextJS SSR
export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}Customer?fields=["*"]&limit=500`, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_API_TOKEN
    }
  })
  const data = res.data.data

  if (!data) {
    return {
      props: { data: [] }
    }
  }

  return {
    props: { data: data }
  }
}

export default CustomerPage
