import { FC } from 'react';
import { useMutation } from '@apollo/client';

import { UPDATE_CARD } from 'apollo';
import type { UpdateCardData, UpdateCardVars } from 'apollo';

import { Form } from 'components/Form';

interface UpdateTitleProps {
    cardId: number;
    defaultText?: string;
    onClose: () => void;
}

export const UpdateTitle: FC<UpdateTitleProps> = ({
    cardId,
    defaultText,
    onClose
}) => {
    const [updateTitle] = useMutation<UpdateCardData, UpdateCardVars>(
        UPDATE_CARD
    );

    const handleUpdateTitle = (title: string) => {
        if (!title.trim().length) return;

        updateTitle({
            variables: { cardId, title }
        });
    };

    return (
        <Form
            buttonText='Update'
            placeholder='Enter a new card title'
            defaultText={defaultText}
            onSubmit={handleUpdateTitle}
            onClose={onClose}
        />
    );
};
