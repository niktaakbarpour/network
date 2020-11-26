import React from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {green} from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
        margin: {
            margin: theme.spacing(1)
        },
        buttonContainer: {
            margin: "auto"
        }
    })
);

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700]
        }
    }
}))(Button);

export default function CustomizedButtonBlock({applyBlockHandler}) {
    const classes = useStyles();

    return (
        <div className={classes.buttonContainer}>
            <ColorButton
                onClick={applyBlockHandler}
                variant="contained"
                color="primary"
                size="large"
                className={classes.margin}>
                Block
            </ColorButton>
        </div>
    )
}
