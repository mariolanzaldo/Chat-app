import * as React from 'react';
import { Box, Typography, TextField, Button, Paper, Link } from '@mui/material';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

const Login = () => {
    const { t } = useTranslation();

    const { user } = useSelector((state) => {
        return state
    });

    const dispatch = useDispatch();

    const [inputFields, setInputFields] = useState({
        username: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({
        username: null,
        password: null,
    });

    const handleChange = (event) => {
        setInputFields((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const validateForm = () => {
        const { username, password } = inputFields;

        if (username.trim() === "" && password.trim() === "") {
            setFormErrors({
                username: "Username field is empty",
                password: "Password field is empty",
            });
        } else if (username.trim() === "" && password.trim() !== "") {
            setFormErrors({
                username: "Username field is empty",
                password: null,
            });
        } else if (username.trim() !== "" && password.trim() === "") {
            setFormErrors({
                username: null,
                password: "Password field is empty",
            });
        } else {
            setFormErrors({
                username: null,
                password: null,
            });
        }
    };

    const handleBlur = (event) => {
        event.preventDefault();

        validateForm();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        validateForm();

        if (!formErrors.username && !formErrors.password && inputFields.username !== "" && inputFields.password !== "") {
            dispatch({
                type: "login",
                payload: {
                    user: inputFields,
                }
            });
        }

    };

    if (user.value) return <Navigate to="/" />;
    return (
        <Paper
            variant='outlined'
            sx={{
                width: 300,
                mx: "auto",
                my: 4,
                p: 4,
                px: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRadius: 'sm',
                boxShadow: 'md',
            }}
        >
            <div>
                <Typography level='h4' component='h1'>
                    <b>{t("welcome")}</b>
                </Typography>
                <Typography level="body2">
                    {t('signinToContinue')}
                </Typography>
            </div>
            <Box component='form' onSubmit={handleSubmit}>
                <Box></Box>
                <TextField
                    fullWidth
                    name='username'
                    type='text'
                    placeholder='username123'
                    label={t("username")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={formErrors.username ? true : false}
                    helperText={formErrors.username}
                    inputProps={{ maxLength: 25 }}
                    sx={{
                        mb: 2
                    }}
                />
                <TextField
                    fullWidth
                    name="password"
                    type="password"
                    placeholder={t("password")}
                    label={t("password")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={formErrors.password ? true : false}
                    helperText={formErrors.password}
                    inputProps={{ maxLength: 80 }}
                    sx={{
                        mb: 2
                    }}
                />
                <Button
                    fullWidth
                    type='submit'
                    sx={{
                        my: 1,
                        backgroundColor: '#3f51b5',
                        color: 'whitesmoke'
                    }}
                >
                    {t('login')}
                </Button>
            </Box>

            <Typography
                fontSize='sm'
                sx={{ alignSelf: 'center' }}
            >
                {t('Donthaveanaccount')}

                <Link component={RouterLink} to="/signup">
                    {t('signup')}
                </Link>
            </Typography>
        </Paper>
    );
}

export default Login;