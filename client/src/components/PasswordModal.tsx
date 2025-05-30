import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { useState, useEffect } from 'react';

interface PasswordModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
}

const PasswordModal = ({ open, onClose, onConfirm }: PasswordModalProps) => {
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!open) setPassword('');
  }, [open]);

  const handleSubmit = () => {
    if (!password) return;
    onConfirm(password);
    setPassword('');
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{
      sx: { bgcolor: '#181818', borderRadius: 3, p: 2, minWidth: 320 }
    }}>
      <DialogTitle sx={{ color: '#fff', fontWeight: 700 }}>Visualizar informações</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Senha"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          sx={{
            input: { color: '#fff' }, label: { color: '#bdbdbd' },
            bgcolor: '#232323', borderRadius: 2
          }}
          InputLabelProps={{ style: { color: '#bdbdbd' }, shrink: true }}
          margin="dense"
          autoFocus
          autoComplete="current-password"
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
        <Button onClick={onClose} sx={{
          bgcolor: '#232323', color: '#fff', borderRadius: 2, px: 3, '&:hover': { bgcolor: '#333' }
        }}>Voltar</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!password}
          sx={{
            bgcolor: '#d4ff3f', color: '#181818', fontWeight: 700, borderRadius: 2, px: 3, '&:hover': { bgcolor: '#c0e62e' }
          }}
        >Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordModal;