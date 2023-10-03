export type Card = {
    id: number;
    title: string;
    description: string;
    order: number;
    column_id: number;
};

export type Column = {
    id: number | string;
    title: string;
    cards: Card[];
};
