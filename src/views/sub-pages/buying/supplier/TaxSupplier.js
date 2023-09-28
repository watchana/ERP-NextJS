// ** React Import
import React, { useEffect, useState } from 'react'

// ** Mui Import
import { Box, Grid, TextField, Typography, Card } from '@mui/material'

const TaxSupplier = ({ dataRow, handleUpdateData }) => {
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
      <Card sx={styles.card}>
        <Grid container spacing={3}>
          <Grid item sm={12} md={6}>
            <Box sx={styles.box}>
              <Typography>Tax ID</Typography>
              <TextField
                fullWidth
                variant='outlined'
                name='tax_id'
                value={dataRow.tax_id}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>
          </Grid>
          <Grid item sm={12} md={6}>
            <Box sx={styles.box}>
              <Typography>Tax Category</Typography>
              <TextField
                fullWidth
                variant='outlined'
                name='tax_category'
                value={dataRow?.tax_category || ''}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>

            <Box sx={styles.box}>
              <Typography>Tax Withholding Category</Typography>
              <TextField
                fullWidth
                variant='outlined'
                name='tax_withholding_category'
                value={dataRow?.tax_withholding_category || ''}
                onChange={handleTextChange}
                sx={styles.textField}
              />
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default TaxSupplier
