import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";


const useStyles = makeStyles((theme) => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        paper: {
            padding: '0px 20px 20px 20px'
        },
        insideModal: {
            backgroundColor: '#f5f5f5',
            // border: '3px solid #33691e',
            borderRadius: '8px',
            boxShadow: theme.shadows[10]
        },
        exitIcon: {
            direction: "rtl",
            color: '#2e7d32',
            padding: '8px'
        }
    })
);

export default function ModalLayer(props) {
    const classes = useStyles();

    const {open, handleOpen, handleClose} = props;

    return (
        <Modal
            // aria-labelledby="transition-modal-title"
            // aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Fade in={open}>
                <div className={classes.insideModal}>
                    <div className={classes.exitIcon}>
                        <CloseIcon
                            onClick={handleClose}
                            style={{fontSize: 30}}
                        />
                    </div>
                    <div className={classes.paper}>
                        <h2>Transition modal</h2>
                        <p>react-transition-group animates me.</p>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
}
