import React from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
        ipAddressContainer: {
            borderBottom: "3px solid #66bb6a",
            width: "inherit"
        },
        ipAddress: {
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

export default function IpAddress({currentValue, setParentState}) {
    const classes = useStyles();

    const handleIpChanged = (ev) => {
        setParentState({
            key: ev.target.name,
            value: ev.target.value
        })
    }

    return (
        <div className={classes.ipAddressContainer}>
            <p className={classes.ipAddress}>IP Address:</p>
            <form className={classes.form} noValidate autoComplete="off">
                <CssTextField
                    onChange={handleIpChanged}
                    name="sourceIp"
                    variant="outlined"
                    label="Source IP"
                    value={currentValue.sourceIp}
                    type='search'
                />
                <CssTextField
                    onChange={handleIpChanged}
                    name="destinationIp"
                    variant="outlined"
                    label="Destination IP"
                    value={currentValue.destinationIp}
                    type='search'
                />
            </form>
        </div>
    )
}
