import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


   const Home = () => {
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
       </Box>
     );
   };

   export default Home;