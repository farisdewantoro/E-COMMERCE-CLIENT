import { emphasize } from '@material-ui/core/styles/colorManipulator';

export default theme=>({
    root: {
        padding: "30px 10px 70px 10px"
    },
    titleTracker: {
        textAlign: 'center',
        fontFamily: `'Heebo', sans-serif;`,
        fontSize: "25px",
        [theme.breakpoints.up('md')]: {
            letterSpacing: 5
        },
        fontWeight: "900"
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    buttonUpload:{
        background: "#f4f4f4",
        color: "#666",
        margin: "10px 0",
        padding:"10px 40px",
        display: "flex",
        alignItems: "center",
        '&:before': {
            content:' ',
            position:"absolute",
            top: 0,
            right: 0,
            borderWidth:"0 20px 20px 0",
            borderStyle:"solid",
            borderColor:"rgba(0, 0, 0, .15) #fff",
            transition:".3s",
            borderRadius:"0 0 0 4px"
        }
    },
    helperText:{
        fontSize:10
    },
    margin: {
        marginTop: theme.spacing.unit,
        marginBottom:theme.spacing.unit
    },
    titleParamsActive:{
        textAlign: 'center',
        fontFamily: "'Staatliches', cursive",
        fontSize: "30px",
    },
    childTracker: {
        textAlign: 'center',

        fontSize: "18px",
    },
    rootSearch: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        marginLeft: 8,
        flex: 1
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
    buttonContainer: {
        margin: "20px 0"
    },
    textTitle: {
        fontFamily: `'Heebo', sans-serif;`,
        fontSize: "18px",
        fontWeight:"bold"
    },
    normalText: {
        fontFamily: "'Staatliches', cursive",
        fontSize: 16,
        color: "#484848"

    },


    rootSelect: {
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
})