import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import { Routing } from './pages';
import { client } from './apollo';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Routing />
        </BrowserRouter>
    </ApolloProvider>
);
