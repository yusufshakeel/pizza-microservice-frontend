import * as React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import AppConstant from '../constants/app-constants';

function NavigationBar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {AppConstant.APP_NAME}
        </Typography>
        <Button color="inherit" size="large">
          Cart
        </Button>
        <Button color="inherit" size="large">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
