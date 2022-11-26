import { navbarStyles } from '../Navbar/styles';
import CommonButton from '../common/CommonButton/CommonButton';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import SearchBar from "../common/SearchBar/SearchBar";
import { contactStyles } from './styles';
import { useDispatch, useSelector } from 'react-redux';

const TabHeader = ({ open, setOpen }) => {

    const dispatch = useDispatch();

    const { username } = useSelector((state) => {
        return state.user.value
    });

    const handleSearch = (value) => {
        console.log(value);
    };

    const addContact = (event) => {
        event.preventDefault();
        setOpen(true);
    };

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

    return (
        <Box component='span' sx={navbarStyles.wrapper}>

            <Box>
                <SearchBar
                    placeholder="Search a friend!"
                    onChange={(event) => handleSearch(event.target.value)}
                />
            </Box>


            <Box
                sx={{
                    width: '65px',
                }}
            >
                <CommonButton
                    variant="contained"
                    size='large'
                    onClick={addContact}
                    sx={navbarStyles.addUserButton}
                >
                    Add
                </CommonButton>
            </Box>

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



        </Box>


    );
};

export default TabHeader;