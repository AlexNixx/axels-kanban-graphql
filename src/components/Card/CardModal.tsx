import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, Container, Modal, Stack, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { GET_CARD } from 'apollo';
import type { GetCardData, GetCardVars } from 'apollo';

import { UpdateDescription } from './UpdateDescription';
import { UpdateTitle } from './UpdateTitle';
import { DeleteCard } from './DeleteCard';

export const CardModal = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();

    const { data, loading } = useQuery<GetCardData, GetCardVars>(GET_CARD, {
        variables: { cardId: id }
    });

    const isLoading = loading && !data?.card;
    const isCardNotFound = !data?.card && !loading;

    if (isCardNotFound) return <Navigate to={'/'} />;

    const handleCloseModel = () => navigate('/');

    return (
        <Container maxWidth='sm'>
            <Modal open disableAutoFocus onClose={handleCloseModel}>
                <Box sx={cardBoxStyle(theme.palette.background.paper)}>
                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Stack direction='column' spacing={1}>
                            <Title
                                title={data?.card.title}
                                cardId={data?.card.id}
                            />
                            <Description
                                cardId={data?.card.id}
                                description={data?.card.description}
                            />
                            <DeleteCard
                                deletedCard={data?.card!}
                                onClose={handleCloseModel}
                            />
                        </Stack>
                    )}
                </Box>
            </Modal>
        </Container>
    );
};

const Title = ({ title, cardId }: { title?: string; cardId?: number }) => {
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    if (!cardId) return null;

    return (
        <>
            {!isFormVisible ? (
                <Typography
                    variant='h5'
                    component='h1'
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setIsFormVisible(true)}
                >
                    {title}
                </Typography>
            ) : (
                <UpdateTitle
                    cardId={cardId}
                    defaultText={title}
                    onClose={() => setIsFormVisible(false)}
                />
            )}
        </>
    );
};

const Description = ({
    description,
    cardId
}: {
    description?: string;
    cardId?: number;
}) => {
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    const isHasDescription = !!description?.length;

    if (!cardId) return null;

    return (
        <>
            {isHasDescription && !isFormVisible && (
                <Typography
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setIsFormVisible(true)}
                >
                    {description}
                </Typography>
            )}
            {(isFormVisible || !isHasDescription) && (
                <UpdateDescription
                    cardId={cardId}
                    defaultText={description}
                    onClose={() => setIsFormVisible(false)}
                />
            )}
        </>
    );
};

const cardBoxStyle = (background: string) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: background,
    boxShadow: 24,
    borderRadius: '5px',
    p: 4
});
