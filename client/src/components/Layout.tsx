import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flexGrow: 1,
        minHeight: '100vh',
        background: theme.palette.background.paper,
    },
}));

interface Props {
    children: React.ReactNode;
}

const Layout = (props: Props) => {
    const classes = useStyles();
    return <div className={classes.content}>{props.children}</div>;
};

export default Layout;
