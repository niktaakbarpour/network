import React from 'react';
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
import CustomizedButton from "./CustomizedButton";
import Box from '@material-ui/core/Box';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
        container: {
            maxWidth: '80%',
            margin: "auto",
            overflow: "hidden",
        },
        filterBy: {
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
            // backgroundColor: '#f1f8e9'
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

export default function Filters({setParentState}) {
    const classes = useStyles();
    const [openFilter, setOpenFilter] = React.useState(false);
    const [filters, setFilters] = React.useState({
        layer: "All",
        protocol: "All",
        ipVersion: 4,
        sourceIp: "",
        destinationIp: "",
        sourcePort: "",
        destinationPort: ""
    });

    const toggleFilters = () => {
        setOpenFilter(!openFilter);
    };

    const handleFiltersChanged = (filter) => {
        setFilters({
            ...filters,
            [filter.key]: filter.value
        })
    }

    const handleFiltersApplied = () => {
        setParentState(filters)
        toggleFilters()
    }

    return (
        <div className={classes.container}>
            <List className={classes.root}>
                <Box boxShadow={3}>
                    <ListItem className={classes.listItem} button onClick={toggleFilters}>
                        <ListItemText className={classes.filterBy} primary="Filter By"/>
                        {openFilter ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                </Box>
                <Box boxShadow={2}>
                    <Collapse className={classes.collapse} in={openFilter} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem className={classes.nested}>
                                <Layer currentValue={filters.layer} setParentState={handleFiltersChanged}/>
                            </ListItem>
                            <ListItem className={classes.nested}>
                                <Protocol currentValue={filters.protocol} setParentState={handleFiltersChanged}/>
                            </ListItem>
                            <ListItem className={classes.nested}>
                                <IpAddress currentValue={{
                                    ipVersion: filters.ipVersion,
                                    sourceIp: filters.sourceIp,
                                    destinationIp: filters.destinationIp
                                }} setParentState={handleFiltersChanged}/>
                            </ListItem>
                            <ListItem className={classes.nested}>
                                <PortNumber currentValue={{
                                    sourcePort: filters.sourcePort,
                                    destinationPort: filters.destinationPort
                                }} setParentState={handleFiltersChanged}/>
                            </ListItem>
                            <ListItem className={classes.nested}>
                                <CustomizedButton applyFilterHandler={handleFiltersApplied}/>
                            </ListItem>
                        </List>
                    </Collapse>
                </Box>
            </List>
        </div>
    );
}
