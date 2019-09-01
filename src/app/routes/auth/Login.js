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
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import keys from '../../config/keys';
import { loginUser} from '../../actions/authActions';
import {withRouter} from 'react-router';
import FormHelperText from '@material-ui/core/FormHelperText';
import Page from '../../components/page';
 class Login extends Component {
   state={
     username:'',
     password:''
   }


  handlerSubmitLogin = (e)=>{
    e.preventDefault();
    this.props.loginUser(this.state,this.props.history);
  }
  handleChange = (e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  render() {
    const { classes, errors } = this.props;
    const { username,password} = this.state;
    return (
      <Page
        id="Login"
        title="Login/Sign-in"

      >
      <div className={classes.rootAuth}>
        <Grid container direction="column">
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item md={10} xs={12}>
                <Grid container direction="row" justify="center" spacing={40}>
                      <Grid item md={5} xs={12}>
                    <Card>
                      <Typography variant="h1" className={classes.titleParams}>
                        SIGN IN
                    </Typography>
                      <Divider />
                      <CardContent>
                        <form onSubmit={this.handlerSubmitLogin}>
                   
                        <Grid container>
                          <TextField
                            id="email-address"
                            label="Email Adddress"
                            fullWidth
                           error={errors.username || errors.message ? true : false}
                            name="username"
                            value={username}
                            onChange={this.handleChange}
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                              classes: {
                                root: classes.textLabel
                              }
                            }}
                          />
                        </Grid>
                        <Grid container>
                          <TextField
                            id="password"
                            label="Password"
                            name="password"
                            value={password}
                            type="password"
                            onChange={this.handleChange}
                            
                            // style={{ margin: 8 }}
                            fullWidth
                                error={errors.password || errors.message ? true : false}
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                              classes: {
                                root: classes.textLabel
                              }
                            }}
                          />
                        </Grid>
                        <Grid container>
                          <FormHelperText style={{
                            margin: 10,
                            fontWeight:'bold'
                          }} error={Object.keys(errors).length > 0 ? true : false}>
                            {errors.message}
                          </FormHelperText>
                        </Grid>
                        <Grid container  spacing={16} direction="column">
                     
                          
                          <Grid item xs={12}>
                            <Button variant="contained" fullWidth color="primary" type="submit">
                              SIGN IN
                            </Button>
                          </Grid>

                              <Grid item xs={12}>
                                <Button variant="outlined" fullWidth component={Link} to="/sign-up" color="primary">
                              SIGN UP
                            </Button>
                          </Grid>

                        </Grid>
                    
                        {/* <Grid container>
                          <Link to="forgot-password" style={{ textDecoration: "none" }}>
                            <Typography >
                              Forgot Password?
                              </Typography>
                          </Link>

                        </Grid> */}
                        </form>
                      </CardContent>
                    </Card>
                      </Grid>
                  {/* <Grid item md={5}>
                    <Register />
                  </Grid> */}
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

Login.propTypes = {
  auths: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  loginUser:PropTypes.func.isRequired,
  errors:PropTypes.object.isRequired
}

const mapStateToProps = state => (
  {
    auths: state.auths,
    errors:state.errors
  });

export default compose(
  connect(mapStateToProps,{loginUser}), 
  withStyles(styles, { name: "Login" }))
  (withRouter(Login));
