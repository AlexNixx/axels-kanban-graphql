import { FC } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from '@mui/material';
import { StoreObject, useMutation } from '@apollo/client';
import {
    DELETE_COLUMN,
    DeleteColumnData,
    DeleteColumnVars
} from '../../apollo/board';

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
        <IconButton onClick={handleDeleteColumn} size='small'>
            <DeleteOutlineIcon />
        </IconButton>
    );
};
