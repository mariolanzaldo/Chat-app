import { Box, Grid, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import { chatWindowStyles } from "./styles";

const MessageItem = ({ message }) => {
    const { username } = useSelector((state) => state.user.value);

    const color = message.sendBy === username ? "rgba(175, 173, 222, 0.8)" : "rgba(202, 201, 210, 0.8)";
    const alignMessage = message.sendBy === username ? "flex-end" : "flex-start";

    const time = new Date(message.createdAt);

    return (
        <Grid
            alignSelf={alignMessage}
            maxWidth={{ xs: "30%", sm: "30%", md: '77%', lg: "60%" }}
        >
            <ListItem
                sx={chatWindowStyles.messageContent}>
                {!message.isScribble ? (<>
                    <ListItemText
                        primary={message.sendBy}
                        secondary={message.content}
                        sx={{
                            backgroundColor: color,
                            ...chatWindowStyles.textMessage

                        }}
                    />
                    <ListItemText
                        secondary={message?.createdAt ? `${time.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })}` : `${new Date(Date.now()).toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })}`}
                        sx={{
                            textAlign: 'right',
                        }}
                    />
                </>) : (<>
                    <Grid
                        flexDirection='column'
                        width="450px"
                        borderRadius='10px'
                        padding={1}
                        marginRight={{ xs: "1100px", sm: "1100px", md: "0px" }}
                        sx={{
                            backgroundColor: color,
                        }}
                    >
                        <ListItemText
                            primary={message.sendBy}
                            sx={chatWindowStyles.scribblePrimaryTextMessage}
                        />
                        <ListItemIcon
                            sx={chatWindowStyles.scribbleMainContent}
                        >
                            <img alt="" src={message.content} />
                        </ListItemIcon>
                    </Grid>

                    <ListItemText
                        secondary={message?.createdAt ? `${time.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })}` : `${new Date(Date.now()).toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })}`}
                        sx={{
                            textAlign: 'right',
                        }}
                    />
                </>)}
            </ListItem>
        </Grid >
    );
};

export default MessageItem;