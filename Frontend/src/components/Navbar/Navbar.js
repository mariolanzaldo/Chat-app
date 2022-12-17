import React, { useState } from "react";
import { Box, Drawer, Grid, Divider, Typography, IconButton, Menu, MenuItem, Tooltip, Badge } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { navbarStyles } from './styles';
import Image from "./consts/avatar";
import { useDispatch, useSelector } from 'react-redux';
import BasicTabs from "./consts/BasicTabs";
import { useTranslation } from "react-i18next";
import Settings from "./Settings";
import FriendRequests from "./FriendRequests";

const Navbar = () => {

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);

    const { username, requests } = useSelector((state) => state.user.value);
    console.log(username, requests);

    const open = Boolean(anchorEl);

    const newNotifications = `You have ${requests.length} friend requests!`;

    const handleClick = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        event.preventDefault();
        setAnchorEl(null);
    };

    const handleLogout = (event) => {
        event.preventDefault();

        const cookieInput = {
            name: 'JWT'
        }

        dispatch({
            type: 'logout',
            payload: { cookieInput }
        });
    };

    if (username) {
        return (
            <>
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
                            <Tooltip title={requests.length ? newNotifications : null}>
                                <IconButton onClick={handleClick}>
                                    <Badge
                                        badgeContent={requests.length}
                                        color="secondary"
                                    >
                                        <MoreVertIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem
                                    onClick={handleLogout}
                                >
                                    <Typography>{t("logout")}</Typography>
                                </MenuItem>
                                <Settings />
                                <FriendRequests />
                            </Menu>
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
            </>
        );
    } else {
        //TODO: work on a loading view!
        return <div>loading...</div>;
    }


};

export default Navbar;