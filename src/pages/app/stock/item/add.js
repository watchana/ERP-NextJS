// ** React Imports
import React, { useEffect } from 'react'

// ** Axios Imports
import axios from 'axios'
import SubPages from 'src/views/sub-pages/LayoutTwoPage'

// ** Dummy Data
import { ItemContentMenu, defaultMaterialRequestType } from 'src/dummy/sub-pages/stock/itemPage'

// ** Custom Components
import DetailItem from 'src/components/ContentPages/ItemPage/DetailItem'
import DashboardItem from 'src/components/ContentPages/ItemPage/DashboardItem'
import InventoryItem from 'src/components/ContentPages/ItemPage/InventoryItem'
import AccountingItem from 'src/components/ContentPages/ItemPage/AccountingItem'
import PurchasingItem from 'src/components/ContentPages/ItemPage/PurchasingItem'
import SalesItem from 'src/components/ContentPages/ItemPage/SalesItem'
import TexItem from 'src/components/ContentPages/ItemPage/TexItem'
import QualityItem from 'src/components/ContentPages/ItemPage/QualityItem'
import ManufacturingItem from 'src/components/ContentPages/ItemPage/ManufacturingItem'

// ** Layouts
import SubPageLayout from 'src/@core/layouts/SubPageLayout'

const ItemPage = ({ data }) => {
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
    <DetailItem key='detail' dataRow={dataRow} handleUpdateData={handleUpdateData} />,
    <DashboardItem key='dashboard' />,
    <InventoryItem key='inventory' dataRow={dataRow} handleUpdateData={handleUpdateData} />,
    <AccountingItem key='accounting' dataRow={dataRow} setDataRow={setDataRow} />,
    <PurchasingItem key='purchasing' dataRow={dataRow} handleUpdateData={handleUpdateData} />,
    <SalesItem key='sales' dataRow={dataRow} handleUpdateData={handleUpdateData} />,
    <TexItem key='tex' dataRow={dataRow} />,
    <QualityItem key='quality' dataRow={dataRow} handleUpdateData={handleUpdateData} />,
    <ManufacturingItem key='manufacturing' dataRow={dataRow} handleUpdateData={handleUpdateData} />
  ]

  return (
    <SubPages
      data={dataList}
      setData={setDataList}
      statusUpdate={true}
      menuContent={ItemContentMenu}
      showContent={showContent}
      dataRow={dataRow}
      setDataRow={setDataRow}
      doctype='Item'
      docStatusName='disabled'
      dataUpdate={dataUpdate}
      editStatus={editStatus}
      setEditStatus={setEditStatus}
    />
  )
}

// nextJS SSR
export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}Item?fields=["*"]&order_by=creation`, {
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

export default ItemPage
