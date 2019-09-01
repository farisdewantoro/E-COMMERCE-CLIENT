import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography'
import styles from './styles';
import CartList from './CartList';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import { updatedCart, deletecart} from '../../actions/cartActions';
import { registerNewUser, loginUser} from '../../actions/authActions';
import CartTotal from './CartTotal';
import { setVoucherDiscount} from '../../actions/voucherActions';
import Hidden from '@material-ui/core/Hidden';
import {withRouter} from 'react-router';
import Page from '../../components/page';
import Account from './Account';
import Navigator from '../navigator';
 class Carts extends Component {
     constructor(props){
        super(props);
        this.state={
            carts:[],
            voucher:'',
            activeNavigator:0,
            accountTab:0,
            user:{
                fullname: '',
                email: '',
                password: '',
                confirmPassword: '',
                phone_number: ''
            }
        }
     }
  componentDidMount(){
 
      this.setState({
          carts: this.props.carts.cartList
      });
      if (this.props.auths.isAuthenticated || Object.keys(this.props.auths.user).length > 0){
          this.setState({
              accountTab:2,
              user:this.props.auths.user
          });
      }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.carts !== this.props.carts){
        this.setState({
            carts: nextProps.carts.cartList
        })
    }
      if ((this.props.auths.isAuthenticated !== nextProps.auths.isAuthenticated && (nextProps.auths.isAuthenticated === true)) ||  
        (this.props.auths.user !== nextProps.auths.user && Object.keys(nextProps.auths.user).length > 0)
      ) {
          this.setState({
              accountTab: 2,
              user: nextProps.auths.user
          });
      }
  }
     handlerChangeQuantity=(i)=>(e)=>{
         this.props.updatedCart({ cart_items_id: this.state.carts[i].cart_items_id,quantity:e.target.value});
     }
     handlerDeleteCart=(i)=>{
     
         this.props.deletecart(this.state.carts[i].cart_items_id);
     }
     handlerChangeVoucher = (e)=>{
        this.setState({
            voucher:e.target.value
        })
     }
     handlerSubmitVoucher =()=>{
         if (!this.props.auths.isAuthenticated){
            this.props.history.push('/sign-in');
         }else{
             if (this.state.voucher !== '') {
                 this.props.setVoucherDiscount({ code: this.state.voucher });
             }
         }
        
        
     }
     handleChangeTab = (index)=>{
         this.setState({
             accountTab: index
         });

     }
     onChangeHandler=(e)=>{
     
         const name = e.target.name;
         const value = e.target.value;
         this.setState(prevState => ({
             user: {
                 ...prevState.user,
                 [name]: value
             }

         }))
     }
     handlerSubmitLogin=(e)=>{
        e.preventDefault();
         const user={
             username:this.state.user.email,
             password:this.state.user.password,
             redirect:'/checkout'
         }
         this.props.loginUser(user,this.props.history);
     }
     onSubmitContinuePay=()=>{
         const user = this.state.user;
         user.redirect = '/checkout';
         this.props.registerNewUser(user,this.props.history);
     }

  render() {
      const { classes, vouchers} = this.props;
      const {loading} = this.props.carts;
      const {voucher,carts} = this.state;

      if(carts.length > 0){
          return (
              <Page
                id="Carts"
                title="Carts"
              >
              <div className={classes.rootCarts}>
                  
                  <Grid container direction="column">
                     


                      <Grid item xs={12}>
                          <Grid container justify="center">

                  
                                 
                                  <Grid item md={10} xs={12} style={{marginBottom:10}}>
                                      <Navigator
                                          activeNavigator={0}
                                      />
                                  </Grid>
                           


                              <Grid item md={10} xs={12}>

                                  <Grid container direction="row" spacing={40}>
                                      <Grid item md={7} xs={12}>
                                      <Grid container direction="column" spacing={16}>
                                                  {/* <Grid item xs={12}>
                                                      <Button variant="contained"  component={Link} to="/shop" color="primary">
                                                          RETURN TO SHOP
                             </Button>
                                                  </Grid> */}
                                                  <Grid item xs={12}>
                                                      <CartList
                                                          carts={carts}
                                                          handlerChangeQuantity={this.handlerChangeQuantity}
                                                          handlerDeleteCart={this.handlerDeleteCart} />
                                                  </Grid>
                                                  <Grid item xs={12}>
                                                      <CartTotal
                                                          handlerChangeVoucher={this.handlerChangeVoucher}
                                                          handlerSubmitVoucher={this.handlerSubmitVoucher}
                                                          carts={carts}
                                                          voucher={voucher}
                                                          vouchers={vouchers}
                                                      />
                                                  </Grid>
                                
                                      </Grid>
                          
                                      </Grid>
                                      <Grid item md={5} xs={12}>
                               
                                                      <Account
                                                          accountTab={this.state.accountTab}
                                                          handleChangeTab={this.handleChangeTab}
                                                          errors={this.props.errors}
                                                          user={this.state.user}
                                                          onChangeHandler={this.onChangeHandler}
                                                          handlerSubmitLogin={this.handlerSubmitLogin}
                                                          onSubmitContinuePay={this.onSubmitContinuePay}
                                                  />
                               
                                       
                                      </Grid>
                                  </Grid>

                              </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
                  <Dialog fullScreen open={loading}>

                      <Grid container justify="center" alignItems="center" direction="column" style={{ height: "100%" }}>

                          <CircularProgress className={classes.progress} />
                          <Typography className={classes.normalText} style={{ margin: "20px 0" }}>Please wait Loading..</Typography>
                      </Grid>

                  </Dialog>
              </div>
              </Page>
          )
      }
     if(carts.length === 0){
         return(
             <div className={classes.rootCarts}>
                 <Grid container justify="center" direction="column" alignItems="center" spacing={40}>
                 
                     <Grid item>
                         <Grid container justify="center" style={{ margin: "20px 0" }}>
                         {/* <Navigator /> */}
                          </Grid>
                     </Grid>
                     <Grid item >
                         <Typography variant="h1" className={classes.titleParamsActive}>
                             Your cart is currently empty.
                        </Typography>
                        <Grid container justify="center" style={{margin:"20px 0"}}>
                             <Button variant="contained" component={Link} to="/shop" color="primary">
                                 RETURN TO SHOP
                             </Button>
                        </Grid>
                       
                     </Grid>
               
                 </Grid>
             </div>
       
         )
     }else{
         return(
             <p> NO CART </p>
         )
     }
    
  }
}

Carts.propTypes = {
    products: PropTypes.object.isRequired,
    carts: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    updatedCart:PropTypes.func.isRequired,
    deletecart:PropTypes.func.isRequired,
    auths:PropTypes.object.isRequired,
    setVoucherDiscount:PropTypes.func.isRequired,
    vouchers:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
    registerNewUser:PropTypes.func.isRequired,
    loginUser:PropTypes.func.isRequired
}

const mapStateToProps = state => (
    {
        products: state.products,
        carts: state.carts,
        auths:state.auths,
        vouchers:state.vouchers,
        errors:state.errors
    });

export default compose(
    connect(mapStateToProps, { loginUser,updatedCart, deletecart, setVoucherDiscount, registerNewUser}),
    withStyles(styles, { name: "Carts" }))(withRouter(Carts));
