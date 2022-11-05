import { Grid, List } from "@mui/material";
import ComposeArea from "./ComposeArea";
import Message from "./Message";

const ChatWindow = ({ messagesList }) => {
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