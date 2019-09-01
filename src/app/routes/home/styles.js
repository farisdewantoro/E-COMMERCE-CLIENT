export default theme=>({
    containerNameLookbook:{
        background:"black"
    },
    lookbookNameText:{
        width:"100%",
        textAlign: 'center',
        fontFamily: `'Heebo', sans-serif`,
        fontSize:"1.5em"
    },
    rootOurRecommendation:{
        [theme.breakpoints.up('md')]: {
            padding: "10px",
        },
    },
    titleOurRecommendation:{
        fontFamily: `'Heebo', sans-serif`,
        [theme.breakpoints.up('md')]: {
            margin: "20px 0 20px 0",
            letterSpacing: 5
        },
        [theme.breakpoints.down('sm')]: {
            margin: "0px 0 20px 0",
        },
        [theme.breakpoints.down('xs')]: {
            margin: "0px 0 20px 0",
            fontSize:"25px"
        },
        fontWeight:"bold",
        textAlign: 'center',
        // borderBottom:"3px solid black",
        fontSize: "25px",
    },
    titleLookbook:{
        fontFamily: `'Heebo', sans-serif;`,
        [theme.breakpoints.up('md')]:{
            margin: "20px 0 20px 0",
            letterSpacing: 5
        },
        [theme.breakpoints.down('sm')]: {
            margin: "0px 0 20px 0",
        },
        [theme.breakpoints.down('xs')]: {
            margin: "0px 0 20px 0",
            fontSize: "25px"
        },
        textAlign: 'center',
        fontWeight: "bold",
        // borderBottom:"3px solid black",
        fontSize: "25px",
        
    },
    titleInstagram:{
        fontFamily: `'Heebo', sans-serif`,
        fontSize: "25px",
        [theme.breakpoints.up('md')]: {
            margin: "20px 0 20px 0",
      
        },
        [theme.breakpoints.down('sm')]: {
            margin: "0px 0 20px 0",

        },
        [theme.breakpoints.down('xs')]: {
            margin: "0px 0 20px 0",
            fontSize: "22px"
        },
        fontWeight: "bold",
        borderBottom: "3px solid black"
        
    },
    imageCollectionSingle:{
        Width:"100%"
    },
 
    gridList: {
        width: "100%",
    },
    rootTodayHighlight: {
        [theme.breakpoints.up('md')]: {
            padding: 10
        }
    },
    titleHighlight: {
        textAlign: 'center',
        fontFamily: `'Heebo', sans-serif;`,
        padding: "20px 0 20px 0",
        fontWeight: "bold",
        fontSize: "25px"
        
    },
    titleNewArrivals:{
        textAlign: 'center',
        fontFamily: `'Heebo', sans-serif;`,
        padding: "20px 0 20px 0",
        fontWeight: "bold",
        fontSize: "25px",
        [theme.breakpoints.up('md')]: {
            letterSpacing: 5
        },
        [theme.breakpoints.down('xs')]: {
    margin: "0px 0 20px 0",
        fontSize: "25px"
},
    },
    tabList: {
        minWidth: 'auto'
    },
    wrapperInstagram:{
    backgroundSize:"cover",
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat"
    //   "-webkit-box-align": "stretch",
    // "-webkit-align-items": "stretch",
    // "-ms-flex-align": "stretch",
    // alignItems: "stretch",
    // border:"0 solid #000",
    // "box-sizing":"border-box",
    // display: "block",
    // "-webkit-box-orient": "vertical",
    // "-webkit-box-direction": "normal",
    // "-webkit-flex-direction": "column",
    // "-ms-flex-direction": "column",
    // "flex-direction": "column",
    // "-webkit-flex-shrink": 0,
    // "-ms-flex-negative": 0,
    // "flex-shrink": 0,
    // margin: 0,
    // padding: 0,
    // position: "relative",
    // overflow:"hidden",
    // paddingBottom:"100%"

    },
    rootInstagram: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageInstagram:{
        left: 0,
        position: "absolute",
        top: 0,
        userSelect: "none",
        width: "100%",
        height:"100%",
        objectFit: "cover"
    }

 
})