import { Avatar, Box, List, ListItem, ListItemIcon, Stack, Typography, IconButton, Modal, Button } from "@mui/material";
// import Button from "@material-ui/core/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import { contactStyles } from './styles';
import { useState } from "react";
import CommonButton from "../common/CommonButton/CommonButton";
import { useDispatch, useSelector } from 'react-redux';

const TabContent = ({ users, contactList }) => {
    const dispatch = useDispatch();

    const { username, rooms } = useSelector((state) => state.user.value);

    const [showDelete, setShowDelete] = useState(false);
    const [deleteReq, setDeleteReq] = useState(null);

    const handleDeleteContact = (event) => {
        setShowDelete((prev) => !prev);
        const userB = event.currentTarget.dataset.username;

        const room = rooms.find((item) => item.name.includes(userB) ? item : null);

        const { _id } = room;

        const unfriendReq = {
            friendInput: {
                userA: [{ username }],
                userB: [{ username: userB }],
                roomId: _id,
            },
        };

        setDeleteReq(unfriendReq);
    };

    return (
        <List spacing={2}>
            {contactList.map((item) => {
                const user = users.find((user) => user.username === item);
                return <ListItem
                    key={user.username}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        padding: '0 0 0 10px',
                        width: '100%',
                    }}
                >
                    <ListItemIcon>
                        <Avatar src={user.avatar} />

                    </ListItemIcon>
                    <Stack
                        sx={{
                            justifyContent: 'center',
                            textAlign: 'left',
                            height: '50px',
                            flexGrow: 6
                        }}
                    >
                        <Typography>{user.username}</Typography>
                    </Stack>
                    <IconButton
                        data-username={user.username}
                        onClick={handleDeleteContact}
                    >
                        <DeleteIcon />
                    </IconButton>


                    <Modal open={showDelete}>
                        <Box sx={contactStyles.wrapper} >
                            <Typography
                                variant={'subtitle1'}
                                gutterBottom
                            >
                                Are you sure to delete this contact?
                            </Typography>
                            <Box sx={contactStyles.buttons}>
                                <Button
                                    variant="contained"
                                    onClick={(event) => {
                                        event.preventDefault();

                                        dispatch({
                                            type: 'deleteFriend',
                                            payload: deleteReq,
                                        });

                                        return setShowDelete(false);
                                    }}
                                >
                                    Delete
                                </Button>
                                <CommonButton
                                    variant="outlined"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        return setShowDelete(false);
                                    }}
                                >
                                    Cancel
                                </CommonButton>
                            </Box>

                        </Box>
                    </Modal>
                </ListItem>
            })}


        </List>
    );
};

export default TabContent;