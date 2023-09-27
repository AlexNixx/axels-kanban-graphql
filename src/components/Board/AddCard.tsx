import { FC, useState } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useMutation } from '@apollo/client';

import { Form } from './Form';
import {
    CREATE_CARD,
    ALL_COLUMNS,
    NewCardData,
    NewCardVars,
    AllColumnsData
} from '../../apollo/board';

interface AddCardProps {
    columnId: number;
}

export const AddCard: FC<AddCardProps> = ({ columnId }) => {
    const [createCard] = useMutation<NewCardData, NewCardVars>(CREATE_CARD, {
        update: (cache, { data }) => {
            const newCard = data?.newCard;

            if (!newCard) return;

            const cachedData = cache.readQuery<AllColumnsData>({
                query: ALL_COLUMNS
            });

            if (cachedData) {
                const columns = cachedData.columns.map(column => {
                    if (column.id === newCard.column_id) {
                        return { ...column, cards: [...column.cards, newCard] };
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
    });

    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleVisible = () => setIsFormVisible(!isFormVisible);

    const handleAddCard = (title: string) => {
        if (title.trim().length) {
            createCard({
                variables: { title, description: '', columnId: columnId }
            });
        }
    };

    return (
        <>
            {isFormVisible ? (
                <Form
                    buttonText='Add card'
                    placeholder='Enter a title for this card...'
                    onSubmit={handleAddCard}
                    onClose={handleVisible}
                />
            ) : (
                <Button
                    fullWidth
                    startIcon={<AddIcon />}
                    onClick={handleVisible}
                >
                    Add a card
                </Button>
            )}
        </>
    );
};
