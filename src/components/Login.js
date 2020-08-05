import React from 'react';
import { Button, Typography, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export const Login = ({auth}) => {
    const authenticated = auth.isAuthenticated();
    const history = useHistory();
    if (!authenticated) {
        return (
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>
                    ログイン
                </Typography>
                <Button
                variant="contained"
                color="primary"
                onClick={() => auth.login()}>ログインする</Button>
            </Container>
            
        )
    } else {
        history.push("/top");
    };
};