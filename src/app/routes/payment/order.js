import React, {Component} from 'react'
import PropTypes, { instanceOf } from 'prop-types';
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
function formatCurrency(value) {
    return value
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
class Order extends Component {
    voucherCheck = () => {
        if (this.props.orders.order_voucher instanceof Array && this.props.orders.order_voucher.length > 0 && this.props.orders.order_voucher[0].voucher_type === 1) {
            return `${this.props.orders.order_voucher[0].value}%`;
        }
        if (this.props.orders.order_voucher instanceof Array && this.props.orders.order_voucher.length > 0 && this.props.orders.order_voucher[0].voucher_type === 2) {
            return `- IDR ${formatCurrency(this.props.orders.order_voucher[0].value)}`;
        }
        if (this.props.orders.order_voucher instanceof Array && this.props.orders.order_voucher.length > 0 && typeof this.props.orders.order_voucher[0].value === "undefined"){
            return 'NONE'
        }
    }
    addVoucherToTotal = (subTotal) => {
 
        if (this.props.orders.order_voucher instanceof Array && this.props.orders.order_voucher.length > 0 && this.props.orders.order_voucher[0].voucher_type === 1) {
            let discount = subTotal * (this.props.orders.order_voucher[0].value / 100);
            let total = Math.max(1, subTotal - discount);
            return `IDR ${formatCurrency(total)}`;
        }
        if (this.props.orders.order_voucher instanceof Array && this.props.orders.order_voucher.length > 0 && this.props.orders.order_voucher[0].voucher_type === 2) {
            let total = Math.max(1, subTotal - this.props.orders.order_voucher[0].value);

            return `IDR ${formatCurrency(total)}`;
        }
        if (this.props.orders.order_voucher.length === 0 || typeof this.props.orders.order_voucher[0].value === "undefined") {
            return `IDR ${subTotal}`
        }
    }
    render() {
        const { classes, orders} = this.props;
        let subTotal;
        let total;
        if(orders.order_item.length > 0){
            subTotal=(
                <Typography>
                    {`IDR ${formatCurrency(
                        orders.order_item.map(c => c.price)
                            .reduce((a, b) =>{
                                return a + b
                            },0)
                    )}`}
                </Typography>
            ) 
        }
        if (orders.order_shipment.length > 0 && orders.order_item.length > 0){
            total=(
                <Typography>
                    {
                        this.addVoucherToTotal(parseInt(orders.order_shipment.map(os => os.cost)) + orders.order_item.map(c => c.price)
                            .reduce((a, b) =>{
                                return a + b
                            },0))
                        }
                </Typography>
            ) 
        }
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
                                    {orders.order_item.map((c,i)=>{
                                    
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
                                                            {`IDR ${formatCurrency(c.price)}`}
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
                                        {subTotal}
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
                                            {`IDR ${formatCurrency(orders.order_shipment.map(os => os.cost))}`}
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
                                        {total}
                                    </Grid>
                                </Grid>
                            </Grid>

                    

                        </Grid>

                    </CardContent>
                </Card>
            </div>
        )
    }
}

Order.propTypes = {
    orders:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired,
  
}


export default withStyles(styles)(Order);
