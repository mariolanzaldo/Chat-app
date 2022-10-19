import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import React, { Children } from 'react';
import Navbar from '../components/Navbar/Navbar';

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

function Dashboard({ children }) {
    return (
        <div>
            {children}
        </div>
    );

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