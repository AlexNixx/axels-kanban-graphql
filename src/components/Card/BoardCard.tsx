import { FC } from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';

import { Card } from 'apollo';

interface BoardCardProps {
    card: Card;
    index: number;
}

const getItemStyle = (isDragging: boolean) => ({
    p: 2,
    borderRadius: '5px',
    backgroundColor: isDragging ? 'lightgreen' : 'white'
});

export const BoardCard: FC<BoardCardProps> = ({ card, index }) => (
    <Draggable draggableId={String(card.id)} key={card.id} index={index}>
        {(provided, snapshot) => (
            <Link
                to={`/modal/${card.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                <Box
                    sx={getItemStyle(snapshot.isDragging)}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {card?.title}
                </Box>
            </Link>
        )}
    </Draggable>
);
