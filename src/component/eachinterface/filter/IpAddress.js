import React from "react";
import {createMuiTheme, makeStyles, ThemeProvider, withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles((theme) => ({
        ipAddressContainer: {
            borderBottom: "3px solid #66bb6a",
            width: "inherit"
        },
        ipAddress: {
            display: "block",
            marginLeft: "20px",
            marginBottom: "unset"
        },
        form: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
                justifyContent: "space-evenly"
            },
            justifyContent: "space-evenly",
            display: "flex"
        },
        radioButtonContainer: {
            display: "grid",
            justifyContent: "end",
            marginRight: "60px"
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
                borderColor: '#aed581',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#9ccc65'
            }
        }
    }
})(TextField);

const theme = createMuiTheme({
    overrides: {
        MuiRadio: {
            colorSecondary: {
                '&.Mui-checked': {
                    color: 'green',
                },
            },
        },
    }
});

export default function IpAddress({currentValue, setParentState}) {

    const classes = useStyles();

    const handleIpChanged = (ev) => {
        setParentState({
            key: ev.target.name,
            value: ev.target.value
        })
    }

    const handleIpVersionChanged = (ev) => {
        setParentState({
            key: ev.target.name,
            value: +ev.target.value
        })
    }

    return (
        <div className={classes.ipAddressContainer}>
            <p className={classes.ipAddress}>IP Address:</p>
            <div className={classes.radioButtonContainer}>
                <FormLabel component="legend">IP Version</FormLabel>
                <RadioGroup aria-label="IpVersion" name="ipVersion" value={currentValue.ipVersion}
                            onChange={handleIpVersionChanged}>
                    <ThemeProvider theme={theme}>
                        <FormControlLabel value={4} control={<Radio/>} label="IPV4"/>
                        <FormControlLabel value={6} control={<Radio/>} label="IPV6"/>
                    </ThemeProvider>
                </RadioGroup>
            </div>
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
