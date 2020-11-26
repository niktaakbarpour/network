import React from 'react';
import './Spinner.css';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
        modal: {
            position: 'fixed',
            zIndex: '1',
            paddingTop: '310px',
            left: '0',
            top: '0',
            width: '100%',
            height: '100%',
            overflow: 'auto',
            backgroundColor: 'rgba(0,0,0,0.4)',
            alignItems: "center"
        }
    })
);

export default function Spinner() {
    const classes = useStyles();
    return (
        <div className={classes.modal}>
            <div>
                <div className="Loader">Loading...</div>
                {/*<p>Some text in the Modal..</p>*/}
            </div>
        </div>
    );
}