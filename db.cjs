module.exports = {
    columns: [
        { id: 239, title: 'To Do' },
        { id: 2139, title: 'In Progress' },
        { id: 55, title: 'Done' }
    ],
    cards: [
        { id: 101, column_id: 239, title: 'Task 1', description: null },
        {
            id: 102,
            column_id: 239,
            title: 'Task 2',
            description: 'Description for Task 2'
        },
        {
            id: 103,
            column_id: 55,
            title: 'Task 3',
            description: 'Description for Task 3'
        },
        {
            id: 104,
            column_id: 55,
            order: 2,
            title: 'Task 4',
            description: 'Description for Task 4'
        }
    ]
};
