import React from "react";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import withStyles from "@material-ui/core/styles/withStyles";

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
            color: '#1b5e20',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#aed581',
                // border: "2px solid #4db6ac",
                // backgroundColor: 'white'
            },
            '&.Mui-focused fieldset': {
                borderColor: '#9ccc65',
                // border: "2px solid #4db6ac"
            }
        }
    }
})(TextField);

export default function PortNumber({currentValue, setParentState}) {
    const classes = useStyles();

    const handlePortChange = (ev) => {
        setParentState({
            key: ev.target.name,
            value: ev.target.value.trim()
        })
    }

    return (
        <div className={classes.portNumberContainer}>
            <p className={classes.portNumber}>Port Number:</p>
            <form className={classes.form} noValidate autoComplete="off">
                <CssTextField
                    onChange={handlePortChange}
                    name="sourcePort"
                    variant="outlined"
                    label="Source Port"
                    value={currentValue.sourcePort}
                    type='search'
                />
                <CssTextField
                    onChange={handlePortChange}
                    name="destinationPort"
                    variant="outlined"
                    label="Destination Port"
                    value={currentValue.destinationPort}
                    type='search'
                />
            </form>
        </div>
    )
}
