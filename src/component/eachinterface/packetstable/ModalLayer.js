import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import Grid from '@material-ui/core/Grid';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles((theme) => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: "wrap",
        },
        paper: {
            padding: '0px 20px 20px 20px'
        },
        insideModal: {
            backgroundColor: '#f5f5f5',
            // border: '3px solid #33691e',
            borderRadius: '8px',
            boxShadow: theme.shadows[10]
        },
        exitIcon: {
            direction: "rtl",
            color: '#2e7d32',
            padding: '8px'
        },
    container: {
        maxWidth: '80%',
        margin: "auto"
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

export default function ModalLayer(props) {
    const classes = useStyles();

    const {open, handleClose} = props;
    const [openSender, setOpenSender] = React.useState(false);

    const toggleSender = () => {
        setOpenSender(!openSender);
    };

    return (
        <Modal
            // aria-labelledby="transition-modal-title"
            // aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Fade in={open}>
                <div className={classes.insideModal}>
                    <div className={classes.exitIcon}>
                        <CloseIcon
                            onClick={handleClose}
                            style={{fontSize: 30}}
                        />
                    </div>
                    <div className={classes.paper}>
                        <Grid container>
                            <Grid item xs={4}>
                        <p>Size: size</p>
                            </Grid>
                            <Grid item xs={4}>
                        <p>Date: date</p>
                        </Grid>
                            <Grid item xs={4}>
                        <p>Protocol: protocol</p>
                    </Grid>
                        </Grid>
                    </div>
                </div>
                {/*<div className={classes.container}>*/}
                {/*    <List className={classes.root}>*/}
                {/*        <Box boxShadow={3}>*/}
                {/*            <ListItem className={classes.listItem} button onClick={toggleSender}>*/}
                {/*                <ListItemText className={classes.filterBy} primary="Sender"/>*/}
                {/*                {openSender ? <ExpandLess/> : <ExpandMore/>}*/}
                {/*            </ListItem>*/}
                {/*        </Box>*/}
                {/*        <Box boxShadow={2}>*/}
                {/*            <Collapse className={classes.collapse} in={openSender} timeout="auto" unmountOnExit>*/}
                {/*                <List component="div" disablePadding>*/}
                {/*                    <ListItem className={classes.nested}>*/}
                {/*                        <p>IP</p>*/}
                {/*                    </ListItem>*/}
                {/*                    <ListItem className={classes.nested}>*/}
                {/*                        <p>MAC</p>*/}
                {/*                    </ListItem>*/}
                {/*                    <ListItem className={classes.nested}>*/}
                {/*                        <p>port</p>*/}
                {/*                    </ListItem>*/}
                {/*                </List>*/}
                {/*            </Collapse>*/}
                {/*        </Box>*/}
                {/*    </List>*/}
                {/*</div>*/}
            </Fade>
        </Modal>
    );
}
