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
import socket from "../../ServerConnector";

const useStyles = makeStyles((theme) => ({
        table: {
            minWidth: 650,
        },
        tableContainer: {
            margin: "auto",
            width: '90%',
        },
    })
);

export default function ProtocolsTable({filters}) {
    const classes = useStyles();

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        socket.onmessage = ev => {
            data.push(JSON.parse(ev.data))
            setData(data)
        }
        socket.onerror = ev => {
            console.log(ev)
        }
        // socket.send(JSON.stringify({
        //         key: "START_MONITORING",
        //         value: ""
        //     })
        // )
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
            <TableContainer className={classes.tableContainer} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">UserId</TableCell>
                            <TableCell align="right">Id</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Body</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDate.map((element) => (
                                <TableRow onClick={handleOpen} key={element.id}>
                                    <TableCell component="th" scope="row">{element.userId}</TableCell>
                                    <TableCell align="right">{element.id}</TableCell>
                                    <TableCell align="right">{element.title}</TableCell>
                                    <TableCell align="right">{element.body}</TableCell>
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
