import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles((theme) => ({
        closeIcon: {
            direction: "rtl",
            color: '#2e7d32',
            padding: '8px'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            width: 'fit-content',
        },
        formControl: {
            marginTop: theme.spacing(2),
            minWidth: 120,
        },
        formControlLabel: {
            marginTop: theme.spacing(1),
        },
        container: {
            maxWidth: '100%',

        },
        Sender: {
            padding: "8px",
        },
        nested: {
            paddingLeft: theme.spacing(4),
            borderLeft: "5px solid #4caf50",
            borderTop: "5px solid #ffffff",
            borderBottom: "5px solid #ffffff",
            borderRadius: "5%",
        },
        nested2: {
            paddingLeft: theme.spacing(4),
            borderLeft: "5px solid #4caf50",
        },
        listItem: {
            // borderRadius: '5px',
            backgroundColor: "#c5e1a5"
        },
        collapse: {
            backgroundColor: '#fafafa',
        },

        root: {
            width: '85%',
            margin: "auto"
        },
        zero: {
            marginBottom: '20px'
        },
        box: {
            padding: '10px',
            flex: '20%',
            margin: '20px',
            borderRadius: "5px"
        },
        size: {
            backgroundColor: '#2b9348',
        },
        date: {
            backgroundColor: '#55a630',
        },
        protocol: {
            backgroundColor: '#73a942',
        },
        paragraph: {
            textAlign: "center"
        },
        boxContainer: {
            display: "flex",
            flexWrap: "wrap",
            textAlign: "left",
            maxWidth: "74%",
            margin: "auto"
        }
    })
);

export default function ModalLayer(props) {
    const classes = useStyles();

    const {handleClose, packet} = props;
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [openSender, setOpenSender] = React.useState(false);
    const [openReceiver, setOpenReceiver] = React.useState(false);
    const [openDescriptor, setOpenDescriptor] = React.useState(false);

    const toggleSender = () => {
        setOpenSender(!openSender);
    };

    const toggleReceiver = () => {
        setOpenReceiver(!openReceiver);
    };

    const toggleDescriptor = () => {
        setOpenDescriptor(!openDescriptor);
    };

    if (packet == null) {
        return null
    }

    return (
        <div>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={true}
                onClose={handleClose}
            >
                <div className={classes.closeIcon}>
                    <CloseIcon
                        onClick={handleClose}
                        style={{fontSize: 30}}
                    />
                </div>
                <div className={classes.zero}>
                    <div className={classes.boxContainer}>
                        <Box
                            boxShadow={3}
                            className={`${classes.box} ${classes.size}`}
                        >
                            Size
                            <p className={classes.paragraph}>{`${packet.size} bytes`}</p>
                        </Box>
                        <Box
                            boxShadow={3}
                            className={`${classes.box} ${classes.date}`}
                        >
                            Date
                            <p className={classes.paragraph}>{new Date(packet.date).toLocaleString()}</p>
                        </Box>
                        <Box
                            boxShadow={3}
                            className={`${classes.box} ${classes.protocol}`}
                        >
                            Protocol
                            <p className={classes.paragraph}>{packet.protocol}</p>
                        </Box>
                    </div>
                    <div className={classes.container}>
                        <List className={classes.root}>
                            <Box boxShadow={3}>
                                <ListItem className={classes.listItem} button onClick={toggleSender}>
                                    <ListItemText className={classes.Sender} primary="Sender"/>
                                    {openSender ? <ExpandLess/> : <ExpandMore/>}
                                </ListItem>
                            </Box>
                            <Box>
                                <Collapse className={classes.collapse} in={openSender} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItem className={classes.nested}>
                                            <p>Ip Address: {packet.srcIp} v{packet.ipVersion}</p>
                                        </ListItem>
                                        <ListItem className={classes.nested2}>
                                            <p>Mac Address: {packet.srcMac}</p>
                                        </ListItem>
                                        {
                                            packet.srcPort ?
                                                <ListItem className={classes.nested}>
                                                    <p>Port: {packet.srcPort.value} ({packet.srcPort.name})</p>
                                                </ListItem>
                                                : null
                                        }
                                    </List>
                                </Collapse>
                            </Box>
                        </List>
                    </div>
                    <div className={classes.container}>
                        <List className={classes.root}>
                            <Box boxShadow={3}>
                                <ListItem className={classes.listItem} button onClick={toggleReceiver}>
                                    <ListItemText className={classes.Sender} primary="Receiver"/>
                                    {openReceiver ? <ExpandLess/> : <ExpandMore/>}
                                </ListItem>
                            </Box>
                            <Box boxShadow={2}>
                                <Collapse className={classes.collapse} in={openReceiver} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItem className={classes.nested}>
                                            <p>Ip Address: {packet.destIp} v{packet.ipVersion}</p>
                                        </ListItem>
                                        <ListItem className={classes.nested2}>
                                            <p>Mac Address: {packet.destMac}</p>
                                        </ListItem>
                                        {
                                            packet.destPort ?
                                                <ListItem className={classes.nested}>
                                                    <p>Port: {packet.destPort.value} ({packet.destPort.name})</p>
                                                </ListItem>
                                                : null
                                        }
                                    </List>
                                </Collapse>
                            </Box>
                        </List>
                    </div>
                    <div className={classes.container}>
                        <List className={classes.root}>
                            <Box boxShadow={3}>
                                <ListItem className={classes.listItem} button onClick={toggleDescriptor}>
                                    <ListItemText className={classes.Sender} primary="Descriptor"/>
                                    {openDescriptor ? <ExpandLess/> : <ExpandMore/>}
                                </ListItem>
                            </Box>
                            <Box boxShadow={2}>
                                <Collapse className={classes.collapse} in={openDescriptor} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItem className={classes.nested}>
                                            <p>{packet.descriptor}</p>
                                        </ListItem>
                                        {
                                            packet.extraInfo ?
                                                <ListItem className={classes.nested2}>
                                                    <p>More: {packet.extraInfo}</p>
                                                </ListItem>
                                                : null
                                        }
                                    </List>
                                </Collapse>
                            </Box>
                        </List>
                    </div>
                </div>
                {/*<DialogContent>*/}
                {/*    <DialogContentText>*/}
                {/*        You can set my maximum width and whether to adapt or not.*/}
                {/*    </DialogContentText>*/}
                {/*    <form className={classes.form} noValidate>*/}
                {/*<FormControl className={classes.formControl}>*/}
                {/*    <InputLabel htmlFor="max-width">maxWidth</InputLabel>*/}
                {/*    <Select*/}
                {/*        autoFocus*/}
                {/*        value={maxWidth}*/}
                {/*        onChange={handleMaxWidthChange}*/}
                {/*        inputProps={{*/}
                {/*            name: 'max-width',*/}
                {/*            id: 'max-width',*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <MenuItem value={false}>false</MenuItem>*/}
                {/*        <MenuItem value="xs">xs</MenuItem>*/}
                {/*        <MenuItem value="sm">sm</MenuItem>*/}
                {/*        <MenuItem value="md">md</MenuItem>*/}
                {/*        <MenuItem value="lg">lg</MenuItem>*/}
                {/*        <MenuItem value="xl">xl</MenuItem>*/}
                {/*    </Select>*/}
                {/*</FormControl>*/}
                {/*<FormControlLabel*/}
                {/*    className={classes.formControlLabel}*/}
                {/*    control={<Switch checked={fullWidth} onChange={handleFullWidthChange} />}*/}
                {/*    label="Full width"*/}
                {/*/>*/}
                {/*    </form>*/}
                {/*</DialogContent>*/}
            </Dialog>
        </div>
    );
}
