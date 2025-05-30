import { Card, CardContent, Typography, IconButton, Box, Tooltip, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';

interface Contact {
  id: number;
  name: string;
  type?: string;
  avatar?: string | null;
  phone?: string;
  email?: string;
}

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
  onUnlock: (contact: Contact) => void;
}

export default function ContactCard({ contact, onEdit, onDelete, onUnlock }: ContactCardProps) {
  return (
    <Card sx={{ mb: 2, bgcolor: '#232323', color: '#fff' }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <Avatar src={contact.avatar || undefined} alt={contact.name} sx={{ mr: 2 }} />
          <Box>
            <Typography fontWeight={700}>{contact.name}</Typography>
            <Typography variant="body2" color="#d4ff3f">{contact.type || 'Sem categoria'}</Typography>
            <Typography variant="body2" color="#bdbdbd">
              {contact.phone ? contact.phone : 'Protegido'}
            </Typography>
            <Typography variant="body2" color="#bdbdbd">
              {contact.email ? contact.email : 'Protegido'}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Tooltip title="Editar">
            <IconButton aria-label="Editar" onClick={() => onEdit(contact)} sx={{ color: '#d4ff3f' }}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Ver dados">
            <IconButton aria-label="Desbloquear" onClick={() => onUnlock(contact)} sx={{ color: '#fff' }}>
              <LockIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Deletar">
            <IconButton aria-label="Deletar" onClick={() => onDelete(contact.id)} sx={{ color: 'red' }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
}