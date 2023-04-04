import { Grid, List, Toolbar } from "@mui/material";
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
            <Grid
                disablePadding
                component={List}
                display='flex'
                flexDirection='column'
            >
                <Toolbar />

                {filteredMessages.map((message, index) => {
                    return (
                        <MessageItem message={message} key={index} />
                    );
                })}

                <Grid ref={messagesEnd}></Grid>
            </Grid>
        );
    }

};

export default Messages;