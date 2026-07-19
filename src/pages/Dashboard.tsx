import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';

const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>Welcome to MON_ID</Typography>
          <Typography>Your decentralized health identity management system</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Your Health Data</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography>Connected to Ethereum: {window.ethereum ? 'Yes' : 'No'}</Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Access Control</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography>Manage who can access your health records</Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
