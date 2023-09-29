import { Outlet } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';

import { Header } from 'components/Header';

export const Layout = () => (
    <>
        <CssBaseline />
        <Header />
        <Container sx={{ p: 3, minWidth: '100vw' }}>
            <Outlet />
        </Container>
    </>
);
