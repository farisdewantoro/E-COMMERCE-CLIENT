export default theme =>({
    titleLookbook: {
        fontFamily: `'Heebo', sans-serif`,
        fontWeight: "bold",
        fontSize: "25px",
        margin: "10px 0 20px 0",
        borderBottom: "3px solid black",
     
        // [theme.breakpoints.up('md')]: {
        //     fontSize: "2.5em"
        // },
        // [theme.breakpoints.down('sm')]: {
        //     fontSize: "1.5em"
        // }
    },
    lookbookNameText: {
        width: "100%",
        fontFamily: "'Staatliches', cursive",
        fontSize: "1.2em"
    },
    paddingRoot:{
        [theme.breakpoints.up('md')]:{
            padding:"20px 0"
        },
        [theme.breakpoints.down('sm')]:{
            padding:"0px 10px"
        }
    }
})