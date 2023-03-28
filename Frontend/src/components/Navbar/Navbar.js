import * as React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';
import BasicTabs from './consts/BasicTabs';
import FriendRequests from './FriendRequests';
import Settings from './Settings';
import { navbarStyles } from './styles';
import {
    Avatar, Badge, Chip, Grid, Menu, MenuItem, Stack, Tooltip, AppBar,
    Box, CssBaseline, Divider, Drawer, IconButton, Toolbar, Typography
} from '@mui/material';
import Image from './consts/avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate, Outlet, useParams } from 'react-router-dom';
import { gql, useSubscription } from '@apollo/client';

const drawerWidth = 275;

const FRIEND_REQUEST = gql`
subscription FriendSub {
    addFriend {
        from {
            username
            firstName
            lastName
            avatar
          }
          to {
            username
            firstName
            lastName
            avatar
          }
  }
}
`;

const GROUP_CHANGED = gql`
subscription groupChanged {
    groupChanged {
      _id
      name
      isGroupalRoom
      admin {
        username
      }
      isDeleted
      members {
        _id
        username
        avatar
        joinedAt
      }
    }
  }
`;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { roomId } = useParams();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const { username, requests, rooms } = useSelector((state) => state.user.value);

    const currentRoom = rooms.find((room) => room._id === roomId);

    const open = Boolean(anchorEl);

    const newNotifications = t("pendingRequests");

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

    useSubscription(FRIEND_REQUEST, {
        onData: ({ data }) => {

            dispatch({
                type: "addNewRequest",
                payload: data?.data.addFriend
            });
        },
    });

    useSubscription(GROUP_CHANGED, {
        onData: ({ data }) => {
            const { groupChanged } = data?.data;

            const hasUser = groupChanged.members.find((user) => user.username === username);

            if (hasUser) {
                dispatch({
                    type: 'groupChanges',
                });

                if (groupChanged.isDeleted && groupChanged.isGroupalRoom && roomId === groupChanged._id) {
                    navigate('/');
                }
            }


        },
    });


    const drawer = (
        <Grid container
            sx={{
                width: "100%",
                height: "100%",
            }}
        >
            <Grid container sx={navbarStyles.avatar}>
                <Grid item xs={3}>
                    <Image />
                </Grid>
                <Grid item xs={7}>
                    <Typography variant='h5' component='div'
                        sx={{
                            width: "100%"
                        }}
                    >{username}</Typography>
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
                    overflow: "hidden",
                    height: { xs: '100%', sm: '93%', md: '90%' },
                }}
            >
                <BasicTabs />
            </Box>
            <Divider />
        </Grid>
    );

    const hasContainer = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box
            sx={{
                display: 'flex',
                width: "100%",
                height: {
                    xs: "100vh",
                    md: "100vh",
                    lg: "100vh",
                },
                zIndex: 0,
            }}
        >
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    height: { xs: '70px' },
                    ml: { md: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box component="div">
                        <Typography variant="h6" noWrap component="div">
                            {currentRoom?.name}
                        </Typography>
                        {currentRoom?.name ? (<Stack
                            direction="row"
                            spacing={1}
                            sx={{

                            }}
                        >
                            <Typography
                                variant="body1"
                            >
                                {`${t("members")}:`}
                            </Typography>
                            {currentRoom?.members.map((user) => {
                                return <Chip
                                    key={user.username}
                                    avatar={<Avatar src={user.avatar} />}
                                    label={user.username}
                                    sx={{
                                        backgroundColor: "rgba(177, 173, 206, 0.8)",
                                        fontWeight: 'bold',
                                        boxShadow: "5px 2px 2px rgba(74, 76, 74, 0.8)",
                                        color: "whitesmoke"
                                    }}
                                />
                            })}
                        </Stack>) : ""}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{
                    width: { md: drawerWidth },
                    flexShrink: { md: 0 },
                }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={hasContainer}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {
                            xs: 'block',
                            sm: 'block',
                            md: "none"
                        },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {
                            xs: 'none',
                            sm: 'none',
                            md: 'block',
                        },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 0,
                    width: { md: `calc(80% - ${drawerWidth}px)` },
                    height: {
                        xs: "250vh",
                        sm: "230vh",
                        md: "77vh",
                    },
                }}
            >
                <Toolbar />

                <Outlet />
            </Box>
        </Box >
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;