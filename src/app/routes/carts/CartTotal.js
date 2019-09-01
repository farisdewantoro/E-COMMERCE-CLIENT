import React, { Component } from 'react'
import styles from './styles';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
function formatCurrency(value) {
    return value
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

class CartTotal extends Component {
    state={
        subTotal:0
    }
    componentDidMount(){
        let subTotal = 0;
        this.props.carts.forEach(c => {
            subTotal = subTotal + (c.discount_value ? (c.discount_value * c.quantity) : (c.regular_price * c.quantity))
        });
        this.setState({
            subTotal: subTotal
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.carts !== this.props.carts){
            let subTotal = 0;
            nextProps.carts.forEach(c => {
                subTotal = subTotal+(c.discount_value ? (c.discount_value* c.quantity):(c.regular_price*c.quantity))
            });
            this.setState({
                subTotal:subTotal
            })
        }
    }
    voucherCheck = ()=>{
        if(this.props.vouchers.voucher.voucher_type_id === 1){
            return `${this.props.vouchers.voucher.value}%`;
        }
        if (this.props.vouchers.voucher.voucher_type_id === 2){
            return `- IDR ${formatCurrency(this.props.vouchers.voucher.value)}`;
        }
    }
    addVoucherToTotal = (subTotal) =>{
        if (this.props.vouchers.voucher.voucher_type_id === 1) {
            let discount = subTotal * (this.props.vouchers.voucher.value/100);
            let total = Math.max(1,subTotal - discount);
            return `IDR ${formatCurrency(total)}`;
        }
        if (this.props.vouchers.voucher.voucher_type_id === 2) {
            let total = Math.max(1,subTotal - this.props.vouchers.voucher.value);

            return `IDR ${formatCurrency(total)}`;
        }
    }
  render() {
      const { classes, handlerChangeVoucher, handlerSubmitVoucher, voucher, vouchers, carts} = this.props;
      const { subTotal} = this.state;
    return (
      <div>
          <Grid container direction="column" spacing={16}>
      
         <Grid item>
        <Card>
      
        
            <CardContent>
                <Grid container direction="row">
                <Grid item xs={12}>
                                    <Grid container direction="column">
                                        {carts.map((c, i) => {

                                            return (
                                                <Grid item xs={12} key={i}>
                                                    <Grid justify="space-between" container>
                                                        <Grid  >
                                                            <div className={classes.productListCart}>
                                                                <Typography>
                                                                    {c.product_name}   -
                                                            </Typography>
                                                                <Typography style={{ marginLeft: "5px" }}>
                                                                    {c.size}
                                                                </Typography>
                                                                <CloseIcon style={{ fontSize: 12, margin: "0px 5px" }} />
                                                                <Typography >
                                                                    {c.quantity}
                                                                </Typography>
                                                            </div>

                                                        </Grid>
                                                        <Grid >
                                                            <Typography>
                                                                {`IDR ${c.discount_value ? formatCurrency(c.quantity * c.discount_value) : formatCurrency(c.quantity * c.regular_price)}`}
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
           
                        <Grid item xs={12}>
                            <Grid container justify="space-between" style={{ margin: "10px 0" }}>
                                <Typography variant="h1" className={classes.normalText}>
                                    Total
                        </Typography>
                                <Typography variant="h1" className={classes.normalText}>
                             {typeof vouchers.voucher.voucher_type_id !== "undefined" ?
                            this.addVoucherToTotal(subTotal) :`IDR ${formatCurrency(subTotal)}`}
                                  
                        </Typography>
                            </Grid>
                            <Divider />
                        </Grid>

                        {/* <Grid item xs={12}>
                        <div style={{margin:"25px 0"}}>

                            <Button 
                            variant="contained" 
                            component={Link}
                            to="/order-account"
                            fullWidth color="primary"
                            >
                                    CONTINUE TO PAYMENT
                            </Button>
                        </div>
                        
                        </Grid>  */}

                </Grid>
            </CardContent>
        </Card>

                </Grid>
            </Grid>
      </div>
    )
  }
}

CartTotal.propTypes = {
    carts: PropTypes.array.isRequired
}


export default withStyles(styles)(CartTotal);