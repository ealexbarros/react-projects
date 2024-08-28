import React from 'react';
import SalarySimulator from './SalarySimulator';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <SalarySimulator />
      </Container>
    </ThemeProvider>
  );
}

export default App;