export default theme=>({
    wrapperFooter:{
        background:"#1a1a1a",
        padding:20,
        margin:"25px 0 0 0"
    },
    listShop:{
 
        listStyle:"none",
        padding:2,
        fontSize:14
    },
    listCollection:{
        boxShadow:"1px 0px 1px 1px rgba(0,0,0,0.2), 0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)",
        backgroundColor: theme.palette.background.paper,
    },
    listRoot:{
        color:"black",
        textDecoration: "none",
    },
    ulPayment:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    imgPayment:{
        width: 80,
        filter: 'grayscale(100%)'
    },
    liPayment:{
        margin:"0px 20px",
        listStyle:"none"
    },
    titleTop:{
        color: "#FFF",
        fontWeight:"bold",
        textAlign:'center'
    },
    wrapperLinkMenu:{
        padding:"4px 5px"
    },
    link:{
        color: "#FFF",
        textDecoration:"none",
        display:"inline-block",
        padding:"2px 0",
        fontSize:14
    },
    office:{
        color: "#FFF",
        margin:"20px 0",
        fontSize:14
    },
    wrapperIcon: {
        // marginTop:10,
        display: 'flex',
        alignItems: 'center',
    },
    colorWhite:{
        color:"#FFF"
    },
    content: {
        flexGrow: 1,
        [theme.breakpoints.down('sm')]:{
            marginTop:60,
        },
        [theme.breakpoints.up('md')]: {
            marginTop:70,
        },
        

        

    },
    appBar: {
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), -2px 1px 1px 0px rgba(0,0,0,0.14)',
        background: 'white'
    },
    appBarMobile: {
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), -2px 1px 1px 0px rgba(0,0,0,0.14)',
        background: 'white',
        top:0
        // minHeight:"76px"
    },
    margin: {
        margin: theme.spacing.unit
    },
    wrapperInline: {
        display: 'inline-block',

    },

    buttonMobile:{
        minWidth:"auto !important",
        padding:"0px 10px"
    },
    logoHammer: {
        width: 200,
        margin: 5
    },
    logoHammerMobile: {
        width: 150,
    },
    colorBlack: {
        color: 'black'
    },
    divider: {
        width: 1,
        height: 15,
    },
    imageLogo: {
        width:'100%'
    },
    shoppingBagText: {
        textTransform: 'capitalize',
        fontSize: 12,
        fontWeight: 500,
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans - serif",
        // marginTop:3,
        // marginLeft:5
        margin: theme.spacing.unit
    },
    badge: {
        top: -9,
        right: -20,
        width:22,
        height:22,
        // The border color match the background color.
        border: `1px solid ${
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
            }`,
        borderRadius:'50%',
        padding:0,
        transform:'inherit'
    },
    bounceIn: {
      
        animation: `bounceIn 1.2s infinite`
    },
    '@keyframes heartBeat': {
        '0%': {
            transform: 'scale(1)'
        },
        '14%': {
            transform: 'scale(1.3)'
        },
        '28%': {
            transform: 'scale(1)'
        },
        '42%': {
            transform: 'scale(1.3)'
        },
        '70%': {
            transform: 'scale(1)'
        }
    },



    '@keyframes bounceIn': {
        "from": ['20%',
            '40%',
            '60%',
            '80%',],

        "to": {
            animationTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)"
        },

        "0%": {
            opacity: 0,
            transform: "scale3d(0.3, 0.3, 0.3)"
        },
        "20%": {
            transform: "scale3d(1.1, 1.1, 1.1)"
        },
        "40%": {
            transform: "scale3d(0.9, 0.9, 0.9)"
        },
        "60%": {
            opacity: 1,
            transform: "scale3d(1.03, 1.03, 1.03)"
        },
        "80%": {
            transform: " scale3d(0.97, 0.97, 0.97)"
        },
        "to": {
            opacity: 1,
            transform: "scale3d(1, 1, 1)"
        }
    },
    hr:{
        height: "1px",
        margin: 0,
        border: "none",
        position:"absolute",
        left:"0px",
        width:"100%",
        backgroundColor: "rgba(0, 0, 0, 0.12)"
    },
    arrow: {
        position: 'absolute',
        fontSize: 7,
        width: '3em',
        height: '3em',
        '&::before': {
            content: '""',
            margin: 'auto',
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid',
        },
    },
    popoverWrapper:{
        padding:"10px",
  
    },
    paper: {
        padding: theme.spacing.unit,
    },
    listItemParent:{
        fontFamily: "'Staatliches', cursive",
        fontSize: "1.05em",
        color: "black",
    },
    listItemParentRoot:{
        fontFamily: "'Staatliches', cursive",
        fontSize: "1.1em",
        color: "black",
        fontWeight:"bold"
    },
    listItemSecondaryRoot:{
        fontSize: "12px",
        color: "black",
    },
    textListParent:{
        // writingMode:"vertical-lr",
        // transform: "rotate(-180deg)",
        fontFamily: "'Staatliches', cursive",
        // fontWeight:"bold",
        fontSize: "1.05em",
        color:"black",
        textDecoration:"none"
        // background:"#1a1a1a",
    },

    menuTitle:{
        // fontFamily: "'Staatliches', cursive",
        // fontSize: "1.2em",
        // fontWeight:"bold",
        borderBottom: "3px solid #79252500",
        paddingBottom: "3px",
        borderRadius:0,
        '&:hover':{
            background:"none"
        },
        
       
    },
    linkMenu:{
        color: "black",
        textDecoration:"none",
        fontSize:15,
        fontFamily: "'Roboto', 'Helvetica','Arial', 'sans-serif'",
        
    },
    linkMenuRoot:{
       color:"black",
       fontWeight:"500",
      fontFamily: "'Roboto', 'Helvetica','Arial', 'sans-serif'",
        fontSize: 14,

    },
    hrList:{
        margin:"5px 0"
    },
    toolbarTop:{
        
        // minHeight:"0px !important",
        background:"#fff"
    },
    menuHovered:{
        borderBottomColor:"black"
    },
    dropDownCard:{
        padding:"10px",
        borderRadius:0,
        boxShadow:"1px 0px 1px 1px rgba(0,0,0,0.2),0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)"
    },
    wrapperFooterList:{
        padding:"5px 0"
    },
    list: {
        width: 250,
    },
    




})