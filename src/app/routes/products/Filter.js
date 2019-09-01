import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {Link} from 'react-router-dom';
import styles from './styles';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
function Transition(props) {
    return <Slide direction="up" {...props} />;
}
function prettyText(value){
  
    let findCapital = value.match(/([A-Z])\w+/g);
    if(findCapital !== null){
        var regex = new RegExp(findCapital, 'g');
        value = value.replace(regex,` ${findCapital}`);
    }
    value = value.charAt(0).toUpperCase() + value.slice(1);
    return value
}

class Filter extends Component {
    state = {
        filter:{
            price:[
                {name:"UNDER IDR 200K",value:"under200k"},
                {name:"IDR 100K - IDR 300K",value:"idr100k-300k"},
                {name: "IDR 300K - IDR 500K", value: "idr300k-500k" },
                {name: "ABOVE IDR 500K", value: "above500k" },
            ],
    

        },
        openCollapse: false,
        openMobileFilter:false
    };
   

    handleClick = (data) => {
        if(data === this.state.openCollapse){
            this.setState({
                openCollapse: false
            })
        }else{
            this.setState({
                openCollapse: data
            })
        }
    
        console.log({data});
    };
    handleClickOpenFilterMobile = () => {
        this.setState({ openMobileFilter: true });
    };
    handleCloseFilterMobile = () => {
        this.setState({ openMobileFilter: false });
    };
 
    // onCheckedColor = (i) =>{
    //     this.setState({
    //         colorPicked:i
    //     })
    // }
    render() {
        
        const { classes, filterData,
            onCheckedPrice, onCheckedColor, clickClearPrice, clickClearColor, colors, UI,
            onChangeSearch,
            searchProduct,
            onSubmitSearch,
            anchorEl,
            handleClose,
            handleSelectedOrderBy,
            handleClick,
            handleRemoveFilter  } = this.props;
        const {  filter} = this.state;
        return (
    
                <Grid item md={3} xs={12} className={classes.rootFilter}>

            <Hidden smDown>
                <Grid container direction="column" spacing={16}>
                <Grid item>
                    <Card>
                        <CardContent>
                                <List
                                    component="nav"
                                    subheader={
                                    <div>
                                            <ListItem button component={Link} to="/shop" classes={{
                                                button: classes.listItemButton
                                            }}>
                                                <ListItemText primary='ALL PRODUCTS' classes={{
                                                    primary: classes.titleMenuList
                                                }} />
                                            </ListItem>
                                            <Divider/>
                                    </div>
                                 
                                    }
                                    className={classes.root}
                                 
                                >

                                                <div >
                                                    <ListItem button component={Link} to={`/collection`} classes={{
                                                        button: classes.listItemButton
                                                    }}>
                                                        <ListItemText primary="COLLECTIONS" classes={{
                                                            primary: classes.parentMenuList
                                                        }} />
                                                    </ListItem>
                                                    {UI.collection.map((co, indexCO) => {
                                                        return (
                                                            <div className={classes.childWrapper} key={indexCO}>
                                                                <ListItem button component={Link} to={`/collection/${co.slug}`} classes={{
                                                                    button: classes.listItemButton
                                                                }}>
                                                                    <ListItemText primary={co.name} classes={{
                                                                        primary: classes.childMenuList
                                                                    }} />
                                         

                                                                </ListItem>
                                        
                                                            </div>

                                                        )
                                                    })}

                                                </div>

                                    {UI.category_tag.map((ct,indexCT)=>{
                                        return(
                                            <div key={indexCT}>
                                                <ListItem button component={Link} to={`/shop/${ct.category_tag_slug}`} classes={{
                                                    button: classes.listItemButton
                                                }}>
                                                    <ListItemText primary={ct.category_tag}  classes={{
                                                        primary:classes.parentMenuList
                                                    }}/>
                                                </ListItem>
                                                {UI.category.filter((categ) => categ.category_tag === ct.category_tag).map((c,indexC)=>{
                                                    return(
                                                        <div className={classes.childWrapper} key={indexC}>
                                                            <ListItem button component={Link} to={`/shop/${ct.category_tag_slug}/${c.category_slug}`} classes={{
                                                                button: classes.listItemButton
                                                            }}>
                                                                <ListItemText   primary={c.category} classes={{
                                                                    primary: classes.childMenuList
                                                                }} />
                                                                {UI.category_type.filter((catype) => c.category === catype.category).length > 0 &&
                                                              
                                                                (<ListItemSecondaryAction>
                                                                    <IconButton aria-label="Delete" onClick={()=>this.handleClick(c.category_slug)}>
                                                                        {this.state.openCollapse === c.category_slug ? <ExpandLess /> : <ExpandMore />}
                                                                    </IconButton>
                                                             
                                                                </ListItemSecondaryAction>)
                                                                }
                                                            </ListItem>
                                                            <Collapse in={this.state.openCollapse === c.category_slug} timeout="auto" unmountOnExit>
                                                                <List component="div" disablePadding>
                                                                    {UI.category_type.filter((catype) => c.category === catype.category).map((ctyp,indexCT)=>{
                                                                        return(
                                                                            <ListItem key={indexCT} button  component={Link} to={`/shop/${ct.category_tag_slug}/${c.category_slug}/${ctyp.category_type_slug}`}>
                                                                             
                                                                                <ListItemText secondary={ctyp.category_type} classes={{
                                                                                    secondary: classes.childchildList
                                                                                }}/>
                                                                            </ListItem>
                                                                        )
                                                                    })}
                                                                    
                                                                </List>
                                                            </Collapse>
                                                        </div>
                                                      
                                                    )
                                                })}
                                              
                                            </div>
                                          
                                        )
                                    })}
                              
                                </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                        <Card >
                            <CardContent>
                                < div > <div className={classes.subHeaderList}>
                                    <Typography className={classes.titleSublist}>
                                        Price
                            </Typography>
                                    <Button onClick={() => clickClearPrice('price')}>
                                        Clear
                            </Button>
                                </div> < Divider /> 
                                </div>
                                <List
                                    >

                                    <ListItem style={{ padding: 0 }}>
                                        <FormGroup>
                                            {filter.price.map((p, i) => {
                                                return (
                                                    <FormControlLabel key={i} control={
                                                        <Checkbox
                                                            value={p.value}
                                                            name={p.name}
                                                            disabled={filterData.priceSelected === p.value}
                                                            checked={filterData.priceSelected === p.value}
                                                            onChange={() =>onCheckedPrice(p.value)}
                                                            color="default" />
                                                    } label={p.name} />
                                                )
                                            })}

                                        </FormGroup>

                                    </ListItem>

                                </List>
                            </CardContent>
                        </Card>
                </Grid>

                <Grid item>
                        <Card >
                            <CardContent>
                                < div > <div className={classes.subHeaderList}>
                                    <Typography className={classes.titleSublist}>
                                        Color
                            </Typography>
                                    <Button onClick={() => clickClearColor('color')}>
                                        Clear
                                     </Button>
                                </div> < Divider /> </div>
                                <List 
                                className={classes.rootListColorFilter}
                                >

                                    <ListItem style={{ padding: 0 }}>
                                        <FormGroup>
                                            {colors.map((c, i) => {
                                                return (
                                                    <FormControlLabel key={i} control={
                                                        <Checkbox
                                                            value={c.value}
                                                            checked={c.isActive}
                                                            onChange={()=>onCheckedColor(c,i)}
                                                            color="default" />
                                                    } label={
                                                        <div className={classes.containerBoxColor}>
                                                            <div className={classes.boxColor} style={{ backgroundColor: c.hex_color }}>
                                                            </div>
                                                            <Typography className={classes.marginLeftRight}>
                                                                {prettyText(c.original_color)}
                                                            </Typography>
                                                      
                                                        </div>
                                                  
                                                    
                                                } />
                                                )
                                            })}

                                        </FormGroup>

                                    </ListItem>

                                </List>
                            </CardContent>
                        </Card>
                </Grid>
                
               
                </Grid>
                </Hidden>


                <Hidden mdUp>
                <div className={classes.mobileFilter}>
                <Grid container direction="column" spacing={8}>
                            <Grid item md={12} className={classes.wrapperSearchbox}>
                                <form onSubmit={onSubmitSearch}>
                                <Paper className={classes.rootPaper} elevation={1}>
                                
                                    <InputBase className={classes.input} placeholder="Search here" value={searchProduct}
                                        onChange={onChangeSearch} />
                                    <Divider className={classes.divider} />
                                    <IconButton className={classes.iconButton} aria-label="Search" onClick={onSubmitSearch}>
                                        <SearchIcon />
                                    </IconButton>
                            
                                </Paper>
</form>
                            </Grid>
               
                    <Grid item md={12}>
                            <Paper className={classes.rootPaper} elevation={1}>
                                <Grid container justify="space-between">
                                    <Grid item>
                                            <Button onClick={this.handleClickOpenFilterMobile}>
                                            Filter
                                         </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button 
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
                            </Paper>
                    </Grid>


                    <Grid container>
                                <Dialog
                                    fullScreen
                                    open={this.state.openMobileFilter}
                                    onClose={this.handleCloseFilterMobile}
                                    TransitionComponent={Transition}
                                >
                                    <AppBar className={classes.appBarMobile}>
                                        <Toolbar>
                                            <Grid container alignItems="center" justify="space-between">
                                            <Grid item>
                                            <Grid container alignItems="center" >
                                                     
                                            <Typography color="inherit" >
                                                            FILTER
                                            </Typography>
                                            </Grid>
                                                  
                                            </Grid>

                                            <Grid item>
                                                    <IconButton color="inherit" onClick={this.handleCloseFilterMobile} aria-label="Close">
                                                        <CloseIcon />
                                                    </IconButton>
                                            </Grid>
                                           
                                            </Grid>
                                      
                                        </Toolbar>
                                    </AppBar>
                                    
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography className={classes.heading}>Price</Typography>
                                        </ExpansionPanelSummary>
                                        <Divider />
                                        <ExpansionPanelDetails>
                                       
                                            <List
                                            >

                                                <ListItem style={{ padding: 0 }}>
                                                    <FormGroup>
                                                        {filter.price.map((p, i) => {
                                                            return (
                                                                <FormControlLabel key={i} control={
                                                                    <Checkbox
                                                                        value={p.value}
                                                                        name={p.name}
                                                                        disabled={filterData.priceSelected === p.value}
                                                                        checked={filterData.priceSelected === p.value}
                                                                        onChange={() => onCheckedPrice(p.value)}
                                                                        color="default" />
                                                                } label={p.name} />
                                                            )
                                                        })}

                                                    </FormGroup>

                                                </ListItem>

                                            </List>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                    <ExpansionPanel defaultExpanded>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography className={classes.heading}>Colors</Typography>
                                        </ExpansionPanelSummary>
                                        <Divider/>
                                        <ExpansionPanelDetails>
                                            <List
                                                className={classes.rootListColorFilter}
                                            >

                                                <ListItem style={{ padding: 0 }}>
                                                    <FormGroup>
                                                        {colors.map((c, i) => {
                                                            return (
                                                                <FormControlLabel key={i} control={
                                                                    <Checkbox
                                                                        value={c.value}
                                                                        checked={c.isActive}
                                                                        onChange={() => onCheckedColor(c, i)}
                                                                        color="default" />
                                                                } label={
                                                                    <div className={classes.containerBoxColor}>
                                                                        <div className={classes.boxColor} style={{ backgroundColor: c.hex_color }}>
                                                                        </div>
                                                                        <Typography className={classes.marginLeftRight}>
                                                                            {prettyText(c.original_color)}
                                                                        </Typography>

                                                                    </div>


                                                                } />
                                                            )
                                                        })}

                                                    </FormGroup>

                                                </ListItem>

                                            </List>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                               
                                    {/* <List>
                                        <ListItem button>
                                            <ListItemText primary="Price"  />
                                        </ListItem>
                                        <Divider />
                                        <ListItem button>
                                            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                                        </ListItem>
                                    </List> */}

                                    <AppBar position="fixed" className={classes.AppBarBottomMobile} color="default">
                                        <Toolbar>
                                            <Grid container alignItems="center" justify="space-between">
                                                <Grid item>
                                                    <Button color="default" variant="outlined" onClick={handleRemoveFilter}>
                                                        CLEAR FILTERS
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="contained" color="primary" onClick={this.handleCloseFilterMobile}>    
                                                       APPLY FILTERS
                                                    </Button>
                                                </Grid>

                                             

                                            </Grid>

                                        </Toolbar>
                                    </AppBar>
                                </Dialog>
                    </Grid>
                        </Grid>
                     
                </div>
               
                </Hidden>

                </Grid>
      
        )
    }

}

Filter.propTypes = {
    classes: PropTypes.object.isRequired,
    UI:PropTypes.object.isRequired
}

export default withStyles(styles)(Filter);
