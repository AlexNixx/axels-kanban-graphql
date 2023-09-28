import { AppBar, Toolbar, Typography } from '@mui/material';

export const Header = () => (
    <AppBar component='nav' position='sticky'>
        <Toolbar>
            <Typography variant='h6'>Kanban GraphQL</Typography>
        </Toolbar>
    </AppBar>
);
