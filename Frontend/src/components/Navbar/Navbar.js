import React from "react";
import { Box, Drawer, Grid, Divider, Typography, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { navbarStyles } from './styles';
import Image from "./consts/avatar";
import { useSelector } from 'react-redux';

import BasicTabs from "./consts/BasicTabs";

const Navbar = () => {

    const { username } = useSelector((state) => {
        return state.user.value;

    });

    if (username) {
        return (
            <Drawer
                sx={navbarStyles.drawer}
                variant="permanent"
                anchor="left"
            >

                <Grid container sx={navbarStyles.avatar}>
                    <Grid item xs={3} >
                        <Image />
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant='h4' component='div'>{username}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Divider />
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <BasicTabs />

                </Box>
            </Drawer>
        );
    } else {
        //TODO: work on a loading view!
        return <div>loading...</div>;
    }


};

export default Navbar;