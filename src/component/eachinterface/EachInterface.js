import React from 'react';
import Filters from "./filter/Filters";
import * as SockJS from "sockjs-client";
import Stomp from "stompjs";
import Spinner from "./spinner/Spinner";
import InformationBox from "./InformationBox";
import CustomizedTable from "./CustomizedTable";
import ModalLayer from "./ModalLayer";

export default class Page extends React.Component {
    static BUFFER_MAX_SIZE = 100
    static TIMEOUT = 1000

    constructor(props) {
        super(props)
        this.state = {
            packets: [],
            clickedItem: null,
            loading: true,
            lastIndex: -1,
            filters: {
                layer: "All",
                protocol: "All",
                ipVersion: 4,
                sourceIp: "",
                destinationIp: "",
                sourcePort: "",
                destinationPort: ""
            }
        }
        this.buffer = []
    }

    componentDidMount() {
        this.socket = new SockJS('/gs-guide-websocket');
        const stompClient = Stomp.over(this.socket);
        stompClient.allowCredentials = false
        stompClient.connect({}, () => {
            setInterval(() => {
                this.pushPackets()
            }, Page.TIMEOUT)
            this.setState({loading: false})
            stompClient.subscribe('/network/packet', (message) => {
                const packet = JSON.parse(message.body)
                this.buffer.push(packet)
                if (this.buffer.length % Page.BUFFER_MAX_SIZE === 0) {
                    this.pushPackets()
                }
            });
        });
    }

    componentWillUnmount() {
        this.socket.close(1000, "STOP_ANALYZING")
    }

    handleFiltersChanged = (filter) => {
        this.setState({filters: filter})
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
        const {filters, packets, clickedItem, loading} = this.state
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
                <Filters setParentState={this.handleFiltersChanged}/>
                <CustomizedTable packets={filteredPackets} onClick={(packet) => this.setState({clickedItem: packet})}/>
                <ModalLayer handleClose={() => this.setState({clickedItem: null})} packet={clickedItem}/>
            </div>
        );
    }
}

