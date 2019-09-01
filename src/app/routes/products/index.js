import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import FilterContainer from './Filter';
import ProductListContainer from './productListContainer'
import update from 'react-addons-update';
import { getProductWithQuery} from '../../actions/productActions';
import styles from './styles';
import CollectionGallery from './CollectionGallery';
import {withRouter} from 'react-router';
import queryString from 'query-string';
import ReactPixel from 'react-facebook-pixel';
import Page from '../../components/page';
import BannerProducts from './BannerProducts';
import withWidth,{isWidthUp} from '@material-ui/core/withWidth';

function imageRender(props) {
    if (isWidthUp('sm', props.width)) {
        let image ={
            banner: props.products.banner_desktop,
            banner_promo: props.products.banner_promo_desktop
        }
        return image;
    } else {
        let image = {
            banner: props.products.banner_mobile,
            banner_promo: props.products.banner_promo_mobile
        }
        return image;
    }
}

function prettyText(value) {

    let findCapital = value.match(/([A-Z])\w+/g);
    if (findCapital !== null) {
        var regex = new RegExp(findCapital, 'g');
        value = value.replace(regex, ` ${findCapital}`);
    }
    value = value.charAt(0).toUpperCase() + value.slice(1);
    return value
}
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
class Products extends Component {
  constructor(props){
      super(props);
      this.state={
        current_page_state:1,
        chips:[
          
        ],
          anchorEl: null,
          filter:{
              priceSelected:'all',
              colorSelected:[],
              orderBy:''
          },
          resultSearchText:'',
          searchProduct:'',
          colors:[]
     
      }
  }


    updateColorActive = (key, c) => {
        this.setState({
            colors: update(this.state.colors, { [key]: { $set: { original_color: c.original_color, hex_color: c.hex_color, isActive: true } } })
        })

    }
    componentDidMount(){
        if (this.props.UI.product_color) {
            this.setState({
               colors:this.props.UI.product_color.map(o => {
                    return {
                        original_color: o.original_color,
                        hex_color: o.hex_color,
                        isActive: false
                    }
                })
            });
        }
        
        let query = queryString.parse(this.props.location.search);
  
   

        if(typeof query.search !== "undefined" && query.search.length > 0){
          
            this.setState({
                resultSearchText:query.search.toUpperCase(),
                searchProduct:query.search
            });
     
         
        }
    


    
    

        this.props.getProductWithQuery(
            this.props.match.params.tag, 
            this.props.match.params.category, 
            this.props.match.params.type, 
            this.props.match.params.collection, 
            this.props.location.search);
    
        
    }
    UNSAFE_componentWillReceiveProps(nextProps){
     
        let query = queryString.parse(this.props.location.search);
        let chipContainer = [];
        let queryColor;
        let queryPrice;
        let colorActive;
        if (nextProps.UI.product_color !== this.props.UI.product_color && typeof query.color === "undefined") {
            this.setState({
                colors: nextProps.UI.product_color.map(o => {
                    return {
                        original_color: o.original_color,
                        hex_color: o.hex_color,
                        isActive: false
                    }
                })
            });
        }


        if (nextProps.UI.product_color !== this.props.UI.product_color && typeof query.color !== "undefined" && query.color instanceof Array && query.color.length > 0) {
            queryColor = query.color.map(qc => {
                return {
                    name: prettyText(nextProps.UI.product_color.filter(c => c.hex_color === qc).map(cM => cM.original_color).toString()),
                    value: qc,
                    type: 'color'
                }
            });
            colorActive = query.color.map(qc => {
                return nextProps.UI.product_color.findIndex(x => x.hex_color === qc);
            });

            let newColor = nextProps.UI.product_color.map((c, i) => {
                return {
                    original_color: c.original_color,
                    hex_color: c.hex_color,
                    isActive: (colorActive.filter(caa => caa === i).length > 0 ? true : false)
                }
            })

            this.setState({
                colors: newColor
            })


        }

        if (nextProps.UI.product_color !== this.props.UI.product_color && typeof query.color !== "undefined" && typeof query.color === "string" && query.color.length > 0) {
            queryColor = nextProps.UI.product_color.filter(c => query.color === c.hex_color).map(cM => {
                return {
                    name: prettyText(cM.original_color),
                    value: query.color,
                    type: 'color'
                }

            });
            let newColor = nextProps.UI.product_color.map((c, i) => {
                return {
                    original_color: c.original_color,
                    hex_color: c.hex_color,
                    isActive: (query.color === c.hex_color ? true : false)
                }
            })
            this.setState({
                colors: newColor
            });
        }
        if (nextProps.UI.product_color !== this.props.UI.product_color && (typeof queryColor !== "undefined" || typeof query.price !== "undefined")){

            if (typeof query.price !== "undefined" && typeof query.price === "string" && query.price.length > 0) {
                queryPrice = { type: 'price', value: query.price, name: query.price.toUpperCase() };
                this.setState(prevState => ({
                    filter: {
                        ...prevState.filter,
                        priceSelected: query.price
                    }
                }))
            }

            if (queryColor) chipContainer = chipContainer.concat(queryColor);
            if (queryPrice) chipContainer.push(queryPrice);
            if (chipContainer.length > 0) {
                this.setState({
                    chips: this.state.chips.concat(chipContainer)
                });
            }
        }
        
    }
    UNSAFE_componentWillUpdate(nextProps,nextState){
        if (nextState.chips !== this.state.chips 
            || nextState.filter.orderBy !== this.state.filter.orderBy
            || nextState.current_page_state !== this.state.current_page_state
            ){
            let chips = nextState.chips;
            let current_page = nextState.current_page_state;
            let queryParams={
                color:[],
            }
        
            if(nextState.filter.orderBy !== ''){
                queryParams.orderBy = nextState.filter.orderBy
            }
            if(typeof nextState.current_page_state !== "undefined"){
                queryParams.page = current_page;
            }

            chips.forEach((chip,i)=>{
                if(chip.type === "color"){
                    queryParams.color.push(chip.value);
                }
                if(chip.type === "price"){
                    queryParams.price =  chip.value;
                }
            }) 
            
            if (this.state.searchProduct !== '' && typeof this.state.searchProduct !== "undefined"){
                queryParams.search = this.state.searchProduct;
                this.props.history.push({
                    search: queryString.stringify(queryParams)
                })
          

                this.props.getProductWithQuery(
                    this.props.match.params.tag, 
                    this.props.match.params.category, 
                    this.props.match.params.type, 
                    this.props.match.params.collection, 
                    queryString.stringify(queryParams));

        
                const data = {
                    search_string: queryString.stringify(queryParams)
                };

                ReactPixel.trackCustom('Search', data);
            }
          
            if (this.state.searchProduct === '' || nextState.searchProduct === ''){
                delete queryParams.search;
                // console.log(queryString.stringify(queryParams));
                this.props.history.push({
                    search: queryString.stringify(queryParams)
                })
                this.props.getProductWithQuery(
                    this.props.match.params.tag, 
                    this.props.match.params.category, 
                    this.props.match.params.type, 
                    this.props.match.params.collection, 
                    queryString.stringify(queryParams));
                // const options = {
                //     autoConfig: true, 	// set pixel's autoConfig
                //     debug: false, 		// enable logs
                // };
                // const data = {
                //     search_string: queryString.stringify(queryParams)
                // };
                // ReactPixel.init('365684027172803', options);
                // ReactPixel.track('Search', data);
            }
            
        }
     
        
        
    }
    // componentWillReceiveProps(nextProps){
    //     if(this.props.products.product !== nextProps.products.product){
    //         this.setState({
    //             products:nextProps.products.product
    //         });
    //     }
   
        
    // }
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    onCheckedPrice = (data) => {
        let indexChips = null;
        this.state.chips.forEach((c, i) => {
            if (c.type === "price") {
                indexChips = i;
            }
        });
        if(indexChips !== null ){
            this.setState({
                chips: update(this.state.chips, { [indexChips]: { $set: { type: 'price', value: data, name: data.toUpperCase() } } })
            });
       
        }else{
            this.setState({
                chips: this.state.chips.concat([{ type: 'price', value: data, name: data.toUpperCase()}])
            })
        }
        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                priceSelected: data
            }
        }))
    }
    handleChangePage = (no)=>{
        this.setState({
            current_page_state:no
        });
    }
    handleClose = () => {
   
        this.setState({ anchorEl: null });
    }
    handleSelectedOrderBy =(data)=>{
        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                orderBy: data
            }
        }))
        this.setState({ anchorEl: null });
    }
    handleRemoveFilter = ()=>{
        this.setState({
            chips:[],
            resultSearchText:''
        })
        this.setState(prevState => ({
            colors: prevState.colors.map((c, i) => {
                return {
                    original_color: c.original_color,
                    hex_color: c.hex_color,
                    isActive: false
                }
            })
        }))
        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                priceSelected: ''
            }
        }))
    }
    onCheckedColor = (c,key) =>{
        let checkIfAvailable = false;
        let numberIndex;
        this.state.chips.forEach((chip,i)=>{
            if(chip.type === 'color' && chip.value === c.hex_color){
                checkIfAvailable = true;
                numberIndex = i;
            }
        })
        if (checkIfAvailable && typeof numberIndex == 'number'){
            this.setState(prevState=>({
                chips: prevState.chips.filter((chip, index) => index !== numberIndex)
            }))
            this.setState({
                colors: update(this.state.colors, { [key]: { $set: { original_color: c.original_color, hex_color: c.hex_color, isActive: false } } })
            })
        }else{
            this.setState({
                chips: this.state.chips.concat([{ type: 'color', value: c.hex_color, name: prettyText(c.original_color) }])
            })
           this.setState({
                colors: update(this.state.colors, { [key]: { $set: { original_color:c.original_color,hex_color:c.hex_color,isActive:true}}})
            })
        }
     
    }
    clickClearPrice = (value) =>{
        this.setState(prevState=>({
            chips:prevState.chips.filter((chip,i)=> chip.type !== value)
        }))
        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                priceSelected: ''
            }
        }))
    }
    clickClearColor = (value)=>{
        this.setState(prevState => ({
            chips: prevState.chips.filter((chip, i) => chip.type !== value)
        }));
     
        this.setState(prevState=>({
            colors:this.state.colors.map((c,i)=>{
                return{
                    original_color:c.original_color,
                    hex_color:c.hex_color,
                    isActive:false
                }
            })
        }))
     
    }
    handleDeleteChips = (value,index) =>{
        this.setState(prevState=>({
            chips:prevState.chips.filter((chip,i)=>i !== index)
        }))
        if(value.type === 'color'){
            this.setState(prevState=>({
                colors:update(prevState.colors,{[index]:{$set:{original_color:value.name,hex_color:value.value,isActive:false}}})
            }))
        }
        if(value.type === 'price'){
            this.setState(prevState => ({
                filter: {
                    ...prevState.filter,
                    priceSelected: ''
                }
            }))
        }
    }
    onChangeSearch = (e)=>{
        this.setState({
            searchProduct:e.target.value
        });
    }
    onKeypressSearch=(e)=>{
        if(e.key === 'Enter' && this.state.searchProduct !== ''){
            this.onSubmitSearch();
        }
    }
    handleDeleteSearch=(e)=>{
        this.setState({
            resultSearchText:'',
            searchProduct:''
        });
        this.props.history.push({
            search: ''
        })
        this.handleRemoveFilter();
    
    
    }
    onSubmitSearch = (e)=>{
        e.preventDefault();
        this.handleRemoveFilter();
            let queryParams = {
                search: this.state.searchProduct
            }
        this.setState({
            resultSearchText:this.state.searchProduct.toUpperCase()
        });
    
         
        this.props.getProductWithQuery(
            this.props.match.params.tag, 
            this.props.match.params.category,
            this.props.match.params.type, 
            this.props.match.params.collection, 
            queryString.stringify(queryParams));
    }
   


  render() {
      const { classes, UI, collections, products,history} = this.props;
      let { chips, anchorEl, filter } = this.state;
    
      let params = this.props.match.params;
      let paramString = Object.values(params).map(p => capitalize(p)).toString();
    //   paramString = capitalize(paramString);
    return (
        <Page
            id="Products"
            title={`${paramString} Collections`}
        >


      <div >
         
        <Grid container >
             
           <Grid item xs={12}>
                    {collections.collection.length > 0 ? (<CollectionGallery collection={collections} />) : ''}


                        <Grid container justify="center">
                            <Grid item xs={12} md={11} className={classes.marginProduct}>
                                <BannerProducts
                                    imageRender={imageRender(this.props)}
                                />

                        </Grid>
                     
                            <Grid item md={11} xs={12} >
           
                            <Grid container direction="row" spacing={16}>
                              
                                   <FilterContainer 
                                        filterData={filter}
                                        UI={UI}
                                        onCheckedPrice={this.onCheckedPrice}
                                        onCheckedColor={this.onCheckedColor}
                                        clickClearPrice={this.clickClearPrice}
                                        colors={this.state.colors}
                                        clickClearColor={this.clickClearColor}
                                    onChangeSearch={this.onChangeSearch}
                                    searchProduct={this.state.searchProduct}
                                    // onKeypressSearch={this.onKeypressSearch}
                                    onSubmitSearch={this.onSubmitSearch}
                                    anchorEl={anchorEl}
                                    handleClose={this.handleClose}
                                    handleSelectedOrderBy={this.handleSelectedOrderBy}
                                    handleClick={this.handleClick}
                                    handleRemoveFilter={this.handleRemoveFilter}
                                       />
                              
                                    <ProductListContainer 
                                    params={params}
                                    anchorEl={anchorEl}
                                    handleClick={this.handleClick}
                                    handleClose={this.handleClose}
                                    handleSelectedOrderBy={this.handleSelectedOrderBy}
                                    chips={chips}
                                    handleRemoveFilter={this.handleRemoveFilter}
                                    handleDeleteChips={this.handleDeleteChips}
                                    handleDeleteSearch={this.handleDeleteSearch}
                                    products={products}
                                    history={history}
                                    onChangeSearch={this.onChangeSearch}
                                    searchProduct={this.state.searchProduct}
                                    // onKeypressSearch={this.onKeypressSearch}
                                    onSubmitSearch={this.onSubmitSearch}
                                    resultSearchText={this.state.resultSearchText}
                                    current_page_state={this.state.current_page_state}
                                    handleChangePage={this.handleChangePage}
                                    />
                            </Grid>
                         
                           
                        </Grid>
                    </Grid>
           </Grid>
        </Grid>
      </div>

        </Page>
    )
  }
}

Products.propTypes={
    products:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired,
    getProductWithQuery:PropTypes.func.isRequired,
    UI:PropTypes.object.isRequired,
    collections:PropTypes.object.isRequired
}

const mapStateToProps = state=>({
    products:state.products,
    UI:state.UI,
    collections:state.collections
});

export default compose(
    connect(mapStateToProps, { getProductWithQuery}),
    withStyles(styles,{name:"Products"}),
    withWidth())(withRouter(Products));