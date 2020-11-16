import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layer from "./Layer";
import Protocol from "./Protocol";
import IpAddress from "./IpAddress";
import PortNumber from "./PortNumber";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles((theme) => ({

    container: {
        maxWidth: '80%',
        margin: "auto"
    },
    filterBy: {
        borderTop: "3px solid #c5e1a5",
        borderBottom: "3px solid #c5e1a5",
        padding: "8px",
        backgroundColor: "#f1f8e9"
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    listItem: {
        // backgroundColor: '#f1f8e9'
    },
    collapse: {
        // backgroundColor: '#f1f8e9',
        // borderLeft: "3px solid #c5e1a5",
        // borderRight: "3px solid #c5e1a5"
    },
    root: {
        width: '90%',
        // backgroundColor: theme.palette.background.paper,
        margin: "auto"
    },
}));

export default function Filter() {
    const classes = useStyles();

    const [openFilter, setOpenFilter] = React.useState(false);

    const handleClickFilter = () => {
        setOpenFilter(!openFilter);
    };


    return (
        <div className={classes.container} >
            <List
                className={classes.root}
            >
                <ListItem className={classes.listItem} button onClick={handleClickFilter}>
                    <ListItemText className={classes.filterBy} primary="Filter By" />
                    {openFilter ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse className={classes.collapse} in={openFilter} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem className={classes.nested}>
                            <Layer />
                        </ListItem>
                        <ListItem className={classes.nested}>
                            <Protocol />
                        </ListItem>
                        <ListItem className={classes.nested}>
                            <IpAddress />
                        </ListItem>
                        <ListItem className={classes.nested}>
                            <PortNumber />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </div>
    );
}