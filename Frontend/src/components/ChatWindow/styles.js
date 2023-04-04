export const chatWindowStyles = {
    messagesWindow: {
        backgroundColor: 'rgb(240, 240, 240)',
        overflowY: 'scroll',
        scrollBehavior: 'smooth',
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
    },
    messageContent: {
        flexDirection: 'column',
        padding: 1,
        alignItems: "stretch",
        overflowWrap: "break-word",
        borderRadius: '10px',
    },
    textMessage: {
        borderRadius: '10px',
        padding: 1,
        height: 'auto',
        '& .MuiListItemText-primary': {
            fontSize: { xs: "30px", sm: "25px", md: "15px" },
            fontWeight: 'bold',
        },
        '& .MuiListItemText-secondary': {
            fontSize: { xs: "30px", sm: "25px", md: "15px" },
            color: 'rgba(14, 14, 14, 1)',
        }
    },
    scribblePrimaryTextMessage: {
        '& .MuiListItemText-primary': {
            fontWeight: 'bold',
        },
        '& .MuiListItemText-secondary': {
            color: 'rgba(14, 14, 14, 1)',
        }
    },
    scribbleMainContent: {
        borderRadius: "5px",
        width: "430px",
        height: "280px",
        backgroundColor: 'whitesmoke',
    },
    scribble: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        height: 450,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    },
    textInput: {
        backgroundColor: "rgb(240, 240, 240)",
        borderRadius: "25px",
        flexGrow: 2,
        paddingLeft: "2px",
        width: "125vh",
        maxHeight: "70px",
        margin: 0,
        whiteSpace: "normal",
        overflowY: 'scroll',
        overflowWrap: "break-word",
        "& fieldset": {
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
            outline: '1px solid slategrey'
        }
    },
    sendMessageButton: {
        minWidth: "50px",
        width: "50px",
        height: "50px",
        flexGrow: 0,
        backgroundColor: "rgb(240, 240, 240)",
    },
    sendScribbleButton: {
        minWidth: "50px",
        width: "50px",
        height: "50px",
        flexGrow: 0,
        backgroundColor: "rgb(240, 240, 240)",
    },
};