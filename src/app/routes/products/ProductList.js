import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { Link } from 'react-router-dom'
import styles from './styles';
import { Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductLoading from '../../components/loader/ProductList';
import keys from '../../config/keys'
function formatCurrency(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
 class ProductList extends Component {
    
    paginationContainer = ()=>{
        const {current_page,perPage,total_page,results} = this.props.products.pagination;
        const { current_page_state, handleChangePage} = this.props;
        let jarak = 2;
        const page=[];
        for (let index = 0; index < total_page; index++) {
            page.push(index+1);
        }

        if(page.length === 0 && results > 0){
            return(
                <Button variant='contained' color="primary" style={{ padding: 0, margin: 5, minWidth:20, minHeight: 20 }}>
                    1
            </Button>
            )
        
        }
        if(page.length < 4){
            return (
                <div>
                    {page.map((no, i) => {
                        return (
                            <Button 
                            key={i}
                            variant={no === current_page ? 'contained' :'outlined'}
                                color={no === current_page ? 'primary' : 'inherit'}
                                onClick={() => this.props.handleChangePage(no)}
                            style={{ padding: 0, margin: 5, minWidth:20, minHeight: 20 }}>
                                {no}
                            </Button>
                        )
                    })}


                </div>
            )
        }

        if (page.length >= 4) {
            return (
                <div style={{ display: "flex", alignItems:"baseline"}}>
              
                        <div>
                            <Button 
                            disabled={page.filter(p=>p < current_page).length === 0}
                            onClick={() => this.props.handleChangePage(current_page-1)}
                            style={{ padding: 0, margin: 5, minWidth: 25, minHeight: 25 }}>
                                <FontAwesomeIcon
                                    icon={['fas', 'angle-left']}

                                />
                            </Button>
                        </div>
        
                    {page.slice(current_page-jarak, current_page-1).map((no, i) => {
                        return (
                            <div key={i}>
                                <Button
                                    variant={no === current_page ? 'contained' : 'outlined'}
                                    style={{ padding: 0, margin: 5, minWidth: 22, minHeight: 22 }}
                                    color={no === current_page ? 'primary' : 'inherit'}
                                    onClick={() => this.props.handleChangePage(no)}
                                >
                                    {no}
                                </Button>
                            </div>

                        )
                    })}
                  
                    {page.slice(current_page-1, current_page +jarak).map((no, i) => {
                        return (
                            <div key={i}>
                                <Button
                               
                                    variant={no === current_page ? 'contained' : 'outlined'}
                                    style={{ padding: 0, margin: 5, minWidth: 22, minHeight: 22 }}
                                    color={no === current_page ? 'primary' : 'inherit'}
                                    onClick={() => this.props.handleChangePage(no)}
                                >
                                    {no}
                                </Button>
                            </div>

                        )
                    })}
                    <div>
                        <Button
                            disabled={page.filter(p => p > total_page).length === 0}
                            onClick={() => this.props.handleChangePage(current_page + 1)}
                            style={{ padding: 0, margin: 5, minWidth: 25, minHeight: 25 }}>
                            <FontAwesomeIcon
                                icon={['fas', 'angle-right']}

                            />
                        </Button>
                    </div>
              
                </div>
            )
        }
       
      return;
    
    }
    createLoading = ()=>{
        let loading = [];
        for (let index = 0; index < 8; index++) {
            loading.push(
                <Grid item md={3} xs={6} key={index}>
                    <ProductLoading />
                </Grid>
            )
            
        }
        return loading;
    }
    render() {
    
        let { products, current_page_state, handleChangePage } = this.props;
      let { classes } = this.props;
   
    return (
        <div className={classes.containerGridProduct}>
            <Grid 
            container 
            direction="row" 
            spacing={16} 
            alignItems="center"
            justify="space-between" 
            style={{padding:"0px 15px 15px 15px"}}>
                <Grid item>
                    <Typography>
                        ({products.pagination.results} results) 
                    </Typography>
                
                </Grid>
                <Grid item>
                    {this.paginationContainer()}
                </Grid>
            </Grid>
            <Grid container direction="row" spacing={16}>
                {products.loading ? (
                    this.createLoading()
                
                ):(
                        products.product.map((p, i) => {
                            return (
                                <Grid item md={3} key={i} sm={3} xs={6}>
                                    <Card>
                                        <CardActionArea component={Link} to={`/products/${p.category_slug}/${p.id}-${p.slug}`}>
                                            {p.discount_value !== null && p.discount_percentage !== null && (
                                                <div className={classes.containerDiscountPercentage}>
                                                    <Typography className={classes.discountPercentage}>
                                                        {p.discount_percentage}% 
                                                   </Typography>
                                                </div>
                                            )}
                                            <img src={keys.media.url+p.public_id} alt={p.name + ' - ' + p.category_type} title={p.name + ' - ' + p.category_type}  style={{ width: '100%' }} />
                                       
                                         
                                            
                                            <div className={classes.productDetail}>

                                                <div style={{ marginBottom: 10 }}>
                                                    <Typography className={classes.productTitle}>
                                                        {p.name}
                                                    </Typography>
                                                    <Typography className={classes.productType}>
                                                        {p.category_type}
                                                    </Typography>

                                                </div>

                                           
                                                {p.availability === "true" ? (
                                                    <div>
                                                        <div className={classes.productPricing}>
                                                            
                                                            <span className={classNames(classes.regular_price, {
                                                                [classes.isDiscount]: (p.discount_value !== null && p.discount_percentage !== null)
                                                            })}>
                                                                {`IDR ${formatCurrency(p.regular_price)}`}
                                                            </span>
                                                            {p.discount_value !== null && p.discount_percentage !== null && (
                                                                <Typography component="p" className={classes.discount_value}>
                                                                    {`IDR ${formatCurrency(p.discount_value)}`}
                                                                </Typography>
                                                            )}
                                                        </div>
                                                        {(p.discount_value === null && p.discount_percentage === null  && (
                                                            <div >
                                                                <Typography component="p" className={classes.noDiscount}>
                                                                    NO DISCOUNT
                                                </Typography>
                                                            </div>
                                                        ))}          

                                                {/* {(p.discount_value !== null && p.discount_percentage !== null ?
                                                    <div >
                                                        <Grid container direction="row" justify="space-between">
                                                            <Typography component="p" className={classes.discount_value}>
                                                                {`IDR ${formatCurrency(p.discount_value)}`}
                                                            </Typography>
                                                            <Typography component="p" className={classes.discountPercentage}>
                                                                {p.discount_percentage} % OFF
                                                             </Typography>
                                                        </Grid>


                                                    </div>
                                                    :
                                                    <div >
                                                        <Typography component="p" className={classes.noDiscount}>
                                                            NO DISCOUNT
                                                </Typography>
                                                    </div>
                                                   
                                                )} */}
                                                </div>
                                                    ) : (
                                                        <div >
                                                            <div className={classes.productPricing}>
                                                                <span className={classes.productOutOfStock}>
                                                                    OUT OF STOCK
                                                            </span>
                                                            </div>
                                                         
                                                            <div >
                                                                <Typography component="p" className={classes.noDiscount}>
                                                                    NO DISCOUNT
                                                        </Typography>
                                                            </div>
                                                        </div>
                                                    )}
                                                
    
                                        


                                            </div>
                                        </CardActionArea>
                                    </Card>

                                </Grid>
                            )
                        })
                )}
              

            </Grid>
            <Grid
                container
                direction="row"
                spacing={16}
                alignItems="center"
                justify="flex-end"
                style={{ padding: "15px 15px 0px 15px" }}>
             
                <Grid item>
                    {this.paginationContainer()}
                </Grid>
            </Grid>
        </div>
    )
  }
}
ProductList.propTypes = {

    products: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};



export default withStyles(styles, { name: 'ProductList' })(ProductList);
