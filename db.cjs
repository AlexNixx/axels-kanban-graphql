module.exports = {
    columns: [
        { id: 1, title: 'To Do' },
        { id: 2, title: 'In Progress' },
        { id: 3, title: 'Done' }
    ],

    cards: [
        { id: 1, column_id: 1, title: 'Task 1', description: null, order: 0 },
        {
            id: 2,
            column_id: 1,
            title: 'Task 2',
            description: 'Description for Task 2',
            order: 1
        },
        {
            id: 3,
            column_id: 3,
            title: 'Task 3',
            description: 'Description for Task 3',
            order: 0
        },
        {
            id: 4,
            column_id: 3,
            title: 'Task 4',
            description: 'Description for Task 4',
            order: 1
        }
    ]
};
