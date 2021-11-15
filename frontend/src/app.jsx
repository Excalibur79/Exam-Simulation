import { useState, useMemo, createContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateExam from './pages/exam-creation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber, grey, deepOrange, green } from '@mui/material/colors';
import { Button, CssBaseline, Paper } from '@mui/material';
// import Signup from './pages/login/signup';
// import Login from './pages/login';

const App = () => {
  const [themeMode, setThemeMode] = useState('light');

  const getDesignTokens = (mode) => ({
    typography: {
      htmlFontSize: 10,
      fontFamily: "'Inter', sans-serif",
    },
    palette: {
      mode, ...(mode === 'light' ? {
        primary: {
          main: '#1AB273',
        },
        divider: '#1AB273',
        text: {
          primary: '#000',
          secondary: '#000',
          black: '#000',
          white: '#fff',
        },
      }
        : {
          primary: {
            main: '#1AB273',
          },
          divider: '#1AB273',
          background: {
            default: '#111',
            paper: '#111',
          },
          text: {
            primary: '#fff',
            secondary: '#fff',
          },
        }),
    },
  });

  const colorMode = useMemo(() => ({
    // The dark mode switch would invoke this method
    toggleColorMode: () => {
      setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }), []);

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(themeMode)), [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Paper style={{ width: '100%', height: '100%' }}>
        <Button variant='outlined' onClick={(e) => setThemeMode((t) => (t === 'light' ? 'dark' : 'light'))}>
          toggle dark mode
        </Button>

        <Switch>
          {/* <Route path="/Signup" exact component={Signup} /> */}
          {/* <Route path="/Login" exact component={Login} /> */}
          <Route path='/create-exam' component={CreateExam} />
        </Switch>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
