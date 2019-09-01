export default theme=>({
    titleReturnPolicy: {
        fontFamily: `'Heebo', sans-serif`,
        fontWeight: "bold",
        fontSize: "25px",
        margin: "10px 0 20px 0",
        borderBottom: "3px solid black",
    },
 
    paddingRoot: {
        [theme.breakpoints.up('md')]: {
            padding: "20px 0"
        },
        [theme.breakpoints.down('sm')]: {
            padding: "0px 10px"
        }
    },
    listReturnPolicy:{
        '& li':{
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans- serif",
            padding:'5px'
        }
           
    },
    titleName:{
        fontFamily: "'Staatliches', cursive",
        fontSize:"1.2em"
    }
})