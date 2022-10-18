import React, { useState } from 'react';
import { Drawer, Toolbar, Divider, Box, Grid, IconButton, cardHeaderClasses, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { navbarContacts } from './consts/navbarContacts';
import { navbarStyles } from './styles';
import { useNavigate } from "react-router-dom";
import { navbarGroups } from './consts/navbarGroups';
import SearchBar from '../common/SearchBar/SearchBar';
import BasicCard from '../common/BasicCard/BasicCard';
import GridWrapper from '../common/GridWrapper/GridWrapper';
import RefreshIcon from '@mui/icons-material/Refresh';
import CommonButton from '../common/CommonButton/CommonButton';

const Navbar = () => {

    const getHeader = () => {
        const handleChange = (value) => {
            console.log(value);
        }

        const addContact = () => {
            console.log('clicked!');
        };
        return (
            <div>
                <Box sx={navbarStyles.wrapper} >
                    <SearchBar
                        placeholder="Search a friend!"
                        onChange={(event) => handleChange(event.target.value)}
                    />
                    <Box sx={{
                        width: '170px',
                    }}>
                        <CommonButton
                            variant="contained"
                            onClick={addContact}
                            size='large'
                            sx={navbarStyles.addUserButton}
                        >
                            Add
                        </CommonButton>
                        <IconButton sx={navbarStyles.icons}>
                            <RefreshIcon />
                        </IconButton>
                    </Box>
                </Box>
            </div>
        );
    };

    const getContent = () => {
        return (
            <Typography
                align='center'
                sx={{ margin: '40px 16px', color: 'rgba(0,0,0,0.6)', fontSize: '1.3rem' }}
            >
                No contacts yet!
            </Typography>
        );
    };


    return (
        <Drawer
            sx={navbarStyles.drawer}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <Divider
                sx={navbarStyles.text}
            >Contacts</Divider>
            {/* <GridWrapper>
                <BasicCard
                    header={getHeader()}
                    content={getContent()}
                />
            </GridWrapper> */}

            <Box cointaner>
                <SearchBar
                    placeholder="Search a friend!"
                    onChange={handleChange}
                />
            </Box>
            <List>
                {navbarContacts.map((item, index) => (
                    <ListItem
                        button
                        key={item.id}
                        onClick={() => navigate(item.route)}
                    >
                        <ListItemIcon
                            sx={navbarStyles.icons}
                        >
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            sx={navbarStyles.text}
                            primary={item.label}
                        />
                    </ListItem>
                ))}
            </List>
            <Divider
                sx={navbarStyles.text}
            >Groups</Divider>
            <SearchBar
                placeholder="Search a group!"
                onChange={handleChange}
            />
            <List>
                {navbarGroups.map((item, index) => (
                    <ListItem
                        button
                        key={item.id}
                        onClick={() => navigate(item.route)}
                    >
                        <ListItemIcon
                            sx={navbarStyles.icons}
                        >
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            sx={navbarStyles.text}
                            primary={item.label}
                        />
                    </ListItem>
                ))}
            </List>


        </Drawer>
    );
};

export default Navbar;