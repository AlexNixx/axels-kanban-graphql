import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Box, Container, Modal, Stack, Typography } from '@mui/material';
import { GET_CARD, GetCardData, GetCardParams } from '../../apollo/board';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';

import { UpdateDescription } from './UpdateDescription';
import { UpdateTitle } from './UpdateTitle';
import { DeleteCard } from './DeleteCard';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4
};

export const CardModal = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, loading } = useQuery<GetCardData, GetCardParams>(GET_CARD, {
        variables: { cardId: id }
    });

    const isLoading = loading && !data?.card;
    const isCardNotFound = !data?.card && !loading;

    if (isCardNotFound) return <Navigate to={'/'} />;

    const handleCloseModel = () => navigate('/');

    return (
        <Container maxWidth='sm'>
            <Modal open disableAutoFocus onClose={handleCloseModel}>
                <Box sx={style}>
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
                                cardId={data?.card.id}
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
