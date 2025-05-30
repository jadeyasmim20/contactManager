import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SidebarAlphabet from '../components/SidebarAlphabet';
import ContactModal from '../components/ContactModal';
import PasswordModal from '../components/PasswordModal';
import ContactsTable from '../components/ContactsTable';

interface Contact {
  id: number;
  name: string;
  emailEnc: string;
  phoneEnc: string;
  userId: number;
  avatar?: string | null;
  type: string;
  createdAt: string;
  email?: string;
  phone?: string;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('A');
  const [modalOpen, setModalOpen] = useState(false);
  const [editContact, setEditContact] = useState<Contact | null>(null);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [unlockLoading, setUnlockLoading] = useState(false);
  const [unlockError, setUnlockError] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const token = localStorage.getItem('token');

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/contacts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(response.data);
    } catch (error) {
      console.error('Erro ao carregar contatos:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/contacts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(prev => prev.filter(contact => contact.id !== id));
    } catch (error) {
      console.error('Erro ao deletar contato:', error);
    }
  };

  const handleSave = async (data: { name: string; email: string; phone: string; type: string; avatar?: string }) => {
    try {
      if (editContact) {
        await axios.put(`http://localhost:3000/contacts/${editContact.id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:3000/contacts', data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setModalOpen(false);
      setEditContact(null);
      fetchContacts();
    } catch (error) {
      console.error('Erro ao salvar contato:', error);
    }
  };

  const handleEdit = (contact: Contact) => {
    setEditContact(contact);
    setModalOpen(true);
  };

  const handleUnlock = (contact: Contact) => {
    setSelectedContact(contact);
    setPasswordModalOpen(true);
  };

  const handlePasswordConfirm = async (password: string) => {
    if (!selectedContact) return;
    setUnlockLoading(true);
    setUnlockError('');
    try {
      const res = await axios.post(`http://localhost:3000/contacts/${selectedContact.id}/unlock`, {
        password,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setContacts(prev =>
        prev.map(c =>
          c.id === selectedContact.id
            ? {
                ...c,
                email: res.data.email,
                phone: res.data.phone,
                // mantém os campos criptografados para futuras operações
                emailEnc: c.emailEnc,
                phoneEnc: c.phoneEnc,
              }
            : c
        )
      );

      setPasswordModalOpen(false);
    } catch (err) {
      setUnlockError('❌ Senha incorreta');
    } finally {
      setUnlockLoading(false);
    }
  };

  const filteredContacts = contacts
    .filter(contact => {
      const matchesSearch = contact.name.toLowerCase().includes(search.toLowerCase());
      const matchesLetter = selectedLetter === '' || contact.name[0].toUpperCase() === selectedLetter;
      if (search.trim() !== '') return matchesSearch;
      return matchesLetter;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', bgcolor: '#181818', color: '#fff', py: 6 }}>
      <Box display="flex" alignItems="flex-start">
        <SidebarAlphabet selectedLetter={selectedLetter} onSelect={setSelectedLetter} />
        <Box flex={1}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography variant="h4" fontWeight={700}>Lista de contatos</Typography>
            <Box>
              <Button variant="contained" sx={{ bgcolor: '#d4ff3f', color: '#181818', mr: 2, fontWeight: 700 }} onClick={() => { setEditContact(null); setModalOpen(true); }}>
                + Adicionar contato
              </Button>
              <IconButton onClick={logout} sx={{ color: '#fff' }}>
                <LogoutIcon />
              </IconButton>
            </Box>
          </Box>

          <Box mb={3}>
            <input
              type="text"
              placeholder="Pesquisar por nome..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (e.target.value !== '') {
                  setSelectedLetter('');
                }
              }}
              style={{ width: '100%', padding: 12, borderRadius: 8, border: 'none', background: '#232323', color: '#fff', fontSize: 16 }}
            />
          </Box>

          <Paper sx={{ bgcolor: '#232323', mt: 3, p: 2 }}>
            <ContactsTable
              contacts={filteredContacts}
              onEdit={handleEdit}
              onUnlock={handleUnlock}
              onDelete={handleDelete}
            />
          </Paper>
        </Box>
      </Box>
      <ContactModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditContact(null); }}
        onSave={handleSave}
        contactToEdit={editContact}
      />
      {unlockError && (
        <Alert severity="error" sx={{ mt: 2, mb: 2, maxWidth: 400, mx: 'auto' }}>{unlockError}</Alert>
      )}
      <PasswordModal
        open={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onConfirm={handlePasswordConfirm}
      />
      {unlockLoading && (
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}><CircularProgress color="inherit" /></Box>
      )}
    </Container>
  );
};

export default Contacts;
