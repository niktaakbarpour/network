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
    const [searchField, setSearchField] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // const filteredData = data.filter(element =>
    // element.title.toLowerCase().includes(searchField.toLowerCase()));

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
    }, []);

    useEffect(() => {
        const results = data.filter(element =>
            element.title.toLowerCase().includes(searchField)
        );
        setSearchResults(results);
    }, [searchField]);

    return (
        <div>
        <input
            type='search'
            placeholder='search'
            value={searchField}
            onChange={e =>
                setSearchField(e.target.value)
            }
            />

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
                    {searchResults.map((element) => (
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
        </div>
    );
}
