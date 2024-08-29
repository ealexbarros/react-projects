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
  FormControlLabel,
  Switch
} from '@mui/material';

const PJUSalarySimulator = () => {
  const [formData, setFormData] = useState({
    cargo: 'analista',
    nivelOuData: 'nivel',
    nivel: 1,
    dataIngresso: '',
    adicionalQualificacao: '',
    adicionalTreinamento: '',
    comissao: 'nenhuma',
    comissaoTipo: '',
  });

  const [result, setResult] = useState(null);

  const auxilioAlimentacao = 1393.10;
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

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

  const fcValues = {
    'FC-06': 3452.10,
    'FC-05': 2508.30,
    'FC-04': 2179.66,
    'FC-03': 1549.52,
    'FC-02': 1331.52,
    'FC-01': 1145.14,
  };

  const cjValues = {
    'CJ-04': 10668.61,
    'CJ-03': 9450.62,
    'CJ-02': 8313.37,
    'CJ-01': 6731.35,
  };

  const calculateSalary = (data) => {
    const salaryTable = data.cargo === 'analista' ? analistaSalaryTable : tecnicoSalaryTable;
    let nivel;
    
    if (data.nivelOuData === 'nivel') {
      nivel = parseInt(data.nivel);
    } else {
      const yearsSinceJoining = new Date().getFullYear() - new Date(data.dataIngresso).getFullYear();
      nivel = Math.min(Math.max(yearsSinceJoining + 1, 1), 13);
    }

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

    // FC e CJ
    if (data.comissao === 'fc' && data.comissaoTipo) {
      totalSalary += fcValues[data.comissaoTipo];
    } else if (data.comissao === 'cj' && data.comissaoTipo) {
      totalSalary += cjValues[data.comissaoTipo];
    }
 // Adicione o auxílio alimentação
    totalSalary += auxilioAlimentacao;

    return { totalSalary, nivel, base, gaj, auxilioAlimentacao };
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

      <FormControlLabel
        control={
          <Switch
            checked={formData.nivelOuData === 'data'}
            onChange={(e) => setFormData(prev => ({ ...prev, nivelOuData: e.target.checked ? 'data' : 'nivel' }))}
          />
        }
        label="Usar data de ingresso"
      />

      {formData.nivelOuData === 'nivel' ? (
        <FormControl fullWidth margin="normal">
          <InputLabel>Nível</InputLabel>
          <Select
            name="nivel"
            value={formData.nivel}
            onChange={handleInputChange}
            required
          >
            {[...Array(13)].map((_, i) => (
              <MenuItem key={i+1} value={i+1}>{i+1}</MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <TextField
          fullWidth
          margin="normal"
          label="Data de Ingresso"
          type="date"
          name="dataIngresso"
          value={formData.dataIngresso}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
          required
        />
      )}

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
            {Object.keys(fcValues).map((fc) => (
              <MenuItem key={fc} value={fc}>{fc}</MenuItem>
            ))}
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
            {Object.keys(cjValues).map((cj) => (
              <MenuItem key={cj} value={cj}>{cj}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Calcular Remuneração
      </Button>

      {result && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Resultado da Simulação:</Typography>
          <Typography>Nível: {result.nivel}</Typography>
          <Typography>Salário Base: R$ {result.base.toFixed(2)}</Typography>
          <Typography>GAJ: R$ {result.gaj.toFixed(2)}</Typography>
          <Typography>Auxílio Alimentação: R$ {result.auxilioAlimentacao.toFixed(2)}</Typography>
          <Typography>Remuneração Total: R$ {result.totalSalary.toFixed(2)}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default PJUSalarySimulator;