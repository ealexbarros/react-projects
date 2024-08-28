import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Simulador Financeiro
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Início
        </Button>
        <Button color="inherit" component={RouterLink} to="/pj-vs-clt">
          PJ vs CLT
        </Button>
        <Button color="inherit" component={RouterLink} to="/pju">
          PJU
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;