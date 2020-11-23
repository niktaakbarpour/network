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
// import * as SockJS from 'sockjs-client'
// import Stomp from 'stompjs'

const useStyles = makeStyles((theme) => ({
        table: {
            minWidth: 650
        },
        tableContainer: {
            margin: "auto",
            width: '90%',
            marginBottom:"100px"
        },
        select: {
            '&:hover': {
                backgroundColor: '#fafafa',
                cursor: 'pointer'
            },
            '&:active': {
                backgroundColor: '#eeeeee'
            },
        },
        title: {
            backgroundColor: '#d7f2ba'
        }
    })
);

export default function PacketsTable({filters}) {
    const classes = useStyles();
    const [packets, setPackets] = useState([]);
    const [clickedItem, setClickedItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // setLoading(true);
        // const socket = new SockJS('http://25.105.127.25:8080/gs-guide-websocket');
        // const stompClient = Stomp.over(socket);
        // stompClient.allowCredentials = false
        // stompClient.connect({}, function (frame) {
        //     setLoading(false);
        //     console.log('Connected: ' + frame);
        //     stompClient.subscribe('ws://25.105.127.25:8080/network/packet', function (message) {
        //         packets.push(JSON.parse(message.body))
        //         setPackets(packets)
        //     });
        // });

        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((items) => {
                setPackets(items);
                setLoading(false);
            })
    }, []);

    const handleOpenModal = (packet) => {
        setClickedItem(packet);
    };

    const handleCloseModal = () => {
        setClickedItem(null);
    };

    const filteredPackets = packets.filter(packet => {
        // Layer Filter
        if (filters.layer === "Application") {
            if (packet.srcPort == null && packet.dstPort == null) {
                return false
            }
        } else if (filters.layer === "Network") {
            if (packet.srcPort != null && packet.dstPort != null) {
                return false
            }
        }

        // Protocol
        if (filters.protocol !== "All" && filters.protocol !== packet.protocol) {
            return false
        }

        // Ip Address
        if (filters.sourceIp && (filters.ipVersion !== packet.ipVersion || filters.sourceIp !== packet.srcIp)) {
            return false
        }
        if (filters.destinationIp && (filters.ipVersion !== packet.ipVersion || filters.destinationIp !== packet.dstIp)) {
            return false
        }

        // Port Number
        if (filters.sourcePort && (packet.srcPort == null || filters.sourcePort !== packet.srcPort.value.toString())) {
            return false
        }
        if (filters.destinationPort && (packet.dstPort == null || filters.destinationPort !== packet.dstPort.value.toString())) {
            return false
        }
        return true
    })

    return (
        <div>
            {loading ? <Spinner/> : null}
            <InformationBox packets={filteredPackets}/>
            <TableContainer className={classes.tableContainer} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow className={classes.title}>
                            <TableCell align="center">#</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Size (bytes)</TableCell>
                            <TableCell align="center">Protocol</TableCell>
                            <TableCell align="center">Source Ip</TableCell>
                            <TableCell align="center">Destination Ip</TableCell>
                            <TableCell align="center">Info</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPackets.map((packet) => (
                                <TableRow className={classes.select} onClick={handleOpenModal.bind(null, packet)}
                                          key={packet.id}>
                                    <TableCell align="center" component="th" scope="row">{packet.id}</TableCell>
                                    <TableCell align="center">{new Date(packet.date).toLocaleString()}</TableCell>
                                    <TableCell align="center">{packet.size}</TableCell>
                                    <TableCell align="center">{packet.protocol}</TableCell>
                                    <TableCell align="center">{packet.srcIp}</TableCell>
                                    <TableCell align="center">{packet.dstIp}</TableCell>
                                    <TableCell align="left">{packet.extraInfo}</TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <ModalLayer handleClose={handleCloseModal} packet={clickedItem}/>
        </div>
    );
}
