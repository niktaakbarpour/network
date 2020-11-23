import React from "react";
import {createMuiTheme, makeStyles, ThemeProvider, withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles((theme) => ({
        ipAddressContainer: {
            borderBottom: "3px solid #66bb6a",
            width: "inherit"
        },
        ipAddress: {
            display: "flex",
            marginLeft: "20px",
            marginBottom: "20px"
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
            marginLeft: "30px"
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

const theme = createMuiTheme({
    overrides: {
        MuiRadio: {
            colorSecondary: {
                '&.Mui-checked': {
                    color: 'green'
                }
            }
        },
        MuiFormGroup: {
            root: {
                flexDirection: "row"
            }
        }
    }
});

export default function IpAddress({currentValue, setParentState}) {

    const classes = useStyles();

    const handleIpChanged = (ev) => {
        setParentState({
            key: ev.target.name,
            value: ev.target.value.trim()
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
            <div className={classes.ipAddress}>
                <p>IP Address:</p>
                <div className={classes.radioButtonContainer}>
                    <ThemeProvider theme={theme}>
                        <RadioGroup aria-label="IpVersion" name="ipVersion" value={currentValue.ipVersion}
                                    onChange={handleIpVersionChanged}>
                            <FormControlLabel value={4} control={<Radio/>} label="IPv4"/>
                            <FormControlLabel value={6} control={<Radio/>} label="IPv6"/>
                        </RadioGroup>
                    </ThemeProvider>
                </div>
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
