import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
function formatCurrency(value) {
    return value
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function filterShipment(parent,child){
     child.name = parent.name;
     child.code = parent.code;
     return child;
    // if(data.length > 0){
    //  data.filter().costs.filter((d, i) => i == index);
    // }
    
}
const Shipping = (props)=> {

      const { classes, shippingMethod, shippingFee, handlerShippingMethod} = props;
    return (
        <div style={{ margin: "10px 0" }}>
          <Card>
                <Typography variant="h1" className={classes.titleBilling}>
                    Shipping Method
                    </Typography>
                <Divider />
              <CardContent>
                    {shippingMethod.length > 0 ? (<FormControl component="fieldset" className={classes.formControl}>
                        <RadioGroup
                            aria-label="shippingFee"
                            name="shippingFee"
                            value={shippingFee}
                            className={classes.group}
                            onChange={handlerShippingMethod}
                        >
                            {shippingMethod.map((ship, i) => {
                                return(
        
                                    ship.costs.map((s, index) => {
                                        // console.log();
                                        return (
                                            <div key={index}>
                                                <FormControlLabel value={JSON.stringify(filterShipment(ship,s))} name="shippingFee" control={<Radio color="primary" checked={shippingFee === s.cost[0].value} />} label={`${ship.name}-IDR ${formatCurrency(s.cost[0].value)}`} />
                                                <FormHelperText>{s.description} - Estimates Days:{s.cost[0].etd}</FormHelperText>
                                            </div>

                                        )
                                    })
                                )
                        
                          
                            })}

                        </RadioGroup>
                    </FormControl>) : (<Typography>You must fill the address</Typography>) }
                   
              </CardContent>
          </Card>
      </div>
    )
  
}

Shipping.propTypes = {
    classes: PropTypes.object.isRequired,
    shippingMethod:PropTypes.array.isRequired,
    shippingFee: PropTypes.number.isRequired

}


export default withStyles(styles)(Shipping);
