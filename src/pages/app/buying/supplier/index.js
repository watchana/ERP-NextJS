// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Axios Imports
import axios from 'axios'

// ** Dummy Data

// ** Custom Components
import LayoutTwoPage from 'src/views/sub-pages/LayoutTwoPage'
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
    <DetailSupplier key={'detail'} dataRow={dataRow} handleUpdateData={handleUpdateData} />,
    <Dashboard_sup key={'dashbord'} dataRow={dataRow} handleUpdateData={handleUpdateData} />,
    <TaxSupplier key={'tax'} dataRow={dataRow} handleUpdateData={handleUpdateData} />,
    <Contact_Address key={'contactaddress'} dataRow={dataRow} handleUpdateData={handleUpdateData} />,
    <Accounting key={'accounting'} dataRow={dataRow} handleUpdateData={handleUpdateData} />,
    <SettingsSupplier key={'srtting'} dataRow={dataRow} handleUpdateData={handleUpdateData} />,
    <PortalUserSupplier key={'port'} dataRow={dataRow} handleUpdateData={handleUpdateData} />
  ]

  return (
    <LayoutTwoPage
      data={dataList}
      setData={setDataList}
      statusUpdate={false}
      menuContent={SupplierContentMenu}
      showContent={showContent}
      dataRow={dataRow}
      setDataRow={setDataRow}
      doctype='Supplier'
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
