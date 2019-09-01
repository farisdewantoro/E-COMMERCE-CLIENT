export default theme=>({
    rootCarts: {
        [theme.breakpoints.up('md')]:{
            padding: "20px 0"
        },
        [theme.breakpoints.down('sm')]:{
            padding:"5px 10px"
        }
      
    },
    titleParams: {
        textAlign: 'center',
        fontFamily: `'Heebo', sans-serif;`,
        fontSize: "20px",
        color: 'rgba(0, 0, 0, 0.26)'
    },
    titleParamsActive: {
        textAlign: 'center',
        fontFamily: `'Heebo', sans-serif;`,
        fontSize: "20px",
        fontWeight:"900"
    },
    navigatorArrowDisabled:{
        color:'rgba(0, 0, 0, 0.26)'
    },
    productTitle: {
        fontFamily: `'Heebo', sans-serif;`,
        fontSize: '1.5em',
        lineHeight: 1.5,
        fontWeight:"700"

    },
    productType: {
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans- serif",
        fontSize: '1em'
    }, productPricing: {
        marginTop: 10
    },
    regular_price: {
        fontFamily: `'Heebo', sans-serif;`,
        [theme.breakpoints.down('sm')]: {
            fontSize: 16,
        },
        [theme.breakpoints.up('md')]: {
            fontSize: 20,
        },
        fontWeight: "500",
        marginRight: 5
    },
    normalText:{
        fontFamily: `'Heebo', sans-serif;`,
        fontSize:14,
        color:"#484848",
        fontWeight:"500",
        [theme.breakpoints.down('sm')]: {
        fontSize: 12,
        },
    },
    isDiscount: {
        textDecoration: 'line-through',
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
        },
        [theme.breakpoints.up('md')]: {
    fontSize: 15,
        },
        color: '#484848'
    },
    discount_value: {
        color: '#e53935',
        fontFamily: `'Heebo', sans-serif;`,
        [theme.breakpoints.down('sm')]: {
            fontSize: 14,
        },
        [theme.breakpoints.up('md')]: {
            fontSize: 18,
        },
        fontWeight: "500",
    },
    discountPercentage: {
        color: '#e53935',
        fontFamily: `'Heebo', sans-serif;`,
        fontSize: 20
    },
    noDiscount: {
        opacity: 0,
        fontFamily: `'Heebo', sans-serif;`,
        fontSize: 16
    },
    productDiscountPricing: {
        display: 'flex',
        alignItems: 'center'
    },
    productDescription: {
        margin: '10px 0px 10px 0px'
    },
    WraperProductPricing:{
        display:'flex',
        alignItems:"center"
    },
    quantityWrapper:{
        display: 'flex',
        alignItems: "center",
        margin:'10px 0px'
    },
    selectQuantity:{
        marginLeft:5,
    padding: "5px 45px 5px 10px",
    lineHeight: "1.4",
    border:" 1px solid #dadada",
    borderRadius: 0,
    backgroundColor: "white",
    // color: "#1a1a1a",
        fontFamily: `'Heebo', sans-serif;`,
        fontSize: 16,
        color: "#484848",
    margin: 0
    },
    textProductAttribute:{
        marginLeft: 5,
    },
    inputVoucher:{
        width:'100%',
        // color: "#1a1a1a",
        fontFamily: `'Heebo', sans-serif;`,
        fontSize: 16,
        color: "#484848",
        padding:'4px 5px',
        border:"none",
        boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), -1px 0px 0px 0px rgba(0,0,0,0.12)",
        outline:"none"
    },
    productListCart: {
        display: "flex",
        alignItems: "center"
    },
   
})