import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#004d40', // A deep teal
    },
    secondary: {
      main: '#ff6f00', // A vibrant amber
    },
    background: {
      default: '#f5f5f5', // Light grey for the overall background
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          // Optional: a custom gradient or any other styling you'd like
          backgroundImage: 'linear-gradient(45deg, #004d40 30%, #00695c 90%)',
        },
      },
    },
  },
});

export default theme;