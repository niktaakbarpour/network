import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,

    },
    tableContainer: {
        margin: "auto",
        width: '90%',

    }
});

export default function BasicTable() {
    const classes = useStyles();

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
    }, []);

    return (

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
                    {data.map((element) => (
                        <TableRow key={element.Id}>
                            <TableCell component="th" scope="row">
                                {element.userId}
                            </TableCell>
                            <TableCell align="right">{element.id}</TableCell>
                            <TableCell align="right">{element.title}</TableCell>
                            <TableCell align="right">{element.body}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
