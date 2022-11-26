import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TabHeader from "./TabHeader";
import TabContent from "./TabContent";

const ContactsBar = () => {
    const dispatch = useDispatch();

    const { username, contactList } = useSelector((state) => {
        return state.user.value
    });

    const users = useSelector((state) => {
        return state.users.value;
    });

    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch({
            type: 'showFriends',
        });
    });

    if (contactList.length > 0 && users && username) {
        return (

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    margin: 0,
                    padding: 0,
                }}
            >
                <TabHeader open={open} setOpen={setOpen} />
                <TabContent users={users} contactList={contactList} />

            </ Box>
        );

    } else if (contactList.length === 0) {
        return (
            <Box>
                <TabHeader open={open} setOpen={setOpen} />

                <Typography> No contacts yet!</Typography>
            </Box>
        );
    }
};

export default ContactsBar;
