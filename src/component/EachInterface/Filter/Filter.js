import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

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
        backgroundColor: '#f1f8e9'
    },
    collapse: {
        backgroundColor: '#dcedc8'
    },
    layerContainer: {
        borderBottom: "3px solid #66bb6a",
        // maxWidth: "80%",
        // marginLeft: "20px",
    },
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
    layer: {
        display: "block",
        marginLeft: "20px"
    },
    formGroup: {
        justifyContent: "space-evenly"
    },
    protocol: {
        display: "block",
        marginLeft: "20px"
    },
    protocolContainer: {
        borderBottom: "3px solid #66bb6a",
        // maxWidth: "80%",
        // marginLeft: "20px",
    },
    ipAddressContainer: {
        borderBottom: "3px solid #66bb6a",
    },
    ipAddress: {
        display: "block",
        marginLeft: "20px"
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function Filter() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div className={classes.container}>
            <p className={classes.filterBy}>FILTER BY</p>
            <div className={classes.layerContainer}>
                <p className={classes.layer}>Layer:</p>
                <FormGroup className={classes.formGroup} row>
                    <FormControlLabel
                        control={
                            <GreenCheckbox
                                checked={state.checkedA}
                                onChange={handleChange}
                                name="checkedA"
                            />
                        }
                        label="Network"
                    />
                    <FormControlLabel
                        control={
                            <GreenCheckbox
                                checked={state.checkedB}
                                onChange={handleChange}
                                name="checkedB"
                            />
                        }
                        label="Application"
                    />
                </FormGroup>
            </div>
            <div className={classes.protocolContainer}>
                <p className={classes.protocol}>Protocol:</p>
                <List
                    className={classes.root}
                >
                    <ListItem className={classes.listItem} button onClick={handleClick}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Select Protocol" />
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
            </div>
            <div className={classes.ipAddressContainer}>
                <p className={classes.ipAddress}>IP Address:</p>
                <form className={classes.form} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Source IP" variant="outlined" />
                    <TextField id="outlined-basic" label="Destination IP" variant="outlined" />
                </form>
            </div>
        </div>
    );
}