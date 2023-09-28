import { Grid, Box } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { DragDropContext } from 'react-beautiful-dnd';
import type { DropResult } from 'react-beautiful-dnd';

import { ALL_COLUMNS, UPDATE_CARD } from 'apollo';
import type { AllColumnsData, UpdateCardData, UpdateCardVars } from 'apollo';

import { BoardColumn, CreateColumn } from 'components/Column';

export const Board = () => {
    const { data, loading, error } = useQuery<AllColumnsData>(ALL_COLUMNS);

    const [updateCard] = useMutation<UpdateCardData, UpdateCardVars>(
        UPDATE_CARD,
        {
            update: (cache, { data }) => {
                const updatedCard = data?.updatedCard;

                if (!updatedCard) return;

                const cachedData = cache.readQuery<AllColumnsData>({
                    query: ALL_COLUMNS
                });

                if (!cachedData) return;

                const sourceColumn = cachedData.columns.find(
                    column => column.id === updatedCard.column_id
                );

                const isStay = !!sourceColumn?.cards.find(
                    card => card.id === updatedCard.id
                );

                if (isStay) return;

                const columns = cachedData.columns.map(column => {
                    if (column.id !== updatedCard.column_id) {
                        return {
                            ...column,
                            cards: column.cards.filter(
                                card => card.id !== updatedCard.id
                            )
                        };
                    } else {
                        return {
                            ...column,
                            cards: [...column.cards, updatedCard]
                        };
                    }
                });

                cache.writeQuery({
                    query: ALL_COLUMNS,
                    data: { columns }
                });
            }
        }
    );

    if (!data) return null;
    if (loading) return <p>loading</p>;
    if (error) return <p>{error.message}</p>;

    const handleDragEnd = async (result: DropResult) => {
        const cardId = Number(result.draggableId);
        const sourceColumnId = result.source.droppableId;
        const sourceOrder = result.source?.index;
        const destinationColumnId = result.destination?.droppableId;
        const destinationOrder = result.destination?.index;

        if (!destinationColumnId || destinationOrder === undefined) {
            return;
        }

        const sourceColumn = data.columns.find(
            column => column.id === sourceColumnId
        );
        const destinationColumn = data.columns.find(
            column => column.id === destinationColumnId
        );

        if (!sourceColumn || !destinationColumn) {
            return;
        }

        await updateCard({
            variables: {
                cardId: cardId,
                column_id: destinationColumnId,
                order: destinationOrder
            }
        });

        if (sourceColumn.id !== destinationColumn.id) {
            sourceColumn.cards
                .filter(card => card.order > sourceOrder)
                .forEach(card => {
                    updateCard({
                        variables: {
                            cardId: card.id,
                            order: card.order - 1
                        }
                    });
                });

            destinationColumn.cards
                .filter(card => card.order >= destinationOrder)
                .forEach(card => {
                    updateCard({
                        variables: {
                            cardId: card.id,
                            order: card.order + 1
                        }
                    });
                });
        }

        if (sourceColumn.id === destinationColumn.id) {
            sourceColumn.cards
                .filter(
                    card =>
                        card.order > sourceOrder &&
                        card.order <= destinationOrder
                )
                .forEach(card => {
                    updateCard({
                        variables: {
                            cardId: card.id,
                            order: card.order - 1
                        }
                    });
                });

            sourceColumn.cards
                .filter(
                    card =>
                        card.order < sourceOrder &&
                        card.order >= destinationOrder
                )
                .forEach(card => {
                    updateCard({
                        variables: {
                            cardId: card.id,
                            order: card.order + 1
                        }
                    });
                });
        }
    };

    return (
        <Box>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Grid
                    container
                    spacing={3}
                    sx={{
                        width: '100%',
                        overflowX: 'scroll',
                        flexWrap: 'nowrap',
                        p: '2rem 0'
                    }}
                >
                    {data?.columns.map(column => (
                        <Grid item key={column.id}>
                            <BoardColumn {...column} />
                        </Grid>
                    ))}

                    <Grid item>
                        <CreateColumn />
                    </Grid>
                </Grid>
            </DragDropContext>
        </Box>
    );
};
