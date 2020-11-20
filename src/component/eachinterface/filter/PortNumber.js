import React from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
        portNumberContainer: {
            borderBottom: "3px solid #66bb6a",
            width: "inherit"
        },
        portNumber: {
            display: "block",
            marginLeft: "20px"
        },
        form: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
                justifyContent: "space-evenly"
            },
            justifyContent: "space-evenly",
            display: "flex"
        }
    })
);

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#1b5e20'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#aed581'
            },
            '&.Mui-focused fieldset': {
                borderColor: '#9ccc65'
            }
        }
    }
})(TextField);

export default function PortNumber({currentValue, setParentState}) {
    const classes = useStyles();

    const handlePortChange = (ev) => {
        setParentState({
            key: ev.target.name,
            value: extractPortNumber(ev.target.value)
        })
    }

    const handlePortSelected = (ev) => {
        //TODO
        // setParentState({
        //     key: ev.target.name,
        //     value: extractPortNumber(ev.target.value)
        // })
        console.log(ev)
    }

    const extractPortNumber = (text) => {
        //TODO: Implement regex in order to extract port number
        return text
    }

    return (
        <div className={classes.portNumberContainer}>
            <p className={classes.portNumber}>Port Number:</p>
            <form className={classes.form} noValidate autoComplete="off">
                <Autocomplete
                    freeSolo
                    disableClearable
                    options={ports}
                    onChange={handlePortSelected}
                    value={currentValue.sourcePort}
                    renderInput={(params) => (
                        <CssTextField
                            onChange={handlePortChange}
                            {...params}
                            label="Source Port"
                            name="sourcePort"
                            margin="normal"
                            variant="outlined"
                            InputProps={{...params.InputProps, type: 'search'}}
                        />
                    )}
                />
                <Autocomplete
                    freeSolo
                    disableClearable
                    options={ports}
                    onChange={handlePortSelected}
                    value={currentValue.destinationPort}
                    renderInput={(params) => (
                        <CssTextField
                            onChange={handlePortChange}
                            {...params}
                            label="Destination Port"
                            name="destinationPort"
                            margin="normal"
                            variant="outlined"
                            InputProps={{...params.InputProps, type: 'search'}}
                        />
                    )}
                />
            </form>
        </div>
    )
}

const ports = [
    'The Shawshank Redemption',
    'The Godfather',
    'The Godfather: Part II',
    'The Dark Knight',
    '12 Angry Men',
    "Schindler's List",
    'Pulp Fiction'
];