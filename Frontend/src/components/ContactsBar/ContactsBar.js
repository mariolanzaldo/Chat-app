import BasicCard from "../common/BasicCard/BasicCard";
import { Avatar, Box, List, ListItem, ListItemIcon, ListItemText, Modal, Typography, Button, TextField, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CommonButton from '../common/CommonButton/CommonButton';
import { navbarStyles } from "../Navbar/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { contactStyles } from "./styles";
import { useDispatch, useSelector } from 'react-redux';
// import { gql, useSubscription } from '@apollo/client';
import getHeader from "./getHeader";

//TODO Instead of add friend create a subscription to send friend requests
// const ADD_FRIEND_SUBSCRIPTION = gql`
// subscription Subscription {
//     addFriend {
//       contactList
//     }
//   }
// `;


const ContactsBar = () => {

    const dispatch = useDispatch();

    const { username, contactList } = useSelector((state) => {
        return state.user.value
    });

    const users = useSelector((state) => {
        return state.users.value;
    });

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    //Shows the modal to delete a contact
    const [showDelete, setShowDelete] = useState(false);

    const [deleteReq, setDeleteReq] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const userB = form.get('username');

        const friendReq = {
            friendInput: {
                userA: [{ username }],
                userB: [{ username: userB }],
            }
        };

        dispatch({
            type: 'addFriend',
            payload: friendReq,
        });

        setOpen(false);
    };

    const deleteContact = (event) => {

        setShowDelete((prev) => {
            return !prev
        });

        const userB = event.target.parentElement.parentElement.previousSibling.firstChild.textContent;

        const unfriendReq = {
            friendInput: {
                userA: [{ username }],
                userB: [{ username: userB }],
            }
        };

        setDeleteReq(unfriendReq);
    };



    const GetContent = () => {

        return (
            <List>
                {(contactList.length === 0) ? <Typography
                    align='center'
                    sx={{ margin: '40px 16px', color: 'rgba(0,0,0,0.6)', fontSize: '1.3rem' }}
                >
                    No contacts yet!
                </Typography> : contactList.map((item) => {
                    const user = users.filter((user) => user.username === item);
                    const { username, avatar } = user[0];
                    return (
                        <ListItem
                            button
                            key={item}
                        // onDoubleClick={() => navigate(`conversation/${item}`)}
                        >
                            <ListItemIcon>
                                <Avatar src={avatar} />
                            </ListItemIcon>
                            <ListItemText
                                primary={username}
                            />
                            <IconButton sx={navbarStyles.icons} key={item} onClick={deleteContact}>
                                <DeleteIcon />
                            </IconButton>

                            <Modal open={showDelete}>
                                <Box sx={contactStyles.wrapper}>
                                    <Typography variant={'subtitle1'} gutterBottom>Are you sure to delete this contact?</Typography>
                                    <Box sx={contactStyles.buttons}>
                                        <Button
                                            variant='contained'
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
                                                return setShowDelete(false)
                                            }}
                                        >
                                            Cancel
                                        </CommonButton>
                                    </Box>
                                </Box>


                            </Modal>
                        </ListItem>
                    )
                })
                }
            </List >
        );
    };

    return (
        <>
            <BasicCard
                header={getHeader([open, setOpen])}
                content={GetContent()}
            />

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
                    <Box sx={contactStyles.inputFields} >
                        <TextField
                            placeholder="username"
                            name="username"
                            label="username"
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
}
export default ContactsBar;