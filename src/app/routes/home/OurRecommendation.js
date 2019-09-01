import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import TabContainer from './TabContainer';
import withWidth from '@material-ui/core/withWidth';
import {compose} from 'redux'
import ProductList from '../../components/loader/ProductList';
import styles from './styles';

function createLoadingProduct(){
    let loading = [];
    for (let index = 0; index < 8; index++) {
        loading.push(
            <Grid item md={3} xs={6} key={index}>
                <ProductList />
            </Grid>
        )

    }
    return loading;
}
const OurRecommendation = (props)=> {
        const { classes, products} = props;
        return (
            <div>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Grid
                            item
                            md={11}
                            xs={12}
                            style={{
                            marginTop: 100
                        }}>
                            <Paper className={classes.rootOurRecommendation}>
                           
                                <Typography variant="h1" className={classes.titleOurRecommendation} component="h1">
                                    OUR RECOMMENDATION
                                </Typography>
                                {products.length > 0 ? (<TabContainer
                                
                                    products={products}
                                ></TabContainer>) :
                                    (
                                        <div style={{ padding: 10 }}>
                                            <Grid container direction="row" >
                                                {createLoadingProduct()}
                                            </Grid>
                                        </div>
                                    )
                                }
                         
                             

                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

            </div>
        )
   
}

OurRecommendation.propTypes = {
    classes: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
};

export default compose(withStyles(styles, {name: "OurRecommendation"}), withWidth())(OurRecommendation);
