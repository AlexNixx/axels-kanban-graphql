import { FC, memo, useMemo, useState } from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';

import type { Column } from 'apollo';

import { DeleteColumn } from './DeleteColumn';
import { BoardCard, CreateCard } from '../Card';

export const BoardColumn: FC<Column> = memo(({ id, title, cards }) => {
    const [showDeleteButton, setShowDeleteButton] = useState(false);

    const sortedCards = useMemo(
        () => cards.sort((a, b) => (a.order < b.order ? -1 : 1)),
        [cards]
    );

    return (
        <Paper
            sx={{
                p: 2,
                width: 300
            }}
            onMouseOver={() => setShowDeleteButton(true)}
            onMouseOut={() => setShowDeleteButton(false)}
        >
            <Title
                title={title}
                columnId={Number(id)}
                showDeleteButton={showDeleteButton}
            />

            <Droppable droppableId={String(id)}>
                {provided => (
                    <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{ m: '0.5rem 0' }}
                    >
                        <Stack
                            direction='column'
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

            <CreateCard columnId={Number(id)} order={cards.length} />
        </Paper>
    );
});

const Title = memo(
    ({
        title,
        columnId,
        showDeleteButton
    }: {
        title: string;
        columnId: number;
        showDeleteButton: boolean;
    }) => (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '2rem'
            }}
        >
            <Typography variant='h6' component='h2'>
                {title}
            </Typography>
            {showDeleteButton && <DeleteColumn columnId={columnId} />}
        </Box>
    )
);
