import { Avatar, Button, Grid, IconButton, List, ListItem, ListItemIcon, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import { contactStyles } from "./styles";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ContactList = ({ contacts }) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { rooms } = useSelector((state) => state.user.value);

    const [showDelete, setShowDelete] = useState(false);
    const [deleteReq, setDeleteReq] = useState(null);

    const handleDeleteContact = (event) => {
        setShowDelete((prev) => !prev);
        const userB = event.currentTarget.dataset.username;

        const isRoom = rooms.find((item) => item.name.includes(userB) ? item : null);

        const { _id } = isRoom;

        const unfriendReq = {
            friendInput: {
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

        navigate(`/`);

        return setShowDelete(false);
    };

    return (
        <List spacing={2}>
            {contacts.map((user) => {
                return <ListItem
                    key={user.username}
                    sx={{
                        padding: '0 0 0 10px',
                    }}
                >
                    <Grid container mb={2}
                        alignItems='center'
                        justifyContent='center'
                        width='100%'
                    >
                        <Grid item xs={3}>
                            <ListItemIcon>
                                <Avatar src={user.avatar} />
                            </ListItemIcon>
                        </Grid>
                        <Grid item xs={7}
                            textAlign='left'
                            sx={{
                                wordWrap: "break-word",
                            }}>
                            <Typography>{user.username}</Typography>

                        </Grid>
                        <Grid item xs={2}>
                            <IconButton
                                data-username={user.username}
                                onClick={handleDeleteContact}
                            >
                                <DeleteIcon />
                            </IconButton>

                        </Grid>
                    </Grid>

                    <Modal open={showDelete}>
                        <Box sx={contactStyles.wrapper} component="form" onSubmit={handleSubmit}>
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
                                >
                                    {t("delete")}
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        return setShowDelete(false);
                                    }}
                                >
                                    {t("cancel")}
                                </Button>
                            </Box>

                        </Box>
                    </Modal>
                </ListItem>
            })}
        </List>
    );
};

export default ContactList;