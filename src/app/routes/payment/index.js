import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import styles from './styles';
import { withRouter } from 'react-router';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { getCurrentOrderPayment} from '../../actions/orderActions';
import Divider from '@material-ui/core/Divider';
import OrderList from './order';
import Collapse from '@material-ui/core/Collapse';
import { submitCheckout, submitCheckoutManual} from '../../actions/checkoutActions';
import Page from '../../components/page';
import Navigator from '../navigator';
import BCA_logo from '../../asset/bank/bca.png';
import BRI_logo from '../../asset/bank/bri.png';
import GOPAY_logo from '../../asset/bank/gopay.png';
import BNI_logo from '../../asset/bank/bni.png';
import MANDIRI_logo from '../../asset/bank/mandiri.png';
import PERMATA_logo from '../../asset/bank/permata.png';
class Payment extends Component {
  state = {
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
    timePayment: 0,
    dateCreate: 0,
    countDown: false,
    paymentMethod:false,
    open:false,
    anchorEl:"",
    paymentList:[
      // { name: "Credit Card", value:"credit_card"},
    { name: "GO-PAY", value: "gopay", img: GOPAY_logo }, 
      // { name: "KlikBCA", value: "bca_klikbca" },
      // { name: "BCA KlikPay", value: "bca_klikpay" },
      // { name: "Mandiri Clickpay", value: "mandiri_clickpay" },
      // { name: "CIMB Clicks", value: "cimb_clicks" },
      // { name: "Danamon Online Banking", value: "danamon_online" },
      // { name: "E-Pay BRI", value: "bri_epay" },
      // { name: "Indomaret", value: "indomaret" },
    ],
    paymentVA:[
      { name: "PERMATA - ATM/Bank Transfer (Virtual Account)", value: "permata_va", img: PERMATA_logo },
      { name: "BNI - ATM/Bank Transfer (Virtual Account )", value: "bni_va", img: BNI_logo },
      { name: "MANDIRI - ATM/Bank Transfer (Virtual Account )", value: "echannel", img: MANDIRI_logo },
    ],
    paymentManual:[
      { name:"BCA - ATM/Bank Transfer (Verifikasi Manual)",value:"bank_transfer_manual", bank:"bca",img:BCA_logo},
      { name: "BRI - ATM/Bank Transfer (Verifikasi Manual)", value: "bank_transfer_manual", bank: "bri", img: BRI_logo }
    ]
  }
  componentDidMount() {
    this.stop();
    this
      .props
      .getCurrentOrderPayment(this.props.match.params.token_order,this.props.history);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.orders.order !== this.props.orders.order 
      && 
      nextProps.orders.order.length > 0
      && nextProps.orders.order[0].order_status_id === 1) {
      let dateValid = new Date(nextProps.orders.order[0].created_at);
      dateValid.setSeconds(dateValid.getSeconds() + 5);
      dateValid.setHours(dateValid.getHours() + 4);
      let nowDate = new Date();
      this.setState({
        timePayment: dateValid.getTime(),
        dateCreate: nowDate.getTime()
      })
      if (dateValid.getTime() > nowDate.getTime()) {
        this.setState({
          countDown: true
        });
        this.interval = setInterval(() => {
          const date = this.calculateCountdown(dateValid);
          date ? this.setState(date) : this.stop();
        }, 1000);
      }

    }




  }
  componentWillUnmount() {
    this.stop();

  }
  handleChangePaymentMethod =(e)=>{
    this.setState({
      paymentMethod:e.target.value
    })
    const { currentTarget } = e;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open,
    }));
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.countDown === true && nextState.countDown === "expired") {
      this.props.history.push('/my-account/orders');
      return false;
    }
    return true;
  }
  calculateCountdown(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

    // clear countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    };

    // calculate time difference between now and expected date
    if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) { // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  }
  stop() {
    clearInterval(this.interval);
    if (this.state.countDown === true) {
      window.snap.hide();
      this.setState({
        countDown: "expired"
      });

    }

  }
  handlerSubmitPayment = ()=>{
    let data = {
        payment_method:this.state.paymentMethod,
    }
    this.props.submitCheckout(data,this.props.match.params.token_order,this.props.history);
  }
  handlerSubmitPaymentManual = (data)=>{
    // let data = {
    //   payment_method: this.state.paymentMethod,
    // }
    console.log(data);
    this.props.submitCheckoutManual(data, this.props.match.params.token_order, this.props.history);
  }
  render() {
    const { classes,orders } = this.props;
    const { 
      hours,
      min,
      sec,
    paymentMethod,
      paymentManual,
      paymentList,
      paymentVA } = this.state;
   
    return (
      <Page
        id="Payment"
        noCrawl
      >

      <div className={classes.rootPayment}>
        <Grid container>
            <Grid item md={12} xs={12}>
                <Grid container justify="center">
                  <Grid item md={10} xs={12}>
                    <Grid container > 
                        <Grid item md={12} xs={12}>
                    {/* {timePayment > dateCreate ? ( */}
                      <Grid container>
                        <Grid item md={12} xs={12} style={{marginBottom:10}}>
                          <Paper elevation={1} className={classes.paperTimer}>
                            <Grid container justify="center">
                              <Typography component="p" className={classes.countTime}>
                                Please choose a payment method within:
                                             </Typography>
                              <Grid container justify="center" spacing={8}>

                                <Typography component="p" className={classes.countTime}>
                                  {hours}
                                </Typography>
                                <Typography component="p" className={classes.countTime}>
                                  hours
                                             </Typography>
                                <Typography component="p" className={classes.countTime}>
                                  :
                                             </Typography>

                                <Typography component="p" className={classes.countTime}>
                                  {min}
                                </Typography>
                                <Typography component="p" className={classes.countTime}>
                                  minutes
                                             </Typography>
                                <Typography component="p" className={classes.countTime}>
                                  :
                                             </Typography>

                                <Typography component="p" className={classes.countTime}>
                                  {sec}
                                </Typography>
                                <Typography component="p" className={classes.countTime}>
                                  seconds
                                             </Typography>
                                <Typography component="p" className={classes.countTime}>

                                </Typography>
                              </Grid>
                            </Grid>

                          </Paper>
                        </Grid>

                        <Grid item xs={12}>
                          <Navigator
                            activeNavigator={2}
                          />
                        </Grid>
                      </Grid>


                    {/* // ) : ''} */}

                    <Grid container direction="row" spacing={8} style={{margin:"10px 0"}}>
                        <Grid item md={6} xs={12}>
                     

                        <Grid container >
                          <Grid item md={12} xs={12}>
                              <Card>
                              <Grid container style={{ margin: 15 }}>
                                <Typography variant="h1" className={classes.productTitle}>
                                  PAYMENT METHOD
                          </Typography>
                              </Grid>
                              <Divider/>
                                <CardContent>
                                <Typography style={{
                                  fontWeight:"bold"
                                }}>
                                   Transfer Bank (Verifikasi Manual)
                                </Typography>
                                <RadioGroup
                                  aria-label="payment"
                                  name="paymentMethod"
                                  value={paymentMethod}
                                  className={classes.group}
                                  onChange={this.handleChangePaymentMethod}
                                >
                                    {paymentManual.map(pm=>{
                                      return(
                                        <div>
                                          <FormControlLabel value={pm.bank} control={<Radio color="primary" checked={pm.bank === paymentMethod} />} label={<img src={pm.img} alt="payment-img" style={{ maxWidth: "100px" }} />} />
                                          <Collapse in={paymentMethod === pm.bank} timeout="auto" unmountOnExit>
                                            <ul >
                                              <li className={classes.listInfo}>
                                                {pm.name}
                                              </li>
                                              <li className={classes.listInfo}>
                                                Setelah Anda melakukan pemesanan, harap mentransfer dalam jangka waktu yang tertera atau pesanan Anda akan dibatalkan secara otomatis.
                                        </li>
                                              <li className={classes.listInfo}>
                                                Harap melakukan konfirmasi setelah selesai mentransfer.
                                        </li>
                                            </ul>
                                            <Button fullWidth color="primary" variant="contained" onClick={()=>this.handlerSubmitPaymentManual(pm)}>
                                              Continue
                                      </Button>
                                          </Collapse>  
                                        </div>
                               
                                      )
                                    })}
                                    <Divider/>
                                    <Typography style={{
                                      fontWeight: "bold",
                                      marginTop:10
                                    }}>
                                      Transfer Virtual Account (Verifikasi Otomatis)
                                    </Typography>
                                    {paymentVA.map((p, i) => {

                                      return (
                                        <div key={i}>
                                       
                                          <FormControlLabel value={p.value} control={<Radio color="primary" checked={p.value === paymentMethod} />} label={<img src={p.img} alt="payment-list" style={{ maxWidth: "100px" }} />} />

                                          <Collapse in={paymentMethod === p.value} timeout="auto" unmountOnExit>
                                            {(p.value === "bni_va" || p.value === "permata_va" || p.value === "echannel") && (
                                              <ul>
                                                <li className={classes.listInfo}>
                                                  {p.name}
                                                </li>
                                                <li className={classes.listInfo}>
                                                  Verifikasi automatis
                                              </li>
                                                <li className={classes.listInfo}>
                                                  Setelah Anda melakukan pemesanan, harap mentransfer dalam jangka waktu yang tertera atau pesanan Anda akan dibatalkan secara otomatis.
                                        </li>
                                              </ul>

                                            )}
                                            {(p.value === "gopay") && (
                                              <ul>
                                                <li className={classes.listInfo}>
                                                  Verifikasi automatis
                                              </li>
                                                <li className={classes.listInfo}>
                                                  Anda akan dihubungkan langsung ke aplikasi GO-JEK untuk melakukan pembayaran.
                                              </li>
                                              </ul>

                                            )}
                                            <Button fullWidth color="primary" variant="contained" onClick={this.handlerSubmitPayment}>
                                              Continue
                                      </Button>
                                          </Collapse>
                                        </div>


                                      )
                                    })}
                                    <Divider />
                                  {paymentList.map((p,i)=>{
                                
                                    return(
                                      <div key={i}>
                                        <FormControlLabel value={p.value} control={<Radio color="primary" checked={p.value === paymentMethod} />} label={<img src={p.img} alt="payment-list" style={{ maxWidth: "100px" }} />} />
                                  
                                        <Collapse in={paymentMethod === p.value} timeout="auto" unmountOnExit>
                                          {(p.value === "bni_va" || p.value === "permata_va" || p.value === "echannel") && (
                                        <ul>
                                              <li className={classes.listInfo}>
                                            {p.name}
                                          </li>
                                              <li className={classes.listInfo}>
                                                Verifikasi automatis
                                              </li>
                                              <li className={classes.listInfo}>
                                                Setelah Anda melakukan pemesanan, harap mentransfer dalam jangka waktu yang tertera atau pesanan Anda akan dibatalkan secara otomatis.
                                        </li>
                                        </ul>
                                      
                                      )}
                                          {(p.value === "gopay") && (
                                            <ul>
                                              <li className={classes.listInfo}>
                                                Verifikasi automatis
                                              </li>
                                              <li className={classes.listInfo}>
                                                Anda akan dihubungkan langsung ke aplikasi GO-JEK untuk melakukan pembayaran.
                                              </li>
                                            </ul>

                                          )}
                                      <Button fullWidth color="primary" variant="contained" onClick={this.handlerSubmitPayment}>
                                            Continue 
                                      </Button>
                                        </Collapse>
                                      </div>
                               
                                
                                    )
                                  })}
                                             
                             
                                </RadioGroup>
                                
                             
                                </CardContent>
                              </Card>
                          </Grid>
                        </Grid>


                        </Grid>

                      {/* END */}

                      <Grid item md={6} xs={12}>
                  
                        <Grid container direction="column" spacing={8}>
                          <Grid item md={12}>
                            {orders
                              .order_billing
                              .map((ob, indexOB) => {
                                return (
                                  <Card key={indexOB}>
                                    <Grid container style={{margin:15}}>
                                      <Typography variant="h1" className={classes.productTitle}>
                                        SHIPPING
                          </Typography>
                                    </Grid>
                                    <Divider/>
                                
                                    <CardContent>

                                      <Grid container direction="row" spacing={8}>
                                          <Grid item md={6}>
                                          <Grid container alignItems="center">
                                            <Typography className={classes.normalText} >
                                              NAME :
                                              </Typography>
                                            <Typography style={{ textTransform: "uppercase" }} >
                                              {`${ob.fullname}`} 
                                           </Typography>
                                          </Grid>
                                          </Grid>

                                        <Grid item md={6}>
                                          <Grid container alignItems="center">
                                            <Typography className={classes.normalText}>
                                              PHONE :
                                              </Typography>
                                            <Typography>
                                             {ob.phone_number}
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                        <Grid item md={6}>
                                          <Typography className={classes.normalText}>
                                            Address :
                                                                             </Typography>
                                          <Typography >
                                            {ob.province}
                                          </Typography>
                                          <Typography>
                                            {ob.regency}
                                          </Typography>
                                          <Typography>
                                            {ob.distict}
                                          </Typography>
                                          <Typography>
                                            {ob.village}
                                          </Typography>
                                          <Typography>
                                            {ob.postcode}
                                          </Typography>
                                          <Typography>
                                            {ob.address}
                                          </Typography>


                                        </Grid>
                                        <Grid item md={6}>
                                          <Typography className={classes.normalText}>
                                            Shipment :
                                                                                </Typography>
                                          {orders.order_shipment.map((os, indexOS) => {
                                            return (
                                              <div key={indexOS}>
                                                <Typography>
                                                  Courier :{os.courier}
                                                </Typography>
                                                <Typography>
                                                  Description :{os.description}
                                                </Typography>
                                                <Typography>
                                                  Estimated Time Arrival :{os.etd} days
                                                                            </Typography>
                                                <Typography>
                                                  Service :{os.service}
                                                </Typography>
                                              </div>

                                            )
                                          })}


                                        </Grid>
                                      </Grid>

                                    </CardContent>
                                  </Card>

                                )
                              })}
                          </Grid>

                          <Grid item md={12}>
                            <OrderList orders={orders} />
                            
                          </Grid>
                        </Grid>


                      </Grid>

                    

{/* END */}
                    </Grid>


                        </Grid>
                    </Grid>
                  </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
      </Page>
    )
  }
}

Payment.propTypes = {
    products: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    address: PropTypes.object.isRequired,
    auths: PropTypes.object.isRequired,
    shipping: PropTypes.object.isRequired,
    carts: PropTypes.object.isRequired,
    vouchers: PropTypes.object.isRequired,
    orders:PropTypes.object.isRequired,
  getCurrentOrderPayment:PropTypes.func.isRequired,
  submitCheckout:PropTypes.func.isRequired,
  submitCheckoutManual:PropTypes.func.isRequired
}

const mapStateToProps = state => (
    {
        products: state.products,
        carts: state.carts,
        errors: state.errors,
        auths: state.auths,
        address: state.address,
        shipping: state.shipping,
        vouchers: state.vouchers,
        orders:state.orders

    });

export default compose(connect(mapStateToProps, {
  getCurrentOrderPayment,
  submitCheckout,
  submitCheckoutManual
}), withStyles(styles, { name: "Payment" }))(withRouter(Payment));

