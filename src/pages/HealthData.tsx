import React from 'react';
import { Paper, Typography, Grid, Button, Box } from '@mui/material';

const HealthData = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>Health Data Management</Typography>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary">
              Upload Health Data
            </Button>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Access Control</Typography>
          <Typography color="text.secondary">
            Manage who can access your health records
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default HealthData;
