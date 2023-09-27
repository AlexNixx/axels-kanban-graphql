import { Route, Routes } from 'react-router-dom';

import { Layout } from '../Layout/Layout';
import { HomePage } from '../HomePage/HomePage';
import { CardModal } from '../../components/Board/CardModal';

export const Routing = () => (
    <Routes>
        <Route element={<Layout />}>
            <Route path='/' element={<HomePage />}>
                <Route path='modal/:id' element={<CardModal />} />
            </Route>
        </Route>
        <Route path='*' element={<HomePage />} />
    </Routes>
);
