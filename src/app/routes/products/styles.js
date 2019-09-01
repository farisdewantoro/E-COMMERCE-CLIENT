export default theme=>({
    rootProducts:{
        [theme.breakpoints.up('md')]:{
            paddingTop:50
        },
        // [theme.breakpoints.down('sm')]:{
        //     padding: 10,
        // }
    },
    marginProduct:{
        margin: "10px 0"
    },
    rootGridProduct:{
        [theme.breakpoints.up('md')]: {
            flexBasis: "80%",
            maxWidth: "80%"
        },
    },
    rootFilter:{
        [theme.breakpoints.up('md')]: {
            flexBasis:"20%",
            maxWidth:"20%"
        },
    },
    containerGridProduct: {
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing.unit * 3
        },
        [theme.breakpoints.down('sm')]: {
            margin:0,
        }
       
    },
    productOutOfStock:{
        fontFamily: `'Heebo', sans-serif;`,
        fontSize: "15px",
        fontWeight: "700",
        color:"red",
        padding:5,
        border:"1px solid red"
    },
    mobileFilter:{
        margin:"10px 18px 0px 18px"
    },
    wrapperSearchbox:{
        [theme.breakpoints.down('sm')]: {
            marginBottom:"20px",
        }
    },
    appBarMobile: {
        position:"relative"
    },
    AppBarBottomMobile:{
        top: 'auto',
        bottom: 0,
    },
    rootPaper: {
        padding: '2px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
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
    titleParams: {
        textAlign: 'center',
        fontFamily: `'Heebo', sans-serif;`,
        fontSize: "20px",
        fontWeight:"700"
    },
    productDetail: {
        margin: theme.spacing.unit
    },
    productTitle: {
        fontFamily: `'Heebo', sans-serif;`,
        fontSize: "18px",
        fontWeight: "500"
    },
    productType: {
        fontFamily: `'Heebo', sans-serif;`,
        fontSize: 12
    },
    productPricing: {
        width: '100%',
    },
    regular_price: {
        fontFamily: `'Heebo', sans-serif`,
        fontSize: 15,
        marginRight: 5,
    },
    isDiscount: {
        textDecoration: 'line-through',
        fontSize: 13,
        color: '#484848'
    },
    discount_value: {
        color: '#e53935',
           fontFamily: `'Heebo', sans-serif`,
        fontSize: 15,
        fontWeight:700

    },
 
    noDiscount: {
        opacity: 0,
           fontFamily: `'Heebo', sans-serif`,
        fontSize: 16
    },
    titleBigProduct: {
        textAlign: 'center',
        fontFamily: `'Heebo', sans-serif`,
        fontWeight:"bold",
        fontSize: "25px",
        padding: "20px 0 20px 0",
       
    },

    containerDiscountPercentage:{
        position:"absolute",
        right:0,
        top:0,
        zIndex:10,
        background:"#ff3636",
        borderRadius:"100%",
        padding: "10px 6px 10px 6px"
    },
    discountPercentage: {
        color: '#ffff',
        fontFamily: `'Heebo', sans-serif`,
        fontSize: 16,
        fontWeight:700
    },
    root: {
        flexGrow: 1,
        maxWidth: 752
    },
    demo: {
        backgroundColor: theme.palette.background.paper
    },
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
    },
    subHeaderList: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    titleSublist: {
        padding: "8px",
        fontFamily: `'Heebo', sans-serif`,
        fontWeight: 500,
        textTransform: "Uppercase",
        letterSpacing: "0.02857em",
        lineHeight: 1.5,
        minWidth: "64px",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: "0.875rem",
        boxSizing: "border-box",
        minHeight: "36px"
    },
    rootListColorFilter: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    boxColor: {
        width: 15,
        height: 15,
        border: " 2px solid white",
        boxShadow: "0px 0px 0px 1px #9c9b9b87"
    },
    marginLeftRight: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    containerBoxColor: {
        display: 'flex',
    },
    titleMenuList:{
        //    fontFamily: `'Heebo', sans-serif`,
        // fontSize:"1.3em"
        fontFamily: `'Heebo', sans-serif;`,
        fontSize: "18px",
        fontWeight: "700"
    },
    parentMenuList:{
        //    fontFamily: `'Heebo', sans-serif`,
        // fontSize: "1.2em"
        fontFamily: `'Heebo', sans-serif;`,
        fontSize: "18px",
        fontWeight: "700"
    },
    childMenuList:{
    fontSize: "1rem",
    },
    childchildList:{
        fontSize:"0.9em",
        padding:"0px 10px",
        color:"black"
    },
    childWrapper:{
        padding:"0px 10px"
    },

    listItemButton:{
        padding:"5px 10px"
    },
    nested:{
        padding:"5px 0px",
    },
   
})