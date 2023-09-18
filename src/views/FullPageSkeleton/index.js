import Skeleton from '@mui/material/Skeleton'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

const FullPageSkeleton = () => {
  // สร้างส่วนหัวของหน้าเว็บหรือแอปพลิเคชันที่คุณต้องการแสดงผล
  const headerSkeleton = (
    <header>
      <Skeleton variant='text' animation='wave' width={'100%'} />
      <Skeleton variant='rectangular' animation='wave' width={'100%'} height={200} />{' '}
      {/* ปรับความสูงตามที่คุณต้องการ */}
    </header>
  )

  // สร้างส่วนเนื้อหาหน้าเว็บหรือแอปพลิเคชันที่คุณต้องการแสดงผล
  const contentSkeleton = (
    <main>
      <Skeleton variant='text' animation='wave' width={'100%'} />
      <Skeleton variant='text' animation='wave' width={'100%'} />
      <Skeleton variant='rectangular' animation='wave' width={'100%'} height={400} />{' '}
      {/* ปรับความสูงตามที่คุณต้องการ */}
    </main>
  )

  // สร้างโครงสร้างของหน้าเว็บหรือแอปพลิเคชันที่มี Skeleton
  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>{headerSkeleton}</Box>
      {contentSkeleton}
    </Container>
  )
}

export default FullPageSkeleton
