import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Box, Alert } from '@mui/material';

const SalarySimulator = () => {
  const [position, setPosition] = useState('');
  const [startDate, setStartDate] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const analistaSalaries = [
    13994.78, 14414.62, 14847.07, 15693.38, 16164.14, 16649.09, 
    17148.55, 17663.02, 18669.82, 19229.90, 19806.79, 20401.01, 21013.03
  ];

  const calculateYearsWorked = (startDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const yearsWorked = today.getFullYear() - start.getFullYear();
    const monthDiff = today.getMonth() - start.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < start.getDate())) {
      return yearsWorked - 1;
    }
    return yearsWorked;
  };

  const getSalaryForYear = (yearsWorked) => {
    if (yearsWorked >= analistaSalaries.length) {
      return analistaSalaries[analistaSalaries.length - 1];
    }
    return analistaSalaries[yearsWorked];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setResults(null);

    if (position === 'tecnico') {
      setError('Funcionalidade ainda em desenvolvimento.');
      return;
    }

    if (!startDate) {
      setError('Por favor, selecione a data de início.');
      return;
    }

    const yearsWorked = calculateYearsWorked(startDate);
    const currentSalary = getSalaryForYear(yearsWorked);
    const nextYearSalary = getSalaryForYear(yearsWorked + 1);
    const twoYearsSalary = getSalaryForYear(yearsWorked + 2);

    setResults({
      currentSalary: currentSalary.toFixed(2),
      salaryNextYear: nextYearSalary.toFixed(2),
      salaryIn2Years: twoYearsSalary.toFixed(2),
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Simulador de Salários
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Cargo</InputLabel>
          <Select value={position} onChange={(e) => setPosition(e.target.value)} required>
            <MenuItem value="analista">Analista Judiciário</MenuItem>
            <MenuItem value="tecnico">Técnico Judiciário</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Data de Início"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Calcular Salário
        </Button>
      </Box>
      {error && (
        <Alert severity="info" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {results && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Resultados:
          </Typography>
          <Typography>Salário atual: R$ {results.currentSalary}</Typography>
          <Typography>Salário no próximo ano: R$ {results.salaryNextYear}</Typography>
          <Typography>Salário em 2 anos: R$ {results.salaryIn2Years}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default SalarySimulator;