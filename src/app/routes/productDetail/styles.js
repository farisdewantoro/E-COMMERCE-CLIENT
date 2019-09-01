export default theme => ({
    rootProductsDetail: {
        [theme.breakpoints.down('sm')]:{
            padding:10
        },
        [theme.breakpoints.up('md')]:{
            padding:"20px 0"
        }
    },
    imageGalleryThumnail:{
        margin:"0 auto",
        transition:"all 1s ease",
        width:"100%",
        
        ['@media (min-width:340px)']: { // eslint-disable-line no-useless-computed-key
            width: '200px'
        }
    },
    
     wrapperImageGallery:{
    
        [theme.breakpoints.only('xs')]: {
             maxWidth: "90vw"
        },
        // [theme.breakpoints.up('sm')]: {
        //     maxWidth: "100%"
        // }
    },
    productRelatedWrapper:{
        [theme.breakpoints.down('sm')]: {
            padding: 10
        },
        [theme.breakpoints.up('md')]: {
            padding: "20px 0"
        }
    },
    titleParams: {
        textAlign: 'center',
        fontFamily: `'Heebo', sans-serif`,
        fontWeight:"bold",
        fontSize: "1.5em"
    },
    imageVariant:{
        [theme.breakpoints.down('sm')]:{
            maxHeight:"100px"
        }
    },
    imageProductDetail:{
        maxWidth:"100%"
    }
})