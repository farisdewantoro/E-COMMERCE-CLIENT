import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography'
import styles from './styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import keys from '../../config/keys';
import { registerNewUser} from '../../actions/authActions';
import Page from '../../components/page';
import {withRouter} from 'react-router-dom';
import FormHelperText from '@material-ui/core/FormHelperText'
class Register extends Component {
    state={
        data:{
            fullname:'',
            email:'',
            password:'',
            confirmPassword: '',
            phone_number:''
        },
        error:false,
        errorMessage:''
    }

    handlerLoginWithGoogle = () => {
        window.location.href = keys.loginWith.google;
    }
    handlerLoginWithFacebook = () => {
        window.location.href = keys.loginWith.facebook;
    }
    handlerRegisterSubmit = (e) =>{
        e.preventDefault();
        this.props.registerNewUser(this.state.data,this.props.history);
    }

    onChangeHandler = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        this.setState(prevState=>({
            data:{
                ...prevState.data,
                [name]:value
            }
        }))
    }

    shouldComponentUpdate(nextProps, nextState){
        let confirmPassword = nextState.data.confirmPassword;
        let password = this.state.data.password;
        if(confirmPassword !== this.state.data.confirmPassword){
            if (confirmPassword !== password) {
                this.setState({
                    error: true,
                    errorMessage: "Password doesn't match !"
                });
                return false;
            }else{
                this.setState({
                    error: false,
                    errorMessage:""
                });
                return false;
            }
        }
        if(nextState.data.password !== password && this.state.data.confirmPassword !== ''){
            if (this.state.data.confirmPassword !== nextState.data.password) {
                this.setState({
                    error: true,
                    errorMessage: "Password doesn't match !"
                });
                return false;
            } else {
                this.setState({
                    error: false,
                    errorMessage: ""
                });
                return false;
            }
       
        }
        return true;
     
    }
 

    render() {
        const { classes, errors} = this.props;
        const { fullname, email, password, confirmPassword,phone_number} = this.state.data;
        const {error, errorMessage} = this.state;
      
       
        return (
            <Page
                id="Register"
                title="Register/Sign-up"
            >
                
            <div className={classes.rootAuth}>
                <Grid container direction="column">
                    <Grid item xs={12}>
                        <Grid container justify="center">
                            <Grid item md={11} xs={12}>
                                <Grid container direction="row" justify="center" spacing={40}>
                                    <Grid item md={6} xs={12}>
                                        <Card>
                                            <Typography variant="h1" className={classes.titleParams}>
                                                Register
                                            </Typography>
                                            <Divider/>
                                            <CardContent>
                                                <form onSubmit={this.handlerRegisterSubmit}>
                                           

                                                <Grid container>
                                                    <TextField
                                                        label="Full Name"
                                                        fullWidth
                                                        name="fullname"
                                                        error={errors.fullname ? true:false }
                                                        helperText={errors.fullname ? errors.fullname :''}
                                                        value={fullname}
                                                        onChange={this.onChangeHandler}
                                                        margin="normal"
                                                        InputLabelProps={{
                                                        shrink: true,
                                                        classes: {
                                                            root: classes.textLabel
                                                        }
                                                    }}/>
                                                </Grid>
                                                <Grid container>
                                                    <TextField
                                                        label="Email Address"
                                                        fullWidth
                                                        name="email"
                                                        type="email"
                                                        value={email}
                                                        error={errors.email ? true : false}
                                                        helperText={errors.email ? errors.email : ''}
                                                        autoComplete="email"
                                                        onChange={this.onChangeHandler}
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
                                                                value={phone_number}
                                                                error={errors.phone_number ? true : false}
                                                                helperText={errors.phone_number ? errors.phone_number : ''}
                                                                autoComplete="phone_number"
                                                                onChange={this.onChangeHandler}
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
                                                        value={password}
                                                        onChange={this.onChangeHandler}
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
                                                        onChange={this.onChangeHandler}
                                                        error={error || errors.confirmPassword ? true : false}
                                                        helperText={errorMessage || errors.confirmPassword ? errors.confirmPassword : ''}
                                                        type="password"
                                                        name="confirmPassword"
                                                        value={confirmPassword}
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
                                               
                                             
                                                <Grid container style={{margin:"20px 0"}}>
                                                    <Button color="primary" variant="contained" type="submit" fullWidth disabled={error} onClick={this.handlerRegisterSubmit}>
                                                        Register Now
                                                    </Button>
                                                </Grid>
                                                <Grid container alignItems="center">
                                                <Grid item>
                                                        <Typography>
                                                            Already have an account?
                                                        </Typography>
                                                </Grid>
                                                <Grid item>
                                                        <Button component={Link} to="/sign-in">
                                                            Sign In
                                                        </Button>
                                                </Grid>
                                                       
                                                     
                                                </Grid>
                                                </form>
                                            </CardContent>
                                        </Card>
                                    </Grid>

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

Register.propTypes = {
    auths: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    registerNewUser:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auths: state.auths,
    errors:state.errors
});

export default compose(connect(mapStateToProps, { registerNewUser }), withStyles(styles, { name: "Register" }))(withRouter(Register));
