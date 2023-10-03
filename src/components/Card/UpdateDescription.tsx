import { FC } from 'react';
import { useMutation } from '@apollo/client';

import { UPDATE_CARD } from 'apollo';
import type { UpdateCardData, UpdateCardVars } from 'apollo';

import { Form } from 'components/Form';

interface UpdateDescriptionProps {
    cardId: number;
    defaultText?: string;
    onClose: () => void;
}

export const UpdateDescription: FC<UpdateDescriptionProps> = ({
    cardId,
    defaultText = '',
    onClose
}) => {
    const [updateDescription] = useMutation<UpdateCardData, UpdateCardVars>(
        UPDATE_CARD
    );

    const handleUpdateDescription = (description: string) => {
        updateDescription({
            variables: { cardId, description }
        });
    };

    return (
        <Form
            buttonText='save'
            placeholder='Enter a new description'
            defaultText={defaultText}
            onSubmit={handleUpdateDescription}
            isShowClose={!!defaultText}
            onClose={onClose}
        />
    );
};
