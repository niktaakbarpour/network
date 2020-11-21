import React from 'react';
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

export default function InformationBox({packets}) {
    const classes = useStyles();
    const count = packets.length

    const sizeArray = packets.map(packet => packet.size)
    let min = 0
    let max = 0
    let avg = 0
    let sum = 0
    if (sizeArray.length !== 0) {
        min = sizeArray[0]
        max = sizeArray[0]
        sizeArray.forEach((item) => {
            sum += item
            min = Math.min(min, item)
            max = Math.max(max, item)
        })
        avg = sum / sizeArray.length
    }

    return (
        <div className={classes.boxContainer}>
            <Box
                boxShadow={3}
                className={classes.count}
            >
                Packet Count
                <p className={classes.paragraph}>{count}</p>
            </Box>
            <Box
                boxShadow={3}
                className={classes.maximumSize}
            >
                Minimum Packet Size
                <p className={classes.paragraph}>{min}</p>
            </Box>
            <Box
                boxShadow={3}
                className={classes.averageSize}
            >
                Maximum Packet Size
                <p className={classes.paragraph}>{max}</p>
            </Box>
            <Box
                boxShadow={3}
                className={classes.blablabla}
            >
                Average Size Of Packets
                <p className={classes.paragraph}>{avg}</p>
            </Box>
        </div>
    );
}
