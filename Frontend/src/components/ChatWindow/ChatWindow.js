import { Grid, List } from "@mui/material";
import ComposeArea from "./ComposeArea";
import Message from "./Message";
import { gql, useSubscription } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

const MESSAGES_SUBSCRIPTION = gql`
subscription newMessage($roomId: ID) {
    newMessage(roomId: $roomId) {
      _id
      content
      room
      sendBy
    }
  }
`;

const ChatWindow = ({ messagesList }) => {

    const { roomId } = useParams();

    const dispatch = useDispatch();

    useSubscription(MESSAGES_SUBSCRIPTION, {
        variables: { roomId },
    })
    return (
        <Grid
            container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: "nowrap",
                height: "100vh",
                border: '1px solid red'
            }}
        >
            <Grid
                item
                sx={{
                    backgroundColor: 'rgb(240, 240, 240)',
                    overflowY: 'scroll',
                    height: "100%"
                }}
            >  {/* messagesList.List.map((message, index) => (
                            <Message message={message} key={index} />
                        )) */}
                <List>

                    {
                        //Above comment goes here...
                    }
                    <Message />
                </List>
            </Grid>

            <Grid
                item

                sx={{
                    backgroundColor: 'rgb(106, 90, 205)',
                    padding: "2px",
                    height: "calc(100vh - 85vh)",
                    border: "2px solid red"
                }}
            >
                <ComposeArea />

            </Grid>
        </Grid >
    )
};

export default ChatWindow;