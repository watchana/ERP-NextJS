import { Box, TextField, Typography, Card, Button, Grid } from '@mui/material'

const TaxCustomer = ({ dataRow, setDataRow, handleUpdateData }) => {
  const handleTextChange = event => {
    handleUpdateData(event.target.name, event.target.value)
  }

  const styles = {
    card: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      p: 2
    },
    textField: {
      bgcolor: 'grey.100'
    },
    box: {
      marginBlock: 2,
      mt: 4
    }
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Box sx={styles.box}>
              <Typography sx={{ marginBottom: 2 }}>Tax ID</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                label=''
                value={dataRow.tax_id || ''}
                fullWidth
                onChange={handleTextChange}
                name='tax_id'
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Box sx={styles.box}>
              <Typography sx={{ marginBottom: 2 }}>Tax Category</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                label=''
                value={dataRow.tax_category || ''}
                fullWidth
                onChange={handleTextChange}
                name='tax_category'
              />
            </Box>

            <Box sx={styles.box}>
              <Typography sx={{ marginBottom: 2 }}>Tax Withholding Category</Typography>
              <TextField
                sx={styles.textField}
                variant='outlined'
                label=''
                value={dataRow.tax_withholding_category || ''}
                fullWidth
                onChange={handleTextChange}
                name='tax_withholding_category'
              />
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default TaxCustomer
