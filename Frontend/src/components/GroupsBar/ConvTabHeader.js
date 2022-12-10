import { navbarStyles } from '../Navbar/styles';
import CommonButton from '../common/CommonButton/CommonButton';
import SearchBar from '../common/SearchBar/SearchBar';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { contactStyles } from '../ContactsBar/styles';
import TagInput from './TagInput';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ConvTabHeader = ({ open, setOpen, filterData }) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { username } = useSelector((state) => {
        return state.user.value
    });

    const [members, setMembers] = useState([]);

    const handleSearch = (value) => {
        filterData(value);
    };

    const createConversation = (event) => {
        event.preventDefault();
        setOpen(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const groupName = form.get('groupName');

        const membersArray = members.map((member) => {
            return { username: member };
        });

        const createRoomReq = {

            roomInput: {
                name: groupName,
                admin: [{ username }],
                groupalRoom: true,
                members: [...membersArray, { username }],
            }
        };

        dispatch({
            type: 'createGroup',
            payload: createRoomReq,
        });

        setOpen(false);
    };

    return (
        <Box component='span' sx={navbarStyles.wrapper}>

            <Box>
                <SearchBar
                    placeholder={t("searchConversation")}
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
                    {t("add")}
                </CommonButton>
            </Box>

            <Modal open={open} onSubmit={handleSubmit}>
                <Box component="form" sx={contactStyles.wrapper}>
                    <Typography
                        variant='h6'
                        component='h2'
                    >
                        {t("newGroup")}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        {t("fillForm")}
                    </Typography>
                    <Box sx={contactStyles.inputFields}>
                        <TextField
                            placeholder={t("groupName")}
                            name="groupName"
                            label={t("groupName")}
                            required
                        />
                        <TagInput name="members" members={members} setMembers={setMembers} />
                    </Box>
                    <Box sx={contactStyles.buttons}>
                        <Button
                            type='submit'
                            variant='contained'
                        >
                            {t("submit")}
                        </Button>
                        <CommonButton
                            variant="outlined"
                            onClick={(event) => {
                                event.preventDefault();
                                return setOpen(false)
                            }}
                        >
                            {t("cancel")}
                        </CommonButton>
                    </Box>
                </Box>
            </Modal>



        </Box>


    );
};

export default ConvTabHeader;