import React, { Component } from 'react'
import styles from './styles';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import keys from '../../config/keys';
function formatCurrency(value) {
    return value
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
function createArray(value){
    let array = [];
    for (let index = 0; index < value; index++) {
       array.push(index+1);
    }
    return array;
}




const CartList = (props)=>{


      const { classes, handlerChangeQuantity,carts, handlerDeleteCart} = props;

    return (
      <div>
            <Hidden smDown>
                <Grid container spacing={16} >
                    {carts.map((c, i) => { //dummy data
                        return (
                            <Grid item key={i}>
                                <Card >
                                    <CardContent>
                                        <Grid container direction="row" spacing={16}>
                                            <Grid item xs={4}>
                                                <img src={keys.media.url+c.public_id} alt={c.alt}
                                                    style={{ width: "100%" }} />
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Typography variant="h1" className={classes.productTitle}>
                                                    {c.product_name}
                                                </Typography>
                                                <Typography variant="h1" className={classes.productType}>
                                                    {c.type}
                                                </Typography>

                                                <div className={classes.productPricing}>
                                                    <div className={classes.WraperProductPricing}>
                                                        <span className={classNames(classes.regular_price, {
                                                            [classes.isDiscount]: (c.discount_value !== null && c.discount_percentage !== null)
                                                        })}>
                                                            {`IDR ${formatCurrency(c.regular_price)}`}
                                                        </span>
                                                        {(c.discount_value !== null && c.discount_percentage !== null ?
                                                            <div >
                                                                <Typography component="p" className={classes.discount_value}>
                                                                    {`IDR ${formatCurrency(c.discount_value)}`}
                                                                </Typography>
                                                            </div>
                                                            :
                                                            <div >
                                                                <Typography component="p" className={classes.noDiscount}>
                                                                    NO DISCOUNT
                                                </Typography>
                                                            </div>
                                                        )}

                                                    </div>
                                                </div>

                                                <div className={classes.quantityWrapper}>
                                                    <Typography className={classes.normalText} style={{ marginRight: 5 }}>
                                                        Quantity :
                                    </Typography>
                                                    <select name="quantity" id="cart_quantity" onChange={handlerChangeQuantity(i)} value={c.quantity} className={classes.selectQuantity}>
                                                        {createArray(c.stock).map((a, i) => {
                                                            return (
                                                                <option value={a} key={i} >{a}</option>
                                                            )
                                                        })}

                                                    </select>
                                                </div>
                                                <div>
                                                    <Grid container direction="row" >
                                                        <Grid item md={3}>
                                                            <Typography className={classes.normalText}>
                                                                Size
                                                </Typography>
                                                            <Typography className={classes.normalText}>
                                                                Total
                                              </Typography>

                                                        </Grid>
                                                        <Grid item md={6}>
                                                            <Typography className={classes.normalText}>
                                                                : {c.size}
                                                            </Typography>
                                                            <Typography className={classes.normalText}>
                                                                : IDR {formatCurrency(c.quantity * (c.discount_value !== null ? c.discount_value : c.regular_price))}

                                                            </Typography>

                                                        </Grid>

                                                    </Grid>
                                                </div>
                                                {/* <div>
                                    <Grid container justify="space-between">
                                            
                                     
                                  
                                    </Grid>
                                  
                                </div> */}
                                            </Grid>
                                            <Grid item xs={1}>
                                                <IconButton
                                                    color="primary"
                                                    aria-label="delete cart"
                                                    onClick={() => handlerDeleteCart(i)}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </CardContent>

                        
                                </Card>

                            </Grid>
                        )
                    })}
               
                </Grid>
            </Hidden>

            <Hidden mdUp>
                <Grid container spacing={16} >
                    {carts.map((c, i) => { //dummy data
                        return (
                            <Grid item xs={12} key={i}>
                                <Card >
                                    <CardContent>
                                        <Grid container direction="row" spacing={16}>
                                            <Grid item xs={4}>
                                                <img src={keys.media.url+c.public_id} alt={c.alt}
                                                    style={{ width: "100%" }} />
                                            </Grid>
                                            {/* <Grid item xs={3}>
                                                <IconButton
                                                    color="primary"
                                                    aria-label="delete cart"
                                                    onClick={() => handlerDeleteCart(i)}
                                                   
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            </Grid> */}

                                            <Grid item xs={8}>
                                            <Grid container justify="space-between" alignItems="center">
                                                    <Typography variant="h1" className={classes.productTitle}>
                                                        {c.product_name}
                                                    </Typography>
                                                    <IconButton
                                                        color="primary"
                                                        aria-label="delete cart"
                                                        onClick={() => handlerDeleteCart(i)}
                                                    >
                                                        <CloseIcon />
                                                    </IconButton>   
                                            </Grid>
                                           
                                                <Typography variant="h1" className={classes.productType}>
                                                    {c.type}
                                                </Typography>

                                                <div className={classes.productPricing}>
                                                    <div className={classes.WraperProductPricing}>
                                                        <span className={classNames(classes.regular_price, {
                                                            [classes.isDiscount]: (c.discount_value !== null && c.discount_percentage !== null)
                                                        })}>
                                                            {`IDR ${formatCurrency(c.regular_price)}`}
                                                        </span>
                                                        {(c.discount_value !== null && c.discount_percentage !== null ?
                                                            <div >
                                                                <Typography component="p" className={classes.discount_value}>
                                                                    {`IDR ${formatCurrency(c.discount_value)}`}
                                                                </Typography>
                                                            </div>
                                                            :
                                                            <div >
                                                                <Typography component="p" className={classes.noDiscount}>
                                                                    NO DISCOUNT
                                                </Typography>
                                                            </div>
                                                        )}

                                                    </div>
                                                </div>

                                                <div className={classes.quantityWrapper}>
                                                    <Typography className={classes.normalText} style={{ marginRight: 5 }}>
                                                        Quantity :
                                    </Typography>
                                                    <select name="quantity" id="cart_quantity" onChange={handlerChangeQuantity(i)} value={c.quantity} className={classes.selectQuantity}>
                                                        {createArray(c.stock).map((a, i) => {
                                                            return (
                                                                <option value={a} key={i} >{a}</option>
                                                            )
                                                        })}

                                                    </select>
                                                </div>
                                                <div>
                                                    <Grid container direction="row" >
                                                        <Grid item md={3}>
                                                            <Typography className={classes.normalText}>
                                                                Size
                                                </Typography>
                                                            <Typography className={classes.normalText}>
                                                                Total
                                              </Typography>

                                                        </Grid>
                                                        <Grid item md={6}>
                                                            <Typography className={classes.normalText}>
                                                                : {c.size}
                                                            </Typography>
                                                            <Typography className={classes.normalText}>
                                                                : IDR {formatCurrency(c.quantity * (c.discount_value !== null ? c.discount_value : c.regular_price))}

                                                            </Typography>

                                                        </Grid>

                                                    </Grid>
                                                </div>
                                  


                                            </Grid>
                                       
                                        </Grid>
                                    </CardContent>

                                    {/* <Button fullWidth color="primary"
                                    onClick={() => handlerDeleteCart(i)}
                                    variant="contained">
                                        REMOVE
                                </Button> */}
                                </Card>

                            </Grid>
                        )
                    })}

                </Grid> 
            </Hidden>
        
         
      </div>
    )
  
}

CartList.propTypes = {
    carts: PropTypes.array.isRequired,
    handlerChangeQuantity:PropTypes.func.isRequired, 
    handlerDeleteCart: PropTypes.func.isRequired
}


export default  withStyles(styles)(CartList);