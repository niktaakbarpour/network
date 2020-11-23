import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import axios from "axios";
import Spinner from "./spinner/Spinner";

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

export default function Interfaces(props) {
    const classes = useStyles();
    const [interfaces, setInterfaces] = React.useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/interface")
            .then(res => {
                setInterfaces(res.data)
                setLoading(false);
            })
    }, [])

    const handleClick = (name) => {
        setLoading(true);
        axios.post(
            "/interface",
            {name: name}
        ).then(res => {
            setLoading(false);
            if (res.status === 200) {
                props.history.push("/EachInterface");
            }
        })
    };

    return (
        <div>
            {loading ? <Spinner/> : null}
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
        </div>
    );
}
