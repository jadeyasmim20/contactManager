import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Container, TextField, Typography, Alert, Link, Paper } from '@mui/material';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const isLongEnough = password.length >= 8;
  const hasNumberOrSymbol = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsMatch = password === confirmPassword && password.length > 0;
  const isFormValid = name && email && isLongEnough && hasNumberOrSymbol && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!isFormValid) return;
    try {
      await axios.post('http://localhost:3000/auth/register', { name, email, password });
      setSuccess('Conta criada com sucesso! Redirecionando...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err: any) {
      let errorMessage = 'Falha ao registrar';
      const msg = err.response?.data?.message;
      if (Array.isArray(msg)) errorMessage = msg.join(', ');
      else if (typeof msg === 'string') errorMessage = msg;
      setError(errorMessage);
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#181818' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', bgcolor: '#232323', color: '#fff', borderRadius: 3 }}>
        <Box textAlign="center" mb={2}>
          <Typography variant="body2" color="#bdbdbd">
            Já tem uma conta?{' '}
            <Link href="/login" color="#d4ff3f" fontWeight={600} underline="hover">
              Acessar conta
            </Link>
          </Typography>
        </Box>
        <Typography variant="h4" fontWeight={700} mb={3} color="#fff">
          Criar conta
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome"
            placeholder="Como você se chama?"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{ style: { color: '#fff', background: '#181818' } }}
            InputLabelProps={{ style: { color: '#bdbdbd' }, shrink: true }}
            required
            type="text"
            autoComplete="name"
          />
          <TextField
            label="E-mail"
            placeholder="Seu e-mail aqui"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{ style: { color: '#fff', background: '#181818' } }}
            InputLabelProps={{ style: { color: '#bdbdbd' }, shrink: true }}
            required
            type="email"
            autoComplete="email"
          />
          <TextField
            label="Senha"
            placeholder="Escolha uma senha segura"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{ style: { color: '#fff', background: '#181818' } }}
            InputLabelProps={{ style: { color: '#bdbdbd' }, shrink: true }}
            required
            type="password"
            autoComplete="new-password"
          />
          <TextField
            label="Repetir a senha"
            placeholder="Repita sua senha para confirmar"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{ style: { color: '#fff', background: '#181818' } }}
            InputLabelProps={{ style: { color: '#bdbdbd' }, shrink: true }}
            required
            type="password"
            autoComplete="new-password"
          />
          <Box mt={2} mb={2}>
            <Typography variant="body2" color={isLongEnough ? '#d4ff3f' : 'error'}>
              {isLongEnough ? '✔' : '✖'} Pelo menos 8 caracteres
            </Typography>
            <Typography variant="body2" color={hasNumberOrSymbol ? '#d4ff3f' : 'error'}>
              {hasNumberOrSymbol ? '✔' : '✖'} Contém um número ou símbolo
            </Typography>
            <Typography variant="body2" color={passwordsMatch ? '#d4ff3f' : 'error'}>
              {passwordsMatch ? '✔' : '✖'} As senhas devem ser iguais
            </Typography>
          </Box>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ bgcolor: '#d4ff3f', color: '#181818', fontWeight: 700, borderRadius: 2, mt: 2 }}
            disabled={!isFormValid}
          >
            Criar conta
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
