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
import "./PacketsTable.styles.css";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { green, blue } from '@material-ui/core/colors';

export default class PacketsTable extends Component {
    static BUFFER_MAX_SIZE = 100
    static TIMEOUT = 1000

    constructor(props) {
        super(props);
        this.state = {
            packets: [],
            clickedItem: null,
            loading: true,
            lastIndex: -1
        }
        this.buffer = []
    }

    componentDidMount() {
        this.socket = new SockJS('/gs-guide-websocket');
        const stompClient = Stomp.over(this.socket);
        stompClient.allowCredentials = false
        stompClient.connect({}, (frame) => {
            setInterval(() => {
                this.pushPackets()
            }, PacketsTable.TIMEOUT)
            this.setState({loading: false})
            stompClient.subscribe('/network/packet', (message) => {
                const packet = JSON.parse(message.body)
                this.buffer.push(packet)
                if (this.buffer.length % PacketsTable.BUFFER_MAX_SIZE === 0) {
                    this.pushPackets()
                }
            });
        });
    }

    componentWillUnmount() {
        this.socket.close(1000, "STOP_ANALYZING")
    }

    pushPackets() {
        const {lastIndex} = this.state
        if (lastIndex < this.buffer.length - 1) {
            this.state.packets.push(...this.buffer.slice(lastIndex + 1, this.buffer.length))
            this.setState({
                packets: this.state.packets,
                lastIndex: this.buffer.length - 1
            })
        }
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
                                <TableCell align="center">IN/OUT</TableCell>
                                <TableCell align="center">#</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Size (bytes)</TableCell>
                                <TableCell align="center">Protocol</TableCell>
                                <TableCell align="center">Source IP</TableCell>
                                <TableCell align="center">Destination IP</TableCell>
                                <TableCell align="center">Info</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredPackets.map((packet) => (
                                    <TableRow key={packet.id} className={"select"}
                                              onClick={() => this.setState({clickedItem: packet})}
                                    >
                                        <TableCell align="center" component="th" scope="row">
                                            {(() => {
                                                if (packet.type===1) {
                                                    return (
                                                        <ArrowUpwardIcon style={{ color: green[500] }} />
                                                    )
                                                } else if (packet.type===-1) {
                                                    return (
                                                        <ArrowDownwardIcon style={{ color: blue[500] }} />
                                                    )
                                                } else {
                                                    return (
                                                        null
                                                    )
                                                }
                                            })()}
                                        </TableCell>
                                        <TableCell align="center" component="th" scope="row">{packet.id}</TableCell>
                                        <TableCell align="center">{packet.date}</TableCell>
                                        <TableCell align="center">{packet.size}</TableCell>
                                        <TableCell align="center">{packet.protocol}</TableCell>
                                        <TableCell align="center">{packet.srcIp}</TableCell>
                                        <TableCell align="center">{packet.dstIp}</TableCell>
                                        <TableCell align="center">{packet.extraInfo}</TableCell>
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