import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { ALL_COLUMNS, CREATE_COLUMN } from 'apollo';
import type { AllColumnsData, NewColumnData, NewColumnVars } from 'apollo';

import { Form } from 'components/Form';

export const CreateColumn = () => {
    const [createColumn] = useMutation<NewColumnData, NewColumnVars>(
        CREATE_COLUMN,
        {
            update: (cache, { data }) => {
                const newColumn = data?.newColumn;

                if (!newColumn) return;

                const cachedData = cache.readQuery<AllColumnsData>({
                    query: ALL_COLUMNS
                });

                if (cachedData) {
                    cache.writeQuery({
                        query: ALL_COLUMNS,
                        data: {
                            columns: [...cachedData.columns, newColumn]
                        }
                    });
                }
            }
        }
    );

    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleAddColumn = (title: string) => {
        if (!title.trim().length) return;

        createColumn({
            variables: { title }
        });
    };

    return (
        <Paper
            sx={{
                padding: 1,
                backgroundColor: 'lightgrey',
                width: 300
            }}
        >
            {isFormVisible ? (
                <Form
                    buttonText='Add column'
                    placeholder='Enter column title'
                    onSubmit={handleAddColumn}
                    onClose={() => setIsFormVisible(!isFormVisible)}
                />
            ) : (
                <Button
                    fullWidth
                    startIcon={<AddIcon />}
                    onClick={() => setIsFormVisible(!isFormVisible)}
                >
                    Add another list
                </Button>
            )}
        </Paper>
    );
};
