import {
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Avatar, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { useState, useEffect } from 'react';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { name: string; email: string; phone: string; type: string; avatar?: string }) => void;
  contactToEdit?: any;
}

const ContactModal = ({ open, onClose, onSave, contactToEdit }: ContactModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');
  const [type, setType] = useState('Trabalho');

  useEffect(() => {
    if (contactToEdit) {
      setName(contactToEdit.name || '');
      setEmail(contactToEdit.email || contactToEdit.emailEnc || '');
      setPhone(contactToEdit.phone || contactToEdit.phoneEnc || '');
      setAvatar(contactToEdit.avatar || '');
      setType(contactToEdit.type || 'Trabalho');
    } else {
      setName('');
      setEmail('');
      setPhone('');
      setAvatar('');
      setType('Trabalho');
    }
  }, [contactToEdit, open]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev: any) => setAvatar(ev.target.result);
    reader.readAsDataURL(file);
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneValid = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/.test(phone);
  const isFormValid = name && isEmailValid && isPhoneValid;

  const handleSubmit = () => {
    if (!isFormValid) return;
    onSave({ name, email, phone, avatar, type });
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{
      sx: { bgcolor: '#181818', borderRadius: 3, p: 2, minWidth: 350 }
    }}>
      <DialogTitle sx={{ color: '#fff', fontWeight: 700 }}>
        {contactToEdit ? 'Editar contato' : 'Adicionar contato'}
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Avatar src={avatar} sx={{ width: 64, height: 64, mb: 1, bgcolor: '#232323' }} />
        <Button variant="contained" component="label" sx={{
          bgcolor: '#232323', color: '#fff', mb: 2, textTransform: 'none', borderRadius: 2, fontWeight: 400
        }}>
          {contactToEdit ? 'Substituir' : '+ Adicionar foto'}
          <input type="file" hidden onChange={handleAvatarChange} />
        </Button>
        <TextField
          fullWidth
          label="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
          sx={{
            input: { color: '#fff' }, label: { color: '#bdbdbd' },
            bgcolor: '#232323', borderRadius: 2
          }}
          InputLabelProps={{ style: { color: '#bdbdbd' }, shrink: true }}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Telefone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          sx={{
            input: { color: '#fff' }, label: { color: '#bdbdbd' },
            bgcolor: '#232323', borderRadius: 2
          }}
          InputLabelProps={{ style: { color: '#bdbdbd' }, shrink: true }}
          margin="dense"
        />
        <TextField
          fullWidth
          label="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          sx={{
            input: { color: '#fff' }, label: { color: '#bdbdbd' },
            bgcolor: '#232323', borderRadius: 2
          }}
          InputLabelProps={{ style: { color: '#bdbdbd' }, shrink: true }}
          margin="dense"
          type="email"
          autoComplete="email"
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="type-label" sx={{ color: '#fff' }}>Tipo</InputLabel>
          <Select
            labelId="type-label"
            value={type}
            label="Tipo"
            onChange={(e) => setType(e.target.value)}
            sx={{ color: '#fff', bgcolor: '#232323' }}
          >
            <MenuItem value="Trabalho">Trabalho</MenuItem>
            <MenuItem value="Colega">Colega</MenuItem>
            <MenuItem value="Família">Família</MenuItem>
            <MenuItem value="Outro">Outro</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
        <Button onClick={onClose} sx={{
          bgcolor: '#232323', color: '#fff', borderRadius: 2, px: 3, '&:hover': { bgcolor: '#333' }
        }}>Cancelar</Button>
        <Button onClick={handleSubmit} disabled={!isFormValid} variant="contained" sx={{
          bgcolor: '#d4ff3f', color: '#181818', fontWeight: 700, borderRadius: 2, px: 3, '&:hover': { bgcolor: '#c0e62e' }
        }}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactModal;