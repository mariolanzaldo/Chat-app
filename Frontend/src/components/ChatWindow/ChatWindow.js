import { Grid, Typography } from "@mui/material";
import ComposeArea from "./ComposeArea";
import Messages from "./Messages";
import { gql, useSubscription } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

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

    const { t } = useTranslation();

    const { roomId } = useParams();

    const dispatch = useDispatch();

    const { currentConversation } = useSelector((state) => state.messages);
    const { rooms } = useSelector((state) => state.user.value);

    const { name, members } = rooms.find((room) => room._id === roomId);

    const { data, loading } = useSubscription(MESSAGES_SUBSCRIPTION, {
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
        //dispatch subcription
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentConversation]);

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
                    padding: 1,
                    width: '100%',
                    height: '10vh',
                    color: 'whitesmoke',
                    borderRadius: '5px',
                    backgroundColor: "rgba(29, 77, 213, 0.8)",
                }}
            >
                <Typography
                    variant="h5"
                >{name}</Typography>
                <Typography
                    variant="body1"
                >
                    {`${t("members")}:`}
                    {members.map((user) => {
                        return ` ${user.username},`;
                    })}
                </Typography>
            </Grid>
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