// ** React Imports
import React, { useEffect } from 'react'

// ** Axios Imports
import axios from 'axios'
import SubPages from 'src/views/sub-pages/SubPages'

// ** Dummy Data
import { ItemContentMenu, defaultMaterialRequestType, ItemGroup } from 'src/dummy/contentPages/itemPage'

// ** Custom Components
import StockItemGroup from 'src/views/sub-pages/stock/ItemGroup/StockItemGroup'

// ** Layouts
import SubPageLayout from 'src/@core/layouts/SubPageLayout'

const ItemGroupPage = ({ data }) => {
  const [dataList, setDataList] = React.useState(data)
  const [dataRow, setDataRow] = React.useState({})

  const showContent = [<StockItemGroup key='ItemGroup' dataRow={dataRow} setDataRow={setDataRow} />]

  return (
    <SubPages
      data={data}
      setData={setDataList}
      menuContent={ItemGroup}
      showContent={showContent}
      dataRow={dataRow}
      setDataRow={setDataRow}
      doctype='Item Group'
      docStatusName='disabled'
    />
  )
}

// nextJS SSR
export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}Item Group?fields=["*"]`, {
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

export default ItemGroupPage
