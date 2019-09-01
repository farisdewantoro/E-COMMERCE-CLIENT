import { emphasize } from '@material-ui/core/styles/colorManipulator';
export default theme=>({
    rootCheckout: {
        padding:"20px 0"
    },
    titleParams: {
        textAlign: 'center',
        fontFamily: "'Staatliches', cursive",
        fontSize: "1.5em",
        color: 'rgba(0, 0, 0, 0.26)'
    },
    titleParamsActive:{
        textAlign: 'center',
        fontFamily: "'Staatliches', cursive",
        fontSize: "1.5em"
    },
    navigatorArrowDisabled: {
        color: 'rgba(0, 0, 0, 0.26)'
    },
    titleBilling:{
        fontFamily: "'Staatliches', cursive",
        fontSize: "1.5em",
        margin:15
    },
    selectStyles: {
        input: base => ({
            ...base,
            color: theme.palette.text.primary,
            '& input': {
                font: 'inherit',
            },
        }),
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
    textLabel: {
        fontFamily: "'Staatliches', cursive",
        fontSize: "1.2em",
    },
    textLabelSelect:{
        fontFamily: "'Staatliches', cursive",
        fontSize: "15px"
    },
    titleOrder:{
        fontFamily: "'Staatliches', cursive",
        color:"#616161de",
        fontSize: "16px"
    },
    productListCart:{
        display:"flex",
        alignItems: "center"
    },
    normalText: {
        fontFamily: "'Staatliches', cursive",
        fontSize: 16,
        color: "#484848"

    },
    margin: {
        margin: theme.spacing.unit,
    },

    cssFocused: {},


    notchedOutline: {},
    bootstrapRoot: {
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    bootstrapInput: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        width: '100%',
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    bootstrapFormLabel: {
        fontSize: 18,
    },
})