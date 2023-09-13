// ** React Import
import React from 'react'

// ** Mui Import
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Divider,
  Collapse,
  IconButton,
  CardContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextareaAutosize,
  Card
} from '@mui/material'
import { useState } from 'react'
import DorpdownButton from 'src/components/Button/Dorpdown_Text/Dorpdown_text'

// ** Mdi Import
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const DetailSupplier = ({ dataRow }) => {
  const [age, setAge] = useState('')

  // ** State
  const [internalSupplier, setInternalSupplier] = useState(false)
  const [moreInformation, setMoreInformation] = useState(false)

  const [isInternalSupplier, setIsInternalSupplier] = useState(false) // New state for checkbox

  const handleClickInternalSupplier = () => {
    setInternalSupplier(!internalSupplier)
  }

  const handleClickMoreInformation = () => {
    setMoreInformation(!moreInformation)
  }

  const handleCheckboxChange = event => {
    setIsInternalSupplier(event.target.checked)
  }

  return (
    <Box>
      <Card
        sx={{
          borderTopLeftRadius: 0, // กำหนด borderRadius สำหรับมุมบนซ้าย
          borderTopRightRadius: 0, // กำหนด borderRadius สำหรับมุมบนขวา
          p: 2,
          mb: 2
        }}
      >
        {/* ////////////////////////////////////// แถวที่ 1 ///////////////////////////////////////////// */}
        <Grid container spacing={2} width={'100%'}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography>Supplier Name * </Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              size='small'
              variant='filled'
              fullWidth
              value={dataRow?.supplier_name}
            />
            <Typography>Country </Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              size='small'
              variant='filled'
              fullWidth
              label=''
              value={dataRow?.country}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} sx={{ mb: 5, display: 'flex', flexDirection: 'column' }}>
            <Typography>Supplier Group * </Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              size='small'
              variant='filled'
              fullWidth
              label=''
              value={dataRow?.supplier_group}
            />
            <Typography>Pupplier Type </Typography>
            <DorpdownButton />
            <FormControlLabel
              sx={{ mt: 2 }}
              control={<Checkbox checked={Boolean(dataRow?.is_transporter) || false} />}
              label='Is Transporter'
            />
          </Grid>
          <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
        </Grid>
        <Typography size='small' sx={{ fontWeight: 'bold' }}>
          Defaults
        </Typography>

        {/* ////////////////////////////////////// แถวที่ 2 ///////////////////////////////////////////// */}
        <Grid container spacing={2} width={'100%'}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography>Billing Currency </Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              size='small'
              variant='filled'
              fullWidth
              value={dataRow?.supplier_name}
            />
            <Typography>Default Company Bank Account</Typography>
            <TextField sx={{ marginBottom: 5 }} size='small' variant='filled' fullWidth value={dataRow?.country} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography>Price List</Typography>
            <TextField
              sx={{ marginBottom: 5 }}
              size='small'
              variant='filled'
              fullWidth
              value={dataRow?.supplier_group}
            />
          </Grid>
        </Grid>
        <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
        {/* ////////////////////////////////////// แถวที่ 3 ///////////////////////////////////////////// */}
        <Grid container>
          <Box sx={{ width: '100%' }}>
            <Button size='small' variant='filled' onClick={handleClickInternalSupplier}>
              Internal Supplier
            </Button>
            <IconButton size='small' onClick={handleClickInternalSupplier}>
              {internalSupplier ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </IconButton>
          </Box>

          <Collapse in={internalSupplier}>
            <CardContent>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={isInternalSupplier} onChange={handleCheckboxChange} />}
                  variant='body2'
                  label='Is Internal Supplier'
                />
                {isInternalSupplier && <TextField label='Represents Company *' variant='outlined' />}
              </FormGroup>
            </CardContent>
          </Collapse>
        </Grid>
        <Divider sx={{ margin: 0, my: 5, width: '100%' }} />
        <Grid container>
          <Box sx={{ width: '100%' }}>
            <Button size='small' variant='filled' onClick={handleClickMoreInformation}>
              More Information
            </Button>
            <IconButton size='small' onClick={handleClickMoreInformation}>
              {moreInformation ? (
                <ChevronUp sx={{ fontSize: '1.875rem' }} />
              ) : (
                <ChevronDown sx={{ fontSize: '1.875rem' }} />
              )}
            </IconButton>
          </Box>
          <Grid container>
            <Collapse in={moreInformation} width={'100%'} style={{ width: '100%' }}>
              <Divider sx={{ margin: 0 }} />
              <CardContent sx={{ width: '100%' }}>
                <Grid container spacing={2} width={'100%'}>
                  <Grid item xs={12}>
                    <Typography>Supplier Details</Typography>
                    <TextareaAutosize
                      fullWidth={false}
                      style={{
                        minHeight: '200px',
                        width: '100%',
                        maxWidth: '100%',
                        minWidth: '300px',
                        overflow: 'hidden'
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Website</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      label=''
                      value={dataRow?.website || ''}
                      fullWidth
                    />

                    <Typography>Print Language</Typography>
                    <TextField
                      sx={{ marginBottom: 5 }}
                      size='small'
                      variant='filled'
                      label=''
                      value={dataRow?.language || ''}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Collapse>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default DetailSupplier
