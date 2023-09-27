import { FC } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import {
    ALL_COLUMNS,
    AllColumnsData,
    DELETE_CARD,
    DeleteCardData,
    DeleteCardVars
} from '../../apollo/board';

interface DeleteCardProps {
    cardId?: number;
    onClose: () => void;
}

export const DeleteCard: FC<DeleteCardProps> = ({ cardId, onClose }) => {
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

    const handleDeleteCard = () => {
        if (cardId) {
            deleteCard({
                variables: { cardId }
            });
            onClose();
        }
    };

    return (
        <Button onClick={handleDeleteCard} startIcon={<DeleteOutlineIcon />}>
            Delete Card
        </Button>
    );
};
