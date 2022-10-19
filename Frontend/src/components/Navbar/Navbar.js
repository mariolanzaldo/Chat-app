import React, { useState } from "react";
import { Drawer, Grid, Toolbar, Divider, List, ListItem, ListItemButton, Typography, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { navbarStyles } from './styles';
import Image from "./consts/avatar";
import ContactsBar from "../ContactsBar/ContactsBar";
import GroupsBar from "../GroupsBar/GroupsBar";
import { Outlet } from "react-router-dom";


const Navbar = () => {
    const tabs = ['Contacts', 'Groups'];

    const initialState = {
        groups: false,
        contacts: true,
    };

    const [isShown, setIsShown] = useState(initialState);

    const handleClick = (event) => {

        if (event.currentTarget.innerText === 'Contacts') {
            setIsShown(current => {
                return ({
                    shown: !current.shown,
                    contacts: true,
                    groups: false
                });
            })
        }

        if (event.currentTarget.innerText === 'Groups') {
            setIsShown(current => {
                return ({
                    shown: !current.shown,
                    contacts: false,
                    groups: true
                });
            })
        }
    };

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
                    <Typography variant='h4' component='div'>User</Typography>
                </Grid>
                <Grid item xs={2}>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Divider />
            <Toolbar sx={navbarStyles.tabs}>
                <List>
                    {tabs.map((text) => {
                        return (
                            <ListItem key={text} >
                                <ListItemButton
                                    sx={{ justifyContent: 'center' }}
                                    onClick={handleClick}
                                >
                                    {text}
                                </ListItemButton>
                                <Outlet />
                            </ListItem>
                        );
                    }
                    )}
                </List>
            </Toolbar>
            <Divider />
            <Grid container sx={navbarStyles.contacts}>
                {(isShown.contacts && !isShown.groups) ? (<ContactsBar />) : (<GroupsBar />)}
            </Grid>
        </Drawer>
    );
};

export default Navbar;