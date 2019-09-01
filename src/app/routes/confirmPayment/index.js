import React, { Component } from 'react'
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import Page from '../../components/page';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    Input,
    InputLabel,
    InputAdornment,
    FormHelperText,
    FormControl,
    Button,
    NoSsr,
    Paper,
    MenuItem
} from '@material-ui/core';
import { Link,withRouter} from 'react-router-dom';
import Select from 'react-select';
import { getOrderBanTransfer, submitConfirmPayment} from '../../actions/orderActions';
import qs from 'query-string';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    console.log(props);
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            FormHelperTextProps={{
                classes: {
                    root: props.selectProps.classes.helperText
                }
            }}
            error={props.selectProps.error}
            helperText={props.selectProps.error}
            InputLabelProps={{
                shrink: true,
                classes:{
                    root: props.selectProps.classes.textTitle
                }
            }}
            label="Order ID "
            margin="normal"
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
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
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

class ConfirmPayment extends Component {
    constructor(props){
        super(props);
        this.state={
            orderList:[],
            name:'',
            order_id:'',
            nominal_transfer:'',
            bank:'',
            note:''
            
        }
    }
   componentDidMount(){
       this.setState({
           orderList: []
       })
       if (this.props.auths.user && Object.keys(this.props.auths.user).length > 0){
           this.props.getOrderBanTransfer(this.props.auths.user);
       }
      
   }

   UNSAFE_componentWillReceiveProps(nextProps){
       if(nextProps.auths.user !== this.props.auths.user){
           this.props.getOrderBanTransfer(nextProps.auths.user );

       }
       if (nextProps.orders !== this.props.orders && nextProps.orders.order && nextProps.orders.order.length > 0){
            this.setState({
                orderList:nextProps.orders.order.map(ord=>({
                    value:ord.id,
                    label:ord.id
                }))
            });

           if (nextProps.orders !== this.props.orders && nextProps.orders.order.length > 0 && nextProps.location.search){
               const query_data = qs.parse(nextProps.location.search);
               if(query_data.order_id){
                   this.setState({
                       order_id: {
                           value: query_data.order_id,
                           label: query_data.order_id
                       }
                   })
               }
          
            }
       }
       if (nextProps.orders !== this.props.orders && nextProps.orders.order && nextProps.orders.order.length == 0) {
           this.setState({
               orderList: []
           })
       }

   }
    handlerSubmitConfirmPayment = ()=>{
        let data={
            name: this.state.name,
            order_id:this.state.order_id,
            nominal_transfer:this.state.nominal_transfer,
            bank: this.state.bank,
            note: this.state.note
        }
        this.props.submitConfirmPayment(data, this.props.history);
    }
    handlerOnChangeOrder = (e)=>{
       this.setState({
           order_id:e
       })
    }
    handlerOnChange = (e)=>{
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]:value
        });
    }
  render() {
      const { classes, errors, theme, orders } = this.props;
      const { fullname,email} = this.props.auths.user;
      const { orderList,name,bank,order_id,nominal_transfer,note} = this.state;
      const selectStyles = {
          input: base => ({
              ...base,
              color: theme.palette.text.primary,
              '& input': {
                  font: 'inherit',
              },
              
          }), 
      };
    return (
        <Page
            id="ConfirmPayment"
            title={`Confirm Payment `}
        >
            {orderList instanceof Array && orderList.length > 0 ? (
                <div className={classes.root}>
                    <Grid container justify="center" direction="row" >
                        <Grid item md={8} xs={12}>
                            <Grid container direction="column" spacing={32}>
                                <Grid item xs={12}>
                                    <Typography variant="h1" className={classes.titleTracker}>
                                        CONFIRM PAYMENT
                        </Typography>
                                    <Typography className={classes.childTracker}>
                                        Please fill in the following form according to the payment that has been made.
                        </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Card>
                                        <CardContent>
                                            <TextField
                                                label="Full Name"
                                                fullWidth
                                                name="fullname"
                                                error={errors.fullname ? true : false}
                                                helperText={errors.fullname ? errors.fullname : ''}
                                                value={fullname}
                                                disabled
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                    classes: {
                                                        root: classes.textTitle
                                                    }
                                                }} />
                                            <TextField
                                                label="Email"
                                                fullWidth
                                                name="email"
                                                error={errors.email ? true : false}
                                                helperText={errors.email ? errors.email : ''}
                                                value={email}
                                                disabled
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                    classes: {
                                                        root: classes.textTitle
                                                    }
                                                }} />
                                            <NoSsr>
                                                <Select
                                                    classes={classes}
                                                    styles={selectStyles}
                                                    options={orderList}
                                                    components={components}
                                                    onChange={this.handlerOnChangeOrder}
                                                    value={order_id}
                                                    error={errors.order_id}
                                                    placeholder=" "
                                                    isClearable
                                                />
                                            </NoSsr>
                                            <FormControl fullWidth className={classes.margin}>
                                                <InputLabel 

                                                className={classes.textTitle}
                                                htmlFor="adornment-amount"
                                                error={errors.nominal_transfer ? true:false}>Nominal Transfer </InputLabel>
                                                <Input
                                                    id="adornment-amount"
                                                    name="nominal_transfer"
                                                    value={nominal_transfer}
                                                    onChange={this.handlerOnChange}
                                                    type="number"
                                                    error={errors.nominal_transfer ? true:false}
                                                    startAdornment={<InputAdornment position="start">IDR</InputAdornment>}
                                                />
                                                <FormHelperText className={classes.helperText} error={errors.nominal_transfer ? true:false}>{errors.nominal_transfer}</FormHelperText>
                                            </FormControl>
                                            <TextField
                                                label="Nama Bank anda"
                                                fullWidth
                                                name="bank"
                                                value={bank}
                                                onChange={this.handlerOnChange}
                                                error={errors.bank ? true : false}
                                                helperText={errors.bank ? errors.bank : '*BCA, BRI'}
                                                // value={bank}
                                                margin="normal"
                                                FormHelperTextProps={{
                                                    classes: {
                                                        root: classes.helperText
                                                    }
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                    classes: {
                                                        root: classes.textTitle
                                                    }
                                                }} />
                                            <TextField
                                                label="Nama pemilik rekening "
                                                fullWidth
                                                name="name"
                                                value={name}
                                                onChange={this.handlerOnChange}
                                                error={errors.name ? true : false}
                                                helperText={errors.name ? errors.name : '*isi dengan (m) apabila setor tunai'}
                                                // value={bank}
                                                margin="normal"
                                                FormHelperTextProps={{
                                                    classes: {
                                                        root: classes.helperText
                                                    }
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                    classes: {
                                                        root: classes.textTitle
                                                    }
                                                }} />
                                            <div >
                                                <Button className={classes.buttonUpload} >
                                                    Upload bukti transfer
                                                            <CloudUploadIcon className={classes.rightIcon} />
                                                </Button>
                                                <FormHelperText className={classes.helperText}>*ext JPEG,JPG,PNG - Size Max 5mb </FormHelperText>
                                            </div>
                                      
                                            <TextField
                                                label="Note"
                                                fullWidth
                                                multiline
                                                rows="4"
                                                name="note"
                                                value={note}
                                                onChange={this.handlerOnChange}
                                                error={errors.note ? true : false}
                                                helperText={errors.note ? errors.note : '*optional'}
                                                FormHelperTextProps={{
                                                    classes:{
                                                        root:classes.helperText
                                                    }
                                                }}
                                                // value={bank}
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                    classes: {
                                                        root: classes.textTitle
                                                    }
                                                }} />
                                            <Button 
                                            disabled={orders.loading}
                                            variant="contained" 
                                            onClick={this.handlerSubmitConfirmPayment}
                                            color="primary" fullWidth style={{ margin: "20px 0" }}>
                                                SUBMIT
                                        </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            ) : (
                    <Grid container justify="center" direction="row" alignItems="center" style={{ padding: "80px 0" }}>

                        <Grid item>
                            <Grid container justify="center" >
                                {/* <Navigator /> */}
                            </Grid>
                        </Grid>
                        <Grid item >
                            <Typography className={classes.titleParamsActive}>
                             No orders must be confirmed.
                        </Typography>
                            <Grid container justify="center">
                                <Button variant="contained" component={Link} to="/shop" color="primary">
                                    RETURN TO SHOP
            </Button>
                            </Grid>

                        </Grid>

                    </Grid>
            )}
               
          
        </Page>
      
    )
  }
}

ConfirmPayment.propTypes={
    auths:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired,
    getOrderBanTransfer:PropTypes.func.isRequired,
    submitConfirmPayment:PropTypes.func.isRequired
}

const mapStateToProps= (state)=>({
    auths:state.auths,
    errors:state.errors,
    orders:state.orders
})

export default compose(withStyles(styles, { withTheme: true }), connect(mapStateToProps, { submitConfirmPayment, getOrderBanTransfer }))(withRouter(ConfirmPayment))
