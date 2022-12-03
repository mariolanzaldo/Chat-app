import { Box, Button, Modal, TextField, Typography, MenuItem } from "@mui/material";
import { useState } from "react";
import { contactStyles } from "../../ContactsBar/styles";
import CommonButton from "../../common/CommonButton/CommonButton";
import { useDispatch } from "react-redux";

const AddMember = ({ currentChat }) => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const groupName = form.get('groupName');
        console.log(groupName);

        dispatch({
            type: 'changeGroupName',
            payload: {},
        });
        setOpen(false);
    };

    return (
        <>
            <MenuItem onClick={() => setOpen(true)} key={"changeName"}>
                <Typography textAlign="center">
                    Add participant
                </Typography>
            </MenuItem>
            <Modal open={open} onSubmit={handleSubmit}>
                <Box component="form" sx={contactStyles.wrapper}>
                    <Typography
                        variant='h6'
                        component='h2'
                    >
                        New User
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Fill out the form and submit.
                    </Typography>
                    <Box sx={contactStyles.inputFields}>
                        <TextField
                            placeholder="Group name"
                            name="groupName"
                            label="GroupName"
                            required
                        />
                    </Box>
                    <Box sx={contactStyles.buttons}>
                        <Button
                            type='submit'
                            variant='contained'
                        >
                            Submit
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
            </Modal>
        </>
    );
};

export default AddMember;