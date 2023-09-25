// ** React Imports
import React from 'react'

// ** Axios Imports
import axios from 'axios'
import SubPages from 'src/views/sub-pages/SubPages'

// ** Dummy Data
import { ItemContentMenu, defaultMaterialRequestType, itemStockEntry } from 'src/dummy/sub-pages/stock/itemPage'

// ** Custom Components
import DetailStockEntry from 'src/views/sub-pages/stock/ItemStockEntry/DetailStockEntry'
import AdditionalCosts from 'src/views/sub-pages/stock/ItemStockEntry/AdditionalCosts'
import OtherStockEntry from 'src/views/sub-pages/stock/ItemStockEntry/OtherStockEntry'

// ** Layouts
import SubPageLayout from 'src/@core/layouts/SubPageLayout'

const StockEntry = ({ data }) => {
  const [dataList, setDataList] = React.useState(data)
  const [dataRow, setDataRow] = React.useState({})

  const showContent = [
    <DetailStockEntry key='detail' dataRow={dataRow} setDataRow={setDataRow} />,
    <AdditionalCosts key='additional' dataRow={dataRow} setDataRow={setDataRow} />,
    <OtherStockEntry key='other' dataRow={dataRow} setDataRow={setDataRow} />
  ]

  return (
    <SubPages
      data={data}
      setData={setDataList}
      menuContent={itemStockEntry}
      showContent={showContent}
      dataRow={dataRow}
      setDataRow={setDataRow}
      doctype='Stock Entry'
      docStatusName='disabled'
    />
  )
}

// nextJS SSR
export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}Stock Entry?fields=["*"]`, {
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

export default StockEntry
