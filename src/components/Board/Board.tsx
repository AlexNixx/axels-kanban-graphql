import { Grid, Box } from '@mui/material';
import { useQuery } from '@apollo/client';

import { BoardColumn } from './BoardColumn';
import { AddColumn } from './AddColumn';
import { ALL_COLUMNS, AllColumnsData } from '../../apollo/board';

export const Board = () => {
    const { data, loading, error } = useQuery<AllColumnsData>(ALL_COLUMNS);

    if (!data) return null;
    if (loading) return <p>loading</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <Box>
            <Grid
                container
                spacing={3}
                sx={{
                    width: '100%',
                    overflowX: 'scroll',
                    flexWrap: 'nowrap',
                    p: '2rem 0'
                }}
            >
                {data.columns.map(column => (
                    <Grid item key={column.id}>
                        <BoardColumn {...column} />
                    </Grid>
                ))}

                <Grid item>
                    <AddColumn />
                </Grid>
            </Grid>
        </Box>
    );
};
