import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import InputLabel from '@material-ui/core/InputLabel';
import NoSsr from '@material-ui/core/NoSsr';


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

const Billing = (props) => {
 
        const {
            classes,
            errors,
            email,
            user,
            provinces,
            regencies,
            districts,
            villages,
            user_address,
            handlerChangeUser,
            handlerChangeUserInfo,
            handlerChangeAddress,
            handlerChangeVillage,
            handlerChangeDistrict,
            handleChangeRegency,
            handlerChangeProvince, 
        }= props;
        return (
            <div className={classes.bilingRoot}>
                <Card style={{overflow:'inherit',padding:"2px 0"}}>
                    <Typography variant="h1" className={classes.titleBilling}>
                        BILLING DETAILS
                    </Typography>
                    <Divider/>
                    <CardContent>
                        <Grid container>
                            <TextField
                                label="Full Name"
                                name="fullname"
                                onChange={handlerChangeUserInfo}
                                value={user.fullname}
                                fullWidth
                                margin="normal"
                                error={typeof errors.user !== "undefined" && typeof errors.user.fullname !== "undefined" && errors.user.fullname
                                    ? true
                                    : false}
                                helperText={typeof errors.user !== "undefined" && typeof errors.user.fullname !== "undefined" && errors.user.fullname
                                    ? errors.user.fullname
                                    : ''}
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
                                name="email"
                               
                                value={user.email}
                                fullWidth
                                margin="normal"
                                error={typeof errors.user !== "undefined" && typeof errors.user.email !== "undefined" && errors.user.email
                                ? true
                                : false}
                                helperText={typeof errors.user !== "undefined" && typeof errors.user.email !== "undefined" && errors.user.email
                                ? errors.user.email
                                : ''}
                                InputLabelProps={{
                                shrink: true,
                                classes: {
                                    root: classes.textLabel
                                }
                            }}
                                disabled
                            
                            />
                        </Grid>
                        <Grid container>
                            <TextField
                                label="Nomor Handphone"
                                name="phone_number"
                                type="number"
                                onChange={handlerChangeUserInfo}
                                value={user.phone_number}
                                fullWidth
                                error={typeof errors.user !== "undefined" && typeof errors.user.phone_number !== "undefined" && errors.user.phone_number
                                ? true
                                : false}
                                helperText={typeof errors.user !== "undefined" && typeof errors.user.phone_number !== "undefined" && errors.user.phone_number
                                ? errors.user.phone_number
                                : ''}
                                margin="normal"
                                InputLabelProps={{
                                shrink: true,
                                classes: {
                                    root: classes.textLabel
                                }
                            }}/>
                        </Grid>
                    <Grid>
                            <NoSsr>
                                <Grid container direction="column">
                                    <Grid item style={{padding:"2px 0"}}>
                                    <InputLabel
                                            shrink
                                            className={classes.textLabelSelect}
                                            error={typeof errors.user !== "undefined" && typeof errors.user.province_id !== "undefined" && errors.user.province_id
                                                ? true
                                                : false}>
                                            Propinsi
                                    </InputLabel>

                                        <Select
                                            error={typeof errors.user !== "undefined" && typeof errors.user.province_id !== "undefined" && errors.user.province_id
                                                ? true
                                                : false}
                                            classes={classes}
                                            styles={classes.selectStyles}
                                            options={provinces}
                                            components={components}
                                            value={user_address.province_id}
                                            onChange={handlerChangeProvince}
                                            placeholder=" "
                                            isClearable />
                                        <FormHelperText
                                            error={typeof errors.user !== "undefined" && typeof errors.user.province_id !== "undefined" && errors.user.province_id
                                                ? true
                                                : false}>{typeof errors.user !== "undefined" && typeof errors.user.province_id !== "undefined" && errors.user.province_id
                                                ? errors.user.province_id
                                                    : ""}</FormHelperText>

                                    </Grid>
                                    <Grid item style={{ padding: "2px 0" }}>
                                        <InputLabel
                                            error={typeof errors.user !== "undefined" && typeof errors.user.regency_id !== "undefined" && errors.user.regency_id
                                                ? true
                                                : false}
                                            shrink
                                            className={classes.textLabelSelect}>
                                            Kota/Kabupaten
                                    </InputLabel>
                                        <Select
                                            error={typeof errors.user !== "undefined" && typeof errors.user.regency_id !== "undefined" && errors.user.regency_id
                                                ? true
                                                : false}
                                            classes={classes}
                                            styles={classes.selectStyles}
                                            options={regencies}
                                            components={components}
                                            value={user_address.regency_id}
                                            onChange={handleChangeRegency}
                                            placeholder=" "
                                            isClearable />
                                        <FormHelperText
                                            error={typeof errors.user !== "undefined" && typeof errors.user.regency_id !== "undefined" && errors.user.regency_id
                                                ? true
                                                : false}>{typeof errors.user !== "undefined" && typeof errors.user.regency_id !== "undefined" && errors.user.regency_id
                                                    ? errors.user.regency_id
                                                    : ""}</FormHelperText>
                                    </Grid>

                                    <Grid item style={{ padding: "2px 0" }}>
                                        <InputLabel
                                            error={typeof errors.user !== "undefined" && typeof errors.user.district_id !== "undefined" && errors.user.district_id
                                                ? true
                                                : false}
                                            shrink
                                            className={classes.textLabelSelect}>
                                            Kecamatan
                                    </InputLabel>
                                        <Select
                                            error={typeof errors.user !== "undefined" && typeof errors.user.district_id !== "undefined" && errors.user.district_id
                                                ? true
                                                : false}
                                            classes={classes}
                                            styles={classes.selectStyles}
                                            options={districts}
                                            components={components}
                                            value={user_address.district_id}
                                            onChange={handlerChangeDistrict}
                                            placeholder=" "
                                            isClearable />
                                        <FormHelperText
                                            error={typeof errors.user !== "undefined" && typeof errors.user.district_id !== "undefined" && errors.user.district_id
                                                ? true
                                                : false}>{typeof errors.user !== "undefined" && typeof errors.user.district_id !== "undefined" && errors.user.district_id
                                                    ? errors.user.district_id
                                                    : ""}</FormHelperText>

                                    </Grid>
                                    <Grid item style={{ padding: "2px 0" }}>
                                        <InputLabel
                                            error={typeof errors.user !== "undefined" && typeof errors.user.village_id !== "undefined" && errors.user.village_id
                                                ? true
                                                : false}
                                            shrink
                                            className={classes.textLabelSelect}>
                                            Kelurahan
                                    </InputLabel>
                                        <Select
                                            error={typeof errors.user !== "undefined" && typeof errors.user.village_id !== "undefined" && errors.user.village_id
                                                ? true
                                                : false}
                                            classes={classes}
                                            styles={classes.selectStyles}
                                            options={villages}
                                            components={components}
                                            value={user_address.village_id}
                                            onChange={handlerChangeVillage}
                                            placeholder=" "
                                            isClearable />
                                        <FormHelperText
                                            error={typeof errors.user !== "undefined" && typeof errors.user.village_id !== "undefined" && errors.user.village_id
                                                ? true
                                                : false}>{typeof errors.user !== "undefined" && typeof errors.user.village_id !== "undefined" && errors.user.village_id
                                                    ? errors.user.village_id
                                                    : ""}</FormHelperText>

                                    </Grid>

                                </Grid>
                            </NoSsr>
                    </Grid>
                      
                       
                        <div>
                            <Grid container direction="column" spacing={16}>
                                <Grid item >
                                    <TextField
                                        label="Kode POS"
                                        name="postcode"
                                        error={typeof errors.user !== "undefined" && typeof errors.user.postcode !== "undefined" && errors.user.postcode
                                        ? true
                                        : false}
                                        helperText={typeof errors.user !== "undefined" && typeof errors.user.postcode !== "undefined" && errors.user.postcode
                                        ? errors.user.postcode
                                        : ""}
                                        fullWidth
                                        value={user_address.postcode}
                                        onChange={handlerChangeAddress}
                                        InputLabelProps={{
                                        shrink: true,
                                        classes: {
                                            root: classes.textLabel
                                        }
                                    }}/>
                                </Grid>
                                <Grid item >
                                    <TextField
                                        label="Alamat Lengkap"
                                        name="address"
                                        fullWidth
                                        error={typeof errors.user !== "undefined" && typeof errors.user.address !== "undefined" && errors.user.address
                                        ? true
                                        : false}
                                        helperText={typeof errors.user !== "undefined" && typeof errors.user.address !== "undefined" && errors.user.address
                                        ? errors.user.address
                                        : ""}
                                        value={user_address.address}
                                        onChange={handlerChangeAddress}
                            
                                        InputLabelProps={{
                                        shrink: true,
                                        classes: {
                                            root: classes.textLabel
                                        }
                                    }}/>

                                </Grid>
                            </Grid>
                        </div>
                    </CardContent>
                </Card>

            </div>
        )
    
}

Billing.propTypes = {
    classes: PropTypes.object.isRequired,
    handlerChangeUser:PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired,
    user:PropTypes.object.isRequired,
    provinces: PropTypes.array.isRequired,
    regencies: PropTypes.array.isRequired,
    districts: PropTypes.array.isRequired,
    villages: PropTypes.array.isRequired,
    user_address: PropTypes.object.isRequired,
    handlerChangeUserInfo: PropTypes.func.isRequired,
    handlerChangeAddress: PropTypes.func.isRequired,
    handlerChangeVillage: PropTypes.func.isRequired,
    handlerChangeDistrict: PropTypes.func.isRequired,
    handleChangeRegency: PropTypes.func.isRequired,
    handlerChangeProvince: PropTypes.func.isRequired
}


export default  withStyles(styles)(Billing);
