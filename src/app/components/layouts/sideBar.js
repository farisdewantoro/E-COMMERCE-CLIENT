import React, { Component } from 'react'
import styles from './styles';
import {withStyles} from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

 class SideBar extends Component {
     state={
         openCollapse: false,
         openShop:false
     }
     handleClick = (data) => {
         if (data === this.state.openCollapse) {
             this.setState({
                 openCollapse: false
             })
         } else {
             this.setState({
                 openCollapse: data
             })
         }

     };
     handleClickShop=()=>{
         this.setState({
             openShop: !this.state.openShop
         })
     }
  render() {
      const { classes, category, category_tag, toggleDrawer, collection,user} = this.props;
      
 
    return (
        <div className={classes.list}>
        
            <List
            component="nav"
            subheader={
      
                <ListItem divider button component={Link} to="/my-account" onClick={toggleDrawer('openDrawer', false)}>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={['fa', 'user-circle']} size="lg" style={{color:"black"}}/>
                        </ListItemIcon>
                        <ListItemText 
                        primary="MY-ACCOUNT" 
                        secondary={user.email ? user.email : "SIGN IN / REGISTER "}
                        style={{ padding: 0 }} 
                        classes={{
                            primary:classes.listItemParentRoot,
                            secondary:classes.listItemSecondaryRoot
                        }}/>
                    </ListItem>
            
            }
            >
                <ListItem button component={Link} to="/shop" onClick={toggleDrawer('openDrawer', false)} classes={{
                    button: classes.listItemButton
                }}>
                    <ListItemText primary='SHOP' classes={{
                        primary: classes.listItemParent
                    }} />
                    <ListItemSecondaryAction >
                        <IconButton aria-label="Delete" onClick={this.handleClickShop}>
                            {this.state.openShop ? <ExpandLess data-drawer="stillOpen"/> : <ExpandMore />}
                        </IconButton>

                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <Collapse in={this.state.openShop} timeout="auto" unmountOnExit>
                    <List component="div" style={{paddingLeft:"10px"}} disablePadding>
                    {category_tag.map((ct, indexCT) => {
                        return (
                            <div key={indexCT}>
                                <ListItem divider button component={Link} to={`/shop/${ct.category_tag_slug}`} onClick={toggleDrawer('openDrawer', false)} classes={{
                                    button: classes.listItemButton
                                }}>
                                    <ListItemText primary={ct.category_tag} classes={{
                                        primary: classes.listItemParent
                                    }} />
                                    <ListItemSecondaryAction >
                                        <IconButton aria-label="Arrow" onClick={() => this.handleClick(ct.category_tag_slug)}>
                                            {this.state.openCollapse === ct.category_tag_slug ? <ExpandLess data-drawer="stillOpen" /> : <ExpandMore />}
                                        </IconButton>

                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Collapse in={this.state.openCollapse === ct.category_tag_slug} timeout="auto" unmountOnExit >
                                    <List component="div" disablePadding style={{ paddingLeft: "10px" }}>
                                        {category.filter((categ) => categ.category_tag === ct.category_tag).map((c, indexC) => {
                                            return (
                                                <div className={classes.childWrapper} key={indexC}>
                                                    <ListItem  button component={Link} to={`/shop/${ct.category_tag_slug}/${c.category_slug}`} onClick={toggleDrawer('openDrawer', false)} classes={{
                                                        button: classes.listItemButton
                                                    }}>
                                                        <ListItemText primary={c.category} classes={{
                                                            primary: classes.listItemParent
                                                        }} />


                                                    </ListItem>

                                                </div>

                                            )
                                        })}
                                    </List>
                                </Collapse>
                           

                            </div>

                        )
                    })}
                        <Divider />
                    </List>
                </Collapse>

                <ListItem button component={Link} to="/shop" onClick={toggleDrawer('openDrawer', false)} classes={{
                    button: classes.listItemButton
                }}>
                    <ListItemText primary='NEW ARRIVALS' classes={{
                        primary: classes.listItemParent
                    }} />
                </ListItem>
                <Divider />

                <ListItem button component={Link} to="/collection" onClick={toggleDrawer('openDrawer', false)} classes={{
                    button: classes.listItemButton
                }}>
                    <ListItemText primary='COLLECTIONS' classes={{
                        primary: classes.listItemParent
                    }} />
                    <ListItemSecondaryAction >
                        <IconButton aria-label="Arrow" onClick={() => this.handleClick('collections')}>
                            {this.state.openCollapse === 'collections' ? <ExpandLess data-drawer="stillOpen" /> : <ExpandMore />}
                        </IconButton>

                    </ListItemSecondaryAction>
                </ListItem>
                <Collapse in={this.state.openCollapse === 'collections'} timeout="auto" unmountOnExit >
                    <List component="div" disablePadding style={{ paddingLeft: "10px" }}>
                        {collection.map((c, indexC) => {
                            return (
                                <div className={classes.childWrapper} key={indexC}>
                                    <ListItem button component={Link} to={`/collection/${c.slug}`} onClick={toggleDrawer('openDrawer', false)} classes={{
                                        button: classes.listItemButton
                                    }}>
                                        <ListItemText primary={c.name} classes={{
                                            primary: classes.listItemParent
                                        }} />


                                    </ListItem>

                                </div>

                            )
                        })}
                    </List>
                </Collapse>
                <Divider />

                {/* <ListItem button component={Link} to="/shop" onClick={toggleDrawer('openDrawer', false)} classes={{
                    button: classes.listItemButton
                }}>
                    <ListItemText primary='ABOUT US' classes={{
                        primary: classes.listItemParent
                    }} />
                </ListItem>
                <Divider /> */}

                <ListItem button component={Link} to="/lookbook" onClick={toggleDrawer('openDrawer', false)} classes={{
                    button: classes.listItemButton
                }}>
                    <ListItemText primary='LOOKBOOK' classes={{
                        primary: classes.listItemParent
                    }} />
                </ListItem>
                <Divider />
                <ListItem button component={Link} to="/confirm-payment" onClick={toggleDrawer('openDrawer', false)} classes={{
                    button: classes.listItemButton
                }}>
                    <ListItemText primary='CONFIRM-PAYMENT' classes={{
                        primary: classes.listItemParent
                    }} />
                </ListItem>
                <Divider />
            
                <ListItem button component={Link} to="/help" onClick={toggleDrawer('openDrawer', false)} classes={{
                    button: classes.listItemButton
                }}>
                    <ListItemText primary='HELP' classes={{
                        primary: classes.listItemParent
                    }} />
                    <ListItemSecondaryAction >
                        <IconButton aria-label="Arrow" onClick={() => this.handleClick('help')}>
                            {this.state.openCollapse === 'help' ? <ExpandLess data-drawer="stillOpen" /> : <ExpandMore />}
                        </IconButton>

                    </ListItemSecondaryAction>
                </ListItem>
                <Collapse in={this.state.openCollapse === 'help'} timeout="auto" unmountOnExit >
                    <List component="div" disablePadding style={{ paddingLeft: "10px" }}>
                        <ListItem button divider component={Link} to={`/payment-guide`} onClick={toggleDrawer('openDrawer', false)} classes={{
                            button: classes.listItemButton
                        }}>
                            <ListItemText primary='Payment-guide' classes={{
                                primary: classes.listItemParent
                            }} />
                        </ListItem>
                        <ListItem divider button component={Link} to={`/size-guide`} onClick={toggleDrawer('openDrawer', false)} classes={{
                            button: classes.listItemButton
                        }}>
                            <ListItemText primary='Size-guide' classes={{
                                primary: classes.listItemParent
                            }} />
                        </ListItem>
                        <ListItem divider button component={Link} to={`/return-policy`} onClick={toggleDrawer('openDrawer', false)} classes={{
                            button: classes.listItemButton
                        }}>
                            <ListItemText primary='Return-policy' classes={{
                                primary: classes.listItemParent
                            }} />
                        </ListItem>
                        <ListItem button component={Link} to={`/track-shipment`} onClick={toggleDrawer('openDrawer', false)} classes={{
                            button: classes.listItemButton
                        }}>
                            <ListItemText primary='Track-shipment' classes={{
                                primary: classes.listItemParent
                            }} />
                        </ListItem>
                    </List>
                </Collapse>
                <Divider />
           
            </List>
      </div>
    )
  }
}

SideBar.propTypes={
    classes:PropTypes.object.isRequired,
    category: PropTypes.array.isRequired,
    category_tag: PropTypes.array.isRequired,
    collection:PropTypes.array.isRequired
}

export default withStyles(styles)(SideBar)
