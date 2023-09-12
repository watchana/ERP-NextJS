// ** React Imports
import React from 'react'

// ** Axios Imports
import axios from 'axios'
import SubPages from 'src/views/sub-pages/SubPages'

// ** Dummy Data
import { ItemContentMenu, defaultMaterialRequestType } from 'src/dummy/contentPages/itemPage'

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

  const showContent = [
    <DetailItem key='detail' dataRow={dataRow} />,
    <DashboardItem key='dashboard' />,
    <InventoryItem key='inventory' dataRow={dataRow} dropDowns={defaultMaterialRequestType} />,
    <AccountingItem key='accounting' dataRow={dataRow} />,
    <PurchasingItem key='purchasing' dataRow={dataRow} />,
    <SalesItem key='sales' dataRow={dataRow} />,
    <TexItem key='tex' />,
    <QualityItem key='quality' dataRow={dataRow} />,
    <ManufacturingItem key='manufacturing' dataRow={dataRow} />
  ]

  return (
    <SubPages
      data={data}
      menuContent={ItemContentMenu}
      showContent={showContent}
      dataRow={dataRow}
      setDataRow={setDataRow}
    />
  )
}

ItemPage.getLayout = page => <SubPageLayout>{page}</SubPageLayout>

// nextJS SSR
export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}Item?fields=["*"]`, {
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
