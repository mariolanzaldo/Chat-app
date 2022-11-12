import BasicCard from "../common/BasicCard/BasicCard";
import { Avatar, Box, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Modal, Typography, Button, TextField } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchBar from "../common/SearchBar/SearchBar";
import CommonButton from '../common/CommonButton/CommonButton';
import { navbarStyles } from "../Navbar/styles";
// import { navbarContacts } from "../Navbar/consts/navbarContacts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useForm from "../../hooks/useForm";
import { validator } from "../../validator/validator";
import { contactStyles } from "./styles";
import { useSelector, useDispatch } from 'react-redux';


const ContactsBar = () => {

    const dispatch = useDispatch();

    const { contactList } = useSelector((state) => state.user.value);
    const users = useSelector((state) => state.users.value);

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const initState = {
        username: "",
    }

    const addNewUser = (values) => {
        // users.push({ ...values });
        console.log(values);
        setOpen(false);
    };

    const {
        handleChange,
        handleSubmit,
        handleBlur,
        errors,
    } = useForm({
        initState,
        callback: addNewUser,
        validator
    });

    const getHeader = () => {
        const handleSearch = (value) => {

            console.log(value);
            // filterData(value);
        };

        // const filterData = (value) => {
        //     const lowerCasedValue = value.toLowerCase().trim();

        //     if (lowerCasedValue === '') setUsers(searchResults);
        //     else {
        //         const filteredData = searchResults.filter((item) => {
        //             return Object.keys(item).some((key) =>
        //                 item[key].toString().toLowerCase().includes(lowerCasedValue)
        //             );
        //         });
        //         setUsers(filteredData);

        //     }

        // }

        const addContact = () => {
            setOpen(true);
        };

        return (
            <Grid item sx={navbarStyles.wrapper} >
                <SearchBar
                    placeholder="Search a friend!"
                    onChange={(event) => handleSearch(event.target.value)}
                />
                <Box sx={{
                    width: '170px',
                }}>
                    <CommonButton
                        variant="contained"
                        onClick={addContact}
                        size='large'
                        sx={navbarStyles.addUserButton}
                    >
                        Add
                    </CommonButton>
                    <IconButton sx={navbarStyles.icons}>
                        <RefreshIcon />
                    </IconButton>
                </Box>
            </Grid>
        );
    };

    const getContent = () => {

        if (contactList.length > 0) {
            dispatch({
                type: 'showFriends',
                payload: {
                    user: '',
                },
            });
        };


        return (
            <List>
                {(contactList.length > 0) ? contactList.map((item) => {
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
                }) : <Typography
                    align='center'
                    sx={{ margin: '40px 16px', color: 'rgba(0,0,0,0.6)', fontSize: '1.3rem' }}
                >
                    No contacts yet!
                </Typography>
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
                            error={errors.username ? true : false}
                            helperText={errors.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
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