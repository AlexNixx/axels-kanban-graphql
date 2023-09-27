import { gql } from '@apollo/client';

export interface Card {
    id: number;
    title: string;
    description: string;
    column_id?: number;
}

export interface Column {
    id: number;
    title: string;
    cards: Card[];
}

export interface AllColumnsData {
    columns: Column[];
}

export interface GetCardData {
    card: Card;
}

export interface GetCardParams {
    cardId?: number | string;
}

export interface NewCardData {
    newCard: Card;
}

export interface NewCardVars {
    title: string;
    description: string;
    columnId: number;
}

export interface NewColumnData {
    newColumn: Column;
}

export interface NewColumnVars {
    title: string;
}

export const ALL_COLUMNS = gql`
    query AllColumns {
        columns: allColumns {
            id
            title
            cards: Cards {
                id
                title
            }
        }
    }
`;

export const GET_CARD = gql(`
   query GetCard($cardId: ID!) {
      card: Card(id: $cardId) {
        id
        title
        description
      }
   }
`);

export const CREATE_CARD = gql`
    mutation CreateCard($title: String!, $description: String, $columnId: ID!) {
        newCard: createCard(
            title: $title
            description: $description
            column_id: $columnId
        ) {
            id
            title
            column_id
        }
    }
`;

export interface UpdateCardData {
    updatedCard: Card;
}

export interface UpdateCardVars {
    cardId: number;
    title?: string;
    description?: string;
}

export const UPDATE_CARD = gql`
    mutation UpdateDescription(
        $cardId: ID!
        $title: String
        $description: String
    ) {
        updatedCard: updateCard(
            id: $cardId
            title: $title
            description: $description
        ) {
            id
            title
            description
        }
    }
`;

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

export interface DeleteColumnData {
    column: Column;
}

export interface DeleteColumnVars {
    columnId: number;
}

export const DELETE_COLUMN = gql`
    mutation DeleteColumn($columnId: ID!) {
        column: removeColumn(id: $columnId) {
            id
        }
    }
`;

export interface DeleteCardData {
    card: Card;
}

export interface DeleteCardVars {
    cardId: number;
}

export const DELETE_CARD = gql`
    mutation DeleteCard($cardId: ID!) {
        card: removeCard(id: $cardId) {
            id
            column_id
        }
    }
`;

//
// export const MOVE_CARD = gql`
//     mutation MoveCard($id: ID!, $columnId: ID!) {
//         updateCard(id: $id, column_id: $columnId) {
//             id
//             column_id
//         }
//     }
// `;
//

//
// export const REMOVE_CARD = gql`
//     mutation RemoveCard($id: ID!) {
//         removeCard(id: $id) {
//             id
//         }
//     }
// `;
