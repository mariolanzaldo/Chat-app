import { Box, List } from "@mui/material";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MessageItem from "./MessageItem";


const Messages = () => {
    const { currentConversation, value: messages } = useSelector((state) => state.messages);
    const messagesEnd = useRef(null);

    useEffect(() => {
        messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (messages && currentConversation?._id) {
        const filteredMessages = messages.filter((item) => item.roomId === currentConversation._id);
        return (
            <List
                disablePadding
                // ref={messagesEnd}
                sx={{

                    display: 'flex',
                    flexDirection: 'column',
                    height: 'calc(100vh - 64px - 70px)',
                }}
            >
                {filteredMessages.map((message, index) => {
                    return (
                        <MessageItem message={message} key={index} />
                    );
                })}

                <Box ref={messagesEnd}></Box>
            </List>
        );
    }

};

export default Messages;