import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { Sheet, Typography, TextField, Button, Link } from '@mui/joy'
import { Box } from '@mui/material';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = () => {
    //TODO: Handle data validation!!! Don't forget to buil and push the image!

    const { t } = useTranslation();

    const { user } = useSelector((state) => {
        return state
    });

    const dispatch = useDispatch();

    const [inputFields, setInputFields] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        setInputFields((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: "login",
            payload: {
                user: inputFields,
            }
        });
    };

    if (user.value) return <Navigate to="/" />;
    return (
        <CssVarsProvider>
            <main>
                <Sheet
                    sx={{
                        width: 300,
                        mx: 'auto',
                        my: 4,
                        py: 3,
                        px: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        borderRadius: 'sm',
                        boxShadow: 'md',
                    }}
                    variant="outlined"
                >
                    <div>
                        <Typography level="h4" component="h1">
                            <b>{t("welcome")}</b>
                        </Typography>
                        <Typography level="body2">{t('signinToContinue')}</Typography>
                    </div>
                    <Box component='form' onSubmit={handleSubmit}>
                        <TextField
                            name="username"
                            type="text"
                            placeholder="username123"
                            label={t("username")}
                            onChange={handleChange}
                        />
                        <TextField
                            name="password"
                            type="password"
                            placeholder={t("password")}
                            label={t("password")}
                            onChange={handleChange}
                        />
                        <Button
                            fullWidth
                            type='submit'
                            sx={{
                                mt: 1,
                                backgroundColor: '#3f51b5'
                            }}>
                            {t("login")}
                        </Button>
                    </Box>
                    <Typography
                        endDecorator={<Link href="/signup">{t('signup')}</Link>}
                        fontSize="sm"
                        sx={{ alignSelf: 'center' }}
                    >

                        {t('Donthaveanaccount')}
                    </Typography>
                </Sheet>
            </main>
        </CssVarsProvider>
    );
}

export default Login;