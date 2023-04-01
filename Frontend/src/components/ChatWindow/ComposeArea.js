import { Box, Button, Grid, IconButton, Modal, TextField, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import GestureIcon from '@mui/icons-material/Gesture';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { contactStyles } from "../ContactsBar/styles";
import Canvas from "./Canvas";
import { useTranslation } from "react-i18next";


const ComposeArea = () => {

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [isError, setIsError] = useState(false);

    const { roomId } = useParams();

    useEffect(() => {
        setMessage("")
    }, [roomId]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (message.length > 0 && message.trim() !== "") {
            const messageInput = {
                roomId,
                content: message,
                isScribble: false,
            };

            dispatch({
                type: "createMessage",
                payload: messageInput,
            });

            setMessage("");
        }
    };

    const handleChange = (event) => {
        event.preventDefault();
        const text = event.target.value;

        setMessage(text);
    };

    const handleClick = (event) => {
        event.preventDefault();

        setOpen(true);
    };

    const handleScribble = (event) => {
        event.preventDefault();
        const canva = document.querySelector('canvas');

        const image = canva.toDataURL("image/png").toString();

        const messageInput = {
            roomId,
            content: image,
            isScribble: true,
        };

        if (image.length < 92000) {
            dispatch({
                type: "createScribble",
                payload: messageInput,
            });
            setIsError(false);
            setOpen(false);

        } else {
            const ctx = canva.getContext("2d");
            ctx.clearRect(0, 0, 430, 280);
            setIsError(true);
        }
    };

    return (
        <>
            <Grid
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    width: "100%",
                    height: "97%",
                    padding: "0px",
                    gap: '15px',
                    alignItems: "center",
                }}
            >
                <TextField
                    direction="column"
                    placeholder={t("typeMessage")}
                    value={message}
                    onChange={handleChange}
                    inputProps={{
                        maxLength: 5000,
                    }}
                    required
                    sx={{
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
                    }}
                />
                <IconButton
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    sx={{
                        minWidth: "50px",
                        width: "50px",
                        height: "50px",
                        flexGrow: 0,
                        backgroundColor: "rgb(240, 240, 240)",
                    }}
                >
                    <GestureIcon />
                </IconButton>
                <IconButton
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{
                        minWidth: "50px",
                        width: "50px",
                        height: "50px",
                        flexGrow: 0,
                        backgroundColor: "rgb(240, 240, 240)",
                    }}
                >
                    <SendIcon />
                </IconButton>
            </Grid>

            <Modal open={open} onSubmit={handleScribble}>
                <Box component="form" sx={contactStyles.scribble}>
                    <Typography
                        variant='h6'
                        component='h2'
                    >
                        {t("scribble")}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                        {t("scribbleInstruction")}
                    </Typography>

                    <Box
                        sx={{
                            margin: 1,
                        }}
                    >
                        <Canvas
                            width={430}
                            height={280}
                            id='canvas'
                        />{
                            isError ? <Typography color='red' sx={{ m: 1, textAlign: 'center' }}>{t("scribbleError")}</Typography> : null
                        }
                    </Box>

                    <Box sx={contactStyles.buttons}>
                        <Button
                            type='submit'
                            variant='contained'
                        >
                            {t("submit")}
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={(event) => {
                                event.preventDefault();
                                setIsError(false);
                                return setOpen(false)
                            }}
                        >
                            {t("cancel")}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default ComposeArea;