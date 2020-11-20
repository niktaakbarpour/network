import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import StarBorder from "@material-ui/icons/StarBorder";

const useStyles = makeStyles((theme) => ({
        layerContainer: {
            borderBottom: "3px solid #66bb6a",
            width: "inherit",
        },
        layer: {
            display: "block",
            marginLeft: "20px"
        },
        formGroup: {
            justifyContent: "space-evenly",
            marginRight: "15px"
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
        listItem: {
            backgroundColor: '#f1f8e9'
        },
        collapse: {
            backgroundColor: '#dcedc8'
        },
        root: {
            width: '90%',
            backgroundColor: theme.palette.background.paper,
            margin: "auto"
        },
    })
);

export default function Layer({setParentState}) {
    const classes = useStyles();

    const [openLayer, setOpenLayer] = React.useState(false);

    const toggleLayers = () => {
        setOpenLayer(!openLayer);
    };

    const handleClickLayer = (ev) => {
        setParentState({
            key: "layer",
            value: ev.target.textContent
        })
        toggleLayers()
    }

    return (
        <div className={classes.layerContainer}>
            <p className={classes.layer}>Layer:</p>
            <List className={classes.root}>
                <ListItem className={classes.listItem} onClick={toggleLayers} button>
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Select Layer"/>
                    {openLayer ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse className={classes.collapse} in={openLayer} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            layers.map(value => (
                                <ListItem className={classes.nested} key={value} onClick={handleClickLayer} button>
                                    <ListItemIcon>
                                        <StarBorder/>
                                    </ListItemIcon>
                                    <ListItemText primary={value}/>
                                </ListItem>
                            ))
                        }
                    </List>
                </Collapse>
            </List>
        </div>
    )
}

const layers = [
    "All",
    "Application",
    "Network"
]
