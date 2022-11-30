import { navbarStyles } from '../Navbar/styles';
import CommonButton from '../common/CommonButton/CommonButton';
import SearchBar from '../common/SearchBar/SearchBar';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { contactStyles } from '../ContactsBar/styles';
import TagInput from './TagInput';
// import TagInput from './TagInput2';

const ConvTabHeader = ({ open, setOpen }) => {
    //TODO: This is not finished yet. This is just a skleton!
    const dispatch = useDispatch();

    const { username } = useSelector((state) => {
        return state.user.value
    });

    const handleSearch = (value) => {
        console.log(value);
    };

    const handleSelectedTags = (items) => {
        console.log(items)
    };

    const createConversation = (event) => {
        event.preventDefault();
        setOpen(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const userB = form.get('username');
        console.log(form)

        // const friendReq = {
        //     friendInput: {
        //         userA: [{ username }],
        //         userB: [{ username: userB }],
        //     }
        // };

        // dispatch({
        //     type: 'addFriend',
        //     payload: friendReq,
        // });

        setOpen(false);
    };

    return (
        <Box component='span' sx={navbarStyles.wrapper}>

            <Box>
                <SearchBar
                    placeholder="Search a conversation!"
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
                    onClick={createConversation}
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
                            placeholder="Group name"
                            name="GroupName"
                            label="GroupName"
                            required
                        />

                        <TagInput
                            selectedTags={handleSelectedTags}
                        />
                        {/* <TagInput /> */}
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

export default ConvTabHeader;