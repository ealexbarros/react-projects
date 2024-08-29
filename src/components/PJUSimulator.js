import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Typography, Box, Checkbox, FormControlLabel } from '@mui/material';

const analistaSalaryTable = [
  { level: 13, base: 8755.43, gaj: 12257.60 },
  { level: 12, base: 8500.42, gaj: 11900.59 },
  { level: 11, base: 8252.83, gaj: 11553.96 },
  { level: 10, base: 8012.46, gaj: 11217.44 },
  { level: 9, base: 7779.09, gaj: 10890.73 },
  { level: 8, base: 7359.59, gaj: 10303.43 },
  { level: 7, base: 7145.23, gaj: 10003.32 },
  { level: 6, base: 6937.12, gaj: 9711.97 },
  { level: 5, base: 6735.06, gaj: 9429.08 },
  { level: 4, base: 6538.91, gaj: 9154.47 },
  { level: 3, base: 6186.28, gaj: 8660.79 },
  { level: 2, base: 6006.09, gaj: 8408.53 },
  { level: 1, base: 5831.16, gaj: 8163.62 },
];

const tecnicoSalaryTable = [
  { level: 13, base: 5336.35, gaj: 7470.89 },
  { level: 12, base: 5180.92, gaj: 7253.29 },
  { level: 11, base: 5030.02, gaj: 7042.03 },
  { level: 10, base: 4883.52, gaj: 6836.93 },
  { level: 9, base: 4741.26, gaj: 6637.76 },
  { level: 8, base: 4485.59, gaj: 6279.83 },
  { level: 7, base: 4354.94, gaj: 6096.92 },
  { level: 6, base: 4228.11, gaj: 5919.35 },
  { level: 5, base: 4104.96, gaj: 5746.94 },
  { level: 4, base: 3985.39, gaj: 5579.55 },
  { level: 3, base: 3770.47, gaj: 5278.66 },
  { level: 2, base: 3660.66, gaj: 5124.92 },
  { level: 1, base: 3554.02, gaj: 4975.63 },
];

const PJUSimulator = () => {
  const [formData, setFormData] = useState({
    regime: '',
    cargoTipo: '',
    ingressoData: '',
    funcaoComissao: false,
    gasGaeGaptic: false,
    adicionalQualificacao: '',
    adicionalTreinamento: '',
    adicionalTempoServico: '',
    dependentesIRRF: 0,
    auxilioCreche: false,
    vpniIncorporacoes: 0,
  });

  const [resultado, setResultado] = useState(null);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calcularSalario = () => {
    const anosTrabalho = new Date().getFullYear() - new Date(formData.ingressoData).getFullYear();
    const nivel = Math.min(Math.max(1, anosTrabalho + 1), 13);
    const salaryTable = formData.cargoTipo === 'analista' ? analistaSalaryTable : tecnicoSalaryTable;
    const { base, gaj } = salaryTable.find(item => item.level === nivel);
    
    let salarioBase = base;
    let salarioTotal = base + gaj;

    // Adicional de Qualificação (aplicado apenas sobre o salário base)
    if (formData.adicionalQualificacao === 'pos') salarioTotal += salarioBase * 0.075;
    else if (formData.adicionalQualificacao === 'mestrado') salarioTotal += salarioBase * 0.10;
    else if (formData.adicionalQualificacao === 'doutorado') salarioTotal += salarioBase * 0.12;

    // Adicional de Treinamento (aplicado apenas sobre o salário base)
    if (formData.adicionalTreinamento === '1') salarioTotal += salarioBase * 0.01;
    else if (formData.adicionalTreinamento === '2') salarioTotal += salarioBase * 0.02;
    else if (formData.adicionalTreinamento === '3') salarioTotal += salarioBase * 0.03;

    // Adicionar outros cálculos conforme necessário
    // Por exemplo, Adicional por Tempo de Serviço
    if (formData.adicionalTempoServico) {
      salarioTotal += salarioBase * (parseFloat(formData.adicionalTempoServico) / 100);
    }

    // VPNI / Incorporações
    salarioTotal += parseFloat(formData.vpniIncorporacoes || 0);

    setResultado({
      salarioBase: salarioBase.toFixed(2),
      gaj: gaj.toFixed(2),
      salarioTotal: salarioTotal.toFixed(2),
      nivel: nivel
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Simulador de Remuneração PJU
      </Typography>
      <form>
        <FormControl fullWidth margin="normal">
          <InputLabel>Regime Previdenciário</InputLabel>
          <Select name="regime" value={formData.regime} onChange={handleChange}>
            <MenuItem value="paridade">Paridade</MenuItem>
            <MenuItem value="media">Média</MenuItem>
            <MenuItem value="funpresp">Funpresp</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Cargo</InputLabel>
          <Select name="cargoTipo" value={formData.cargoTipo} onChange={handleChange}>
            <MenuItem value="analista">Analista</MenuItem>
            <MenuItem value="tecnico">Técnico</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Data de Ingresso"
          type="date"
          name="ingressoData"
          value={formData.ingressoData}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <FormControlLabel
          control={<Checkbox name="funcaoComissao" checked={formData.funcaoComissao} onChange={handleChange} />}
          label="Possui Função ou Cargo em Comissão"
        />

        <FormControlLabel
          control={<Checkbox name="gasGaeGaptic" checked={formData.gasGaeGaptic} onChange={handleChange} />}
          label="Possui GAS ou GAE ou GAPTIC"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Adicional de Qualificação</InputLabel>
          <Select name="adicionalQualificacao" value={formData.adicionalQualificacao} onChange={handleChange}>
            <MenuItem value="">Nenhum</MenuItem>
            <MenuItem value="pos">Pós-graduação (7,5%)</MenuItem>
            <MenuItem value="mestrado">Mestrado (10%)</MenuItem>
            <MenuItem value="doutorado">Doutorado (12%)</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Adicional de Treinamento</InputLabel>
          <Select name="adicionalTreinamento" value={formData.adicionalTreinamento} onChange={handleChange}>
            <MenuItem value="">Nenhum</MenuItem>
            <MenuItem value="1">1%</MenuItem>
            <MenuItem value="2">2%</MenuItem>
            <MenuItem value="3">3%</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Adicional por Tempo de Serviço (%)"
          type="number"
          name="adicionalTempoServico"
          value={formData.adicionalTempoServico}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Dependentes (IRRF)"
          type="number"
          name="dependentesIRRF"
          value={formData.dependentesIRRF}
          onChange={handleChange}
        />

        <FormControlLabel
          control={<Checkbox name="auxilioCreche" checked={formData.auxilioCreche} onChange={handleChange} />}
          label="Auxílio-creche"
        />

        <TextField
          fullWidth
          margin="normal"
          label="VPNI / Incorporações (R$)"
          type="number"
          name="vpniIncorporacoes"
          value={formData.vpniIncorporacoes}
          onChange={handleChange}
        />

        <Button variant="contained" color="primary" onClick={calcularSalario} sx={{ mt: 2 }}>
          Calcular Remuneração
        </Button>
      </form>

      {resultado && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Resultado da Simulação:</Typography>
          <Typography>Nível: {resultado.nivel}</Typography>
          <Typography>Salário Base: R$ {resultado.salarioBase}</Typography>
          <Typography>GAJ: R$ {resultado.gaj}</Typography>
          <Typography>Remuneração Total Estimada: R$ {resultado.salarioTotal}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default PJUSimulator;