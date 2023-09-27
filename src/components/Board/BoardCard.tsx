import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
    Card as CardBox,
    CardActionArea,
    CardContent,
    Typography
} from '@mui/material';

import { Card } from '../../apollo/board';

export const BoardCard: FC<Card> = card => (
    <CardBox>
        <Link
            to={`/modal/${card.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
        >
            <CardActionArea>
                <CardContent>
                    <Typography>{card?.title}</Typography>
                </CardContent>
            </CardActionArea>
        </Link>
    </CardBox>
);
