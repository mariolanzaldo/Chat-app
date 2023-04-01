import { navbarStyles } from '../Navbar/styles';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import SearchBar from "../common/SearchBar/SearchBar";
import { contactStyles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const TabHeader = ({ open, setOpen, filterData }) => {

    const { t } = useTranslation();

    const { t: i } = i18n;

    const dispatch = useDispatch();

    const { username, requests } = useSelector((state) => {
        return state.user.value
    });

    const [value, setValue] = useState(null);
    const [formError, setFormError] = useState(null);

    const handleSearch = (value) => {
        filterData(value);
    };

    const addContact = (event) => {
        event.preventDefault();
        setOpen(true);
    };

    const handleChange = (event) => {
        event.preventDefault();
        setValue(event.target.value);
    };

    const handleBlur = (event) => {
        event.preventDefault();
        if (value.trim() === username) {
            setFormError(i("addFriendError1"));
        } else if (value.trim() === "") {
            setFormError(i("addFriendError2"));
        } else {
            setFormError(null);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const userB = form.get('username');

        const friendReq = {
            friendInput: {
                userB: [{ username: userB }],
            }
        };

        const onRequest = requests.filter((element) => {
            if (element.from.username === userB) return element;
        });

        if (onRequest.length > 0) {
            setFormError(t("addFriendError3"));
        }

        if (!formError && onRequest.length < 1 && userB !== username) {
            dispatch({
                type: 'addFriend',
                payload: friendReq,
            });

            setOpen(false);
        } else if (userB === username) {
            setFormError(t("addFriendError1"));
        }
    };

    return (
        <Grid
            container
            flexDirection='row'
            alignItems='center'
            height='100px'
            mr={2}
            sx={{
                backgroundColor: '#f5f5f5',
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            }}
        >
            <Grid
                item
                width='74%'
            >
                <SearchBar
                    placeholder={t("searchFriend")}
                    onChange={(event) => handleSearch(event.target.value)}
                />
            </Grid>

            <Grid
                item
            >
                <Button
                    variant="contained"
                    size='large'
                    onClick={addContact}
                    sx={navbarStyles.addUserButton}
                >
                    {t("add")}
                </Button>
            </Grid>

            <Modal open={open} onSubmit={handleSubmit}>
                <Box component="form" sx={contactStyles.wrapper}>
                    <Typography
                        variant='h6'
                        component='h2'
                    >
                        {t("newUser")}
                    </Typography>
                    <Typography mt={2}>
                        {t("fillForm")}
                    </Typography>
                    <Box sx={contactStyles.inputFields}>
                        <TextField
                            placeholder="username"
                            name="username"
                            label={t("username")}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={formError ? true : false}
                            helperText={formError ? formError : value ? `${value?.length}/25` : `0/25`}
                            required
                            inputProps={{ maxLength: 25 }}
                        />
                    </Box>
                    <Box sx={contactStyles.buttons}>
                        <Button
                            type='submit'
                            variant='contained'
                        >
                            {t("submit")}
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={(event) => {
                                event.preventDefault();
                                setFormError(null);
                                return setOpen(false)
                            }}
                        >
                            {t("cancel")}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Grid>

    );
};

export default TabHeader;