import { Grid, List } from "@mui/material";
import ComposeArea from "./ComposeArea";
import Messages from "./Messages";
import { gql, useSubscription } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const MESSAGES_SUBSCRIPTION = gql`
subscription newMessage($roomId: ID) {
    newMessage(roomId: $roomId) {
      content
      roomId
      sendBy
    }
  }
`;

const ChatWindow = ({ messagesList }) => {

    const { roomId } = useParams();

    const dispatch = useDispatch();

    const { data, loading } = useSubscription(MESSAGES_SUBSCRIPTION, {
        variables: { roomId },
        onData: ({ data }) => {
            dispatch({
                type: "addNewMessage",
                payload: data?.data.newMessage
            });
        },
    });

    if (!data) {
        dispatch({
            type: "queryMessages",
            payload: { _id: roomId },
        });
    };

    return (
        <Grid
            container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: "nowrap",
                height: "100vh",
            }}
        >
            <Grid
                item
                sx={{
                    backgroundColor: 'rgb(240, 240, 240)',
                    overflowY: 'scroll',
                    height: "100%"
                }}
            >
                <Messages />
            </Grid>

            <Grid
                item

                sx={{
                    padding: "2px",
                    width: '100%',
                    height: "calc(100vh - 85vh)",
                }}
            >
                <ComposeArea />

            </Grid>
        </Grid >
    )
};

export default ChatWindow;