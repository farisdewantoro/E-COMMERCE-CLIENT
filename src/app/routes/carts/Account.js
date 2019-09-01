import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    Button,
    Grid,
    Typography,
    Divider,
    TextField,
    FormHelperText
} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

function Login(props){
    const { classes, user, errors, handlerSubmitLogin, handleChangeTab, onChangeHandler} = props;
    return(
        <div >
            <Grid container direction="column">
                <Grid item xs={12}>
                    <form onSubmit={handlerSubmitLogin}>

                        <Grid container>
                            <TextField
                                id="email-address"
                                label="Email Adddress"
                                fullWidth
                                error={errors.username || errors.message ? true : false}
                                name="email"
                                value={user.email}
                                onChange={onChangeHandler}
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
                                value={user.password}
                                type="password"
                                onChange={onChangeHandler}
                                // style={{ margin: 8 }}
                                fullWidth
                                error={errors.password || errors.message  ? true : false}
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
                                fontWeight:"bold"
                            }} error={Object.keys(errors).length > 0 ? true : false}>
                                {errors.message}
                            </FormHelperText>
                        </Grid>
                        <Grid container direction="column">
                            <Grid item xs={12}>
                                <Button variant="contained" fullWidth color="primary" type="submit">
                                    SIGN IN
                                    </Button>
                            </Grid>
                            <Grid item xs={12}>
                            <div style={{display:'flex',alignItems:'center',margin:'10px 0'}}>
                                    <Typography>
                                        doesn't have account ?
                                        </Typography>
                                    <Button onClick={() => handleChangeTab(0)}>
                                        SIGN UP
                            </Button>
                            </div>
                       
                            </Grid>

                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </div>
    )
}

function SignUp(props){
    const { user, onChangeHandler, handleChangeTab, errors, classes,onSubmitContinuePay} = props;
    return(
        <div style={{width:"100%"}}>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography>
                        Already have an account?
                    </Typography>
                </Grid>
                <Grid item>
                    <Button onClick={() => handleChangeTab(1)}>
                        Sign In
                    </Button>
                </Grid>


            </Grid>
            <Grid container>
                <TextField
                    label="Full Name"
                    fullWidth
                    name="fullname"
                    error={errors.fullname ? true : false}
                    helperText={errors.fullname ? errors.fullname : ''}
                    value={user.fullname}
                    onChange={onChangeHandler}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                        classes: {
                            root: classes.textLabel
                        }
                    }} />
            </Grid>
            <Grid container>
                <TextField
                    label="Email Address"
                    fullWidth
                    name="email"
                    type="email"
                value={user.email}
                    error={errors.email ? true : false}
                    helperText={errors.email ? errors.email : ''}
                    autoComplete="email"
                    onChange={onChangeHandler}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                        classes: {
                            root: classes.textLabel
                        }
                    }} />
            </Grid>
            <Grid container>
                <TextField
                    label="Phone Number"
                    fullWidth
                    name="phone_number"
                    type="number"
                value={user.phone_number}
                    error={errors.phone_number ? true : false}
                    helperText={errors.phone_number ? errors.phone_number : ''}
                    autoComplete="phone_number"
                    onChange={onChangeHandler}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                        classes: {
                            root: classes.textLabel
                        }
                    }} />
            </Grid>
            <Grid container>
                <TextField
                    label="Password"
                    fullWidth
                    type="password"
                    name="password"
                    error={errors.password ? true : false}
                    helperText={errors.password ? errors.password : ''}
                value={user.password}
                    onChange={onChangeHandler}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                        classes: {
                            root: classes.textLabel
                        }
                    }} />
            </Grid>
            <Grid container>
                <TextField
                    label="Confirm Password"
                    fullWidth
                    onChange={onChangeHandler}
                    error={errors.confirmPassword ? true : false}
                    helperText={errors.confirmPassword ? errors.confirmPassword : ''}
                    type="password"
                    name="confirmPassword"
                value={user.confirmPassword}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                        classes: {
                            root: classes.textLabel
                        }
                    }} />
            </Grid>

            {errors.message && (
                <Grid container style={{ margin: "20px 0" }}>
                    <FormHelperText error={true}>
                        {errors.message}
                    </FormHelperText>
                </Grid>
            )}


        
         
            <Grid container>
                     <Grid item xs={12} style={{margin:"10px 0"}}>
                            <Button 
                            variant="contained" 
                            onClick={onSubmitContinuePay}
                            fullWidth color="primary"
                            >
                                    CONTINUE 
                            </Button>
              
                        
                        </Grid> 
            </Grid>

        </div>
    )
}


function Logged(props) {
    const { user, onChangeHandler, handleChangeTab, errors, classes, onSubmitContinuePay } = props;
    return (
        <div style={{ width: "100%" }}>
            <Grid container>
                <TextField
                    label="Full Name"
                    fullWidth
                    name="fullname"
                    disabled
                    error={errors.fullname ? true : false}
                    helperText={errors.fullname ? errors.fullname : ''}
                    value={user.fullname}
                    onChange={onChangeHandler}
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
                    label="Email Address"
                    fullWidth
                    name="email"
                    type="email"
                    disabled
                    value={user.email}
                    error={errors.email ? true : false}
                    helperText={errors.email ? errors.email : ''}
                    autoComplete="email"
                    onChange={onChangeHandler}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                        classes: {
                            root: classes.textLabel
                        }
                    }} />
            </Grid>
            <Grid container>
                <TextField
                    label="Phone Number"
                    fullWidth
                    name="phone_number"
                    type="number"
                    disabled
                    value={user.phone_number}
                    error={errors.phone_number ? true : false}
                    helperText={errors.phone_number ? errors.phone_number : ''}
                    autoComplete="phone_number"
                    onChange={onChangeHandler}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                        classes: {
                            root: classes.textLabel
                        }
                    }} />
            </Grid>

            {errors.message && (
                <Grid container style={{ margin: "20px 0" }}>
                    <FormHelperText error={true}>
                        {errors.message}
                    </FormHelperText>
                </Grid>
            )}
            <Grid container>
                <Grid item xs={12} style={{ margin: "10px 0" }}>
                    <Button
                        variant="contained"
                        component={Link}
                        to="/checkout"
                        fullWidth color="primary"
                    >
                        CONTINUE 
                            </Button>


                </Grid>
            </Grid>

        </div>
    )
}


const Account = props => {
    const { 
        classes, 
        accountTab, 
        handleChangeTab, 
        theme, 
        errors, 
        onChangeHandler,
        user,
        handlerSubmitLogin,
        onSubmitContinuePay
    } = props;
  return (
    <div>
          <Grid container  >

              <Grid item xs={12}>
                  <Card>
                      <Grid container justify="center" style={{ padding: 10 }}>
                          <Typography variant="h1" className={classes.titleParamsActive}>
                               ACCOUNT
                </Typography>
                      </Grid>

                      <Divider />
                      <CardContent>
                     

                                  <SwipeableViews
                                      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                      index={accountTab}
                                      onChangeIndex={handleChangeTab}
                                  >
                                      <SignUp
                                          {...props}
                                      />
                                      <Login
                                        {...props}
                                      />
                                      <Logged {...props}/>
                                  </SwipeableViews>
                         
                        
                    
                      </CardContent>
                  </Card>

              </Grid>
          </Grid>
    </div>
  )
}

Account.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    onChangeHandler: PropTypes.func.isRequired, 
    user: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(Account)
