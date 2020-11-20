import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ModalLayer from "./ModalLayer";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
        table: {
            minWidth: 650
        },
        tableContainer: {
            margin: "auto",
            width: '90%'
        },
        flexContainer: {
            display: "flex",
            flexWrap: "wrap",
            textAlign: "left",
            boxSizing: "borderBox",
            maxWidth: "90%",
            margin: "auto"
        },

        count: {
            backgroundColor: '#2ed573',
            padding: '10px',
            flex: '20%',
            margin: '20px',
            borderRadius: "5px"
        },

        maximumSize: {
            backgroundColor: '#42a5f5',
            padding: '10px',
            flex: '20%',
            margin: '20px',
            borderRadius: "5px"
        },
        averageSize: {
            backgroundColor: '#629749',
            padding: '10px',
            flex: '20%',
            margin: '20px',
            borderRadius: "5px"
        },
        blablabla: {
            backgroundColor: '#18dcff',
            padding: '10px',
            flex: '20%',
            margin: '20px',
            borderRadius: "5px"
        },
        paragraph: {
            textAlign: "center"
        }
    })
);

export default function PacketsTable({filters}) {
    const classes = useStyles();

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // const socket = new WebSocket("")
        // socket.onopen = ev => {
        //
        // }
        // socket.onmessage = ev => {
        //     data.push(JSON.parse(ev.data))
        //     setData(data)
        // }
        // socket.onerror = ev => {
        //     console.log(ev)
        // }
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((items) => {
                setData(items);
            })
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const filteredDate = data.filter(value => {
        return true
    })

    return (
        <div>
            <div className={classes.flexContainer}>
                <Box
                    boxShadow={3}
                    className={classes.count}
                >
                    Count
                    <p className={classes.paragraph}>alwicfalcikmas</p>
                </Box>
                <Box
                    boxShadow={3}
                    className={classes.maximumSize}
                >
                    Maximum Size
                    <p className={classes.paragraph}>alwicfalcikmas</p>
                </Box>
                <Box
                    boxShadow={3}
                    className={classes.averageSize}
                >
                    Average Size
                    <p className={classes.paragraph}>alwicfalcikmas</p>
                </Box>
                <Box
                    boxShadow={3}
                    className={classes.blablabla}
                >
                    bla bla bla
                    <p className={classes.paragraph}>alwicfalcikmas</p>
                </Box>
            </div>
            <TableContainer className={classes.tableContainer} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Size</TableCell>
                            <TableCell align="right">Protocol</TableCell>
                            <TableCell align="right">Source Ip</TableCell>
                            <TableCell align="right">Destination Ip</TableCell>
                            <TableCell align="right">More</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDate.map((packet) => (
                                <TableRow onClick={handleOpen} key={packet.id}>
                                    <TableCell component="th" scope="row">{packet.userId}</TableCell>
                                    <TableCell align="right">{packet.id}</TableCell>
                                    <TableCell align="right">{packet.title}</TableCell>
                                    <TableCell align="right">{packet.body}</TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            )
                        )}
                        <ModalLayer handleOpen={handleOpen} handleClose={handleClose} open={open}/>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
