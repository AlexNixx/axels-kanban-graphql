import ReactDOM from 'react-dom/client';
import { Routing } from './pages/Routing/Routing';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/client';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Routing />
        </BrowserRouter>
    </ApolloProvider>
);
