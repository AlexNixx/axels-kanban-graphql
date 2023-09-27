import { FC, useState } from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';

import { BoardCard } from './BoardCard';
import { AddCard } from './AddCard';
import { Column } from '../../apollo/board';
import { DeleteColumn } from './DeleteColumn';

export const BoardColumn: FC<Column> = column => {
    const [showDeleteButton, setShowDeleteButton] = useState(false);

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
                {showDeleteButton && <DeleteColumn columnId={column.id} />}
            </Box>
            {!!column.cards?.length && (
                <Box
                    sx={{
                        maxHeight: '70vh',
                        overflowY: 'auto',
                        margin: '0.5rem 0',
                        p: '0.5rem 0'
                    }}
                >
                    <Stack direction='column' spacing={2}>
                        {column.cards.map(card => (
                            <BoardCard key={card.id} {...card} />
                        ))}
                    </Stack>
                </Box>
            )}
            <AddCard columnId={column.id} />
        </Paper>
    );
};
