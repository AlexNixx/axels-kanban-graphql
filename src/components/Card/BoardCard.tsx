import { FC, memo } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';

import type { Card } from 'apollo';

interface BoardCardProps {
    card: Card;
    index: number;
}

export const BoardCard: FC<BoardCardProps> = memo(({ card, index }) => {
    const theme = useTheme();

    return (
        <Draggable draggableId={String(card.id)} key={card.id} index={index}>
            {provided => (
                <Link
                    to={`/modal/${card.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <Box
                        sx={{
                            p: 2,
                            m: '0.5rem 0',
                            borderRadius: '5px',
                            backgroundColor: theme.palette.primary.light
                        }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {card.title}
                    </Box>
                </Link>
            )}
        </Draggable>
    );
});
