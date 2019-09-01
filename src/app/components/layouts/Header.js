import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import styles from './styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logo2 from '../../asset/logo/logo2.jpg'
// import Logo2 from '../../asset/logo/logo2.jpg'
import Divider from '@material-ui/core/Divider'
import Badge from '@material-ui/core/Badge';
import classNames from 'classnames';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import SideBar from './sideBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
class Header extends Component {
    state={
        open:false,
        anchorEl: null,
    }
    handleToggle = (name) => {
        console.log(this.anchorEl)
        this.setState(state => ({ open: name }));
    };

    handleClose = event => {
       
        // if (this.anchorEl.contains(event.target)) {
           
        //     return;
        // }

        this.setState({ open: false });
    };
    handlePopoverOpen = (data)=>event => {
        
        this.setState(
            { 
                open: data,
                anchorEl: event.currentTarget 
             });
    };

    handlePopoverClose = (event) => {
   
        this.setState({ open: false });
        
    };
    handleStillOn = (data) =>(event)=>{
  
        let beforFrom = event.fromElement || event.fromElement;
        this.setState(
            {
                open: data,
                anchorEl: beforFrom
            });
    }


    render() {
        const { classes, 
            totalQuantityCart, 
            notificationCart,
             user, 
             loadingContainer,
            category,
            
            category_tag, toggleDrawer, openDrawer, collection } = this.props
        const { anchorEl, open } = this.state;
           
        return (
           
            <div className={classes.wrapperHeader}>
                <Hidden smDown>
                <AppBar position="fixed" color="default" className={classes.appBar}>
                    {loadingContainer}
                <Toolbar className={classes.toolbarTop}>
                    <Grid container>
                            <Grid item md={12} >
                                <Grid container direction="row" justify="space-between" alignItems="center">
                                        <Grid item  md={9}>
                                            <Grid container direction="row" justify="center" alignItems="center" spacing={40}>

                                                <Grid item md={3}>
                                                    <Link to="/">
                                                        <img src={Logo2} className={classes.imageLogo} alt="" />
                                                    </Link>

                                                </Grid>
                                                <Grid item>
                                                    <Grid container direction="row">

                                                        <div>
                                                            <Button
                                                                aria-owns={open ? `menu-shop` : undefined}
                                                                aria-haspopup="true"
                                                                onMouseEnter={this.handlePopoverOpen('shop')}
                                                                onMouseLeave={this.handlePopoverClose}
                                                                className={classNames(classes.menuTitle, {
                                                                    [classes.menuHovered]: (open === 'shop')
                                                                })}
                                                                
                                                                component={Link}
                                                                to="/shop"
                                                                onClick={this.handlePopoverClose}
                                                            >
                                                                SHOP <KeyboardArrowDownIcon />
                                                            </Button>


                                                            <Popper
                                                                onMouseEnter={this.handleStillOn('shop')}
                                                                onMouseLeave={this.handlePopoverClose}
                                                                id={`menu-shop`}
                                                                disablePortal
                                                                className={classes.popoverWrapper}
                                                                open={open === 'shop'}

                                                                anchorEl={anchorEl}
                                                                placement="bottom"

                                                            >

                                                                <Grow in={true}>
                                                                    <Card className={classes.dropDownCard}>
                                                                        <CardContent>
                                                                            <Grid container direction="row" spacing={32}>
                                                                                {category_tag.map((ct, indexCT) => {
                                                                                    return (

                                                                                        <Grid item key={indexCT}>
                                                                                        <List
                                                                                                component="nav"
                                                                                                subheader={
                                                                                              
                                                                                                        <ListItem  button onClick={this.handlePopoverClose}
                                                                                                        className={classes.listRoot}
                                                                                                        component={Link}
                                                                                                        to={`/shop/${ct.category_tag_slug}`}
                                                                                                        classes={{
                                                                                                            button: classes.wrapperLinkMenu
                                                                                                        }}>
                                                                                                            <ListItemText
                                                                                                                primary={ct.category_tag}
                                                                                                                classes={{
                                                                                                                    primary: classes.linkMenuRoot
                                                                                                                }}
                                                                                                            />

                                                                                                        </ListItem>
                                                                                                   
                                                                                             }
                                                                                                className={classes.root}>
                                                                                                {category.filter(categ => ct.category_tag === categ.category_tag).map((c, indexC) => {
                                                                                                   return(
                                                                                                       <ListItem  
                                                                                                           component={Link}
                                                                                                        button key={indexC} 
                                                                                                        
                                                                                                        onClick={this.handlePopoverClose}
                                                                                                        to={`/shop/${ct.category_tag_slug}/${c.category_slug}`}
                                                                                                        classes={{
                                                                                                            button:classes.wrapperLinkMenu
                                                                                                        }}
                                                                                                        >
                                                                                                               <ListItemText
                                                                                                                   primary={c.category}
                                                                                                                   classes={{
                                                                                                                       primary: classes.linkMenu
                                                                                                                   }}
                                                                                                               />
                                                                                                           </ListItem>
                                                                                                       
                                                                                                    
                                                                                                   )
                                                                                                })}
                                                                                        </List>
                                                                                 

                                                                                        </Grid>


                                                                                    )
                                                                                })}
                                                                            </Grid>


                                                                        </CardContent>
                                                                    </Card>
                                                                </Grow>



                                                            </Popper>
                                                        </div>
                                                        <div>
                                                            <Button
                                                                component={Link}
                                                                to="/shop/newarrivals"
                                                                aria-owns={open ? `menu-newarrivals` : undefined}
                                                                aria-haspopup="true"
                                                                onMouseEnter={this.handlePopoverOpen('newarrivals')}
                                                                onMouseLeave={this.handlePopoverClose}
                                                                className={classNames(classes.menuTitle, {
                                                                    [classes.menuHovered]: (open === 'newarrivals')
                                                                })}
                                                            >
                                                                NEW ARRIVALS
                                            </Button>
                                                        </div>
                                                        <div>
                                                            <Button
                                                                aria-owns={open ? `menu-collections` : undefined}
                                                                aria-haspopup="true"
                                                                onMouseEnter={this.handlePopoverOpen('collections')}
                                                                onMouseLeave={this.handlePopoverClose}
                                                                className={classNames(classes.menuTitle, {
                                                                    [classes.menuHovered]: (open === 'collections')
                                                                })}
                                                                component={Link}
                                                                to="/collection"
                                                                onClick={this.handlePopoverClose}
                                                            >
                                                                COLLECTIONS  <KeyboardArrowDownIcon />
                                            </Button>

                                                            <Popper
                                                                onMouseEnter={this.handleStillOn('collections')}
                                                                onMouseLeave={this.handlePopoverClose}
                                                                id={`menu-collections`}
                                                                disablePortal
                                                                className={classes.popoverWrapper}
                                                                open={open === 'collections'}
                                                                anchorEl={anchorEl}
                                                                placement="bottom"

                                                            >

                                                                <Grow in={true}>
                                                                    <div className={classes.listCollection}>
                                                                        <List component="nav">
                                                                        {collection.map((co,i)=>{
                                                                            return(
                                                                                <div key={i}>
                                                                                    <ListItem  button 
                                                                                        component={Link}
                                                                                        onClick={this.handlePopoverClose}
                                                                                        to={`/collection/${co.slug}`}
                                                                                    >
                                                                                        <ListItemText primary={co.name} classes={{
                                                                                            primary: classes.linkMenu
                                                                                        }} />

                                                                                    </ListItem>
                                                                                    {i < collection.length-1 ? (<Divider/>):""}
                                                                                </div>
                                                                          
                                                                            )
                                                                        })}
                                                                            
                                                                        </List>
                                                                    </div>
                                                                  
                                                                </Grow>



                                                            </Popper>
                                                        </div>
                                             
                                                        <div>
                                                            <Button
                                                                aria-owns={open ? `menu-lookbook` : undefined}
                                                                aria-haspopup="true"
                                                                onMouseEnter={this.handlePopoverOpen('menu-lookbook')}
                                                                onMouseLeave={this.handlePopoverClose}
                                                                className={classNames(classes.menuTitle, {
                                                                    [classes.menuHovered]: (open === 'menu-lookbook')
                                                                })}
                                                                component={Link}
                                                                to="/lookbook"
                                                            >
                                                                LOOKBOOK
                                            </Button>
                                                        </div>
                                                        <div>
                                                            <Button
                                                                aria-owns={open ? `confirm-payment` : undefined}
                                                                aria-haspopup="true"
                                                                onMouseEnter={this.handlePopoverOpen('confirm-payment')}
                                                                onMouseLeave={this.handlePopoverClose}
                                                                className={classNames(classes.menuTitle, {
                                                                    [classes.menuHovered]: (open === 'confirm-payment')
                                                                })}
                                                                component={Link}
                                                                to="/confirm-payment"
                                                            >
                                                                CONFIRM-PAYMENT
                                            </Button>
                                                        </div>
  

                                                        <div>
                                                            <Button
                                                                aria-owns={open ? `menu-help` : undefined}
                                                                aria-haspopup="true"
                                                                onMouseEnter={this.handlePopoverOpen('help')}
                                                                onMouseLeave={this.handlePopoverClose}
                                                                className={classNames(classes.menuTitle, {
                                                                    [classes.menuHovered]: (open === 'help')
                                                                })}
                                                                component={Link}
                                                                to="/help"
                                                                onClick={this.handlePopoverClose}
                                                            >
                                                                HELP  <KeyboardArrowDownIcon />
                                                            </Button>

                                                            <Popper
                                                                onMouseEnter={this.handleStillOn('help')}
                                                                onMouseLeave={this.handlePopoverClose}
                                                                id={`menu-help`}
                                                                disablePortal
                                                                className={classes.popoverWrapper}
                                                                open={open === 'help'}
                                                                anchorEl={anchorEl}
                                                                placement="bottom"

                                                            >

                                                                <Grow in={true}>
                                                                    <div className={classes.listCollection}>
                                                                        <List component="nav">
                                                                        
                                                                                <ListItem divider button
                                                                                    component={Link}
                                                                                    onClick={this.handlePopoverClose}
                                                                                    to={`/payment-guide`}
                                                                                >
                                                                                    <ListItemText primary='Payment Guide' classes={{
                                                                                        primary: classes.linkMenu
                                                                                    }} />

                                                                                </ListItem>
                                                                            <ListItem  
                                                                                divider
                                                                                button
                                                                                component={Link}
                                                                                onClick={this.handlePopoverClose}
                                                                                to={`/size-guide`}
                                                                            >
                                                                                <ListItemText primary='Size Guide' classes={{
                                                                                    primary: classes.linkMenu
                                                                                }} />

                                                                            </ListItem>
                                                                            <ListItem 
                                                                                divider
                                                                                button
                                                                                component={Link}
                                                                                onClick={this.handlePopoverClose}
                                                                                to={`/return-policy`}
                                                                            >
                                                                                <ListItemText primary='Return Policy' classes={{
                                                                                    primary: classes.linkMenu
                                                                                }} />

                                                                            </ListItem>
                                                                            <ListItem button
                                                                                component={Link}
                                                                                onClick={this.handlePopoverClose}
                                                                                to={`/track-shipment`}
                                                                            >
                                                                                <ListItemText primary='Track Shipment' classes={{
                                                                                    primary: classes.linkMenu
                                                                                }} />

                                                                            </ListItem>
                                                                        </List>
                                                                    </div>

                                                                </Grow>



                                                            </Popper>
                                                        </div>



                                                    </Grid>


                                                </Grid>
                                                {/* <Grid item md={3}>
                                    </Grid>   */}

                                            </Grid>
                                        </Grid>

                                    <Grid item >
                                        <Grid container direction="row">
                                            <Grid item >
                                                <div className={classes.wrapperIcon}>
                                                    {user.email ? (<Button component={Link} to="/my-account">
                                                            <FontAwesomeIcon icon={['fa', 'user-circle']} size="lg" style={{ margin: "0px 5px" }} />     MY-ACCOUNT
                                                    </Button>) : (
                                                            <div className={classes.wrapperIcon}>
                                                                <Button component={Link} to="/sign-in">
                                                                            Sign In 
                                                            </Button>
                                                                    <Divider className={classes.divider} />
                                                                    <Button component={Link} to="/sign-up">
                                                                    Register
                                                            </Button>
                                                            </div>
                                                        )}


                                                    <Button style={{ marginLeft: 5 }} component={Link} to="/carts">
                                                            <Badge badgeContent={totalQuantityCart} invisible={false} color="primary" 
                                                            classes={{
                                                            badge: classNames(classes.badge, {
                                                                [classes.bounceIn]: notificationCart
                                                            })
                                                        }}
                                                        >
                                                            <FontAwesomeIcon icon={['fas', 'shopping-bag']} size="lg" />

                                                        </Badge>

                                                    </Button>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                    </Grid>
                      
                </Toolbar>
               
                </AppBar>
                </Hidden>


                
                <Hidden mdUp>
                    <AppBar position="fixed" color="default" className={classes.appBarMobile}>
                        {loadingContainer}
                        <Toolbar>
                            <Grid container justify="space-between">
                                <Hidden xsDown>
                                    <Grid item xs={12}>
                                        <Grid container direction="row" justify="space-between">
                                            <Grid item>
                                                <div className={classes.wrapperIcon}>
                                                    <IconButton
                                                        color="inherit"
                                                        aria-label="Open drawer"
                                                        onClick={toggleDrawer('openDrawer', true)}>
                                                        <MenuIcon />
                                                    </IconButton>
                                                    <Link to="/">
                                                        <img src={Logo2} alt="" className={classes.logoHammerMobile} />

                                                    </Link>

                                                </div>
                                            </Grid>
                                            <Grid item>
                                                <div
                                                    className={classes.wrapperIcon}
                                                    style={{
                                                        marginTop: 5
                                                    }}>

                                                    {user.email ? (<Button component={Link} to="/my-account">
                                                        {user.email}
                                                    </Button>) : (
                                                            <div className={classes.wrapperIcon}>
                                                                <Button component={Link} to="/sign-in">
                                                                    Sign In
                                                            </Button>
                                                                <Divider className={classes.divider} />
                                                                <Button component={Link} to="/sign-up">
                                                                    Register
                                                            </Button>
                                                            </div>
                                                        )}
                                                    <Button component={Link} to="/carts">
                                                        <Badge
                                                            badgeContent={totalQuantityCart}
                                                            color="primary"
                                                            classes={{
                                                                badge: classNames(classes.badge, {
                                                                    [classes.bounceIn]: notificationCart
                                                                })
                                                            }}>
                                                            <FontAwesomeIcon icon={['fas', 'shopping-bag']} size="lg" />
                                                        </Badge>

                                                    </Button>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <SwipeableDrawer
                                        open={openDrawer}
                                        onClose={toggleDrawer('openDrawer', false)}
                                        onOpen={toggleDrawer('openDrawer', true)}>
                                        <div
                                            tabIndex={0}
                                            role="button"
                                        // onClick={this.handlerClickDrawer}
                                        // onKeyDown={toggleDrawer('openDrawer', false)}
                                        >
                                            <SideBar
                                                category={category}
                                                category_tag={category_tag}
                                                toggleDrawer={toggleDrawer}
                                                collection={collection}
                                                user={user}
                                            />
                                        </div>
                                    </SwipeableDrawer>
                                </Hidden>

                                <Hidden smUp>
                                    <Grid item xs={12}>
                                        <div >
                                            <Grid container direction="row" justify="space-between" alignItems="center" spacing={8}>
                                                <Grid item >
                                                    <Grid container direction="row"  alignItems="center">
                                                    <Grid item>
                                                            <IconButton
                                                                color="inherit"
                                                                aria-label="Open drawer"
                                                                onClick={toggleDrawer('openDrawer', true)}>
                                                                <MenuIcon />
                                                            </IconButton>
                                                    </Grid>
                                                 <Grid item>
                                                            <Link to="/">
                                                                <div className={classes.imageWrapper}>
                                                                    <img
                                                                        src={Logo2}
                                                                        alt=""
                                                                        style={{
                                                                            maxHeight: 20,
                                                                            maxWidth: '100%'
                                                                        }} />
                                                                </div>
                                                            </Link>
                                                 </Grid>
                                                  
                                                   
                                                    </Grid>
                                                </Grid>
                                            
                                                <Grid item>
                                             
                                                    <div>
                                                
                                                        <Button component={Link} to="/carts" className={classes.buttonMobile}>
                                                            <Badge
                                                                badgeContent={totalQuantityCart}
                                                                color="primary"
                                                                classes={{
                                                                    badge: classNames(classes.badge, {
                                                                        [classes.bounceIn]: notificationCart
                                                                    })
                                                                }}>

                                                                <FontAwesomeIcon icon={['fas', 'shopping-bag']} size="lg" />
                                                            </Badge>

                                                        </Button>
                                                    </div>
                                  
                                                </Grid>
                                            </Grid>
                                     

                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                       
                                    </Grid>

                                    <SwipeableDrawer
                                        open={openDrawer}
                                        onClose={toggleDrawer('openDrawer', false)}
                                        onOpen={toggleDrawer('openDrawer', true)}>
                                        <div
                                            tabIndex={0}
                                            role="button"
                                            // onClick={this.handlerClickDrawer}
                                            // onKeyDown={toggleDrawer('openDrawer', false)}
                                            >
                                            <SideBar 
                                                category={category}
                                                category_tag={category_tag}
                                                toggleDrawer={toggleDrawer}
                                                collection={collection}
                                                user={user}
                                            />
                                        </div>
                                    </SwipeableDrawer>
                                </Hidden>

                            </Grid>
                        </Toolbar>
                    </AppBar>
                </Hidden>
            </div>
           
       
        )
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    category:PropTypes.array.isRequired,
    category_tag:PropTypes.array.isRequired
};
export default withStyles(styles)(Header);
