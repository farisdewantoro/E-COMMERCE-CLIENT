export default theme=>({
    rootAuth:{
        padding:"50px 10px"
    },
    titleParams: {
        fontFamily: "'Staatliches', cursive",
        fontSize: "1.5em",
        padding:"10px 20px"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        
        width: 200,
    },
    textLabel:{
        fontFamily: "'Staatliches', cursive",
        fontSize: "1.2em",
    },
    loginGoogleWrapper:{
        border:"1px solid #b2b2b28f",
    },
    loginWithGoogle:{
        display:'flex',
        alignContent:"center",
    },

    loginFacebookWrapper:{
    color:"#FFFF",
    backgroundColor:"#395697",
    borderColor:"transparent",
    width:"100%",
    textAlign:"center",
    padding:"8px 16px",
    fontSize:"0.875rem",
    minWidth:"64px",
    boxSizing:"border-box",
    minHeight:"36px",
    fontFamily:" 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: 500,
    lineHeight:"1.5",
    borderRadius:"4px",
    letterSpacing:"0.02857em",
    textTransform:"uppercase",
    cursor:"pointer",
    outline:"none"
    },
    iconFacebook:{
        color: "#FFF",
    }
})