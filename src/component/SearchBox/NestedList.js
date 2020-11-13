import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '90%',
        backgroundColor: theme.palette.background.paper,
        margin: "auto"
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    listItem: {
        backgroundColor: '#eeeeee'
    },
    collapse: {
        backgroundColor: '#f5f5f5'
    }
}));

export default function NestedList() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <List
            // component="nav"
            // aria-labelledby="nested-list-subheader"
            // subheader={
            //     <ListSubheader component="div" id="nested-list-subheader">
            //         Filter
            //     </ListSubheader>
            // }
            className={classes.root}
        >
            <ListItem className={classes.listItem} button onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Filter" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse className={classes.collapse} in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
}