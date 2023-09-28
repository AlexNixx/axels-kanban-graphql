import { Outlet } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';

import { Header } from 'components/Header';

export const Layout = () => (
    <>
        <CssBaseline />
        <Header />
        <Box component='main' sx={{ p: '0 1rem', minWidth: '100vw' }}>
            <Outlet />
        </Box>
    </>
);
