import { FC, useState } from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';

import type { Column } from 'apollo';

import { DeleteColumn } from './DeleteColumn';
import { BoardCard, CreateCard } from '../Card';

export const BoardColumn: FC<Column> = column => {
    const [showDeleteButton, setShowDeleteButton] = useState(false);

    const sortedCards = column.cards.sort((a, b) => {
        const [value1, value2] = [Number(a.order), Number(b.order)];

        if (value1 === value2) {
            return 0;
        }
        return value1 < value2 ? -1 : 1;
    });

    return (
        <Paper
            sx={{
                padding: 2,
                backgroundColor: 'lightblue',
                width: 300
            }}
            onMouseOver={() => setShowDeleteButton(true)}
            onMouseOut={() => setShowDeleteButton(false)}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '2rem'
                }}
            >
                <Typography variant='h6'>{column.title}</Typography>
                {showDeleteButton && (
                    <DeleteColumn columnId={Number(column.id)} />
                )}
            </Box>

            <Droppable droppableId={String(column.id)}>
                {provided => (
                    <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{ margin: '0.5rem 0' }}
                    >
                        <Stack
                            direction='column'
                            spacing={2}
                            sx={{
                                maxHeight: '70vh',
                                overflow: 'scroll'
                            }}
                        >
                            {sortedCards.map((card, index) => (
                                <BoardCard
                                    key={card.id}
                                    card={card}
                                    index={index}
                                />
                            ))}
                            {provided.placeholder}
                        </Stack>
                    </Box>
                )}
            </Droppable>

            <CreateCard
                columnId={Number(column.id)}
                order={column.cards?.length}
            />
        </Paper>
    );
};
