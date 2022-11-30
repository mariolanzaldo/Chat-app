import { Box, ListItem, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";

const MessageItem = ({ message }) => {
    const { username } = useSelector((state) => state.user.value);

    const color = message.sendBy === username ? "rgba(175, 173, 222, 0.8)" : "rgba(202, 201, 210, 0.8)";
    const alignMessage = message.sendBy === username ? "flex-end" : "flex-start";

    const date = new Date(Date.now());

    return (
        <Box sx={{
            maxWidth: '60%',
            alignSelf: alignMessage,
        }}>
            <ListItem sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 0,
                // backgroundColor: color,
                borderRadius: '10px',
            }}>
                <ListItemText
                    primary={message.sendBy}
                    secondary={message.content}
                    sx={{
                        backgroundColor: color,
                        borderRadius: '10px',
                        padding: 1,
                        '& .MuiListItemText-primary': {

                            fontWeight: 'bold',
                        },
                        '& .MuiListItemText-secondary': {

                            color: 'rgba(14, 14, 14, 1)',
                        }
                    }}
                />
                <ListItemText
                    secondary={`${date.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })}`}
                    sx={{
                        padding: 0,
                        margin: 0,
                        width: '100%',
                        textAlign: 'right',
                    }}
                />
            </ListItem>
        </Box>
    );
};

export default MessageItem;