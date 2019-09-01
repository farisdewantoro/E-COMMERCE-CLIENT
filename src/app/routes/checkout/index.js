import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes, { instanceOf } from 'prop-types';
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import styles from './styles';
import Navigator from '../navigator';
import BillingDetail from './billing';
import { getProvince, findRegencies, findDistricts, findVillages,findOptionAddress } from '../../actions/addressActions';
import OrderDetail from './order';
import {  getAddressLocation } from '../../actions/myAccounts';
import { calculateCost} from '../../actions/shippingActions';
import ShippingMethod from './shipping';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import { submitProceedToCheckout } from '../../actions/checkoutActions';
import {withRouter} from 'react-router';
import Hidden from '@material-ui/core/Hidden';
import ReactPixel from 'react-facebook-pixel';
import Page from '../../components/page';
import Voucher from './voucher';
import { setVoucherDiscount } from '../../actions/voucherActions';
 class Checkout extends Component {
   state={
     user: {
      fullname:"",
      email:"",
      phone_number:""
     },
  
     provinces: [],
     regencies: [],
     districts: [],
     villages: [],
     user_address: {
       province_id: '',
       regency_id: '',
       district_id: '',
       village_id: '',
       postcode: '',
       address: ''
     },
     subTotal:0,
     shippingFee:0,
     shippingMethod:[],
     shippingSelected:{},
     total:0,
     voucherData:''
    
     
   }
   componentDidMount() {

     this.props.getAddressLocation();
    //  if ((this.state.user_address.province_id !== '' && this.state.user_address.regency_id !== '') ){
    //    this.props.calculateCost(this.state.user_address);

    //  }
     if (this.state.user_address.province_id === ''){

       this
         .props
         .getProvince();
     }




     if (Object.keys(this.props.auths.user_address).length > 0 && this.state.user_address.province_id === '' && this.state.user_address.regency_id === '') {
       let user_a = this.props.auths.user_address;

       this.setState(prevState => ({
         user_address: {
           ...prevState.user_address,
           province_id: { value: user_a.province_id, label: user_a.province_name },
           regency_id: { value: user_a.regency_id, label: user_a.regency_name },
           district_id: { value: user_a.district_id, label: user_a.district_name },
           village_id: { value: user_a.village_id, label: user_a.village_name },
           postcode: user_a.postcode,
           address: user_a.address
         }
            
       }));
       const data={
         province_id: user_a.province_id,
         regency_id: user_a.regency_id,
         district_id: user_a.district_id,
         village_id: user_a.village_id,
       }
       const userLocation={
         province_id: { value: user_a.province_id, label: user_a.province_name },
         regency_id: { value: user_a.regency_id, label: user_a.regency_name },
         district_id: { value: user_a.district_id, label: user_a.district_name },
         village_id: { value: user_a.village_id, label: user_a.village_name },
         postcode: user_a.postcode,
         address: user_a.address
       }
      //  this.props.findOptionAddress(data);
      
     }
     let stateUser = this.state.user;
     let user = this.props.auths.user;
     if (Object.keys(user).length > 0) {
       Object.keys(stateUser).forEach(keys => {
         Object.keys(user).forEach(userKey => {
           this.setState(prevState => ({
             user: {
               ...prevState.user,
               [keys]: user[keys]
             }
           }))
         })
       });

     }
   }
   shouldComponentUpdate(nextProps, nextState){
     let province = this.state.user_address.province_id;
     let regency = this.state.user_address.regency_id;
     let nextStateProvince = nextState.user_address.province_id;
     let nextStateRegency = nextState.user_address.regency_id;

     let nextPropsProvince = nextProps.auths.user_address.province_id;
     let nextPropsRegency = nextProps.auths.user_address.regency_id;
     let provinceProps = this.props.auths.user_address.province_id;
     let regencyProps = this.props.auths.user_address.regency_id;

     if ((provinceProps !== nextPropsProvince) && nextPropsRegency !== ''
       && nextPropsProvince !== '' && (regencyProps !== nextPropsRegency)) {
       let user_a = nextProps.auths.user_address;
       let address = {
         province_id: { value: user_a.province_id, label: user_a.province_name },
         regency_id: { value: user_a.regency_id, label: user_a.regency_name },
         district_id: { value: user_a.district_id, label: user_a.district_name },
         village_id: { value: user_a.village_id, label: user_a.village_name },
         postcode: user_a.postcode,
         address: user_a.address
       };
       this.props.calculateCost(address);
       return false;
     }
     if ((province !== nextStateProvince) && regency !== '' && nextStateRegency !== '' 
      && nextStateProvince !== '' ){
      
        this.props.calculateCost(nextState.user_address);
        return false;
      }
     if ((province !== nextStateProvince) && nextStateRegency === '' && nextStateProvince === null ){
       this.props.calculateCost(nextState.user_address);
       return false;
       }
     if ((regency !== nextStateRegency) && province !== '' && nextStateProvince !== '' && nextStateRegency !== '' ){
       this.props.calculateCost(nextState.user_address);
       return false;
     }


  
     return true;

   }

   UNSAFE_componentWillReceiveProps(nextProps) {
     let prop = this.props; 

     if (nextProps.address.provinces !== this.props.address.provinces) {
       this.setState({
         provinces: nextProps
           .address
           .provinces
           .map(p => {
             return { value: p.id, label: p.name }
           })
       })
     }
     if (nextProps.address.regencies !== this.props.address.regencies) {
       this.setState({
         regencies: nextProps
           .address
           .regencies
           .map(r => {
             return { value: r.id, label: r.name, province_id: r.province_id }
           })
       })
     }
     if (nextProps.address.districts !== this.props.address.districts) {
       this.setState({
         districts: nextProps
           .address
           .districts
           .map(d => {
             return { value: d.id, label: d.name, regency_id: d.regency_id }
           })
       })
     }
     if (nextProps.address.villages !== this.props.address.villages) {
       this.setState({
         villages: nextProps
           .address
           .villages
           .map(v => {
             return { value: v.id, label: v.name, district_id: v.district_id }
           })
       })
     }
     if (nextProps.auths.user_address !== this.props.auths.user_address) {
       let user_a = nextProps.auths.user_address;

       this.setState(prevState => ({
         user_address: {
           ...prevState.user_address,
           province_id: { value: user_a.province_id, label: user_a.province_name },
           regency_id: { value: user_a.regency_id, label: user_a.regency_name },
           district_id: { value: user_a.district_id, label: user_a.district_name },
           village_id: { value: user_a.village_id, label: user_a.village_name },
           postcode: user_a.postcode,
           address: user_a.address
         }
       }))
       const data = {
         province_id: user_a.province_id,
         regency_id: user_a.regency_id,
         district_id: user_a.district_id,
         village_id: user_a.village_id,
       }
       const userLocation={
         province_id: { value: user_a.province_id, label: user_a.province_name },
         regency_id: { value: user_a.regency_id, label: user_a.regency_name },
         district_id: { value: user_a.district_id, label: user_a.district_name },
         village_id: { value: user_a.village_id, label: user_a.village_name },
         postcode: user_a.postcode,
         address: user_a.address
       }
     
       this.props.findOptionAddress(data);
     }
     let user = nextProps.auths.user;
     let stateUser = this.state.user;
     if (user !== this.props.auths.user) {
       Object.keys(stateUser).forEach(keys => {
         Object.keys(user).forEach(userKey => {
           this.setState(prevState => ({
             user: {
               ...prevState.user,
               [keys]: user[keys]
             }
           }))
         })
       });

 
     }

     if(nextProps.shipping.data !== this.props.shipping.data && Object.keys(nextProps.shipping.data).length > 0){
       this.setState({
         shippingMethod: nextProps.shipping.data.results,
         shippingFee:0
       })
     }

     if (nextProps.shipping.data !== this.props.shipping.data && Object.keys(nextProps.shipping.data).length === 0) {
       this.setState({
         shippingMethod:[],
         shippingFee:0
       })
     }
  
   }


   handlerChangeProvince = value => {
     this.setState(prevState => ({
       user_address: {
         ...prevState.user_address,
         province_id: value,
         regency_id: '',
         district_id: '',
         village_id: '',

       }
     }));
     if (typeof value !== "undefined" && value !== null && (typeof value == "object" && Object.keys(value).length > 0)) {
       this.props.findRegencies(value);
     }
   }
   handleChangeRegency = value => {
     this.setState(prevState => ({
       user_address: {
         ...prevState.user_address,
         regency_id: value,
         district_id: '',
         village_id: ''
       }
     }));
     if (typeof value !== "undefined" && value !== null && (typeof value == "object" && Object.keys(value).length > 0)) {
       this.props.findDistricts(value);
     }
   }
   handlerChangeDistrict = value => {
     this.setState(prevState => ({
       user_address: {
         ...prevState.user_address,
         district_id: value,
         village_id: '',
       }
     }));
     if (typeof value !== "undefined" && value !== null && (typeof value == "object" && Object.keys(value).length > 0)) {
       this.props.findVillages(value);
     }
   }
   handlerChangeVillage = value => {
     this.setState(prevState => ({
       user_address: {
         ...prevState.user_address,
         village_id: value
       }
     }));
   }
   handlerChangeAddress = (e) => {
     let name = e.target.name;
     let value = e.target.value;
     this.setState(prevState => ({
       user_address: {
         ...prevState.user_address,
         [name]: value
       }
     }))
   }

   handlerChangeUser = (e) => {
     let name = e.target.name;
     let value = e.target.value;
     this.setState(prevState => ({
       user: {
         ...prevState.user,
         [name]: value
       }
     }))
   }
   handlerChangeUserInfo = (e) => {
     let name = e.target.name;
     let value = e.target.value;
     this.setState(prevState => ({
       user: {
         ...prevState.user,
         [name]: value
       }
     }))
   }
   handlerShippingMethod=(e)=>{
    this.setState({
       shippingSelected:e.target.value,
       shippingFee:JSON.parse(e.target.value).cost[0].value
     });
   }
   handlerChangeVoucher = (e) => {
     this.setState({
       voucherData: e.target.value
     })
   }
   handlerSubmitVoucher = () => {
     if (!this.props.auths.isAuthenticated) {
       this.props.history.push('/sign-in');
     } else {
       if (this.state.voucherData !== '') {
         this.props.setVoucherDiscount({ code: this.state.voucherData });
       }
     }


   }
   handlerSubmitOrder = () => {
     let shipping={};
     if (this.state.shippingSelected.length > 1){
       shipping = JSON.parse(this.state.shippingSelected)
     }


     let user ={
       fullname: this.state.user.fullname,
       email: this.state.user.email,
       phone_number:this.state.user.phone_number,
      province_id:this.state.user_address.province_id,
       regency_id: this.state.user_address.regency_id,
       district_id: this.state.user_address.district_id,
       village_id: this.state.user_address.village_id,
       postcode: this.state.user_address.postcode,
       address: this.state.user_address.address
     }
    let data={
      shippingSelected: shipping ,
      user:user,
      carts:this.props.carts.cartList,
      vouchers:this.props.vouchers.voucher
    }
     this.props.submitProceedToCheckout(data,this.props.history);
  

     let subTotal =0;
     let shippingCost = 0;
     if (this.props.carts.cartList instanceof Array && this.props.carts.cartList.length > 0){
       subTotal = this.props.carts.cartList.map(c => c.discount_value ? c.discount_value * c.quantity : c.regular_price * c.quantity)
         .reduce((a, b) =>{
           return a + b
         },0)
     } 
     if(Object.keys(shipping).length > 0){
       shippingCost = shipping.cost[0].value;
       const dataFB = {
         value: subTotal,
         currency: 'IDR',
         shipping: shippingCost
       }


       ReactPixel.track('InitiateCheckout', dataFB);
     }
    

   
   }
   
  
 
  render() {
    const { classes, carts, vouchers, orders} = this.props;
    const { user, 
      voucherData,
      provinces, regencies, districts, villages, user_address, shippingMethod, shippingFee, total, shippingSelected
    } = this.state;
    const { loading } = this.props.shipping;

    return (
      <Page
        id="Shipping"
        noCrawl
      >
      <div className={classes.rootCheckout}>

        <Grid container direction="column">
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item md={11} xs={12} style={{marginBottom:20}}>
                  <Navigator 
                    activeNavigator={1}
                  />
              </Grid>
             
             
             
              <Grid item xs={11}>

                <Grid container direction="row" spacing={40}>
                  <Grid item md={7} xs={12}>
                    <BillingDetail 
                    user={user} 
                    errors={this.props.errors} 
                    provinces={provinces}
                    regencies={regencies}
                    districts={districts}
                    villages={villages}
                    user_address={user_address}
                    handlerChangeUser={this.handlerChangeUser}
                    handlerChangeUserInfo={this.handlerChangeUserInfo}
                    handlerChangeAddress={this.handlerChangeAddress}
                    handlerChangeVillage={this.handlerChangeVillage}
                    handlerChangeDistrict={this.handlerChangeDistrict}
                    handleChangeRegency={this.handleChangeRegency}
                    handlerChangeProvince={this.handlerChangeProvince}
                  />
                  </Grid>
                  <Grid item md={5} xs={12}>
                  <Voucher
                    classes={classes}
                    voucherData={voucherData}
                    handlerSubmitVoucher={this.handlerSubmitVoucher}
                    handlerChangeVoucher={this.handlerChangeVoucher}
                        vouchers={vouchers}
                  />
                    <ShippingMethod 
                      shippingFee={shippingFee}
                      handlerShippingMethod={this.handlerShippingMethod}
                      shippingMethod={shippingMethod}
                      />
                    <OrderDetail
                      shippingFee={shippingFee}
                      total={total}
                      carts={carts}
                        errors={this.props.errors} 
                      handlerSubmitOrder={this.handlerSubmitOrder}
                      vouchers={vouchers}
                        orders={orders}
                    />
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
        </Grid>
   
      </div>


      </Page>
    )
  }
}


Checkout.propTypes = {
  products: PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  address:PropTypes.object.isRequired,
  auths:PropTypes.object.isRequired,
  getProvince:PropTypes.func.isRequired,
  getAddressLocation:PropTypes.func.isRequired,
  findRegencies: PropTypes.func.isRequired, 
  findDistricts: PropTypes.func.isRequired, 
  findVillages: PropTypes.func.isRequired,
  calculateCost:PropTypes.func.isRequired,
  shipping:PropTypes.object.isRequired,
  submitProceedToCheckout:PropTypes.func.isRequired,
  carts:PropTypes.object.isRequired,
  vouchers:PropTypes.object.isRequired,
  findOptionAddress: PropTypes.func.isRequired,
  orders:PropTypes.object.isRequired
}

const mapStateToProps = state => (
  {
    products: state.products,
    carts:state.carts,
    errors:state.errors,
    auths:state.auths,
    address:state.address,
    shipping:state.shipping,
    vouchers:state.vouchers,
    orders:state.orders
  });

export default compose(connect(mapStateToProps, { 
  getProvince, 
  getAddressLocation, 
  findRegencies, 
  findDistricts, 
  findVillages,
  calculateCost,
  findOptionAddress,
  submitProceedToCheckout,
  setVoucherDiscount
}), withStyles(styles, { name: "Checkout" }))(withRouter(Checkout));
