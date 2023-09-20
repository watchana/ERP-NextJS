import Skeleton from '@mui/material/Skeleton'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

const FullPageSkeleton = () => {
  // Header Skeleton
  const headerSkeleton = (
    <header>
      <Skeleton variant='text' animation='wave' />
      <Skeleton variant='rectangular' animation='wave' height={'100vh'} />
    </header>
  )

  // Content Skeleton
  const contentSkeleton = (
    <main>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Skeleton variant='text' animation='wave' />
          <Skeleton variant='text' animation='wave' />
          <Skeleton variant='rectangular' animation='wave' height={'100vh'} />
        </Grid>

        <Grid item xs={12}>
          <Skeleton variant='text' animation='wave' />
          <Skeleton variant='text' animation='wave' />
          <Skeleton variant='rectangular' animation='wave' height={'100vh'} />
        </Grid>

        {/* You can duplicate <Grid item> to create more skeleton content */}
      </Grid>
    </main>
  )

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>{headerSkeleton}</Box>
      {contentSkeleton}
    </Container>
  )
}

export default FullPageSkeleton
