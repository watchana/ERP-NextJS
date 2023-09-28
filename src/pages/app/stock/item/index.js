// ** React Imports
import React, { useEffect } from 'react'

// ** Axios Imports
import axios from 'axios'
import LayoutTwoPage from 'src/views/sub-pages/LayoutTwoPage'

// ** Dummy Data
import { ItemContentMenu, defaultMaterialRequestType } from 'src/dummy/sub-pages/stock/itemPage'

// ** Custom Components
import DetailItem from 'src/views/sub-pages/stock/item/DetailItem'
import DashboardItem from 'src/views/sub-pages/stock/item/DashboardItem'
import InventoryItem from 'src/views/sub-pages/stock/item/InventoryItem'
import AccountingItem from 'src/views/sub-pages/stock/item/AccountingItem'
import PurchasingItem from 'src/views/sub-pages/stock/item/PurchasingItem'
import SalesItem from 'src/views/sub-pages/stock/item/SalesItem'
import TexItem from 'src/views/sub-pages/stock/item/TexItem'
import QualityItem from 'src/views/sub-pages/stock/item/QualityItem'
import ManufacturingItem from 'src/views/sub-pages/stock/item/ManufacturingItem'

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
    <LayoutTwoPage
      data={dataList}
      setData={setDataList}
      statusUpdate={false}
      menuContent={ItemContentMenu}
      showContent={showContent}
      dataRow={dataRow}
      setDataRow={setDataRow}
      doctype='Item'
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
