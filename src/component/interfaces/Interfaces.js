import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import socket from "../ServerConnector";

const useStyles = makeStyles((theme) => ({
        root: {
            // width: '70%',
            maxWidth: '70%',
            backgroundColor: theme.palette.background.paper,
            margin: "auto"
        },
        nested: {
            paddingLeft: theme.spacing(4)
        }
    })
);

export default function Interfaces() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [interfaces, setInterfaces] = React.useState([]);

    useEffect(() => {
        socket.onopen = ev => {
            socket.send(JSON.stringify({
                key: "GET_INTERFACES",
                value: ""
            }))
        }
        socket.onmessage = ev => {
            const interfaces = JSON.parse(ev.data)
            setInterfaces(interfaces)
        }
    }, [])

    const handleClick = (id) => {
        setOpen(!open);
        socket.send(JSON.stringify({
                key: "SELECT_INTERFACE",
                value: `${id}`
            })
        );
    };

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Network Interfaces
                </ListSubheader>
            }
            className={classes.root}
        >
            {
                interfaces.map(value => {
                    return (
                        <ListItem button onClick={handleClick.bind(null, value.id)}>
                            <ListItemIcon>
                                <SendIcon/>
                            </ListItemIcon>
                            <ListItemText primary={value.name}/>
                        </ListItem>
                    )
                })
            }
            {/*<ListItem button>*/}
            {/*    <ListItemIcon>*/}
            {/*        <SendIcon/>*/}
            {/*    </ListItemIcon>*/}
            {/*    <ListItemText primary="Sent mail"/>*/}
            {/*</ListItem>*/}
            {/*<ListItem button>*/}
            {/*    <ListItemIcon>*/}
            {/*        <DraftsIcon/>*/}
            {/*    </ListItemIcon>*/}
            {/*    <ListItemText primary="Drafts"/>*/}
            {/*</ListItem>*/}
            {/*<ListItem button onClick={handleClick}>*/}
            {/*    <ListItemIcon>*/}
            {/*        <InboxIcon/>*/}
            {/*    </ListItemIcon>*/}
            {/*    <ListItemText primary="Inbox"/>*/}
            {/*    /!*{open ? <ExpandLess /> : <ExpandMore />}*!/*/}
            {/*</ListItem>*/}
            {/*<Collapse in={open} timeout="auto" unmountOnExit>*/}
            {/*    <List component="div" disablePadding>*/}
            {/*        <ListItem button className={classes.nested}>*/}
            {/*            <ListItemIcon>*/}
            {/*                <StarBorder />*/}
            {/*            </ListItemIcon>*/}
            {/*            <ListItemText primary="Starred" />*/}
            {/*        </ListItem>*/}
            {/*    </List>*/}
            {/*</Collapse>*/}
        </List>
    );
}
