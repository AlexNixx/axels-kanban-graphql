import { gql } from '@apollo/client';

import { Card } from './types';

export type GetCardData = {
    card: Card;
};

export type GetCardVars = {
    cardId?: number | string;
};

export const GET_CARD = gql(`
   query GetCard($cardId: ID!) {
      card: Card(id: $cardId) {
        id
        title
        description
        order
        column_id
      }
   }
`);

export type GetCardsData = {
    cards: Card[];
};

export type GetCardsVars = {
    columnId: number | string;
};

export const GET_CARDS = gql(`
    query AllCards($columnId: ID!) {
      cards: allCards(filter: {column_id: $columnId}) {
        id
        order
        column_id
      }
}

`);

export type CreateCardData = {
    newCard: Card;
};

export type CreateCardVars = {
    title: string;
    description: string;
    order: number;
    columnId: number;
};

export const CREATE_CARD = gql`
    mutation CreateCard(
        $title: String!
        $description: String
        $columnId: ID!
        $order: Int!
    ) {
        newCard: createCard(
            title: $title
            description: $description
            column_id: $columnId
            order: $order
        ) {
            id
            title
            column_id
            order
        }
    }
`;

export type UpdateCardData = {
    updatedCard: Card;
};

export type UpdateCardVars = {
    cardId: number | string;
    title?: string;
    column_id?: number | string;
    order?: number | string;
    description?: string;
};

export const UPDATE_CARD = gql`
    mutation UpdateCard(
        $cardId: ID!
        $title: String
        $description: String
        $column_id: ID
        $order: Int
    ) {
        updatedCard: updateCard(
            id: $cardId
            title: $title
            description: $description
            column_id: $column_id
            order: $order
        ) {
            id
            title
            description
            column_id
            order
        }
    }
`;

export type DeleteCardData = {
    card: Card;
};

export type DeleteCardVars = {
    cardId: number;
};

export const DELETE_CARD = gql`
    mutation DeleteCard($cardId: ID!) {
        card: removeCard(id: $cardId) {
            id
            order
            column_id
        }
    }
`;
