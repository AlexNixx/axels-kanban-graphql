import { FC, useState } from 'react';
import { Box, Button, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CreateFormProps {
    buttonText: string;
    placeholder: string;
    defaultText?: string;
    onSubmit: (T: string) => void;
    isShowClose?: boolean;
    onClose: () => void;
}

export const Form: FC<CreateFormProps> = ({
    buttonText,
    placeholder,
    defaultText = '',
    onSubmit,
    isShowClose = true,
    onClose
}) => {
    const [text, setText] = useState(defaultText);

    const handleSubmit = () => {
        onSubmit(text);
        setText('');
        onClose();
    };

    return (
        <Box>
            <TextField
                value={text}
                onChange={e => setText(e.target.value)}
                sx={{ marginBottom: 1 }}
                placeholder={placeholder}
                fullWidth
            />
            <Button variant='contained' onClick={handleSubmit}>
                {buttonText}
            </Button>
            {isShowClose && (
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            )}
        </Box>
    );
};
