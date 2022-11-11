import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { useSelector } from "react-redux";

// const DefaultMessageChat = () => (
//     <Box
//         sx={{
//             margin: '25vh',
//             width: '100vh',
//         }}
//     >
//         <Typography variant='h3'
//             sx={{
//                 textAlign: 'center',
//                 borderRadius: '10px',
//                 backgroundColor: 'rgba(80, 20, 161, 0.8)',
//                 width: '100vh',

//             }}
//         >
//             Select a conversation
//         </Typography>
//     </Box>
//     );

const userInfo = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    // avatar: "",
    contactList: [],
};

function Dashboard() {
    const user = useSelector((state) => {
        return state.user;
    });

    return (
        <Stack sx={{
            display: 'flex',
            flexDirection: 'row',
            // width: '100%',
        }}>
            <Navbar />
            {/* <DefaultMessageChat /> */}

            <Outlet />

        </Stack>
    );
}

export default Dashboard;