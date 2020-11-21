import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import axios from "axios";

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

    useEffect(() => {
        axios.get("http://25.105.127.25:8080/interface")
            .then(res => {
                setInterfaces(res.data)
            })
    }, [])

    const handleClick = (name) => {
        axios.post(
            "http://25.105.127.25:8080/interface",
            {name: name}
        ).then(res => {
            if (res.status === 200) {
                //TODO: Navigate to EachInterface
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
