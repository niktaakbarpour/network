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
import InformationBox from "./InformationBox";
import Spinner from "../../interfaces/spinner/Spinner";

const useStyles = makeStyles((theme) => ({
        table: {
            minWidth: 650
        },
        tableContainer: {
            margin: "auto",
            width: '90%'
        },

    })
);

export default function PacketsTable({filters}) {
    const classes = useStyles();
    const [packets, setPackets] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // const socket = new WebSocket("")
        // socket.onopen = ev => {
        //
        // }
        // socket.onmessage = ev => {
        //     packets.push(JSON.parse(ev.data))
        //     setData(packets)
        // }
        // socket.onerror = ev => {
        //     console.log(ev)
        // }
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((items) => {
                setPackets(items);
                setLoading(false);
            })
    }, []);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const filteredPackets = packets.filter(packet => {
        //TODO
        return true
    })

    return (
        <div>
            {loading ? <Spinner/> :
                <div>
                    <InformationBox packets={filteredPackets}/>
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
                                {filteredPackets.map((packet) => (
                                        <TableRow onClick={handleOpenModal} key={packet.id}>
                                            <TableCell component="th" scope="row">{packet.userId}</TableCell>
                                            <TableCell align="right">{packet.id}</TableCell>
                                            <TableCell align="right">{packet.title}</TableCell>
                                            <TableCell align="right">{packet.body}</TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    )
                                )}
                                <ModalLayer handleClose={handleCloseModal} open={openModal}/>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            }
        </div>
    );
}
