import { FC } from 'react';
import { useMutation } from '@apollo/client';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from '@mui/material';

import { DELETE_COLUMN } from 'apollo';
import type { DeleteColumnData, DeleteColumnVars } from 'apollo';
import type { StoreObject } from '@apollo/client';

interface DeleteColumnProps {
    columnId: number;
}

export const DeleteColumn: FC<DeleteColumnProps> = ({ columnId }) => {
    const [deleteColumn] = useMutation<DeleteColumnData, DeleteColumnVars>(
        DELETE_COLUMN,
        {
            update(cache, { data }) {
                const deletedColumn = data?.column;
                cache.modify({
                    fields: {
                        allColumns(currentColumns = [], { readField }) {
                            return currentColumns.filter(
                                (column: StoreObject) =>
                                    deletedColumn?.id !==
                                    readField('id', column)
                            );
                        }
                    }
                });
            }
        }
    );

    const handleDeleteColumn = () => {
        deleteColumn({
            variables: { columnId }
        });
    };

    return (
        <IconButton onClick={handleDeleteColumn} size='small' color='secondary'>
            <DeleteOutlineIcon />
        </IconButton>
    );
};
