import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,

    },
    tableContainer: {
        margin: "auto",
        width: '90%',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        padding: '0px 20px 20px 20px'
    },
    insideModal: {
        backgroundColor: '#f5f5f5',
        // border: '3px solid #33691e',
        borderRadius: '8px',
        boxShadow: theme.shadows[10],
    },
    exitIcon: {
        direction: "rtl",
        color: '#2e7d32',
        padding: '8px',
    }
}));

export default function ProtocolsTable() {
    const classes = useStyles();

    const [data, setData] = useState([]);
    const [searchField, setSearchField] = useState("");
    const [open, setOpen] = useState(false);

    const filteredData = data.filter(element =>
        element.title.toLowerCase().includes(searchField.toLowerCase())
    );

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {/*<input*/}
            {/*    type='search'*/}
            {/*    placeholder='search'*/}
            {/*    value={searchField}*/}
            {/*    onChange={e =>*/}
            {/*        setSearchField(e.target.value)*/}
            {/*    }*/}
            {/*/>*/}

            {/*<ul>*/}
            {/*    {searchResults.map(item => (*/}
            {/*        <li>{item.title}</li>*/}
            {/*    ))}*/}
            {/*</ul>*/}

            {/*{data.filter(element => element.id < 50).map(filteredelement => (*/}
            {/*    <li>*/}
            {/*        {filteredelement.id}*/}
            {/*    </li>*/}
            {/*))}*/}

            <TableContainer className={classes.tableContainer} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {/*<TableCell>Dessert (100g serving)</TableCell>*/}
                            <TableCell align="right">UserId</TableCell>
                            <TableCell align="right">Id</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Body</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((element) => (
                            <TableRow onClick={handleOpen} key={element.Id}>
                                <TableCell component="th" scope="row">{element.userId}</TableCell>
                                <TableCell align="right">{element.id}</TableCell>
                                <TableCell align="right">{element.title}</TableCell>
                                <TableCell align="right">{element.body}</TableCell>
                            </TableRow>
                        ))
                        }

                        <Modal
                            // aria-labelledby="transition-modal-title"
                            // aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={open}>
                                <div className={classes.insideModal}>
                                    <div className={classes.exitIcon}>
                                        <CloseIcon
                                            onClick={handleClose}
                                            style={{ fontSize: 30 }}
                                        />
                                    </div>
                                    <div className={classes.paper}>
                                        <h2 >Transition modal</h2>
                                        <p >react-transition-group animates me.</p>
                                    </div>
                                </div>
                            </Fade>
                        </Modal>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
