import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@mui/material';

import { Routing } from 'pages';
import { client } from 'apollo';
import { theme } from 'config/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routing />
            </BrowserRouter>
        </ThemeProvider>
    </ApolloProvider>
);
