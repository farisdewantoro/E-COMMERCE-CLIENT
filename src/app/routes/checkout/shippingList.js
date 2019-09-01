import React, { Component } from 'react'
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
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import InputLabel from '@material-ui/core/InputLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import JNEicon from '../../../asset/courier/jne.png';
const ShippingList = (props)=> {

      const {classes} = props;
    return (
      <div>
            <Card>
                <Typography variant="h1" className={classes.titleBilling}>
                    Shipping Method
                    </Typography>
                <Divider />
                <CardContent>
                   <FormControl component="fieldset" className={classes.formControl}>
                        <RadioGroup
                            aria-label="shippingFee"
                            name="shippingFee"
                            // value={shippingFee}
                            className={classes.group}
                            // onChange={handlerShippingMethod}
                        >
                            {/* {shippingMethod[0].costs.map((s, i) => {
                                return ( */}
                                 
                            <FormControlLabel value="jne" name="shippingFee" control={<Radio color="primary" />} label={<img src={JNEicon} style={{maxWidth:100,maxHeight:100}} />}/>
                                        <FormHelperText>JNE</FormHelperText>
                              

                                {/* )
                            })} */}

                        </RadioGroup>
                    </FormControl>

                </CardContent>
            </Card>
      </div>
    )
  
}
ShippingList.propTypes = {
    classes: PropTypes.object.isRequired,

}


export default withStyles(styles)(ShippingList);
