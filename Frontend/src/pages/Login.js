import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { Sheet, Typography, TextField, Button, Link } from '@mui/joy'
import { Box } from '@mui/material';

function Login() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        //HTTP request to auth service
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        //Show something if response went wrong....

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
                            name="email"
                            type="email"
                            placeholder="example@email.com"
                            label="Email"
                        />
                        <TextField
                            name="password"
                            type="password"
                            placeholder="password"
                            label="Password"
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