import { Box, Button, Modal, TextField, Typography, MenuItem, FormControl, InputLabel, Select, OutlinedInput, Chip } from "@mui/material";
import { useState } from "react";
import { contactStyles } from "../../ContactsBar/styles";
import CommonButton from "../../common/CommonButton/CommonButton";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MuiChipsInput } from 'mui-chips-input';

const DeleteMember = ({ currentChat, open, setOpen }) => {
    const dispatch = useDispatch();
    const { _id, members } = currentChat;

    // const [error, setError] = useState();
    const [chips, setChips] = useState([]);


    const handleSubmit = (event) => {
        event.preventDefault();

        const members = chips.map((user) => {
            return { username: user };
        });

        const roomInput = {
            _id,
            members,
        }

        dispatch({
            type: 'deleteMember',
            payload: { roomInput },
        });

        setOpen(false);
        setChips([]);
    };

    const handleChange = (newChips) => {
        setChips(newChips);
    };

    const handleValidation = (chip) => {
        const isValid = members.find((user) => user.username === chip);
        return {
            isError: !isValid,
            textError: 'The user is not a member',
        }
    };

    return (
        <>
            <Box component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 1,
                }}
            >
                <Typography sx={{ textAlign: 'center' }}>Add a member.</Typography>
                <Typography sx={{ textAlign: 'center' }}>Fill the form and submit</Typography>
                <Box
                    sx={{
                        width: '70%',
                        alignSelf: 'center',
                    }}
                >
                    <MuiChipsInput
                        name="deleteMembers"
                        value={chips}
                        label="Member(s)"
                        placeholder="Type the username and press enter"
                        onChange={handleChange}
                        validate={handleValidation}
                        clearInputOnBlur
                        sx={{
                            width: '100%',
                            '& .MuiChipsInput-Chip': {
                                backgroundColor: 'rgba(175, 173, 222, 0.8)'
                            },
                            '& .MuiChipsInput-Chip-Editing': {
                                color: 'white'
                            }
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        gap: '30px',
                        justifyContent: 'center',
                        padding: 1,
                    }}
                >
                    <Button
                        type='submit'
                        variant='contained'
                    >
                        Remove
                    </Button>
                    <CommonButton
                        variant="outlined"
                        onClick={(event) => {
                            event.preventDefault();
                            return setOpen(false)
                        }}
                    >
                        Cancel
                    </CommonButton>
                </Box>
            </Box>
        </>
    );
};

export default DeleteMember;