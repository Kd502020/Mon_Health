import React from 'react';
import { Paper, Typography, Grid, Box, Button } from '@mui/material';
import { useWeb3 } from '../context/Web3Context';

const Profile = () => {
  const { account, isConnected, connectWallet } = useWeb3();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>Profile</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Wallet Status:</Typography>
            {isConnected ? (
              <>
                <Typography color="text.secondary" gutterBottom>
                  Connected Address: {account}
                </Typography>
              </>
            ) : (
              <Button 
                variant="contained" 
                color="primary" 
                onClick={connectWallet}
                sx={{ mt: 2 }}
              >
                Connect Wallet
              </Button>
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
