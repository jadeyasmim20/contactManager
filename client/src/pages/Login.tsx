import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { Container, Typography, Box, Button, TextField, Alert, Link, Paper } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      localStorage.setItem('token', response.data.access_token);
      navigate('/contacts');
    } catch (err) {
      let errorMessage = 'Credenciais inválidas';
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message;
        if (Array.isArray(msg)) errorMessage = msg.join(', ');
        else if (typeof msg === 'string') errorMessage = msg;
      }
      setError(errorMessage);
      setPassword('');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#181818' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', bgcolor: '#232323', color: '#fff', borderRadius: 3 }}>
        <Box textAlign="center" mb={2}>
          <Typography variant="body2" color="#bdbdbd">
            Não tem uma conta?{' '}
            <Link href="/register" color="#d4ff3f" fontWeight={600} underline="hover">
              Criar conta
            </Link>
          </Typography>
        </Box>
        <Typography variant="h4" fontWeight={700} mb={3} color="#fff">
          Acessar conta
        </Typography>
        <form onSubmit={handleSubmit}>
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
            placeholder="Digite sua senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{ style: { color: '#fff', background: '#181818' } }}
            InputLabelProps={{ style: { color: '#bdbdbd' }, shrink: true }}
            required
            type="password"
            autoComplete="current-password"
          />
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!email || !password}
            sx={{ bgcolor: '#d4ff3f', color: '#181818', fontWeight: 700, borderRadius: 2, mt: 2 }}
          >
            Entrar
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
