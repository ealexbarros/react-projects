import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Typography, 
  Box, 
  RadioGroup,
  Radio,
  FormControlLabel 
} from '@mui/material';

const PJUSalarySimulator = () => {
  const [formData, setFormData] = useState({
    cargo: 'analista',
    anosTrabalho: 0,
    adicionalQualificacao: '',
    adicionalTreinamento: '',
    comissao: 'nenhuma',
    comissaoTipo: '',
  });

  const [result, setResult] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Reset comissaoTipo if comissao changes
    if (name === 'comissao') {
      setFormData(prevData => ({
        ...prevData,
        comissaoTipo: ''
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const calculatedSalary = calculateSalary(formData);
    setResult(calculatedSalary);
  };

  const analistaSalaryTable = [
    { nivel: 13, base: 8755.43, gaj: 12257.60 },
    { nivel: 12, base: 8500.42, gaj: 11900.59 },
    { nivel: 11, base: 8252.83, gaj: 11553.96 },
    { nivel: 10, base: 8012.46, gaj: 11217.44 },
    { nivel: 9, base: 7779.09, gaj: 10890.73 },
    { nivel: 8, base: 7359.59, gaj: 10303.43 },
    { nivel: 7, base: 7145.23, gaj: 10003.32 },
    { nivel: 6, base: 6937.12, gaj: 9711.97 },
    { nivel: 5, base: 6735.06, gaj: 9429.08 },
    { nivel: 4, base: 6538.91, gaj: 9154.47 },
    { nivel: 3, base: 6186.28, gaj: 8660.79 },
    { nivel: 2, base: 6006.09, gaj: 8408.53 },
    { nivel: 1, base: 5831.16, gaj: 8163.62 },
  ];

  const tecnicoSalaryTable = [
    { nivel: 13, base: 5336.35, gaj: 7470.89 },
    { nivel: 12, base: 5180.92, gaj: 7253.29 },
    { nivel: 11, base: 5030.02, gaj: 7042.03 },
    { nivel: 10, base: 4883.52, gaj: 6836.93 },
    { nivel: 9, base: 4741.26, gaj: 6637.76 },
    { nivel: 8, base: 4485.59, gaj: 6279.83 },
    { nivel: 7, base: 4354.94, gaj: 6096.92 },
    { nivel: 6, base: 4228.11, gaj: 5919.35 },
    { nivel: 5, base: 4104.96, gaj: 5746.94 },
    { nivel: 4, base: 3985.39, gaj: 5579.55 },
    { nivel: 3, base: 3770.47, gaj: 5278.66 },
    { nivel: 2, base: 3660.66, gaj: 5124.92 },
    { nivel: 1, base: 3554.02, gaj: 4975.63 },
  ];

  const calculateSalary = (data) => {
    const salaryTable = data.cargo === 'analista' ? analistaSalaryTable : tecnicoSalaryTable;
    const nivel = Math.min(Math.max(data.anosTrabalho, 1), 13);
    const { base, gaj } = salaryTable.find(item => item.nivel === nivel);
    
    let totalSalary = base + gaj;

    // Adicional de Qualificação
    const qualificacaoPercentages = {
      'pos': 0.075,
      'mestrado': 0.10,
      'doutorado': 0.12
    };
    if (data.adicionalQualificacao) {
      totalSalary += base * qualificacaoPercentages[data.adicionalQualificacao];
    }

    // Adicional de Treinamento
    if (data.adicionalTreinamento) {
      totalSalary += base * (parseInt(data.adicionalTreinamento) / 100);
    }

    // Aqui você pode adicionar a lógica para FC e CJ quando tiver os valores específicos

    return totalSalary;
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Simulador de Remuneração PJU
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Cargo</InputLabel>
        <Select
          name="cargo"
          value={formData.cargo}
          onChange={handleInputChange}
          required
        >
          <MenuItem value="analista">Analista</MenuItem>
          <MenuItem value="tecnico">Técnico</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        margin="normal"
        label="Anos de Trabalho"
        name="anosTrabalho"
        type="number"
        value={formData.anosTrabalho}
        onChange={handleInputChange}
        required
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Adicional de Qualificação</InputLabel>
        <Select
          name="adicionalQualificacao"
          value={formData.adicionalQualificacao}
          onChange={handleInputChange}
        >
          <MenuItem value="">Nenhum</MenuItem>
          <MenuItem value="pos">Pós-graduação (7,5%)</MenuItem>
          <MenuItem value="mestrado">Mestrado (10%)</MenuItem>
          <MenuItem value="doutorado">Doutorado (12%)</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Adicional de Treinamento</InputLabel>
        <Select
          name="adicionalTreinamento"
          value={formData.adicionalTreinamento}
          onChange={handleInputChange}
        >
          <MenuItem value="">Nenhum</MenuItem>
          <MenuItem value="1">1%</MenuItem>
          <MenuItem value="2">2%</MenuItem>
          <MenuItem value="3">3%</MenuItem>
        </Select>
      </FormControl>

      <FormControl component="fieldset" margin="normal">
        <Typography variant="subtitle1">Função ou Cargo em Comissão</Typography>
        <RadioGroup
          name="comissao"
          value={formData.comissao}
          onChange={handleInputChange}
        >
          <FormControlLabel value="nenhuma" control={<Radio />} label="Nenhuma" />
          <FormControlLabel value="fc" control={<Radio />} label="Função Comissionada (FC)" />
          <FormControlLabel value="cj" control={<Radio />} label="Cargo em Comissão (CJ)" />
        </RadioGroup>
      </FormControl>

      {formData.comissao === 'fc' && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Tipo de FC</InputLabel>
          <Select
            name="comissaoTipo"
            value={formData.comissaoTipo}
            onChange={handleInputChange}
            required
          >
            <MenuItem value="FC-01">FC-01</MenuItem>
            <MenuItem value="FC-02">FC-02</MenuItem>
            <MenuItem value="FC-03">FC-03</MenuItem>
            <MenuItem value="FC-04">FC-04</MenuItem>
            <MenuItem value="FC-05">FC-05</MenuItem>
            <MenuItem value="FC-06">FC-06</MenuItem>
          </Select>
        </FormControl>
      )}

      {formData.comissao === 'cj' && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Tipo de CJ</InputLabel>
          <Select
            name="comissaoTipo"
            value={formData.comissaoTipo}
            onChange={handleInputChange}
            required
          >
            <MenuItem value="CJ-01">CJ-01</MenuItem>
            <MenuItem value="CJ-02">CJ-02</MenuItem>
            <MenuItem value="CJ-03">CJ-03</MenuItem>
            <MenuItem value="CJ-04">CJ-04</MenuItem>
          </Select>
        </FormControl>
      )}

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Calcular Remuneração
      </Button>

      {result && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Resultado da Simulação:</Typography>
          <Typography>Remuneração Total: R$ {result.toFixed(2)}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default PJUSalarySimulator;