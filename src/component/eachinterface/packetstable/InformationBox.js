import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({

        count: {
            backgroundColor: '#66bb6a',
            padding: '10px',
            flex: '20%',
            margin: '20px',
            borderRadius: "5px"
        },

        maximumSize: {
            backgroundColor: '#4caf50',
            padding: '10px',
            flex: '20%',
            margin: '20px',
            borderRadius: "5px"
        },
        averageSize: {
            backgroundColor: '#629749',
            padding: '10px',
            flex: '20%',
            margin: '20px',
            borderRadius: "5px"
        },
        blablabla: {
            backgroundColor: '#8bc34a',
            padding: '10px',
            flex: '20%',
            margin: '20px',
            borderRadius: "5px"
        },
        paragraph: {
            textAlign: "center"
        },
    boxContainer: {
        display: "flex",
        flexWrap: "wrap",
        textAlign: "left",
        boxSizing: "borderBox",
        maxWidth: "74%",
        margin: "auto"
    }
    })
);

export default function InformationBox({}) {

    const classes = useStyles();

    return (
        <div className={classes.boxContainer}>
                <Box
                    boxShadow={3}
                    className={classes.count}
                >
                    Count
                    <p className={classes.paragraph}>alwicfalcikmas</p>
                </Box>
                <Box
                    boxShadow={3}
                    className={classes.maximumSize}
                >
                    Maximum Size
                    <p className={classes.paragraph}>alwicfalcikmas</p>
                </Box>
                <Box
                    boxShadow={3}
                    className={classes.averageSize}
                >
                    Average Size
                    <p className={classes.paragraph}>alwicfalcikmas</p>
                </Box>
                <Box
                    boxShadow={3}
                    className={classes.blablabla}
                >
                    bla bla bla
                    <p className={classes.paragraph}>alwicfalcikmas</p>
                </Box>
        </div>
    );
}
