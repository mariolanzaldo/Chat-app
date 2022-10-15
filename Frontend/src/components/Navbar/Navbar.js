import React from 'react'
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { navbarContacts } from './consts/navbarContacts';
import { navbarStyles } from './styles';
import { useNavigate } from "react-router-dom";
import { Box } from '@mui/material';
import { navbarGroups } from './consts/navbarGroups';
import SearchBar from '../common/SearchBar/SearchBar';

const Navbar = () => {
    const navigate = useNavigate();

    const handleChange = (event) => {
        console.log(event.target.value);
    }

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