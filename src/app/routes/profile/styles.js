export default theme =>({
    wrapperProfile:{
        marginTop:100
    },
    paperTitle: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        margin:"20px 0"
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
    textFieldBirthDay:{
        padding:"10px 0",
        margin:10
    },
    textLabel: {
        fontFamily: "'Staatliches', cursive",
        fontSize: "1.2em",
    },
    textFormLabel:{
        fontFamily: "'Staatliches', cursive",
        fontSize:"15px"
    }
})