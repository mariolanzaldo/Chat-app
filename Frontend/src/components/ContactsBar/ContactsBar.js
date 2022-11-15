import BasicCard from "../common/BasicCard/BasicCard";
import { Avatar, Box, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Modal, Typography, Button, TextField } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchBar from "../common/SearchBar/SearchBar";
import CommonButton from '../common/CommonButton/CommonButton';
import { navbarStyles } from "../Navbar/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { contactStyles } from "./styles";
import { useDispatch, useSelector } from 'react-redux';
import { gql, useSubscription } from '@apollo/client';

const ADD_FRIEND_SUBSCRIPTION = gql`
subscription Subscription {
    addFriend {
      contactList
    }
  }
`;


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

    const initState = {
        username: "",
    }

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
            type: 'addContact',
            payload: friendReq,
        });

        setOpen(false);
    };


    const { data, loading } = useSubscription(ADD_FRIEND_SUBSCRIPTION);

    const getHeader = () => {
        const handleSearch = (value) => {

            console.log(value);
        };

        const addContact = (event) => {
            event.preventDefault();
            setOpen(true);
        };

        return (
            <Grid item sx={navbarStyles.wrapper} >
                <SearchBar
                    placeholder="Search a friend!"
                    onChange={(event) => handleSearch(event.target.value)}
                />
                <Box sx={{
                    width: '70px',
                }}>
                    <CommonButton
                        variant="contained"
                        onClick={addContact}
                        size='large'
                        sx={navbarStyles.addUserButton}
                    >
                        Add
                    </CommonButton >
                </Box>
            </Grid>
        );
    };

    const getContent = () => {
        if (data) {
            return data.addFriend.contactList.map((item) => {
                const user = users.filter((user) => user.username === item);
                const { username, avatar } = user[0];
                return (
                    <ListItem
                        button
                        key={item}
                        onClick={() => navigate(`conversation/${item}`)}
                    >
                        <ListItemIcon>
                            <Avatar src={avatar} />
                        </ListItemIcon>
                        <ListItemText
                            primary={username}
                        />
                    </ListItem>
                )
            })
        } else if (!data) return (
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
                            onClick={() => navigate(`conversation/${item}`)}
                        >
                            <ListItemIcon>
                                <Avatar src={avatar} />
                            </ListItemIcon>
                            <ListItemText
                                primary={username}
                            />
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
                header={getHeader()}
                content={getContent()}
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
                            defaultValue={initState.username}
                        // error={errors.username ? true : false}
                        // helperText={errors.username}
                        // onChange={handleChange}
                        // onBlur={handleBlur}
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
                            onClick={() => setOpen(false)}
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