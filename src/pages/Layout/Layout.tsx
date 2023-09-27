import { Box, CssBaseline } from '@mui/material';
import { Header } from '../../components/Header/Header';

import { Outlet } from 'react-router-dom';

export const Layout = () => {
    return (
        <Box>
            <CssBaseline />
            <Header />
            <Box component='main' sx={{ p: '0 1rem', minWidth: '100vw' }}>
                <Outlet />
            </Box>
        </Box>
    );
};
