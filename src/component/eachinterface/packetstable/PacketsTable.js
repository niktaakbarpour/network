import React, {Component} from 'react';
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
import * as SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import "./PacketsTable.styles.css"

export default class PacketsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            packets: [],
            clickedItem: null,
            loading: true
        }
    }

    componentDidMount() {
        // const socket = new SockJS('/gs-guide-websocket');
        // const stompClient = Stomp.over(socket);
        // stompClient.allowCredentials = false
        // stompClient.connect({}, (frame) => {
        //     this.setState({loading: false})
        //     stompClient.subscribe('/network/packet', (message) => {
        //         const packet = JSON.parse(message.body)
        //         this.state.packets.push(packet)
        //         this.setState({packets: this.state.packets})
        //     });
        // });
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((items) => {
                this.setState({packets: items, loading: false})
            })
    }

    render() {
        const {filters} = this.props
        const {packets, clickedItem, loading} = this.state
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
                <TableContainer className={"tableContainer"} component={Paper}>
                    <Table className={"table"} aria-label="simple table">
                        <TableHead>
                            <TableRow className={"title"}>
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
                                    <TableRow key={packet.id} className={"select"}
                                              onClick={() => this.setState({clickedItem: packet})}
                                    >
                                        <TableCell align="center" component="th" scope="row">{packet.id}</TableCell>
                                        <TableCell align="center">{packet.date}</TableCell>
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
                <ModalLayer handleClose={() => this.setState({clickedItem: null})} packet={clickedItem}/>
            </div>
        );
    }
}