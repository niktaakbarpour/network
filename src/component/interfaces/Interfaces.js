import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import axios from "axios";
// import Spinner from "./spinner/Spinner";

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
    const [interfaces, setInterfaces] = React.useState([]);
    // const [loading, setloading] = useState(false);

    useEffect(() => {
        // setloading(true);
        axios.get("http://25.105.127.25:8080/interface")
            .then(res => {
                setInterfaces(res.data)
                // setloading(false);
            })
    }, [])

    const handleClick = (name) => {
        // setloading(true);
        axios.post(
            "http://25.105.127.25:8080/interface",
            {name: name}
        ).then(res => {
            // setloading(false);
            if (res.status === 200) {
                window.location.replace(window.location.href + "EachInterface")
            }
        })
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
                        <ListItem key={value.id} button onClick={handleClick.bind(null, value.name)}>
                            <ListItemIcon>
                                <SendIcon/>
                            </ListItemIcon>
                            <ListItemText primary={value.name}/>
                        </ListItem>
                    )
                })
            }
        </List>
    );
}
