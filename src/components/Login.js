import React from 'react';
import { Button, Typography, Container } from "@material-ui/core";

export const Login = ({auth}) => {
    const authenticated = auth.isAuthenticated();
    if (!authenticated) {
        return (
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>
                    ログイン画面
                </Typography>
                <Button
                variant="contained"
                color="primary"
                onClick={() => auth.login()}>ログインする</Button>
            </Container>
            
        )
    } else {
        return (
            <Typography variant="h4" component="h1" gutterBottom>
                ログインしています
            </Typography>
        )
    };
}