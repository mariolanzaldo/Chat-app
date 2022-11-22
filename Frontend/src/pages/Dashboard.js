import { Stack } from '@mui/material';
import { Outlet, Navigate } from 'react-router-dom';
import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { useSelector, useDispatch } from "react-redux";

function Dashboard() {
    const dispatch = useDispatch();

    dispatch({
        type: 'showFriends',
        payload: {
            user: '',
        },
    });

    const user = useSelector((state) => state.user.value);

    dispatch({
        type: 'authUser'
    });

    if (user) {
        return (
            <Stack sx={{
                display: 'flex',
                flexDirection: 'row',
                // width: '100%',
            }}>
                <Navbar />

                <Outlet />

            </Stack>
        );
    }
    else if (!user) {
        return (
            <Navigate to='/login' />
        );
    }
}

export default Dashboard;