import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography'
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import { logoutUser} from '../../actions/authActions';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Page from '../../components/page';
 class MyAccount extends Component {
   state={
     user:{}
   }
   handlerLogoutUser =()=>{
     this.props.logoutUser();
   }
   componentDidMount(){
     if(Object.keys(this.props.auths.user).length > 0){

        this.setState({
          user:this.props.auths.user
        })
     }

   }
   UNSAFE_componentWillReceiveProps(nextProps){

     if (nextProps.auths.user !== this.props.auths.user && Object.keys(nextProps.auths.user ).length > 0){
   
       this.setState({
         user: nextProps.auths.user
       })
     }
   }
  render() {
    const { classes } = this.props;
    const { user} = this.state;

    return (
      <Page
        id="myAccount"
        noCrawl
      >
        
      <div className={classes.wrapperMyAccount}>
        <Grid container direction="column">
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item md={6} xs={12}>
                <Paper className={classes.paperTitle}>
                <Grid container justify="space-between" alignContent="center" alignItems="center">
                <Typography variant="h1" className={classes.titleParams}>
                      {user.email ? user.email:'NONE'}
                </Typography>
                    <Button variant="contained" color="primary" component={Link} to="/my-account/profile">
                      Edit Profile
                </Button>
                </Grid>
              
               
              </Paper>
              <Card>
                <CardContent>
                    <List component="nav">
                      <ListItem button component={Link} to="/my-account/profile">
                            <ListItemIcon>
                              <FontAwesomeIcon icon={['fas', 'user']} size="lg" />
                            </ListItemIcon>
                            <ListItemText 
                            primary="My Profile"
                            secondary="Your account Email,Phone Number,Birthday etc."
                            /> 
                        <ListItemIcon>
                          <FontAwesomeIcon icon={['fas', 'angle-right']} size="lg" />
                        </ListItemIcon>       
                     
                     
                      </ListItem>
                      <Divider/>
                      <ListItem button component={Link} to="/my-account/address">
                          <ListItemIcon>
                            <FontAwesomeIcon icon={['fas', 'home']} size="lg" />
                          </ListItemIcon>
                          <ListItemText 
                          primary="My Address" 
                            secondary="Your full address this will be very helpful in filling out the order form"
                          
                          />
                          <ListItemIcon>
                            <FontAwesomeIcon icon={['fas', 'angle-right']} size="lg" />
                          </ListItemIcon>
                        
                      </ListItem>
                      <Divider />
                      {/* <ListItem button>
                        <Grid container justify="space-between" alignItems="center">
                          <ListItemIcon>
                            <FontAwesomeIcon icon={['fas', 'credit-card']} size="lg" />
                          </ListItemIcon>
                          <ListItemText primary="Confirm Payment"  />
                          <FontAwesomeIcon icon={['fas', 'angle-right']} size="lg" />
                        </Grid>
                      </ListItem>
                      <Divider /> */}

                      <ListItem button component={Link} to="/my-account/orders">
                          <ListItemIcon>
                            <FontAwesomeIcon icon={['fas', 'file-signature']} size="lg" />
                          </ListItemIcon>
                          <ListItemText 
                          primary="Order History" 
                          secondary="Your Order detail, contains information about all the orders you make "
                          />

                        <ListItemIcon>
                          <FontAwesomeIcon icon={['fas', 'angle-right']} size="lg" />
                        </ListItemIcon>
                      </ListItem>
                      <Divider />

                      <ListItem button onClick={this.handlerLogoutUser}>
                          <ListItemIcon>
                            <FontAwesomeIcon icon={['fas', 'sign-out-alt']} size="lg" />
                          </ListItemIcon>
                          <ListItemText primary="Sign Out" />
                    
                        <ListItemIcon>
                          <FontAwesomeIcon icon={['fas', 'angle-right']} size="lg" />
                        </ListItemIcon>
                      </ListItem>
                      <Divider />



                   
                    </List>
                   
               
                </CardContent>
              
              </Card>
    
              </Grid>
              </Grid>
          </Grid>
        </Grid>

      </div>

      </Page>
    )
  }
}
MyAccount.propTypes = {
  auths: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser:PropTypes.func.isRequired
}

const mapStateToProps = state => (
  {
    auths: state.auths
  });

export default compose(connect(mapStateToProps, { logoutUser }), withStyles(styles, { name: "MyAccount" }))(MyAccount);
