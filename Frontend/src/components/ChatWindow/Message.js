import { Box, ListItem, ListItemText } from "@mui/material";
// import { useSelector } from "react-redux";

const Message = ({ message }) => {
    // const userId = useSelector((state) => state.user._id);

    return (
        <Box>
            <ListItem sx={{ padding: 0 }}>
                <ListItemText
                    // primary={message.from}
                    // secondary={message.content}
                    sx={{ backgroundColor: 'blue', borderRadius: '10px', padding: 1 }}
                />
            </ListItem>
        </Box>
    );
};

export default Message;