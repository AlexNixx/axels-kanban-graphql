import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: '#1D2125',
                    color: '#9AACBB'
                }
            }
        }
    },
    palette: {
        primary: {
            main: '#579DFF',
            light: '#22272B'
        },
        secondary: {
            main: '#9FADBC'
        },
        background: {
            default: '#1d6069',
            paper: '#1D2125'
        },
        text: {
            primary: '#B5C2CF'
        }
    },
    shape: {
        borderRadius: 5
    }
});
