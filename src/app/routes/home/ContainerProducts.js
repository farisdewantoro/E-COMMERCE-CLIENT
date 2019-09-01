import React,{Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { Link } from 'react-router-dom'
import styles from '../products/styles'
import Slider from 'react-slick'
import keys from '../../config/keys';
function formatCurrency(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}



const ContainerProducts = (props)=>{
    let { classes, isWidthUp, width, slideShow,products } = props;
    
   
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slideShow,
        slidesToScroll: 1,
        arrows: true,
        autoplaySpeed:4000,
        autoplay: true,
        // centerMode: true,
    };
    let imageContain =[];

    if(products.length > 0)
    {
        imageContain =  products.map((p, i) => {
            return (
                <div style={{margin:5}}>
                    <Card>
                        <CardActionArea component={Link} to={`/products/${p.category_slug}/${p.product_id}-${p.slug}`}>
                            {p.discount_value !== null && p.discount_percentage !== null && (
                                <div className={classes.containerDiscountPercentage}>
                                    <Typography className={classes.discountPercentage}>
                                        {p.discount_percentage}%
                                                   </Typography>
                                </div>
                            )}
                            <img src={keys.media.url+p.public_id} alt={p.name + ' - ' + p.category_type} title={p.name + ' - ' + p.category_type} style={{ width: '100%' }} />



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
                                        {(p.discount_value === null && p.discount_percentage === null && (
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

                </div>
            )
        })
    }


    return(
        <div className={classes.containerNewArrivals}>

            <Slider {...settings}>
                {imageContain}
            </Slider>
              

        </div>
    )
}



ContainerProducts.propTypes = {
    products:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired
};



export default  withStyles(styles,{name:'ContainerProducts'})(ContainerProducts);
