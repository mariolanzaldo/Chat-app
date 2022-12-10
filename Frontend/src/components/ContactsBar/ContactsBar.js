import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import TabHeader from "./TabHeader";
import TabContent from "./TabContent";
import { useTranslation } from "react-i18next";

const ContactsBar = () => {

    const { t } = useTranslation();

    const { username, contactList } = useSelector((state) => {
        return state.user.value
    });

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState(contactList);
    const [users, setUsers] = useState([]);

    const filterData = (value) => {
        const lowerdCaseValue = value.toLowerCase().trim();

        if (lowerdCaseValue === "") setUsers(search);
        else {
            const filteredData = search.filter((item) => {
                return Object.keys(item).some((key) => item[key].toString().toLowerCase().includes(lowerdCaseValue));
            });

            setUsers(filteredData);
        }
    };

    if (contactList.length > 0 && contactList && username) {
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
                <TabHeader open={open} setOpen={setOpen} filterData={filterData} />
                <TabContent users={users} />

            </ Box>
        );

    } else if (contactList.length === 0) {
        return (
            <Box>
                <TabHeader open={open} setOpen={setOpen} />

                <Typography>{t("noContacts")}</Typography>
            </Box>
        );
    }
};

export default ContactsBar;
