import { Outlet } from 'react-router-dom';

import { Board } from 'components/Board';

export const HomePage = () => (
    <>
        <Board />
        <Outlet />
    </>
);
