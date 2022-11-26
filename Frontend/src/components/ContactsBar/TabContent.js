import { Avatar, List, ListItem, ListItemIcon, Stack, Typography, IconButton, } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const TabContent = ({ users, contactList }) => {
    return (
        <List spacing={2}>
            {contactList.map((item) => {
                const user = users.find((user) => user.username === item);
                return <ListItem
                    key={item}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        padding: '0 0 0 10px',
                        width: '100%',
                    }}
                >
                    <ListItemIcon>
                        <Avatar src={user.avatar} />

                    </ListItemIcon>
                    <Stack
                        sx={{
                            justifyContent: 'center',
                            textAlign: 'left',
                            height: '50px',
                            flexGrow: 6
                        }}
                    >
                        <Typography>{user.username}</Typography>
                    </Stack>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </ListItem>
            })}


        </List>
    );
};

export default TabContent;