export default theme =>({
    wrapperMyAccount:{
        [theme.breakpoints.up('md')]:{
            marginTop: 100
        }
      
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
})