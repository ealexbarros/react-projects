import React, { useState } from 'react';
import { Button, Typography, Box, TextField, Snackbar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  const [email, setEmail] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o email para o backend
    console.log('Email cadastrado:', email);
    setEmail('');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bem-vindo ao Simulador Financeiro
      </Typography>
      <Typography variant="body1" paragraph>
        Esta aplicação oferece duas ferramentas de simulação para ajudar você a tomar decisões financeiras informadas.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
        <Button component={RouterLink} to="/pj-vs-clt" variant="contained" color="primary">
          Simulador PJ vs CLT
        </Button>
        <Button component={RouterLink} to="/pju" variant="contained" color="secondary">
          Simulador PJU
        </Button>
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Cadastre-se para receber novidades
        </Typography>
        <TextField
          label="Seu email"
          variant="outlined"
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
          sx={{ width: '100%', maxWidth: 400, mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Email cadastrado com sucesso!"
      />
    </Box>
  );
};

export default Home;