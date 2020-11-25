import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import StarBorder from "@material-ui/icons/StarBorder";
import ReceiptIcon from '@material-ui/icons/Receipt';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
        protocol: {
            display: "block",
            marginLeft: "20px"
        },
        protocolContainer: {
            borderBottom: "3px solid #66bb6a",
            width: "inherit"
        },
        nested: {
            paddingLeft: theme.spacing(4)
        },
        listItem: {
            backgroundColor: '#f1f8e9'
        },
        collapse: {
            backgroundColor: '#fafafa'
        },
        root: {
            width: '90%',
            backgroundColor: '#ffffff',
            // backgroundColor: theme.palette.background.paper,
            margin: "auto"
        }
    })
);

export default function Protocol({currentValue, setParentState}) {
    const classes = useStyles();
    const [openProtocol, setOpenProtocol] = React.useState(false);

    const toggleProtocols = () => {
        setOpenProtocol(!openProtocol);
    };

    const handleClickProtocol = (ev) => {
        setParentState({
            key: "protocol",
            value: ev.target.textContent
        })
        toggleProtocols()
    }

    return (
        <div className={classes.protocolContainer}>
            <p className={classes.protocol}>Protocol:</p>
            <List className={classes.root}>
                <ListItem className={classes.listItem} onClick={toggleProtocols} button>
                    <ListItemIcon>
                        <ReceiptIcon/>
                    </ListItemIcon>
                    <ListItemText primary={currentValue}/>
                    {openProtocol ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse className={classes.collapse} in={openProtocol} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            protocols.map(value => (
                                <ListItem className={classes.nested} key={value} onClick={handleClickProtocol} button>
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

const protocols = [
    "All",
    "TCP",
    "UDP",
    "ICMPv4",
    "IGMP",
    "ARP"
]
