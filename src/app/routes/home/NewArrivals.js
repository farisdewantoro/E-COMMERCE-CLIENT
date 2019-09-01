import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import ContainerProducts from './ContainerProducts';
import withWidth,{isWidthUp} from '@material-ui/core/withWidth';
import { compose } from 'redux'
import ProductList from '../../components/loader/ProductList';
import styles from './styles';

function createLoadingProduct(width, isWidthUp){
    let loading = [];
    for (let index = 0; index< slideShow(width, isWidthUp) ; index++) {
        loading.push(
            <Grid item md={3} xs={6} key={index}>
                <ProductList />
            </Grid>
        )

    }
    return loading;
}

function slideShow(width, isWidthUp) {
    if (isWidthUp('sm', width)) {
        return 4
    } else {
        return 2
    }
}
const NewArrivals = (props) =>{
    const { newarrivals, products, classes,width} = props;
    return(
        <div>
            <Grid item xs={12}>
                <Grid container justify="center" direction="row">
                    <Grid
                        item
                        md={11}
                        xs={12}
                        style={{
                            marginTop: 100
                        }}>
                        <Typography variant="h1" className={classes.titleNewArrivals} component="h1">
                            NEW ARRIVALS
                                </Typography>
                   
                        {newarrivals.length > 0 ? (<ContainerProducts
                            slideShow={slideShow(width,isWidthUp)}
                            products={newarrivals}
                        ></ContainerProducts>) :
                            (
                                <div style={{ padding: 10 }}>
                                    <Grid container direction="row" >
                                        {createLoadingProduct(width, isWidthUp)}
                                    </Grid>
                                </div>
                            )
                        }
                    </Grid>
                </Grid>
            </Grid>

        </div>
    )
}


NewArrivals.propTypes = {
    classes: PropTypes.object.isRequired,
    getProductWithParamCategory: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
    category: PropTypes.array.isRequired
};

export default compose(withStyles(styles, { name: "NewArrivals" }), withWidth())(NewArrivals);
