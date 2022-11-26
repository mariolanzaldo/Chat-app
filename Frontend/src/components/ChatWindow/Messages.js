import { List, ListItem, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import MessageItem from "./MessageItem";


const Messages = () => {
    const { currentConversation, value: messages } = useSelector((state) => state.messages);

    if (messages && currentConversation?._id) {
        const filteredMessages = messages.filter((item) => item.roomId === currentConversation._id);
        return (
            <List
                disablePadding
                sx={{

                    display: 'flex',
                    flexDirection: 'column',
                    height: 'calc(100vh - 64px - 70px)',
                    // overflowY: "scroll",
                }}
            >
                {filteredMessages.map((message, index) => {
                    return (
                        <MessageItem message={message} key={index} />
                    );
                })}
            </List>
        );
    }

};

export default Messages;