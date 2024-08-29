import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Typography, Box, Radio, RadioGroup, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// ... (mantenha as tabelas salariais de analista e técnico, fcValues e cjValues como antes)

const AUXILIO_ALIMENTACAO = 1393.10;

const PJUSimulator = () => {
  const [formData, setFormData] = useState({
    regime: '',
    cargoTipo: '',
    ingressoData: '',
    nivelManual: '',
    funcaoComissao: '',
    cargoComissao: '',
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
    const { name, value } = event.target;
    setFormData(prevData => {
      const newData = { ...prevData, [name]: value };
      
      if (name === 'funcaoComissao' && value) {
        newData.cargoComissao = '';
      } else if (name === 'cargoComissao' && value) {
        newData.funcaoComissao = '';
      }
      
      return newData;
    });
  };

  const calcularSalario = () => {
    let nivel;
    if (formData.nivelManual) {
      nivel = parseInt(formData.nivelManual);
    } else {
      const today = new Date();
      const ingressoDate = new Date(formData.ingressoData);
      const yearsSinceJoining = today.getFullYear() - ingressoDate.getFullYear();
      const monthDiff = today.getMonth() - ingressoDate.getMonth();
      const dayDiff = today.getDate() - ingressoDate.getDate();
      
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        nivel = Math.min(yearsSinceJoining, 13);
      } else {
        nivel = Math.min(yearsSinceJoining + 1, 13);
      }
    }

    const salaryTable = formData.cargoTipo === 'analista' ? analistaSalaryTable : tecnicoSalaryTable;
    const calcularSalarioPorNivel = (nivelCalc) => {
      const { base, gaj } = salaryTable.find(item => item.level === nivelCalc);
      let salarioBase = base;
      let salarioTotal = base + gaj;

      // Adicional de Qualificação
      if (formData.adicionalQualificacao === 'pos') salarioTotal += salarioBase * 0.075;
      else if (formData.adicionalQualificacao === 'mestrado') salarioTotal += salarioBase * 0.10;
      else if (formData.adicionalQualificacao === 'doutorado') salarioTotal += salarioBase * 0.12;

      // Adicional de Treinamento
      if (formData.adicionalTreinamento === '1') salarioTotal += salarioBase * 0.01;
      else if (formData.adicionalTreinamento === '2') salarioTotal += salarioBase * 0.02;
      else if (formData.adicionalTreinamento === '3') salarioTotal += salarioBase * 0.03;

      // Função Comissionada (FC) ou Cargo em Comissão (CJ)
      if (formData.funcaoComissao) {
        salarioTotal += fcValues[formData.funcaoComissao];
      } else if (formData.cargoComissao) {
        salarioTotal += cjValues[formData.cargoComissao];
      }

      // Adicional por Tempo de Serviço
      if (formData.adicionalTempoServico) {
        salarioTotal += salarioBase * (parseFloat(formData.adicionalTempoServico) / 100);
      }

      // VPNI / Incorporações
      salarioTotal += parseFloat(formData.vpniIncorporacoes || 0);

      // Auxílio Alimentação
      salarioTotal += AUXILIO_ALIMENTACAO;

      return {
        nivel: nivelCalc,
        salarioBase: salarioBase.toFixed(2),
        gaj: gaj.toFixed(2),
        salarioTotal: salarioTotal.toFixed(2),
      };
    };

    const resultadoAtual = calcularSalarioPorNivel(nivel);
    const resultadoProximo = nivel < 13 ? calcularSalarioPorNivel(nivel + 1) : null;
    const resultadoFuturo = nivel < 12 ? calcularSalarioPorNivel(nivel + 2) : null;

    setResultado({
      atual: resultadoAtual,
      proximo: resultadoProximo,
      futuro: resultadoFuturo,
      funcaoOuCargo: formData.funcaoComissao || formData.cargoComissao || 'Nenhum'
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Simulador de Remuneração PJU
      </Typography>
      <form>
        {/* ... (mantenha os outros campos como antes) */}

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

        <Typography variant="subtitle1" gutterBottom>
          OU
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Nível Atual"
          type="number"
          name="nivelManual"
          value={formData.nivelManual}
          onChange={handleChange}
          inputProps={{ min: 1, max: 13 }}
        />

        {/* ... (mantenha os outros campos como antes) */}

        <Button variant="contained" color="primary" onClick={calcularSalario} sx={{ mt: 2 }}>
          Calcular Remuneração
        </Button>
      </form>

      {resultado && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Resultado da Simulação:</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Período</TableCell>
                  <TableCell>Nível</TableCell>
                  <TableCell>Salário Base</TableCell>
                  <TableCell>GAJ</TableCell>
                  <TableCell>Remuneração Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Atual</TableCell>
                  <TableCell>{resultado.atual.nivel}</TableCell>
                  <TableCell>R$ {resultado.atual.salarioBase}</TableCell>
                  <TableCell>R$ {resultado.atual.gaj}</TableCell>
                  <TableCell>R$ {resultado.atual.salarioTotal}</TableCell>
                </TableRow>
                {resultado.proximo && (
                  <TableRow>
                    <TableCell>Próximo Ano</TableCell>
                    <TableCell>{resultado.proximo.nivel}</TableCell>
                    <TableCell>R$ {resultado.proximo.salarioBase}</TableCell>
                    <TableCell>R$ {resultado.proximo.gaj}</TableCell>
                    <TableCell>R$ {resultado.proximo.salarioTotal}</TableCell>
                  </TableRow>
                )}
                {resultado.futuro && (
                  <TableRow>
                    <TableCell>Em Dois Anos</TableCell>
                    <TableCell>{resultado.futuro.nivel}</TableCell>
                    <TableCell>R$ {resultado.futuro.salarioBase}</TableCell>
                    <TableCell>R$ {resultado.futuro.gaj}</TableCell>
                    <TableCell>R$ {resultado.futuro.salarioTotal}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography sx={{ mt: 2 }}>Função/Cargo: {resultado.funcaoOuCargo}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default PJUSimulator;