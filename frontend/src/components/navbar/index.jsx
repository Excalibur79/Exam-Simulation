import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import BookIcon from '@mui/icons-material/Book';
const Navbar = (props) => {
  const { toggleTheme } = props;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='sticky'>
        <Toolbar variant='dense'>
          <BookIcon sx={{ mr: 2 }} />
          <Typography variant='h6' color='inherit' component='div' sx={{ flexGrow: 1 }}>
            Exam Simulation
          </Typography>
          <Button style={{ color: 'white' }} onClick={() => toggleTheme()}>
            Toggle dark mode
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
