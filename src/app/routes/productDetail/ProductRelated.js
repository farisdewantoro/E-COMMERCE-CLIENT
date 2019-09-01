import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import classNames from 'classnames';
import { Link } from 'react-router-dom'
import styles from '../products/styles'
import keys from '../../config/keys';
function formatCurrency(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
class ProductRelated extends Component {
    render() {
        const {classes, dataRelatedProductType} = this.props;

   
        return (
          <Card>
            <Grid container justify="center" >
              <Typography className={classes.titleBigProduct}>
                RELATED PRODUCTS
            </Typography>
            </Grid>
           
            <Divider/>
            <CardContent>
            <Grid container direction="row" spacing={24} justify="center" >
          
                {dataRelatedProductType.map((p, i) => {
                  return (
                    <Grid item md={3} xs={6} key={i}>
                      <Card>
                        <CardActionArea component={Link} to={`/products/${p.category_slug}/${p.product_id}-${p.slug}`}>
                          <img src={keys.media.url+p.public_id} alt={p.alt} title={p.caption} style={{ width: '100%' }} />
                          <div className={classes.productDetail}>

                            <div style={{ marginBottom: 10 }}>
                              <Typography className={classes.productTitle}>
                                {p.name}
                              </Typography>
                              <Typography className={classes.productType}>
                                {p.category_type}
                              </Typography>

                            </div>


                            <div className={classes.productPricing}>

                              <span className={classNames(classes.regular_price, {
                                [classes.isDiscount]: (p.discount_value !== null && p.discount_percentage !== null)
                              })}>
                                {`IDR ${formatCurrency(p.regular_price)}`}
                              </span>
                            </div>
                            {(p.discount_value !== null && p.discount_percentage !== null ?
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
                            )}

                          </div>


                        </CardActionArea>
                      </Card>

                    </Grid>
                  )
                })}

            </Grid>
            </CardContent>
          </Card>
        )
    }
}

ProductRelated.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProductRelated);
