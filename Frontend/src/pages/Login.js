import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { Sheet, Typography, TextField, Button, Link } from '@mui/joy'
import { Box } from '@mui/material';
import { useState } from "react";
import { useDispatch } from "react-redux";

const Login = () => {

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
        const data = new FormData(event.currentTarget);
        dispatch({
            type: "login",
            payload: {
                user: inputFields,
            }
        });
        console.log({
            username: data.get('username'),
            password: data.get('password'),
        });
    };

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
                            <b>Welcome!</b>
                        </Typography>
                        <Typography level="body2">Sign in to continue.</Typography>
                    </div>
                    <Box component='form' onSubmit={handleSubmit}>
                        <TextField
                            name="username"
                            type="text"
                            placeholder="username123"
                            label="Username"
                            onChange={handleChange}
                        />
                        <TextField
                            name="password"
                            type="password"
                            placeholder="password"
                            label="Password"
                            onChange={handleChange}
                        />
                        <Button
                            fullWidth
                            type='submit'
                            sx={{
                                mt: 1,
                                backgroundColor: '#3f51b5'
                            }}>
                            Log in
                        </Button>
                    </Box>
                    <Typography
                        endDecorator={<Link href="/signup">Sign up</Link>}
                        fontSize="sm"
                        sx={{ alignSelf: 'center' }}
                    >
                        Don&apos;t have an account?
                    </Typography>
                </Sheet>
            </main>
        </CssVarsProvider>
    );
}

export default Login;