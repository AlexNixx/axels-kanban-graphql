import { FC, memo, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { CREATE_CARD, ALL_COLUMNS } from 'apollo';
import type { CreateCardData, CreateCardVars, AllColumnsData } from 'apollo';

import { Form } from 'components/Form';

interface AddCardProps {
    columnId: number;
    order: number;
}

export const CreateCard: FC<AddCardProps> = memo(({ columnId, order }) => {
    const [createCard] = useMutation<CreateCardData, CreateCardVars>(
        CREATE_CARD,
        {
            update: (cache, { data }) => {
                const newCard = data?.newCard;

                if (!newCard) return;

                const cachedData = cache.readQuery<AllColumnsData>({
                    query: ALL_COLUMNS
                });

                if (cachedData) {
                    const columns = cachedData.columns.map(column => {
                        if (column.id === newCard.column_id) {
                            return {
                                ...column,
                                cards: [...column.cards, newCard]
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

    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleVisible = () => setIsFormVisible(!isFormVisible);

    const handleAddCard = (title: string) => {
        if (title.trim().length) {
            createCard({
                variables: { title, description: '', columnId, order }
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
                    color='secondary'
                >
                    Add a card
                </Button>
            )}
        </>
    );
});
