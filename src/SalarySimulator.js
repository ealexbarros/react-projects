import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Box } from '@mui/material';

const SalarySimulator = () => {
  const [position, setPosition] = useState('');
  const [startYear, setStartYear] = useState('');
  const [results, setResults] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentYear = new Date().getFullYear();
    const yearsWorked = currentYear - parseInt(startYear);

    // Simplified salary calculation logic
    const baseSalaries = { junior: 3000, pleno: 5000, senior: 8000 };
    const growthRates = { junior: 0.10, pleno: 0.08, senior: 0.06 };

    const baseSalary = baseSalaries[position];
    const growthRate = growthRates[position];

    const calculateSalary = (years) => {
      return baseSalary * Math.pow(1 + growthRate, years);
    };

    setResults({
      currentSalary: calculateSalary(yearsWorked).toFixed(2),
      salaryNextYear: calculateSalary(yearsWorked + 1).toFixed(2),
      salaryIn2Years: calculateSalary(yearsWorked + 2).toFixed(2),
      salaryIn3Years: calculateSalary(yearsWorked + 3).toFixed(2),
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
            <MenuItem value="junior">Júnior</MenuItem>
            <MenuItem value="pleno">Pleno</MenuItem>
            <MenuItem value="senior">Sênior</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Ano de Entrada"
          type="number"
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Calcular Salário
        </Button>
      </Box>
      {results && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Resultados:
          </Typography>
          <Typography>Salário atual: R$ {results.currentSalary}</Typography>
          <Typography>Salário em 1 ano: R$ {results.salaryNextYear}</Typography>
          <Typography>Salário em 2 anos: R$ {results.salaryIn2Years}</Typography>
          <Typography>Salário em 3 anos: R$ {results.salaryIn3Years}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default SalarySimulator;