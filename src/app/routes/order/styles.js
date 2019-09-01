export default theme=>({
    rootOrder:{
        [theme.breakpoints.up('md')]:{
            padding: "50px 0"
        },
        [theme.breakpoints.down('sm')]:{
            padding:"0px 5px"
        }
       
    },
    paperOrder:{
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginBottom:"20px"
    },
    titleParams: {
        textAlign: 'center',
        fontFamily: `'Heebo', sans-serif;`,
        fontSize:"20px",
        fontWeight:700
    },
    titleParamsLeft:{
        fontFamily: `'Heebo', sans-serif;`,
        fontSize:"20px",
        fontWeight:700
    },
    // titleParams: {
    //     textAlign: 'center',
    //             fontFamily: `'Heebo', sans-serif;`,
    //     fontSize:"20px",
    //     color: 'rgba(0, 0, 0, 0.26)'
    // },
    titleParamsActive: {
        textAlign: 'center',
                fontFamily: `'Heebo', sans-serif;`,
        fontSize:"20px",
        fontWeight:700
    },
    navigatorArrowDisabled: {
        color: 'rgba(0, 0, 0, 0.26)'
    },
    productTitle: {
        fontFamily: `'Heebo', sans-serif;`,
        fontSize: "20px",
        fontWeight: 700,
        lineHeight: 1.5

    },
    productType: {
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans- serif",
        fontSize: '1em'
    }, productPricing: {
        marginTop: 10
    },
    regular_price: {
        fontFamily: `'Heebo', sans-serif;`,
        fontSize: 20,
        marginRight: 5
    },
    normalText: {
        //         fontFamily: `'Heebo', sans-serif;`,
        // fontSize: 16,
        // color: "#484848"

    },
    isDiscount: {
        textDecoration: 'line-through',
        fontSize: 16,
        color: '#484848'
    },
    discount_value: {
        color: '#e53935',
                fontFamily: `'Heebo', sans-serif;`,
        fontSize: 20

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
    WraperProductPricing: {
        display: 'flex',
        alignItems: "center"
    },
    quantityWrapper: {
        display: 'flex',
        alignItems: "center",
        margin: '10px 0px'
    },
  
    textProductAttribute: {
        marginLeft: 5,
    },
    inputVoucher: {
        width: '100%',
        // color: "#1a1a1a",
                fontFamily: `'Heebo', sans-serif;`,
        fontSize: 16,
        color: "#484848",
        padding: '4px 5px',
        border: "none",
        boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), -1px 0px 0px 0px rgba(0,0,0,0.12)",
        outline: "none"
    },
    paperTimer:{
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit ,
        paddingBottom: theme.spacing.unit ,
        backgroundColor: "#212121"
    },
   countTime:{
       color: "#fff",
       padding:"5px 3px"
   }
})