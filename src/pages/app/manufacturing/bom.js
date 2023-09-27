// ** React Imports
import React from 'react'

// ** Axios Imports
import axios from 'axios'
import LayoutTwoPage from 'src/views/sub-pages/LayoutTwoPage'

// ** Dummy Data
import { BomMenu } from 'src/dummy/contentPages/menufacturingPage'

// ** Custom Components
import ConnectionsBOM from 'src/views/sub-pages/manufacturing/bom/ConnectionBOM'
import ProductItemBOM from 'src/views/sub-pages/manufacturing/bom/ProductItemBOM'
import OperationBOM from 'src/views/sub-pages/manufacturing/bom/OperationBOM'
import ScapAndProcessLoss from 'src/views/sub-pages/manufacturing/bom/ScapAndProcessLoss'
import Costing from 'src/views/sub-pages/manufacturing/bom/Costing'
import MoreInfoBOM from 'src/views/sub-pages/manufacturing/bom/MoreInfoBOM'
import WebsiteBOM from 'src/views/sub-pages/manufacturing/bom/WebsiteBOM'

// ** Layouts
import SubPageLayout from 'src/@core/layouts/SubPageLayout'

const BomPage = ({ data }) => {
  const [dataRow, setDataRow] = React.useState({})
  const [dataList, setDataList] = React.useState(data)

  const showContent = [
    <ProductItemBOM key={'product'} dataRow={dataRow} setDataRow={setDataRow} />,
    <OperationBOM key={'operation'} dataRow={dataRow} setDataRow={setDataRow} />,
    <ScapAndProcessLoss key={'scap'} dataRow={dataRow} setDataRow={setDataRow} />,
    <Costing key={'costing'} dataRow={dataRow} setDataRow={setDataRow} />,
    <MoreInfoBOM key={'moreinfo'} dataRow={dataRow} setDataRow={setDataRow} />,
    <WebsiteBOM key={'moreinfo'} dataRow={dataRow} setDataRow={setDataRow} />,
    <ConnectionsBOM key={'connection'} dataRow={dataRow} setDataRow={setDataRow} />
  ]

  return (
    <LayoutTwoPage
      data={dataList}
      setData={setDataList}
      menuContent={BomMenu}
      showContent={showContent}
      dataRow={dataRow}
      setDataRow={setDataRow}
      doctype='BOM'
      docStatusName='disabled'
    />
  )
}

BomPage.getLayout = page => <SubPageLayout>{page}</SubPageLayout>

// nextJS SSR
export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}BOM?fields=["*"]`, {
    headers: {
      Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
    }
  })
  const data = res.data.data

  return {
    props: { data: data }
  }
}

export default BomPage
