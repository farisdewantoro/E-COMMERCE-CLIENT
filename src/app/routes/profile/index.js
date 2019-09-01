import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import styles from './styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import moment from 'moment';
import {updateProfile} from '../../actions/myAccounts';
import Page from '../../components/page';
class Profile extends Component {
    state={
        user:{
            fullname:"",
            gender:"",
            birthday: new Date(),
            phone_number: "",
            email:""
        },
 
      
    }

 
    componentDidMount(){
        let stateUser = this.state.user;
        let user = this.props.auths.user;
     
        if (Object.keys(user).length > 0){
            Object.keys(stateUser).forEach(keys => {
                Object.keys(user).forEach(userKey => {
                    this.setState(prevState => ({
                        user: {
                            ...prevState.user,
                            [keys]: user[keys]
                        }
                    }))
                })
            });

        }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        let user = nextProps.auths.user;
        let stateUser = this.state.user;
        if(user !== this.props.auths.user){
            Object.keys(stateUser).forEach(keys => {
                Object.keys(user).forEach(userKey=>{
                    this.setState(prevState => ({
                        user:{
                            ...prevState.user,
                            [keys]:user[keys]
                        }
                    }))
                })
            });
   
        }
 
    }
    handlerChangeUserInfo = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [name]: value
            }
        }))
    }
    handlerUpdateProfile = ()=>{
        let { user} = this.state;
        this.props.updateProfile(user);
    }
    render() {
        const { classes,errors } = this.props;
        const {fullname,phone_number,birthday,email,gender} = this.state.user;
        return (
            <Page
                id="Profile"
                noCrawl
            >
                
            <div className={classes.wrapperProfile}>
                <Grid container direction="column">
                    <Grid item xs={12}>
                        <Grid container justify="center">
                            <Grid item md={8} xs={12}>
                                <Card>
                                    <Typography variant="h1" className={classes.titleParams} style={{margin:20}}>
                                        Profile
                                    </Typography>
                                    <Divider/>
                                    <CardContent>
                                        <Grid >
                                        <TextField 
                                                label="Full Name"
                                                name="fullname"
                                                value={fullname}
                                                fullWidth
                                                error={errors.fullname ? true:false}
                                                helperText={errors.fullname ? errors.fullname : ''}
                                                margin="normal"
                                                    onChange={this.handlerChangeUserInfo}
                                                InputLabelProps={{
                                                    shrink: true,
                                                    classes: {
                                                        root: classes.textLabel
                                                    }
                                                }}
                                         />
                                        </Grid>

                                

                                        <Grid>
                                            <TextField
                                                label="Email Address"
                                                name="email"
                                                value={email}
                                                fullWidth
                                                disabled
                                                margin="normal"
                                                error={errors.email ? true : false}
                                                helperText={errors.email ? errors.email : ''}
                                                InputLabelProps={{
                                                    shrink: true,
                                                    classes: {
                                                        root: classes.textLabel
                                                    }
                                                }}
                                             
                                            />
                                        </Grid>
                                        <Grid>
                                            <TextField
                                                label="Phone Number"
                                                name="phone_number"
                                                onChange={this.handlerChangeUserInfo}
                                                value={phone_number}
                                                fullWidth
                                                error={errors.phone_number ? true : false}
                                                helperText={errors.phone_number ? errors.phone_number : ''}
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                    classes: {
                                                        root: classes.textLabel
                                                    }
                                                }}
                                             
                                            />
                                        </Grid>
                                    <Grid container direction="row"  spacing={40}>
                                            <Grid item xs={12}>
                                                <FormControl component="fieldset" style={{ margin: "10px 0" }}>
                                                    <FormLabel component="legend" error={errors.gender ? true : false} className={classes.textFormLabel}>Gender</FormLabel>
                                                    <FormHelperText error={errors.gender ? true:false}>{errors.gender}</FormHelperText>
                                                    <RadioGroup
                                                        aria-label="Gender"
                                                        name="gender"
                                                        value={gender}
                                                            onChange={this.handlerChangeUserInfo}
                                                    >
                                                        <FormControlLabel value="female" name="gender" control={<Radio color="primary" />} label="Female" />
                                                        <FormControlLabel value="male" name="gender" control={<Radio color="primary" />} label="Male" />
                                                        <FormControlLabel value="other" name="gender" control={<Radio color="primary" />} label="Other" />


                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="date"
                                                    label="Birthday"
                                                    type="date"
                                                    name="birthday"
                                                    error={errors.birthday ? true:false}
                                                    helperText={errors.birthday ? errors.birthday :''}
                                                    onChange={this.handlerChangeUserInfo}
                                                    className={classes.textFieldBirthDay}
                                                    value={moment(birthday).format("YYYY-MM-DD")}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                        classes: {
                                                            root: classes.textLabel
                                                        }
                                                    }}
                                                    fullWidth

                                                />
                                            </Grid>
                                       

                                          
                                    </Grid>
                                   

                                        <Grid style={{margin:"30px 0"}}>
                                            <Button variant="contained" fullWidth color="primary" onClick={this.handlerUpdateProfile}>
                                                    Save Changes
                                            </Button>
                                        </Grid>
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
Profile.propTypes = {
    auths: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    updateProfile:PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired
}

const mapStateToProps = state => (
    {
        auths: state.auths,
        errors:state.errors
    });

export default compose(connect(mapStateToProps, { updateProfile}), withStyles(styles, { name: "Profile" }))(Profile);
