import { Box, Typography } from '@mui/material';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface SidebarAlphabetProps {
  selectedLetter: string;
  onSelect: (letter: string) => void;
}

const SidebarAlphabet = ({ selectedLetter, onSelect }: SidebarAlphabetProps) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mr={3}>
      {alphabet.map((letter) => (
        <Typography
          key={letter}
          variant="body2"
          role="button"
          tabIndex={0}
          aria-pressed={selectedLetter === letter}
          onClick={() => onSelect(letter)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') onSelect(letter);
          }}
          sx={{
            cursor: 'pointer',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontWeight: selectedLetter === letter ? 700 : 400,
            bgcolor: selectedLetter === letter ? '#d4ff3f' : 'transparent',
            color: selectedLetter === letter ? '#181818' : '#fff',
            '&:hover': { bgcolor: '#d4ff3f', color: '#181818' },
            outline: 'none',
          }}
        >
          {letter}
        </Typography>
      ))}
    </Box>
  );
};

export default SidebarAlphabet;
