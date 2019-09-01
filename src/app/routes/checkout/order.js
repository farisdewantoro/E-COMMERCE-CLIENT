import React, {Component} from 'react'

import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import FormHelperText from '@material-ui/core/FormHelperText'
function formatCurrency(value) {
    return value
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
class Order extends Component {
    voucherCheck = () => {
        if (this.props.vouchers.voucher.voucher_type_id === 1) {
            return `${this.props.vouchers.voucher.value}%`;
        }
        if (this.props.vouchers.voucher.voucher_type_id === 2) {
            return `- IDR ${formatCurrency(this.props.vouchers.voucher.value)}`;
        }
        if(typeof this.props.vouchers.voucher.value === "undefined"){
            return 'NONE'
        }
    }
    addVoucherToTotal = (subTotal) => {
        if (this.props.vouchers.voucher.voucher_type_id === 1) {
            let discount = subTotal * (this.props.vouchers.voucher.value / 100);
            let total = Math.max(1, subTotal - discount);
            return `IDR ${formatCurrency(total)}`;
        }
        if (this.props.vouchers.voucher.voucher_type_id === 2) {
            let total = Math.max(1, subTotal - this.props.vouchers.voucher.value);

            return `IDR ${formatCurrency(total)}`;
        }
        if (typeof this.props.vouchers.voucher.value === "undefined") {
            return subTotal
        }
    }
    render() {
        const { classes, carts, shippingFee, handlerSubmitOrder, errors, orders} = this.props;
        return (
            <div style={{margin:"10px 0"}}>
                <Card>
                    <Typography variant="h1" className={classes.titleBilling}>
                        YOUR ORDER
                    </Typography>
                    <Divider/>
                    <CardContent>
                        <Grid container direction="column" spacing={8}>
                            <Grid item md={12}>
                                <Grid justify="space-between" container>
                                    <Grid item>
                                        <Typography className={classes.titleOrder}>
                                            PRODUCTS
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography className={classes.titleOrder}>
                                            TOTAL
                                        </Typography>
                                    </Grid>

                                </Grid>
                                <Divider
                                    style={{
                                    margin: "10px 0"
                                }}/>
                                <Grid container>
                                    {carts.cartList.map((c,i)=>{
                                    
                                        return(
                                            <Grid item md={12} key={i}>
                                                <Grid justify="space-between" container>
                                                    <Grid item>
                                                    <div className={classes.productListCart}>
                                                            <Typography>
                                                                {c.product_name}   -
                                                            </Typography>
                                                            <Typography style={{ marginLeft:"5px" }}>
                                                               {c.size}   
                                                            </Typography>
                                                            <CloseIcon style={{fontSize:12,margin:"0px 5px"}}/> 
                                                            <Typography >
                                                                {c.quantity}
                                                            </Typography>
                                                    </div>
                                                     
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography>
                                                            {`IDR ${c.discount_value  ? formatCurrency(c.quantity * c.discount_value) : formatCurrency(c.quantity * c.regular_price) }`}
                                                </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Divider
                                                    style={{
                                                        margin: "5px 0"
                                                    }} />
                                            </Grid>
                                        )
                                    })}
                                 
                                </Grid>
                          
                            </Grid>
                        
                       
                            <Grid item md={12}>
                                <Grid justify="space-between" container>
                                    <Grid item>
                                        <Typography className={classes.titleOrder}>
                                            SubTotal
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            {`IDR ${formatCurrency(
                                                carts.cartList.map(c=>c.discount_value ? c.discount_value*c.quantity : c.regular_price*c.quantity)
                                                    .reduce((a,b)=>{
                                                        return a + b
                                                    },0)
                                            )}`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider
                                style={{
                                    margin: "5px 0"
                                }} />
                            <Grid item md={12}>
                                <Grid justify="space-between" container>
                                    <Grid item>
                                        <Typography className={classes.titleOrder}>
                                            Shipping fee
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            {shippingFee ? `IDR ${formatCurrency(shippingFee)}`:"Choose Your Shipping Service"}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider
                                style={{
                                    margin: "5px 0"
                                }} />
                            <Grid item md={12}>
                                <Grid justify="space-between" container>
                                    <Grid item>
                                        <Typography className={classes.titleOrder}>
                                            VOUCHER DISCOUNT
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            {this.voucherCheck()}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider
                                style={{
                                    margin: "5px 0"
                                }} />
                            <Grid item md={12}>
                                <Grid justify="space-between" container>
                                    <Grid item>
                                        <Typography  className={classes.titleOrder}>
                                            Total
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                     {`IDR ${formatCurrency(
                                         this.addVoucherToTotal(parseInt(shippingFee) + carts.cartList.map(c => c.discount_value ? c.discount_value * c.quantity : c.regular_price * c.quantity)
                                             .reduce((a, b) =>{
                                                 return a + b
                                             },0)))
                                      }`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <FormHelperText
                                    error={typeof errors.shipping !== "undefined" 
                                        ? true
                                        : false}>{typeof errors.shipping !== "undefined"
                                        ? errors.shipping
                                        : ""}</FormHelperText>
                            </Grid>
                            <Grid item md={12}>
                                <Button 
                                fullWidth 
                                color="primary" 
                                variant="contained" 
                                    disabled={orders.loading}
                                onClick={handlerSubmitOrder}>
                                    CONTINUE TO PAYMENT
                                </Button>
                            </Grid>

                        </Grid>

                    </CardContent>
                </Card>
            </div>
        )
    }
}

Order.propTypes = {
    carts:PropTypes.object.isRequired,
  classes:PropTypes.object.isRequired,
    shippingFee: PropTypes.number.isRequired,
    vouchers:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}


export default withStyles(styles)(Order);
