export default theme => ({
    titlePaymentGuide: {
        fontFamily: `'Heebo', sans-serif`,
        fontWeight: "bold",
        fontSize: "25px",
        margin: "10px 0 20px 0",
        borderBottom: "3px solid black"
    },
    rootTab:{
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    paddingRoot: {
        [theme.breakpoints.up('md')]: {
            padding: "20px 0"
        },
        [theme.breakpoints.down('sm')]: {
            padding: "0px 10px"
        }
    }
})