import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Chip from '@material-ui/core/Chip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ProductList from './ProductList';
import {Link} from 'react-router-dom'
import Hidden from '@material-ui/core/Hidden';
import styles from './styles';
// const styles = theme =>({
//   root: {
//     padding: '2px 4px',
//     display: 'flex',
//     alignItems: 'center',
//     width:'100%',
//   },
//   input: {
//     marginLeft: 8,
//     flex: 1,
//   },
//   iconButton: {
//     padding: 10,
//   },
//   divider: {
//     width: 1,
//     height: 28,
//     margin: 4,
//   },
//   titleParams:{
//     textAlign: 'center',
//     fontFamily: "'Staatliches', cursive",
//     fontSize: "1.5em"
//   }
// })


class productListContainer extends Component {

  render() {
    const { classes, 
      params, 
      chips, 
      handleClick, 
      anchorEl, 
      handleClose, 
      handleRemoveFilter, 
      handleDeleteChips,
      handleSelectedOrderBy,
      products,
      onChangeSearch,
      searchProduct,
      onSubmitSearch,
      resultSearchText,
      handleDeleteSearch,
      history,
      current_page_state,
      handleChangePage
    } = this.props;
      let navigation;
      let chipsContainer;
      let searchResult;
      if(typeof params !== "undefined" && resultSearchText == ""){
  
        navigation=(
          Object.values(params).map((p,i)=>{
  
            return(
              <Button
              className={classes.titleParams} 
              disabled={i === Object.values(params).length -1 }
              component={Link}
              key={i}
                to={Object.keys(params).length > 2 && i == 1 ? `/shop/${params.tag}/${params.category}` : `/shop/${p}`}

              >
                <FontAwesomeIcon
                  icon={['fas', 'angle-right']}
                  size="xs"
                  style={{ marginLeft: 5, marginRight: 5 }} />
                  {p.toUpperCase()}
         
              </Button>
            )
          })
      
        );
      }
      if(resultSearchText !== ""){
        navigation="";
        searchResult=(
          <Chip
            label={ <div ><span> Your Search Result For : </span> <span style={{ fontWeight: 'bold' }}>
          {resultSearchText}</span> </div>}
            className={classes.chip}
            color="primary"
            style={{ margin: 5 }}
            onDelete={handleDeleteSearch}
          />
          // <div className={classes.titleParams} ><span> Your Search Result For : </span> <span style={{ fontWeight: 'bold' }}>
          //   {resultSearchText}</span> </div>
        )

      }
      if(chips.length > 0){
        chipsContainer=(
          <Grid item md={12}>
          {chips.map((c,i)=>{
            return(
              <Chip
                key={i}
                label={c.name}
                onDelete={() => handleDeleteChips(c,i)}
                className={classes.chip}
                color="primary"
                style={{ margin: 5 }}
              />
            )
          })}
            <Chip
              icon={<FontAwesomeIcon icon={['fas', 'trash-alt']} size="lg" style={{padding:5}}/> }
              label="Clear Filter"
              onClick={handleRemoveFilter}
              className={classes.chip}
              color="primary"
              style={{ margin: 5 }}
            />

          </Grid>
        )
      }
    return (
 
        <Grid item md={9} xs={12} className={classes.rootGridProduct}>

     
        <Card>
      
          <CardContent >
          <Grid container spacing={8}>
        <Hidden smDown>
                <Grid item md={12}>
                  <Grid container justify="space-between" direction="row">
                    <Grid item>
                      <Button className={classes.titleParams} component={Link} to="/shop">
                        Products
                </Button>
                      {navigation}
                    </Grid>
                    <Grid item>
                      <Button variant="contained"
                        color="primary"
                        aria-owns={anchorEl ? 'sortBy' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}>
                        Sort By <FontAwesomeIcon icon={['fas', 'sort']} size="lg" style={{ marginLeft: 5, marginRight: 5 }} />
                      </Button>
                      <Menu
                        id="sortBy"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => handleSelectedOrderBy('')} disabled> Sort  <FontAwesomeIcon icon={['fas', 'sort']} size="lg" style={{ marginLeft: 8, marginRight: 8 }} /></MenuItem>
                        <Divider />
                        <MenuItem onClick={() => handleSelectedOrderBy('highest-price')} >Highest Price</MenuItem>
                        <MenuItem onClick={() => handleSelectedOrderBy('lowest-price')} >Lowest Price</MenuItem>
                        <MenuItem onClick={() => handleSelectedOrderBy('newest-product')}>Newest Product</MenuItem>
                        <MenuItem onClick={() => handleSelectedOrderBy('oldest-product')}>Oldest Product</MenuItem>
                      </Menu>

                    </Grid>
                  </Grid>
                </Grid>
        </Hidden>
       
          
                {searchResult}
          

              {chipsContainer}
              <Hidden smDown>
                <Grid item md={12} className={classes.wrapperSearchbox}>
                  <form onSubmit={onSubmitSearch}>
                  <Paper className={classes.rootPaper} elevation={1}>
                   
                    <InputBase className={classes.input} placeholder="Search here" value={searchProduct}
                      onChange={onChangeSearch}
                />
                    <Divider className={classes.divider} />
              
                    <IconButton className={classes.iconButton} aria-label="Search" type="submit" onClick={onSubmitSearch}>
                      <SearchIcon />
                    </IconButton>
                  
                  </Paper>
                </form>
                </Grid>
              </Hidden>
            


            </Grid>

            <Grid item md={12}>
              <ProductList 
              products={products}
              history={history}
                current_page_state={current_page_state}
                handleChangePage={handleChangePage}
              />
            </Grid>


          </CardContent>
        </Card>

        </Grid>
    
    )
  }
}

productListContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    products:PropTypes.object.isRequired
}

export default withStyles(styles)(productListContainer);