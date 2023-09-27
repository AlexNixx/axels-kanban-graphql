import { Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useState } from 'react';
import { Form } from './Form';

import { useMutation } from '@apollo/client';
import {
    ALL_COLUMNS,
    AllColumnsData,
    CREATE_COLUMN,
    NewColumnData,
    NewColumnVars
} from '../../apollo/board';

export const AddColumn = () => {
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
