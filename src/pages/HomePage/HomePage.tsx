import { Board } from '../../components/Board/Board';
import { Outlet } from 'react-router-dom';

export const HomePage = () => {
    return (
        <>
            <Board />
            <Outlet />
        </>
    );
};
