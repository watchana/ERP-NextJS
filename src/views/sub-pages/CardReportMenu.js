// ** React Imports
import React from 'react'

// ** Next Router
import { useRouter } from 'next/router'

// ** Mui Components
import { useTheme } from '@mui/material/styles'
import { Card, CardContent, Box, Typography, Grid, Button } from '@mui/material'

// ** Custom Components
import { OnHover, Visible } from 'src/components/Motion'
import Image from 'next/image'

function CardReportMenu({ menus }) {
  // ** Hooks
  const theme = useTheme()
  const router = useRouter()

  if (menus && menus.length === 0)
    return (
      <Card>
        <CardContent>
          <Typography variant='h6' fontWeight={'bold'}>
            No Reports & Masters Found
          </Typography>
        </CardContent>
      </Card>
    )

  return (
    <Card
      style={{ background: theme.palette.grey[200] }}
      sx={{
        padding: theme => `${theme.spacing(3, 5, 0.5)} !important`
      }}
    >
      <Box>
        <Typography variant='h6' fontWeight={'bold'}>
          Reports & Masters
        </Typography>
      </Box>
      <Card style={{ background: theme.palette.secondary.E }} sx={{ width: '100%', height: 'auto', mb: 4 }}>
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              {menus.map(menu => (
                <Box key={menu.id}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant='h6' fontWeight={'bold'} sx={{ color: theme.palette.primary }}>
                        {menu.name}
                      </Typography>
                    </Grid>
                    {menu.submenus.map(item => (
                      <Grid item key={item.id} xs={12} sm={6} md={4} lg={3} sx={{ p: 4 }}>
                        <Visible>
                          <OnHover>
                            <Button
                              sx={{
                                width: '100%',
                                minHeight: 150,
                                minWidth: 250
                              }}
                              style={{ background: theme.palette.grey[300] }}
                              onClick={() => router.push(item.route)}
                            >
                              <CardContent>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: '72px',
                                      height: '72px',
                                      position: 'relative',
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center'
                                    }}
                                  >
                                    <Image
                                      src={`/images/icons/${item.imgIcon}`}
                                      alt='Icons'
                                      layout='fill'
                                      objectFit='contain'
                                    />
                                  </Box>
                                  <Typography sx={{ fontSize: 11, fontWeight: 'bold', marginTop: 1 }}>
                                    {item.name}
                                  </Typography>
                                </Box>
                              </CardContent>
                            </Button>
                          </OnHover>
                        </Visible>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Card>
  )
}

export default CardReportMenu
