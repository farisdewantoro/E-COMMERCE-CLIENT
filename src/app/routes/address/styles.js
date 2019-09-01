import { emphasize } from '@material-ui/core/styles/colorManipulator';
export default theme =>({
    wrapperProfile: {
        [theme.breakpoints.up('md')]:{

            marginTop: 100
        }
    },
    paperTitle: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        margin: "20px 0"
    },
    titleParams: {
        fontFamily: "'Staatliches', cursive",
        fontSize: "1.5em"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,

        width: 200,
    },
    textFieldBirthDay: {
        padding: "10px 0",
        margin: 10
    },
    textLabel: {
        fontFamily: "'Staatliches', cursive",
        fontSize: "1.2em",
    },
    textFormLabel: {
        fontFamily: "'Staatliches', cursive",
        fontSize: "15px"
    },
    textLabelBig:{
        fontFamily: "'Staatliches', cursive",
        fontSize: "1.6em",
    },
    root: {
        flexGrow: 1,
        height: 250,
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
    selectStyles:{
        input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
            font: 'inherit',
        },
    }),
    }
})