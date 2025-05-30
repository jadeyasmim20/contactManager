import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Avatar, IconButton, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';

interface Contact {
  id: number;
  name: string;
  type?: string;
  avatar?: string | null;
  phone?: string;
  email?: string;
  phoneEnc?: string;
  emailEnc?: string;
}

interface ContactsTableProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onUnlock: (contact: Contact) => void;
  onDelete: (id: number) => void;
}

export default function ContactsTable({ contacts = [], onEdit, onUnlock, onDelete }: ContactsTableProps) {
  return (
    <Table sx={{ bgcolor: '#181818', borderRadius: 2 }}>
      <TableHead>
        <TableRow>
          <TableCell sx={{ color: '#fff', borderBottom: '1px solid #232323' }}>NOME</TableCell>
          <TableCell sx={{ color: '#fff', borderBottom: '1px solid #232323' }}>TELEFONE</TableCell>
          <TableCell sx={{ color: '#fff', borderBottom: '1px solid #232323' }}>EMAIL</TableCell>
          <TableCell sx={{ color: '#fff', borderBottom: '1px solid #232323' }} align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {contacts.map((contact) => (
          <TableRow key={contact.id} hover>
            <TableCell sx={{ color: '#fff', borderBottom: '1px solid #232323' }}>
              <Box display="flex" alignItems="center">
                <Avatar src={contact.avatar || undefined} alt={contact.name} sx={{ mr: 2 }} />
                <Box>
                  <Typography fontWeight={700} sx={{ color: '#fff' }}>{contact.name}</Typography>
                  <Typography variant="body2" sx={{ color: '#d4ff3f' }}>{contact.type || 'Sem categoria'}</Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell sx={{ color: '#fff', borderBottom: '1px solid #232323' }}>
              {contact.phone ? contact.phone : (contact.phoneEnc ? 'Protegido' : '')}
            </TableCell>
            <TableCell sx={{ color: '#fff', borderBottom: '1px solid #232323' }}>
              {contact.email ? contact.email : (contact.emailEnc ? 'Protegido' : '')}
            </TableCell>
            <TableCell align="right" sx={{ borderBottom: '1px solid #232323' }}>
              <IconButton aria-label="Editar" onClick={() => onEdit(contact)} sx={{ color: '#fff', mr: 1 }}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="Desbloquear" onClick={() => onUnlock(contact)} sx={{ color: '#fff', mr: 1 }}>
                <LockIcon />
              </IconButton>
              <IconButton aria-label="Deletar" onClick={() => onDelete(contact.id)} sx={{ color: 'red' }}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}