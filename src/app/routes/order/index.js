import React, { Component } from 'react'
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import { getAllOrder } from '../../actions/orderActions';
import Chip from '@material-ui/core/Chip';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import keys from '../../config/keys';
import Page from '../../components/page';
function formatCurrency(value) {

    return value
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
function renderPaymentMethod(payment) {
    if(payment.length > 0 ){
        if (payment[0] === "echannel") {
            return "BANK_TRANSFER";
        }
        if (payment[0] === "bank_transfer_manual") {
            return "BANK_TRANSFER";
        }
        else {
            return payment[0].toUpperCase();
        }
    }else{
        return '';
    }
  

}
function createToken(id) {
    let uniqueID = id;
    let token_order = {
        uniqueID
    }
    return jwt.sign(token_order, keys.jwt.secretOrPrivateKey2, { expiresIn: keys.jwt.expiresIn });
}
function haveVoucher(data, voucher) {
    if (voucher[0].voucher_type === 1) {
        let discount = data * (voucher[0].value / 100);
        let total = Math.max(1, data - discount);
        return total;
    }
    if (voucher[0].voucher_type === 2) {
        let total = Math.max(1, data - voucher[0].value);
        return total;
    }
    if (voucher.length === 0) {
        return data;
    }

}

class Order extends Component {
    componentDidMount() {
        this
            .props
            .getAllOrder();
  
    }

    countTotal = () => {

    }
    render() {
        const { classes, orders } = this.props;
        if (orders.order instanceof Array && orders.order_item instanceof Array && orders.order.length > 0 && orders.order_item.length > 0) {
            return (
                <Page
                    id="Order"
                    title="Order"
                >
                    
                <div className={classes.rootOrder}>
                    <Grid container>
                        <Grid item md={12} xs={12}>
                            <Grid container justify="center">
                                <Grid item md={8} xs={12}>
                                    <Grid container direction="column">
                                        <Grid item md={12}>
                                            <Paper className={classes.paperOrder} elevation={1}>
                                                <Typography variant="h5" component="h3" className={classes.titleParamsLeft}>
                                                    ORDER HISTORY
                                                </Typography>
                                                <Typography component="p">
                                                    Your order history list
                                                </Typography>
                                            </Paper>
                                            <Grid container direction="column" spacing={8}>
                                                {orders
                                                    .order
                                                    .map((ord, i) => {
                                                        return (
                                                            <Grid item xs={12} key={i}>

                                                                <Card>
                                                                    <Grid
                                                                        container
                                                                        justify="space-between"
                                                                        alignItems="center"
                                                                        style={{
                                                                            padding: 10
                                                                        }}>
                                                                        <Typography>
                                                                            ORDER ID: #{ord.id}
                                                                        </Typography>
                                                                        <Chip label={ord.status} />
                                                                    </Grid>
                                                                    <Divider />
                                                                    <CardContent>
                                                                        <Grid container direction="column" spacing={16}>
                                                                            <Grid item xs={12}>
                                                                                <Grid container justify="space-between">
                                                                                    <Typography
                                                                                        style={{
                                                                                            fontWeight: "bold"
                                                                                        }}>
                                                                                        {moment(ord.created_at).format("LLL")}
                                                                                    </Typography>
                                                                                    <Typography>
                                                                                        {orders
                                                                                            .order_item
                                                                                            .filter(ori => ori.order_id === ord.id)
                                                                                            .length}

                                                                                        items
                                                                                    </Typography>
                                                                                </Grid>
                                                                            </Grid>

                                                                            <Grid item xs={12}>
                                                                                <Grid container direction="row" alignItems="center" >
                                                                                    <Typography style={{ paddingRight: "5px" }}>
                                                                                        Payment Method
                                                                                </Typography>
                                                                                    {typeof orders.order_payment !== "undefined" && orders
                                                                                        .order_payment
                                                                                        .filter(op => op.order_id === ord.id)
                                                                                        .length > 0
                                                                                        ? (<Chip
                                                                                            label={renderPaymentMethod(orders
                                                                                                .order_payment
                                                                                                .filter(op => op.order_id === ord.id)
                                                                                                .map(op1 => op1.payment_type))} />)
                                                                                        : (<Chip label={`Not yet chosen`} />)}
                                                                                </Grid>


                                                                            </Grid>
                                                                            <Grid item xs={12}>
                                                                                <Grid container direction="row" alignItems="center" >
                                                                                    <Typography style={{ paddingRight: "5px" }}>
                                                                                        Shipping

                                                                                    </Typography>
                                                                                    <Chip
                                                                                        label={orders
                                                                                            .order_shipment
                                                                                            .filter((os, indexOS) => os.order_id === ord.id)
                                                                                            .map(oship => oship.courier)} />

                                                                                </Grid>
                                                                            </Grid>

                                                                            <Grid item xs={12}>
                                                                                <Grid container justify="space-between">
                                                                                    <Grid>
                                                                                        <Typography>
                                                                                            Total :
                                                                                        </Typography>
                                                                                        {/* {orders.order_voucher.filter((ov, indexOV) => ov.order_id === ord.id).length} */}
                                                                                        {orders
                                                                                            .order_voucher
                                                                                            .filter((ov, indexOV) => ov.order_id === ord.id)
                                                                                            .length > 0
                                                                                            ? (
                                                                                                <Typography>
                                                                                                    IDR
                                                                                                     {formatCurrency(haveVoucher(orders.order_item.filter(or1 => or1.order_id === ord.id).map(or2 => or2.price).reduce((a, b) => {
                                                                                                         return a + b
                                                                                                     },0), orders.order_voucher.filter((ov, indexOV) => ov.order_id === ord.id)))}

                                                                                                </Typography>
                                                                                            )
                                                                                            : (
                                                                                                <Typography>
                                                                                                    IDR {formatCurrency(orders.order_item.filter(or1 => or1.order_id === ord.id).map(or2 => or2.price).reduce((a, b) =>{
                                                                                                        return a + b
                                                                                                    },0))}

                                                                                                </Typography>
                                                                                            )}

                                                                                    </Grid>
                                                                                    <Grid>
                                                                                        <Button
                                                                                            variant="contained"
                                                                                            component={Link}
                                                                                            to={`/my-account/orders/detail/${createToken(ord.id)}`}
                                                                                            color="primary">
                                                                                            Detail
                                                                                        </Button>
                                                                                    </Grid>

                                                                                </Grid>

                                                                            </Grid>
                                                                        </Grid>
                                                                    </CardContent>
                                                                </Card>

                                                            </Grid>
                                                        )
                                                    })}

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
        } else {
            return (
                <div className={classes.rootOrder}>
                    <Grid
                        container
                        justify="center"
                        direction="column"
                        alignItems="center"
                        spacing={40}>

                        <Grid item>
                            <Grid
                                container
                                justify="center"
                                style={{
                                    margin: "20px 0"
                                }}>
                                {/* <Navigator /> */}
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="h1" className={classes.titleParams}>
                                Your order is currently empty.
                            </Typography>
                            <Grid
                                container
                                justify="center"
                                style={{
                                    margin: "20px 0"
                                }}>
                                <Button variant="contained" component={Link} to="/shop" color="primary">
                                    RETURN TO SHOP
                                </Button>
                            </Grid>

                        </Grid>

                    </Grid>
                </div>

            )
        }

    }
}

Order.propTypes = {
    auths: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    getAllOrder: PropTypes.func.isRequired,
    orders: PropTypes.object.isRequired
}

const mapStateToProps = state => ({ auths: state.auths, orders: state.orders });

export default compose(connect(mapStateToProps, { getAllOrder }), withStyles(styles, { name: "Order" }))(Order);
