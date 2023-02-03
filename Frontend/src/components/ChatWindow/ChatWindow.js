import { Grid, } from "@mui/material";
import ComposeArea from "./ComposeArea";
import Messages from "./Messages";
import { gql, useSubscription } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const MESSAGES_SUBSCRIPTION = gql`
subscription newMessage($roomId: ID) {
    newMessage(roomId: $roomId) {
      content
      isScribble
      roomId
      sendBy
      createdAt
    }
  }
`;

const ChatWindow = () => {

    const { roomId } = useParams();

    const dispatch = useDispatch();

    const { currentConversation } = useSelector((state) => state.messages);
    const { username } = useSelector((state) => state.user.value);

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
            payload: { _id: roomId, username },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentConversation]);

    return (
        <Grid
            container
            m={0}

            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 0,
                flexWrap: "nowrap",
                height: "100%",
                //TODO: This width controls the chatview
                width: "100%",
                scrollBehavior: 'smooth',
                // border: "1px solid blue"
            }}
        >
            <Grid
                item
                s={10}
                sx={{
                    backgroundColor: 'rgb(240, 240, 240)',
                    overflowY: 'scroll',
                    height: "100%",
                    width: "100%",
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
                s={2}
                sx={{
                    padding: "2px",
                    width: '100%',
                    height: "100px",
                    // height: "calc(100vh - 85vh)",
                }}
            >
                <ComposeArea />

            </Grid>
        </Grid >
    )
};

export default ChatWindow;