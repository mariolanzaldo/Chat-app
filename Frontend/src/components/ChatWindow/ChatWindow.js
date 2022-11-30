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
      createdAt
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
                    height: "100%",
                    "& .css-tazwbd-MuiList-root::-webkit-scrollbar-track": {
                        border: 'none',
                    },
                    '&::-webkit-scrollbar': {
                        width: '0.4em',

                    },
                    '&::-webkit-scrollbar-track': {
                        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                        webkitBoxShadow: 'inset 0 0 6px rgba(,0,0,0.00)',


                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(145, 136, 153, 0.91)',
                        borderRadius: '20px',

                        outline: '1px solid slategrey'
                    }
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