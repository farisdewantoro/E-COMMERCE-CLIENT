import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import FormHelperText from '@material-ui/core/FormHelperText';
import keys from '../../config/keys';
const styles = theme => ({
    productTitle: {
        fontFamily: `'Heebo', sans-serif`,
        fontSize: "25px",
        fontWeight:"bold",
        lineHeight: 2

    },
    productType: {
        fontFamily: `'Heebo', sans-serif`,
        fontSize: '1em'
    },
    productPricing: {
        marginTop: 10
    },
    regular_price: {
          fontFamily: `'Heebo', sans-serif`,
        fontSize: 20,
        marginRight: 5
    },
    isDiscount: {
        textDecoration: 'line-through',
        fontSize: 16,
        color: '#484848'
    },
    discount_value: {
        color: '#e53935',
          fontFamily: `'Heebo', sans-serif`,
        fontSize: 20

    },
    discountPercentage: {
        color: '#e53935',
          fontFamily: `'Heebo', sans-serif`,
        fontSize: 20
    },
    productOutOfStock: {
        fontFamily: `'Heebo', sans-serif;`,
        fontSize: 18,
        fontWeight: "700",
        color: "red",
        padding: 5,
        border: "1px solid red"
    },
    noDiscount: {
        opacity: 0,
          fontFamily: `'Heebo', sans-serif`,
        fontSize: 16
    },
    productDiscountPricing: {
        display: 'flex',
        alignItems: 'center'
    },
    productDescription: {
        margin: '10px 0px 10px 0px'
    },
    productPrimary: {
        margin: '10px 0px 10px 0px'
    },
    headingProductDetail: {
          fontFamily: `'Heebo', sans-serif`,
        fontSize: 20
    },

    descriptionHtml: {
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans- serif"
    },
    expanSummary: {
        maxHeight: 200
    },
    productSize: {
        margin: '20px 0'
    },
    productRelatedVariant: {
        margin: '20px 0'
    },
    buttonSize: {
        margin: '5px'
    },
    titleSelectSize: {
          fontFamily: `'Heebo', sans-serif`,
        fontSize: 16
    },
    notActived:{

    },
    isActived:{
        border:'2px solid #1a1a1a',
        boxShadow:'inset 0 0 0 1px #fff'
    }

})
function formatCurrency(value) {
    return value
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

class Detail extends Component {
    state = {
        expanded: "expanProductDescription"
    };
 


    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded
                ? panel
                : false
        });
    };

    render() {
        const {
            dataProduct,
            dataSize,
            classes,
            handlerClickSize,
            sizeSelected,
            dataRelatedVariant,
            nameParams,
            idParams,
            categoryParams,
            addToCart,
            carts,
            handlerCloseSizeFit,
            handlerOpenSizeFit,
            openSizeFit,
            fullScreen,
            dataProductSizing,
            errors,
            notSelected
        } = this.props;
        const {expanded} = this.state;
        let selectedSize = null;
        if (typeof sizeSelected.id !== "undefined") {
            selectedSize = sizeSelected.id;
        }
        if (Object.keys(dataProduct).length > 0) {
            return (
                <div>
                <div className={classes.productPrimary}>
                    <Card>
                        <CardContent>

                            <div className={classes.productNamed}>
                                <Typography variant="h1" className={classes.productTitle}>
                                    {dataProduct.name}
                                </Typography>
                                <Typography variant="h1" className={classes.productType}>
                                        {dataProduct.category_type}
                                </Typography>
                            </div>
                            <div className={classes.productPricing}>
                             
                                        {dataProduct.availability === "true" ?  (
                                        <Grid container direction="row" justify="space-between" alignItems="center">
                                                <div className={classes.productDiscountPricing}>
                                                    <span
                                                        className={classNames(classes.regular_price, {
                                                            [classes.isDiscount]: (dataProduct.discount_value !== null && dataProduct.discount_percentage !== null)
                                                        })}>
                                                        {`IDR ${formatCurrency(dataProduct.regular_price)}`}
                                                    </span>
                                                    {(dataProduct.discount_value !== null && dataProduct.discount_percentage !== null
                                                        ? <Typography component="p" className={classes.discount_value}>
                                                            {`IDR ${formatCurrency(dataProduct.discount_value)}`}
                                                        </Typography>
                                                        : '')}
                                                </div>
                                                {(dataProduct.discount_value !== null && dataProduct.discount_percentage !== null
                                                    ? <Typography component="p" className={classes.discountPercentage}>
                                                        {dataProduct.discount_percentage}
                                                        % OFF
                                            </Typography>
                                                    : <Typography component="p" className={classes.noDiscount}>
                                                        NO DISCOUNT
                                        </Typography>)}
                                             </Grid>
                                        ) : (
                                            <Grid container direction="row" justify="space-between" alignItems="center">
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
                                            </Grid>
                                        )}
                                  
                            
                            </div>

                                <div className={classes.productRelatedVariant}>
                                    <Typography className={classes.titleSelectSize}>
                                        Variant :
                                </Typography>
                                    <Grid container direction="row" spacing={8} style={{ margin: "5px 0" }}>

                                        {dataRelatedVariant.map((dRv, i) => {
                                         
                                            return (
                                                <Grid item md={2} xs={4} key={i}>
                                                    <div className={classNames(classes.notActived, {
                                                        [classes.isActived]: (dRv.category_slug === categoryParams && dRv.slug === nameParams && dRv.product_id.toString() === idParams)
                                                    })}>
                                                        <Link to={`/products/${dRv.category_slug}/${dRv.product_id}-${dRv.slug}`}>
                                                            <img
                                                                src={keys.media.url+dRv.public_id}
                                                                style={{
                                                                    width: '100%'
                                                                }}
                                                                alt="" />
                                                        </Link>

                                                    </div>
                                                </Grid>

                                            )
                                        })}

                                    </Grid>

                                </div>
                                {dataProductSizing instanceof Array 
                                    && dataProductSizing.length > 0
                                    && (
                                    <div>
                                        <Button variant="outlined" onClick={handlerOpenSizeFit}>
                                            <FontAwesomeIcon icon={['fa', 'eye']} size="lg" style={{ margin: "0px 5px" }} />  View Fit Guide
                                </Button>
                                    </div>
                                    )
                                    }
                        
                            <div className={classes.productSize}>
                                <Typography className={classes.titleSelectSize}>
                                    Select Size :
                                </Typography>
                                <Grid container direction="row">
                                    {dataSize.map((s, i) => {
                                        return (
                                            <Grid item key={i}>
                                                <Button
                                                    style={{minWidth:35,padding:"2px 10px"}}
                                                    variant="contained"
                                                    color={selectedSize === s.id
                                                    ? "primary"
                                                    : "secondary"}
                                                    onClick={() => handlerClickSize(s)}
                                                    className={classes.buttonSize}
                                                    disabled={s.stock === 0}>
                                                    {s.size}
                                                </Button>
                                            </Grid>
                                        )

                                    })}

                                </Grid>
                            </div>

                                {(errors.stock || notSelected) && (
                            <FormHelperText error={true}>    
                                        ** {errors.stock ? errors.stock : notSelected}
                            </FormHelperText>
                        )}

                            <div
                                style={{
                                marginTop: 20
                            }}>
                                    <Button fullWidth color="primary" 
                                    variant="contained" onClick={() => addToCart(dataProduct)} 
                                   disabled={carts.loading}>
                                    ADD TO CART
                                </Button>
                            </div>

                        </CardContent>
                    </Card>
                </div>

                <div className={classes.productDescription}>
                    <ExpansionPanel
                        expanded={expanded === 'expanProductDescription'}
                        onChange={this.handleChange('expanProductDescription')}>
                        <ExpansionPanelSummary
                            expandIcon={< ExpandMoreIcon />}
                            className={classes.expanSummary}>
                            <Typography className={classes.headingProductDetail}>Product Detail</Typography>
                        </ExpansionPanelSummary>
                        <Divider/>
                        <ExpansionPanelDetails>
                            <Typography
                                dangerouslySetInnerHTML={{
                                __html: dataProduct.description
                            }}></Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                </div>

                    {dataProductSizing instanceof Array
                        && dataProductSizing.length > 0
                        && (
                        <Dialog
                            fullScreen={fullScreen}
                            open={openSizeFit}
                            onClose={handlerCloseSizeFit}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogActions>
                              
                                <Button onClick={handlerCloseSizeFit} >
                                    <CloseIcon/>
                                </Button>
                            </DialogActions>
                            <DialogContent>
                                <DialogContentText>
                                    <Grid container direction="row" spacing={16}>
                                        <Grid item  xs={12}>
                                            <img src={keys.media.url+dataProductSizing[0].public_id} style={{width:"100%"}} alt={dataProductSizing[0].alt}/>
                                        </Grid>
                                        <Grid item  xs={12}>
                                        <Card>
                                            <CardContent>
                                                    <div dangerouslySetInnerHTML={{ __html: dataProductSizing[0].description}}></div>
                                            </CardContent>
                                        </Card>
                                        </Grid>
                                    </Grid>
                            </DialogContentText>
                            </DialogContent>
                        
                        </Dialog>
                        )
                    }
           
            </div> //end
            )
        } else {
            return (
                <div className="no-data"></div>
            )
        }

    }
}

Detail.propTypes = {
    classes: PropTypes.object.isRequired,
    carts: PropTypes.object.isRequired,
    dataProductSizing:PropTypes.array.isRequired
}

export default withStyles(styles)(Detail);