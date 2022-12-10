import { Avatar, Button, IconButton, List, ListItem, ListItemIcon, Modal, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import { contactStyles } from "./styles";
import CommonButton from "../common/CommonButton/CommonButton";
import { useTranslation } from "react-i18next";

const ContactList = ({ contacts }) => {

    const { t } = useTranslation();

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

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch({
            type: 'deleteFriend',
            payload: deleteReq,
        });

        return setShowDelete(false);
    };

    return (
        <List spacing={2}>
            {contacts.map((user) => {
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
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            backgroundColor: 'rgba(255,255,255, 0.8)',
                            transform: 'translate(-50%, -50%)',
                            width: 300,
                            boxShadow: 24,
                            p: 4,
                        }} component="form" onSubmit={handleSubmit}>
                            <Typography
                                variant={'subtitle1'}
                                gutterBottom
                            >
                                {t("deleteQues")}
                            </Typography>
                            <Box sx={contactStyles.buttons}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                // onClick={}
                                >
                                    {t("delete")}
                                </Button>
                                <CommonButton
                                    variant="outlined"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        return setShowDelete(false);
                                    }}
                                >
                                    {t("cancel")}
                                </CommonButton>
                            </Box>

                        </Box>
                    </Modal>
                </ListItem>
            })}
        </List>
    );
};

export default ContactList;