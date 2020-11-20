import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {green} from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
        layerContainer: {
            borderBottom: "3px solid #66bb6a",
            width: "inherit",
            display: "flex",
            justifyContent: "space-between"
        },
        layer: {
            // display: "inline",
            marginLeft: "20px"
        },
        formGroup: {
            justifyContent: "space-evenly",
            marginRight: "15px"
        },
    })
);

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function Layer({setParentState}) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        networkLayer: true,
        applicationLayer: true,
    });

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
        setParentState({
            key: event.target.name,
            value: event.target.checked
        })
    };

    return (
        <div className={classes.layerContainer}>
            <p className={classes.layer}>Layer:</p>
            <FormGroup className={classes.formGroup} row>
                <FormControlLabel
                    control={
                        <GreenCheckbox
                            checked={state.networkLayer}
                            onChange={handleChange}
                            name="networkLayer"
                        />
                    }
                    label="Network"
                />
                <FormControlLabel
                    control={
                        <GreenCheckbox
                            checked={state.applicationLayer}
                            onChange={handleChange}
                            name="applicationLayer"
                        />
                    }
                    label="Application"
                />
            </FormGroup>
        </div>
    )
}
