import { Stack, Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
// import { useSelector, useDispatch } from "react-redux";

const DefaultMessageChat = () => (
    <Box
        sx={{
            margin: '25vh',
            width: '100vh',
        }}
    >
        <Typography variant='h3'
            sx={{
                textAlign: 'center',
                borderRadius: '10px',
                backgroundColor: 'rgba(80, 20, 161, 0.8)',
                width: '100vh',

            }}
        >
            Select a conversation
        </Typography>
    </Box>
);

const userInfo = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    // avatar: "",
    contactList: [],
};

function Dashboard() {

    return (
        <Stack sx={{
            display: 'flex',
            flexDirection: 'row',
            // width: '100%',
        }}>
            <Navbar />


            <Outlet />

            {/* <DefaultMessageChat /> */}

        </Stack>
    );
}

export default Dashboard;