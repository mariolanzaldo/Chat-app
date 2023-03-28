import { Box, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";

const MessageItem = ({ message }) => {
    const { username } = useSelector((state) => state.user.value);

    const color = message.sendBy === username ? "rgba(175, 173, 222, 0.8)" : "rgba(202, 201, 210, 0.8)";
    const alignMessage = message.sendBy === username ? "flex-end" : "flex-start";

    const time = new Date(message.createdAt);

    return (
        <Box sx={{
            maxWidth: { xs: "30%", sm: "30%", md: '77%', lg: "60%" },
            alignSelf: alignMessage,
        }}>
            <ListItem sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 1,
                alignItems: "stretch",
                overflowWrap: "break-word",
                borderRadius: '10px',
            }}>
                {!message.isScribble ? (<>
                    <ListItemText
                        primary={message.sendBy}
                        secondary={message.content}
                        sx={{
                            backgroundColor: color,
                            borderRadius: '10px',
                            padding: 1,
                            margin: 0,
                            height: 'auto',
                            '& .MuiListItemText-primary': {
                                fontSize: { xs: "30px", sm: "25px", md: "15px" },
                                fontWeight: 'bold',
                            },
                            '& .MuiListItemText-secondary': {
                                fontSize: { xs: "30px", sm: "25px", md: "15px" },
                                color: 'rgba(14, 14, 14, 1)',
                            }
                        }}
                    />
                    <ListItemText
                        secondary={message?.createdAt ? `${time.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })}` : `${new Date(Date.now()).toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })}`}
                        sx={{
                            padding: 0,
                            margin: 0,
                            width: '100%',
                            textAlign: 'right',
                        }}
                    />
                </>) : (<>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: color,
                            width: "450px",
                            borderRadius: '10px',
                            marginRight: { xs: "1100px", sm: "1100px", md: "0px" },
                            padding: 1,
                        }}
                    >
                        <ListItemText
                            primary={message.sendBy}
                            sx={{

                                '& .MuiListItemText-primary': {

                                    fontWeight: 'bold',
                                },
                                '& .MuiListItemText-secondary': {

                                    color: 'rgba(14, 14, 14, 1)',
                                }
                            }}
                        />
                        <ListItemIcon
                            sx={{
                                borderRadius: "5px",
                                width: "430px",
                                height: "280px",
                                backgroundColor: 'whitesmoke',
                            }}
                        >
                            <img alt="" src={message.content} />
                        </ListItemIcon>
                    </Box>

                    <ListItemText
                        secondary={message?.createdAt ? `${time.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })}` : `${new Date(Date.now()).toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })}`}
                        sx={{
                            padding: 0,
                            margin: 0,
                            width: '100%',
                            textAlign: 'right',
                        }}
                    />
                </>)}
            </ListItem>
        </Box>
    );
};

export default MessageItem;