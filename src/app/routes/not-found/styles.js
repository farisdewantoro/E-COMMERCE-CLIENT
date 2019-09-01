export default theme=>({
    rootCarts: {
        [theme.breakpoints.up('md')]:{
            padding: "50px 0"
        },
        [theme.breakpoints.down('sm')]:{
            padding:"5px 10px"
        }
      
    },
   
    titleParamsActive: {
        textAlign: 'center',
        fontFamily: "'Staatliches', cursive",
        fontSize: "30px",
     
    },
 


  
})