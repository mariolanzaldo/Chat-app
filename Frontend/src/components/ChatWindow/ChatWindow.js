import { Grid, } from "@mui/material";
import ComposeArea from "./ComposeArea";
import Messages from "./Messages";
import { useSubscription } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import MESSAGES_SUBSCRIPTION from "../../graphql/subscriptions/incomingMessages";
import { chatWindowStyles } from "./styles";

const ChatWindow = () => {

    const { roomId } = useParams();

    const dispatch = useDispatch();

    const { currentConversation } = useSelector((state) => state.messages);

    useSubscription(MESSAGES_SUBSCRIPTION, {
        variables: { roomId },
        onData: ({ data }) => {
            dispatch({
                type: "addNewMessage",
                payload: data?.data.newMessage
            });
        },
    });

    useEffect(() => {

        dispatch({
            type: "queryMessages",
            payload: { _id: roomId },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentConversation]);

    return (
        <Grid
            container
            flexDirection='row'
            height="100%"
        >
            <Grid
                item
                width='100%'
                height="100%"
                sx={chatWindowStyles.messagesWindow}
            >
                <Messages />
            </Grid>

            <Grid
                item
                padding={2}
                width='100%'
                height='100px'
            >
                <ComposeArea />

            </Grid>
        </Grid >
    )
};

export default ChatWindow;