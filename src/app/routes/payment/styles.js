export default theme=>({
    paperTimer: {
        ...theme.mixins.gutters(),
        paddingTop: 5,
        paddingBottom:5,
        backgroundColor: "#212121"
    },
    countTime: {
        color: "#fff",
        padding: "2px 3px"
    },
    rootPayment: {
        padding: "20px 0"
    },
    productTitle: {
        fontFamily: "'Staatliches', cursive",
        fontSize: '1.5em',
        lineHeight: 1.5

    },
    normalText: {
        fontFamily: "'Staatliches', cursive",
        fontSize: 16,
        color: "#484848"

    },
    listInfo:{
        fontSize:"14px",
        lineHeight:"22px"
    },
    titleBilling: {
        fontFamily: "'Staatliches', cursive",
        fontSize: "1.5em",
        margin: 15
    },
    productListCart: {
        display: "flex",
        alignItems: "center"
    },
    titleOrder: {
        fontFamily: "'Staatliches', cursive",
        color: "#616161de",
        fontSize: "16px"
    },
})