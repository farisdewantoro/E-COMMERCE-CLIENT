export default theme =>({
    root:{
        padding:"30px 10px 70px 10px"
    },
    titleTracker:{
        textAlign: 'center',
        fontFamily: `'Heebo', sans-serif;`,
        fontSize: "25px",
        [theme.breakpoints.up('md')]: {
            letterSpacing: 5
        },
        fontWeight:"900"
    },
    childTracker:{
        textAlign: 'center',

        fontSize: "18px",
    },
    rootSearch: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width:'100%',
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
    buttonContainer:{
        margin:"20px 0"
    },
    textTitle:{
        fontFamily: `'Heebo', sans-serif;`,
        fontSize: "18px",
        padding:10
    },
    normalText: {
        fontFamily: "'Staatliches', cursive",
        fontSize: 16,
        color: "#484848"

    },
})