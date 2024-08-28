import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/Header';
import Home from './components/Home';
import PJvsCLTSimulator from './components/PJvsCLTSimulator';
import PJUSimulator from './components/PJUSimulator';

const theme = createTheme({
  // Você pode personalizar o tema aqui
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pj-vs-clt" element={<PJvsCLTSimulator />} />
            <Route path="/pju" element={<PJUSimulator />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;