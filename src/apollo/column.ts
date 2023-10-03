import { gql } from '@apollo/client';

import { Column } from './types';

export type AllColumnsData = {
    columns: Column[];
};

export const ALL_COLUMNS = gql`
    query AllColumns {
        columns: allColumns {
            id
            title
            cards: Cards {
                id
                title
                order
            }
        }
    }
`;

export type NewColumnData = {
    newColumn: Column;
};

export type NewColumnVars = {
    title: string;
};

export const CREATE_COLUMN = gql`
    mutation CreateColumn($title: String!) {
        newColumn: createColumn(title: $title) {
            id
            title
            cards: Cards {
                id
                title
            }
        }
    }
`;

export type DeleteColumnData = {
    column: Column;
};

export type DeleteColumnVars = {
    columnId: number;
};

export const DELETE_COLUMN = gql`
    mutation DeleteColumn($columnId: ID!) {
        column: removeColumn(id: $columnId) {
            id
        }
    }
`;
