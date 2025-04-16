import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

const Navbar: React.FC = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 'none',
        backgroundColor: 'transparent', 
        zIndex: 1200, 
        paddingLeft: '50px',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between', 
        }}
      >
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginLeft: '70px',
          }}
        >
          <Typography
            variant="h3" 
            sx={{
              fontWeight: 'Inter',
              color: 'black',
              mt: 7,
              ml: 25,
            }}
          >
            Dashboard
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: '12px',
              fontWeight: 'Light',
              color: 'red',
              mt: 0,
              ml: 26,
            }}
          >
            Welcome to E-JEI Dashboard
          </Typography>
        </Box>

        
        <IconButton
          sx={{
            
            mt: 6, 
            mr: 30,  
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',  
          }}
        >
          <CircleNotificationsIcon
            sx={{
              fontSize: 40,  
              
              stroke: 'black',  
             
              fill: 'white',  
            }}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
