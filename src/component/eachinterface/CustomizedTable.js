import Paper from '@material-ui/core/Paper';
import React from "react";
import clsx from "clsx";
import TableCell from "@material-ui/core/TableCell";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import {blue, green} from "@material-ui/core/colors";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Column from "react-virtualized/dist/commonjs/Table/Column";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import Table from "react-virtualized/dist/commonjs/Table"
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
        table: {
            '& .ReactVirtualized__Table__headerRow': {
                flip: false,
                paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined
            }
        },
        flexContainer: {
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
            border: 'none'
        },
        tableHeader: {
            backgroundColor: "#d7f2ba",
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5
        },
        tableRow: {
            cursor: 'pointer',
            borderBottom: '1px solid #eeeeee',
            '&:focus': {
                outline: 'none'
            },
            '&:hover': {
                backgroundColor: '#fafafa'
            },
            '&:active': {
                backgroundColor: '#eeeeee'
            }
        },
        tableCell: {
            flex: 1
        },
        paper: {
            width: '80%',
            height: 500,
            margin: 'auto',
            marginBottom: 50,
            marginTop: 20
        }
    })
)

export default function CustomizedTable({packets, onClick}) {
    const classes = useStyles()

    const getRowClassName = ({index}) => {
        if (index === -1) {
            return clsx(classes.flexContainer, classes.tableHeader)
        } else {
            return clsx(classes.flexContainer, classes.tableRow)
        }
    };

    const cellRenderer = ({cellData, columnIndex}) => {
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer)}
                variant="body"
                align="center"
            >
                <div style={{width: "100%", justifyContent: 'center'}}>
                    {(() => {
                        if (columnIndex === 0) {
                            if (cellData === 1) {
                                return <ArrowUpwardIcon style={{color: green[500]}}/>
                            } else if (cellData === -1) {
                                return <ArrowDownwardIcon style={{color: blue[500]}}/>
                            } else {
                                return null
                            }
                        } else {
                            return cellData
                        }
                    })()}
                </div>
            </TableCell>
        );
    };

    const headerRenderer = ({label}) => {
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer)}
                variant="head"
                align="center"
            >
                <div style={{width: "100%", justifyContent: 'center'}}><b>{label}</b></div>
            </TableCell>
        );
    };

    const getColumn = (label, dataKey, width, grow, shrink) => {
        return <Column label={label}
                       dataKey={dataKey}
                       width={width}
                       headerRenderer={headerRenderer}
                       cellRenderer={cellRenderer}
                       flexGrow={grow}
                       flexShrink={shrink}
                       className={classes.flexContainer}/>
    }

    return (
        <Paper className={classes.paper}>
            <AutoSizer>
                {({width, height}) => (
                    <Table
                        width={width}
                        height={height}
                        headerHeight={70}
                        rowHeight={50}
                        rowCount={packets.length}
                        rowGetter={({index}) => packets[index]}
                        onRowClick={({index}) => onClick(packets[index])}
                        className={classes.table}
                        rowClassName={getRowClassName}
                    >
                        {getColumn('In/Out', 'type', 50, 1, 2)}
                        {getColumn('No.', 'id', 50, 1, 2)}
                        {getColumn('Date', 'date', 120, 2, 2)}
                        {getColumn('Size (bytes)', 'size', 80, 2, 2)}
                        {getColumn('Protocol', 'protocol', 80, 2, 2)}
                        {getColumn('Source IP', 'srcIp', 100, 3, 2)}
                        {getColumn('Destination IP', 'dstIp', 100, 3, 2)}
                        {getColumn('Info', 'extraInfo', 300, 5, 2)}
                    </Table>
                )}
            </AutoSizer>
        </Paper>
    )
}