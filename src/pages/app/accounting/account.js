// ** React Imports
import React from 'react'

// ** Axios Imports
import axios from 'axios'
import SubPages from 'src/views/sub-pages/SubPages'

// ** Custom Components
import ChartofAccounts from 'src/views/sub-pages/accounting/account/ChartofAccounts'

// ** Layouts
import SubPageLayout from 'src/@core/layouts/SubPageLayout'

const Account = ({ data }) => {
  const [dataRow, setDataRow] = React.useState({})
  const [dataList, setDataList] = React.useState(data)

  return (
    <SubPages
      data={dataList}
      setData={setDataList}
      menuContent={[]}
      showContent={[]}
      noTabContent={<ChartofAccounts dataRow={dataRow} setDataRow={setDataRow} />}
      dataRow={dataRow}
      setDataRow={setDataRow}
      doctype='Account'
      docStatusName='disabled'
    />
  )
}

Account.getLayout = page => <SubPageLayout>{page}</SubPageLayout>

// nextJS SSR
export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}Account?fields=["*"]&limit=500`, {
    headers: {
      Authorization: 'token 5891d01ccc2961e:0e446b332dc22aa'
    }
  })
  const data = res.data.data

  return {
    props: { data: data }
  }
}

export default Account
