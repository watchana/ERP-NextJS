// ** React Imports
import React from 'react'

// ** Axios Imports
import axios from 'axios'
import LayoutTwoPage from 'src/views/sub-pages/LayoutTwoPage'

// ** Dummy Data
import { WorkOrderMenu } from 'src/dummy/contentPages/work-order'

// ** Custom Components
import ProductionItemPage from 'src/views/sub-pages/manufacturing/work-order/ProductionItem'
import ConfigulationPage from 'src/views/sub-pages/manufacturing/work-order/Configulation'
import Operation from 'src/views/sub-pages/manufacturing/work-order/Operation'

// ** Layouts
import SubPageLayout from 'src/@core/layouts/SubPageLayout'

const WorkOrderPage = ({ data }) => {
  const [dataRow, setDataRow] = React.useState({})
  const [dataList, setDataList] = React.useState(data)

  const showContent = [
    <ProductionItemPage key={'product'} dataRow={dataRow} setDataRow={setDataRow} />,
    <ConfigulationPage key={'config'} dataRow={dataRow} setDataRow={setDataRow} />,
    <Operation key={'operation'} dataRow={dataRow} setDataRow={setDataRow} />
  ]

  return (
    <LayoutTwoPage
      data={dataList}
      setData={setDataList}
      menuContent={WorkOrderMenu}
      showContent={showContent}
      dataRow={dataRow}
      setDataRow={setDataRow}
      doctype='Work Order'
      docStatusName='disabled'
      noTabContent={[]}
    />
  )
}

WorkOrderPage.getLayout = page => <SubPageLayout>{page}</SubPageLayout>

// nextJS SSR
export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}Work Order?fields=["*"]`, {
    headers: {
      Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
    }
  })
  const data = res.data.data

  return {
    props: { data: data }
  }
}

export default WorkOrderPage
