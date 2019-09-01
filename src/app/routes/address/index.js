import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import Select from 'react-select';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import InputLabel from '@material-ui/core/InputLabel';
import { getProvince, findRegencies, findDistricts, findVillages,findOptionAddress} from '../../actions/addressActions';
import { updateAddressLocation, getAddressLocation} from '../../actions/myAccounts';
import classNames from 'classnames';
import FormHelperText from '@material-ui/core/FormHelperText';
import Page from '../../components/page';
function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function inputComponent({
    inputRef,
    ...props
}) {
    return <div ref={inputRef} {...props}/>;
}

function Control(props) {
 
    return (<TextField
        fullWidth
        error={props.selectProps.error}
        InputProps={{
        inputComponent,
        inputProps: {
            className: props.selectProps.classes.input,
            inputRef: props.innerRef,
            children: props.children,
            ...props.innerProps
        }
    }}
        {...props.selectProps.textFieldProps}/>);
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
            fontWeight: props.isSelected
                ? 500
                : 400
        }}
            {...props.innerProps}>
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography
            className={props.selectProps.classes.singleValue}
            {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
            [props.selectProps.classes.chipFocused]: props.isFocused
        })}
            onDelete={props.removeProps.onClick}
            deleteIcon={< CancelIcon {
            ...props.removeProps
        } />}/>
    );
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer
};
class Address extends Component {
    state = {
        single: null,
        multi: null,
        provinces: [],
        regencies:[],
        districts:[],
        villages:[],
        user_address:{
            province_id:'',
            regency_id:'',
            district_id:'',
            village_id:'',
            postcode:'',
            address:''
        }
    };

    componentDidMount() {
        this
            .props
            .getProvince();
 
        if(Object.keys(this.props.auths.user_address).length > 0){
            let user_a = this.props.auths.user_address;
            this.setState(prevState => ({
                user_address: {
                    ...prevState.user_address,
                    province_id: { value: user_a.province_id, label: user_a.province_name },
                    regency_id: { value: user_a.regency_id, label: user_a.regency_name },
                    district_id: { value: user_a.district_id, label: user_a.district_name },
                    village_id: { value: user_a.village_id, label: user_a.village_name },
                    postcode: user_a.postcode,
                    address: user_a.address
                }
            }));
            const data = {
                province_id: user_a.province_id, 
                regency_id:  user_a.regency_id,
                district_id: user_a.district_id, 
                village_id:  user_a.village_id,
            }
            this.props.findOptionAddress(data);

        }else{
            this.props.getAddressLocation();
        }

    
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.address.provinces !== this.props.address.provinces) {
            this.setState({
                provinces: nextProps
                    .address
                    .provinces
                    .map(p => {
                        return {value: p.id, label: p.name}
                    })
            })
        }
        if (nextProps.address.regencies !== this.props.address.regencies) {
            this.setState({
                regencies: nextProps
                    .address
                    .regencies
                    .map(r => {
                        return { value: r.id, label: r.name,province_id:r.province_id }
                    })
            })
        }
        if (nextProps.address.districts !== this.props.address.districts) {
            this.setState({
                districts: nextProps
                    .address
                    .districts
                    .map(d => {
                        return { value: d.id, label: d.name, regency_id: d.regency_id }
                    })
            })
        }
        if (nextProps.address.villages !== this.props.address.villages) {
            this.setState({
                villages: nextProps
                    .address
                    .villages
                    .map(v => {
                        return { value: v.id, label: v.name, district_id: v.district_id }
                    })
            })
        }
      
        if(nextProps.auths.user_address !== this.props.auths.user_address){
            let user_a = nextProps.auths.user_address;
            this.setState(prevState=>({
                user_address:{
                    ...prevState.user_address,
                    province_id: { value: user_a.province_id, label:user_a.province_name},
                    regency_id: { value: user_a.regency_id, label:user_a.regency_name},
                    district_id: { value: user_a.district_id, label:user_a.district_name},
                    village_id: { value: user_a.village_id, label:user_a.village_name},
                    postcode: (user_a.postcode ? user_a.postcode : ''),
                    address: (user_a.address ? user_a.address : '')
                }
            }))
        }
    }

    handleChange = name => value => {
        this.setState({[name]: value});
    };
    handlerChangeProvince = value=>{
        this.setState(prevState=>({
            user_address:{
                ...prevState.user_address,
                province_id:value,
                regency_id: '',
                district_id: '',
                village_id: '',

            }
        }));
        if(typeof value !== "undefined" && value !== null && (typeof value == "object" && Object.keys(value).length > 0)){
          this.props.findRegencies(value);
        }
    }
    handleChangeRegency = value =>{
        this.setState(prevState => ({
            user_address: {
                ...prevState.user_address,
                regency_id: value,
                district_id: '',
                village_id: ''
            }
        }));
        if (typeof value !== "undefined" && value !== null && (typeof value == "object" && Object.keys(value).length > 0)) {
            this.props.findDistricts(value);
        }
    }
    handlerChangeDistrict= value => {
        this.setState(prevState => ({
            user_address: {
                ...prevState.user_address,
                district_id: value,
                village_id: '',
            }
        }));
        if (typeof value !== "undefined" && value !== null && (typeof value == "object" && Object.keys(value).length > 0)) {
            this.props.findVillages(value);
        }
    }
    handlerChangeVillage = value=>{
        this.setState(prevState => ({
            user_address: {
                ...prevState.user_address,
                village_id: value
            }
        }));
    }
    handlerChangeAddress =(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        this.setState(prevState=>({
            user_address:{
                ...prevState.user_address,
                [name]:value
            }
        }))
    }
    handlerUpdateProfile = ()=>{
        let {user_address} = this.state;
        this.props.updateAddressLocation(user_address);
     
    }

    render() {
  
        const {classes,errors} = this.props;
        const { provinces, regencies, districts, villages,} = this.state;
        const { province_id, regency_id, district_id, village_id, postcode,address } = this.state.user_address;

        return (
            <Page
                id="user-address"
                noCrawl
            >
            <div className={classes.wrapperProfile}>
                <Grid container direction="column">
                    <Grid item xs={12}>
                        <Grid container justify="center">
                            <Grid item md={8} xs={12}>
                                <Card>
                                    <Typography
                                        variant="h1"
                                        className={classes.titleParams}
                                        style={{
                                        margin: 20
                                    }}>
                                        My Address
                                    </Typography>
                                    <Divider/>
                                    <CardContent>
                                        <NoSsr>
                                            <Grid container direction="column" spacing={32}>
                                            <Grid item>
                                                    <InputLabel shrink className={classes.textLabel} error={errors.province_id ? true : false}>
                                                    Propinsi
                                                </InputLabel>
                                             
                                                <Select
                                                    classes={classes}
                                                    styles={classes.selectStyles}
                                                    options={provinces}
                                                    error={errors.province_id ? true : false}
                                                    components={components}
                                                    value={province_id}
                                                    onChange={this.handlerChangeProvince}
                                                    placeholder=" "
                                                    isClearable/>
                                                    <FormHelperText error={errors.province_id ? true:false}>{errors.province_id}</FormHelperText>

                                            </Grid>
                                                <Grid item>
                                                    <InputLabel error={errors.regency_id ? true : false} shrink className={classes.textLabel}>
                                                    Kota/Kabupaten*
                                                </InputLabel>
                                                <Select
                                                    error={errors.regency_id ? true : false}
                                                    classes={classes}
                                                    styles={classes.selectStyles}
                                                    options={regencies}
                                                    components={components}
                                                    value={regency_id}
                                                    onChange={this.handleChangeRegency}
                                                    placeholder=" "
                                                    isClearable/>
                                                <FormHelperText error={errors.regency_id ? true : false}>{errors.regency_id}</FormHelperText>
                                                </Grid>

                                                <Grid item>
                                                    <InputLabel error={errors.district_id ? true : false} shrink className={classes.textLabel}>
                                                        Kecamatan 
                                                </InputLabel>
                                                    <Select
                                                            error={errors.district_id ? true : false}
                                                        classes={classes}
                                                        styles={classes.selectStyles}
                                                        options={districts}
                                                        components={components}
                                                        value={district_id}
                                                        onChange={this.handlerChangeDistrict}
                                                        placeholder=" "
                                                        isClearable />
                                                    <FormHelperText error={errors.district_id ? true : false}>{errors.district_id}</FormHelperText>

                                                </Grid>
                                                <Grid item>
                                                    <InputLabel error={errors.village_id ? true : false} shrink className={classes.textLabel}>
                                                        Kelurahan
                                                </InputLabel>
                                                    <Select
                                                            error={errors.village_id ? true : false}
                                                        classes={classes}
                                                        styles={classes.selectStyles}
                                                        options={villages}
                                                        components={components}
                                                        value={village_id}
                                                        onChange={this.handlerChangeVillage}
                                                        placeholder=" "
                                                        isClearable />
                                                    <FormHelperText error={errors.village_id ? true : false}>{errors.village_id}</FormHelperText>

                                                </Grid>

                                            </Grid>
                                        </NoSsr>
                                        <div style={{margin:"20px 0"}}>
                                            <Grid container direction="column" spacing={16} >
                                                <Grid item>
                                                    <TextField
                                                        label="Kode POS"
                                                        name="postcode"
                                                        error={errors.postcode ? true : false}
                                                        helperText={errors.postcode ? errors.postcode : ""}
                                                        fullWidth
                                                        value={postcode}
                                                        onChange={this.handlerChangeAddress}
                                                        style={{ padding: "15px 0" }}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                            classes: {
                                                                root: classes.textLabelBig
                                                            }
                                                        }} />
                                                </Grid>
                                                <Grid item>
                                                    <TextField
                                                        label="Alamat Lengkap"
                                                        name="address"
                                                        fullWidth
                                                        error={errors.address ? true : false}
                                                        helperText={errors.address ? errors.address : ""}
                                                        value={address}
                                                        onChange={this.handlerChangeAddress}
                                                        style={{ padding: "15px 0" }}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                            classes: {
                                                                root: classes.textLabelBig
                                                            }
                                                        }} />
                                                </Grid> 
                                                <Grid
                                                    item
                                                  >
                                                    <Button
                                                        variant="contained"
                                                        fullWidth
                                                        color="primary"
                                                        onClick={this.handlerUpdateProfile}>
                                                        Save Changes
                                            </Button>
                                                </Grid>
                                            </Grid>
                                        </div>
                                  

                                      
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
Address.propTypes = {
    auths: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    getProvince: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    address: PropTypes.object.isRequired,
    findRegencies:PropTypes.func.isRequired,
    findDistricts:PropTypes.func.isRequired,
    findVillages:PropTypes.func.isRequired,
    updateAddressLocation:PropTypes.func.isRequired,
    getAddressLocation:PropTypes.func.isRequired,
    findOptionAddress: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({auths: state.auths, errors: state.errors, address: state.address});

export default compose(connect(mapStateToProps, { findOptionAddress,getProvince, findRegencies, findDistricts, findVillages, updateAddressLocation, getAddressLocation }), withStyles(styles, { name: "Address"}))(Address);
