import { FC } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { ALL_COLUMNS, DELETE_CARD, GET_CARDS, UPDATE_CARD } from 'apollo';
import type {
    Card,
    AllColumnsData,
    DeleteCardData,
    DeleteCardVars,
    UpdateCardData,
    UpdateCardVars,
    GetCardsData,
    GetCardsVars
} from 'apollo';

interface DeleteCardProps {
    deletedCard: Card;
    onClose: () => void;
}

export const DeleteCard: FC<DeleteCardProps> = ({ deletedCard, onClose }) => {
    const { data, loading } = useQuery<GetCardsData, GetCardsVars>(GET_CARDS, {
        variables: {
            columnId: deletedCard.column_id
        }
    });

    const [deleteCard] = useMutation<DeleteCardData, DeleteCardVars>(
        DELETE_CARD,
        {
            update: (cache, { data }) => {
                const deletedCard = data?.card;

                if (!deletedCard) return;

                const cachedData = cache.readQuery<AllColumnsData>({
                    query: ALL_COLUMNS
                });

                if (cachedData) {
                    const columns = cachedData.columns.map(column => {
                        if (column.id === deletedCard.column_id) {
                            return {
                                ...column,
                                cards: column.cards.filter(
                                    card => card.id !== deletedCard.id
                                )
                            };
                        } else {
                            return column;
                        }
                    });

                    cache.writeQuery({
                        query: ALL_COLUMNS,
                        data: { columns }
                    });
                }
            }
        }
    );
    const [updateCard] = useMutation<UpdateCardData, UpdateCardVars>(
        UPDATE_CARD
    );

    const handleDeleteCard = () => {
        deleteCard({
            variables: { cardId: deletedCard.id }
        });

        data?.cards
            .filter(card => card.order > deletedCard.order)
            .forEach(card => {
                updateCard({
                    variables: {
                        cardId: card.id,
                        order: card.order - 1
                    }
                });
            });

        onClose();
    };

    return (
        <Button
            onClick={handleDeleteCard}
            disabled={loading}
            startIcon={<DeleteOutlineIcon />}
        >
            Delete Card
        </Button>
    );
};
