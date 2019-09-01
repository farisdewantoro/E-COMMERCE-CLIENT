import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import {withStyles,withTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import { getProductDetail} from '../../actions/productActions';
import { addToCart,removeErrors} from '../../actions/cartActions';
import ImageDetail from './imageDetail'
import Detail from './Detail'
import ProductRelated from './ProductRelated';
import withWidth from '@material-ui/core/withWidth';
import styles from './styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import ReactPixel from 'react-facebook-pixel';
import {withRouter} from 'react-router-dom';
import Page from '../../components/page';
import keys from '../../config/keys';
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
class ProductDetail extends Component {
    constructor(props){
        super(props);
        this.state={
            productDetail:{
                dataImage: [],
                dataProduct: {},
                dataSize:[],
                dataRelatedVariant:[],
                dataRelatedProductType:[]
            },
            sizeSelected:{},
            notification:{
                error:false,
                message:'',
                openNotification:false
            },
            openSizeFit:false,
            notSelected:''
        
        }
    }
    componentDidMount() {
        let paramsData= this.props.match.params.name.split(/([-])/g);
        let nameParams = paramsData[2];
        let idParams =paramsData[0];
        this.props.getProductDetail(this.props.match.params.category, idParams, nameParams)
        this.props.removeErrors();
        // console.log(this.props);
        // let data={
        //     value:
        // }
    
    }

    componentWillReceiveProps(nextProps){
        
        this.setState({
            notSelected:''
        })
        if(nextProps.products.productDetail !== this.props.productDetail){
            let imgData = nextProps.products.productDetail.dataImage;
            let pData = nextProps.products.productDetail.dataProduct;
            let sizeData = nextProps.products.productDetail.dataSize; 
            let relatedVariantData = nextProps.products.productDetail.dataRelatedVariant; 
            let relatedProductTypeData = nextProps.products.productDetail.dataRelatedProductType; 
           
            if (pData !== this.state.dataProduct) {
                if(pData.length > 0){
                    let data = {
                        value: pData[0].discount_value ? pData[0].discount_value : pData[0].regular_price,
                        currency:'IDR',
                        content_ids: pData[0].product_id,
                        content_type:'product_group',
                        content_name:pData[0].name
                    };
                    ReactPixel.trackCustom('ViewContent', data);
                }
             
                this.setState(prevState=>({
                    productDetail:{
                        ...prevState.productDetail,
                        dataProduct: pData[0]
                    }
                }))
            }
            if (imgData) {
            this.setState(prevState=>({
                productDetail:{
                    ...prevState.productDetail,
                    dataImage:imgData
                }
            }))
          }
            if (sizeData){
                this.setState(prevState=>({
                    productDetail:{
                        ...prevState.productDetail,
                        dataSize: sizeData
                    }
                }))
            }
            if (relatedVariantData){
                this.setState(prevState=>({
                    productDetail:{
                        ...prevState.productDetail,
                        dataRelatedVariant: relatedVariantData.map((data,i)=>{
                            return data
                        })
                    }
                }))
            }
            if (relatedProductTypeData) {
                this.setState(prevState => ({
                    productDetail: {
                        ...prevState.productDetail,
                        dataRelatedProductType: relatedProductTypeData.map((data, i) => {
                            return data
                        })
                    }
                }))
            }
            // if(Object.keys(errors).length > 0 && (carts.cartList == this.props.carts.cartList)){
            //     this.setState(prevState=>({
            //         notification:{
            //             ...prevState.notification,
            //             error:errors.error,
            //             message:errors.message,
            //             openNotification:errors.notification
            //         }
            //     }))
            // }
            // if(Object.keys(errors).length === 0 && (carts.cartList !== this.props.carts.cartList)){
            //     this.setState(prevState => ({
            //         notification: {
            //             ...prevState.notification,
            //             error: false,
            //             message: 'ADDED TO YOUR CART.',
            //             openNotification:true
            //         }
            //     }))
            // }
   
      
        }
    }
    
    handlerOpenSizeFit = ()=>{
        this.setState({
            openSizeFit:true
        })
    }
    handlerCloseSizeFit =()=>{
        this.setState({
            openSizeFit:false
        })
    }

    handlerClickSize = (data) =>{
        this.setState({
            sizeSelected:data
        });
     
    }
    // handleCloseNotification = ()=>{
    //     this.setState({
    //         openNotification:false
    //     })
    // }
    
    addToCart =(data)=>{
        
        if(Object.keys(this.state.sizeSelected).length > 0){

      

            let product ={
                product_id:data.product_id,
                product_variant_id:data.product_variant_id,
                product_attribute_id:this.state.sizeSelected.id
            };
            const dataFB = {
                contents: [
                    {
                        id: data.product_id,
                        name: data.slug,
                        quantity: 1,
                        item_price: (typeof data.discount_value !== "undefined" && data.discount_value !== null && data.discount_value.length > 0 ?
                            data.discount_value : data.regular_price)
                    }
                ],
                currency:'IDR',
                value: (typeof data.discount_value !== "undefined" && data.discount_value !== null && data.discount_value.length > 0 ?
                    data.discount_value : data.regular_price),
                content_ids: data.product_id

            }


            ReactPixel.trackCustom('AddToCart', dataFB);

            this.props.addToCart(product,this.props.history);
      

          
        }else{
            this.setState({
                notSelected: 'Please select size to continue'
            })
        }
        
    }
    render() {
        const { classes, carts, theme, fullScreen, errors} = this.props;
        const { dataProduct, dataImage, dataSize, dataRelatedVariant, dataRelatedProductType} = this.state.productDetail; 
        const { dataProductSizing} = this.props.products.productDetail;
        const { sizeSelected, notSelected} = this.state;
        let paramsData = this.props.match.params.name.split(/([-])/g);
        let nameParams = paramsData[2];
        let idParams = paramsData[0];
        let categoryParams = this.props.match.params.category;

        // const {}= this.props.products.productDetail;
        if (Object.keys(this.props.products.productDetail).length > 0 && this.props.products.productDetail.dataImage.length > 0 && this.props.products.productDetail.dataProduct.length > 0){
            return (
                <Page
                    id="ProductDetail"
                    title={`${capitalize(categoryParams)} - ${dataProduct.name} - ${dataProduct.category_type} `}
                    description={`Jual ${capitalize(categoryParams)} jenis ${dataProduct.name} tipe ${dataProduct.category_type} bandung indonesia `}
                    category={`${capitalize(categoryParams)}`}
                    tag={`${capitalize(categoryParams)} - ${dataProduct.name} - ${dataProduct.category_type} `}
                    image={dataImage[0] ? keys.media.url+dataImage[0].public_id : false }
                >
                    
                <div className={classes.rootProductsDetail}>
                    <Grid container direction="column">
                        <Grid item xs={12}>
                            <Grid container justify="center">
                                <Grid item md={11}>
                                    <Card>
                                    

                                        <CardContent>
                                            {/* <div style={{ marginBottom: 20 }}>
                                                <Button className={classes.titleParams} component={Link} to="/products">
                                                    Products
                                        </Button>
                                                <FontAwesomeIcon
                                                    icon={['fas', 'angle-right']}
                                                    size="lg"
                                                    style={{
                                                        marginLeft: 5,
                                                        marginRight: 5
                                                    }} />
                                                <Button
                                                    className={classes.titleParams}
                                                    component={Link}
                                                    to={`/products/${this.props.match.params.category}`}>
                                                    {this.props.match.params.category}
                                                </Button>
                                                <FontAwesomeIcon
                                                    icon={['fas', 'angle-right']}
                                                    size="lg"
                                                    style={{
                                                        marginLeft: 5,
                                                        marginRight: 5
                                                    }} />
                                                <Button className={classes.titleParams} disabled>
                                                    {this
                                                        .props
                                                        .match
                                                        .params
                                                        .name
                                                        .replace(/([0-9\-])/g, '')}
                                                </Button>
                                            </div> */}

                                            <Grid container direction="row" spacing={40}>
                                                <Grid item md={6} xs={12}>
                                                        <ImageDetail dataProduct={dataProduct} dataImage={dataImage}  
                                                    theme={theme}
                                                    width={this.props.width}/>
                                                </Grid>
                                                <Grid item md={6}>
                                                    <Detail
                                                        dataProduct={dataProduct}
                                                        dataSize={dataSize}
                                                        handlerClickSize={this.handlerClickSize}
                                                        sizeSelected={sizeSelected}
                                                        dataRelatedVariant={dataRelatedVariant}
                                                        nameParams={nameParams}
                                                        idParams={idParams}
                                                        categoryParams={categoryParams} 
                                                        addToCart={this.addToCart}
                                                        carts={carts}
                                                        handlerCloseSizeFit={this.handlerCloseSizeFit}
                                                        handlerOpenSizeFit={this.handlerOpenSizeFit}
                                                        openSizeFit={this.state.openSizeFit}
                                                        fullScreen={fullScreen}
                                                        dataProductSizing={dataProductSizing}
                                                            errors={errors}
                                                            notSelected={notSelected}
                                                       />
                                                        
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                       
                                    <div className={classes.productRelatedWrapper}>
                                        <ProductRelated
                                            dataRelatedProductType={dataRelatedProductType}
                                        />
                                    </div>
                                      
                                                 
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

              
                    {/* <Snackbars
                       notification={notification}
                    /> */}
                                      
                </div>

                </Page>
            )   
        }else{
            return (
                <div className="no-data"></div>
            )
        }
      
    }
}

ProductDetail.propTypes = {
    products: PropTypes.object.isRequired,
    carts:PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    getProductDetail:PropTypes.func.isRequired,
    addToCart:PropTypes.func.isRequired,
    removeErrors:PropTypes.func.isRequired,
    fullScreen: PropTypes.bool.isRequired,
    errors:PropTypes.object.isRequired
}

const mapStateToProps = state => (
    {
        products: state.products,
        carts:state.carts,
        errors:state.errors
    
    });

export default compose(
    connect(mapStateToProps, 
    { getProductDetail, addToCart, removeErrors}), 
withStyles(styles, {name: "ProductDetail"}),
    withWidth(),
    withMobileDialog(),
    withTheme())(withRouter(ProductDetail));
