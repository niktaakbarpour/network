import React from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';

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
                justifyContent: "space-evenly",
            },
            justifyContent: "space-evenly",
            display: "flex"
        },
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
            },
            '&.Mui-focused fieldset': {
                borderColor: '#9ccc65',
            },
        },
    },
})(TextField);

export default function PortNumber({setParentState}) {
    const classes = useStyles();

    return (
        <div className={classes.portNumberContainer}>
            <p className={classes.portNumber}>Port Number:</p>
            <form className={classes.form} noValidate autoComplete="off">
                <Autocomplete
                    freeSolo
                    disableClearable
                    options={top100Films}
                    renderInput={(params) => (
                        <CssTextField
                            {...params}
                            label="Source Port"
                            margin="normal"
                            variant="outlined"
                            InputProps={{...params.InputProps, type: 'search'}}
                        />
                    )}
                />
                <Autocomplete
                    freeSolo
                    disableClearable
                    options={top100Films}
                    renderInput={(params) => (
                        <CssTextField
                            {...params}
                            label="Destination Port"
                            margin="normal"
                            variant="outlined"
                            InputProps={{...params.InputProps, type: 'search'}}
                        />
                    )}
                />
            </form>
        </div>
    )
}

const top100Films = [
    'The Shawshank Redemption',
    'The Godfather',
    'The Godfather: Part II',
    'The Dark Knight',
    '12 Angry Men',
    "Schindler's List",
    'Pulp Fiction',
    'The Lord of the Rings: The Return of the King',
    'The Good, the Bad and the Ugly',
    'Fight Club',
    'The Lord of the Rings: The Fellowship of the Ring',
    'Star Wars: Episode V - The Empire Strikes Back',
    'Forrest Gump',
    'Inception',
    'The Lord of the Rings: The Two Towers',
    "One Flew Over the Cuckoo's Nest",
    'Goodfellas',
    'The Matrix',
    'Seven Samurai',
    'Star Wars: Episode IV - A New Hope',
    'City of God',
    'Se7en',
    'The Silence of the Lambs',
    "It's a Wonderful Life",
    'Life Is Beautiful',
    'The Usual Suspects',
    'Léon: The Professional',
    'Spirited Away',
    'Saving Private Ryan',
    'Once Upon a Time in the West',
    'American History X',
    'Interstellar',
    'Casablanca',
    'City Lights',
    'Psycho',
    'The Green Mile',
    'The Intouchables',
    'Modern Times',
    'Raiders of the Lost Ark',
    'Rear Window',
    'The Pianist',
    'The Departed',
    'Terminator 2: Judgment Day',
    'Back to the Future',
    'Whiplash',
    'Gladiator',
    'Memento',
    'The Prestige',
    'The Lion King',
    'Apocalypse Now',
    'Alien',
    'Sunset Boulevard',
    'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    'The Great Dictator',
    'Cinema Paradiso',
    'The Lives of Others',
    'Grave of the Fireflies',
    'Paths of Glory',
    'Django Unchained',
    'The Shining',
    'WALL·E',
    'American Beauty',
    'The Dark Knight Rises',
    'Princess Mononoke',
    'Aliens',
    'Oldboy',
    'Once Upon a Time in America',
    'Witness for the Prosecution',
    'Das Boot',
    'Citizen Kane',
    'North by Northwest',
    'Vertigo',
    'Star Wars: Episode VI - Return of the Jedi',
    'Reservoir Dogs',
    'Braveheart',
    'M',
    'Requiem for a Dream',
    'Amélie',
    'A Clockwork Orange',
    'Like Stars on Earth',
    'Taxi Driver',
    'Lawrence of Arabia',
    'Double Indemnity',
    'Eternal Sunshine of the Spotless Mind',
    'Amadeus',
    'To Kill a Mockingbird',
    'Toy Story 3',
    'Logan',
    'Full Metal Jacket',
    'Dangal',
    'The Sting',
    '2001: A Space Odyssey',
    "Singin' in the Rain",
    'Toy Story',
    'Bicycle Thieves',
    'The Kid',
    'Inglourious Basterds',
    'Snatch',
    '3 Idiots',
    'Monty Python and the Holy Grail'
];
