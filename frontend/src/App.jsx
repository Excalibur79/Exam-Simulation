import { useState, useMemo, createContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateExam from './Pages/exam-creation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber, grey, deepOrange, green } from '@mui/material/colors';
import { Button, CssBaseline, Paper } from '@mui/material';
// import Signup from './Pages/Login/SignUp.jsx';
// import Login from './Pages/Login/Login.jsx';

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
  }),
    []
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(themeMode)), [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <Paper>
        {/* <Button variant='outlined' onClick={(e) => setThemeMode((t) => (t === 'light' ? 'dark' : 'light'))}>
          toggle dark mode
        </Button> */}

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
