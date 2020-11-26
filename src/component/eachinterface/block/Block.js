import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import CustomizedButtonBlock from "./CustomizedButtonBlock";
import Box from '@material-ui/core/Box';
import StyledBlockedPacketsTable from "./BlockedPacketsTable";
import Layer from "../filter/Layer";
import Protocol from "../filter/Protocol";
import IpAddress from "../filter/IpAddress";
import PortNumber from "../filter/PortNumber";

const useStyles = makeStyles((theme) => ({
        container: {
            maxWidth: '80%',
            margin: "auto",
            overflow: "hidden",
        },
        blockBy: {
            padding: "8px",
        },
        nested: {
            paddingLeft: theme.spacing(4)
        },
        listItem: {
            borderLeft: "5px solid #4caf50",
            borderRight: "5px solid #4caf50",
            borderBottom: "3px solid #4caf50",
            borderRadius: '5px',
            backgroundColor: "#f1f8e9"
        },
        collapse: {
            backgroundColor: '#ffffff',
        },
        root: {
            width: '90%',
            margin: "auto"
        }
    })
);

export default function Block({setParentState}) {
    const classes = useStyles();

    const [openBlock, setOpenBlock] = React.useState(false);
    const [blocks, setBlocks] = React.useState({
        layer: "",
        protocol: "",
        ipVersion: 4,
        sourceIp: "",
        destinationIp: "",
        sourcePort: "",
        destinationPort: ""
    });

    const toggleBlocks = () => {
        setOpenBlock(!openBlock);
    };

    const handleBlocksChanged = (filter) => {
        setBlocks({
            ...blocks,
            [filter.key]: filter.value
        })
    }

    const handleBlocksApplied = () => {
        setParentState(blocks)
        toggleBlocks()
    }

    return (
        <div className={classes.container}>
            <List className={classes.root}>
                <Box boxShadow={3}>
                    <ListItem className={classes.listItem} button onClick={toggleBlocks}>
                        <ListItemText className={classes.blockBy} primary="Block By"/>
                        {openBlock ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                </Box>
                <Box boxShadow={2}>
                    <Collapse className={classes.collapse} in={openBlock} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem className={classes.nested}>
                                <Layer currentValue={blocks.layer} setParentState={handleBlocksChanged}/>
                            </ListItem>
                            <ListItem className={classes.nested}>
                                <Protocol currentValue={blocks.protocol} setParentState={handleBlocksChanged}/>
                            </ListItem>
                            <ListItem className={classes.nested}>
                                <IpAddress currentValue={{
                                    ipVersion: blocks.ipVersion,
                                    sourceIp: blocks.sourceIp,
                                    destinationIp: blocks.destinationIp
                                }} setParentState={handleBlocksChanged}/>
                            </ListItem>
                            <ListItem className={classes.nested}>
                                <PortNumber currentValue={{
                                    sourcePort: blocks.sourcePort,
                                    destinationPort: blocks.destinationPort
                                }} setParentState={handleBlocksChanged}/>
                            </ListItem>
                            <ListItem className={classes.nested}>
                                <CustomizedButtonBlock applyFilterHandler={handleBlocksApplied}/>
                            </ListItem>
                            <ListItem className={classes.nested}>
                                <StyledBlockedPacketsTable blocks={blocks}/>
                            </ListItem>
                        </List>
                    </Collapse>
                </Box>
            </List>

        </div>
    );
}
