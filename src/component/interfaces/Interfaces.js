import React, {useEffect} from 'react';
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: '70%',
            margin: "auto",
            border: "5px solid #4caf50",
            borderRadius: "5px",
            backgroundColor: "#f1f8e9",
            marginTop: "5px"
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    })
);

const theme = createMuiTheme({
    overrides: {
        MuiListSubheader: {
            root: {
                paddingTop: "5px"
            }
        },
    }
});

export default function Interfaces(props) {
    const classes = useStyles();
    const [interfaces, setInterfaces] = React.useState([]);

    useEffect(() => {
        axios.get("/interface")
            .then(res => {
                setInterfaces(res.data)
            })
    }, [])

    const handleClick = (name) => {
        axios.post(
            "/interface",
            {name: name}
        ).then(res => {
            if (res.status === 200) {
                props.history.push("/EachInterface");
            }
        })
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
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
            </ThemeProvider>
        </div>
    );
}
