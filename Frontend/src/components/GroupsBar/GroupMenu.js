import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, IconButton, ListItemIcon, Menu, MenuItem, Modal } from '@mui/material';
import { useSelector } from 'react-redux';
import GroupOptions from './AdminGroupOptions';
import AdminGroupOptions from './AdminGroupOptions';
import { useParams } from 'react-router-dom';

const GroupMenu = () => {
    const { roomId } = useParams();
    const { username, rooms } = useSelector(state => state.user.value);
    const [anchorEl, setAnchorEl] = useState(null);

    if (roomId) {
        const currentChat = rooms.find((room) => room._id === roomId);

        const isAdmin = currentChat.admin.find((user) => user.username === username);

        const open = Boolean(anchorEl);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        return (
            <>
                <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {(isAdmin && currentChat) ? <AdminGroupOptions currentChat={currentChat} setAnchorEl={setAnchorEl} /> : <GroupOptions />}
                </Menu>
            </>
        );
    }


};

export default GroupMenu;