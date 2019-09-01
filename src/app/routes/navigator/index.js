import React from 'react'
import PropTypes from 'prop-types'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import Paper from '@material-ui/core/Paper';
let steps = ['CARTS','SHIPPING','PAYMENT'];

const Navigator = props => {
    const { activeNavigator, classes} = props;
  return (
      <div >
          <Paper >
              <Stepper activeStep={activeNavigator} alternativeLabel style={{ padding:10 }}>
                  {steps.map(label => (
                      <Step key={label}>
                          <StepLabel classes={
                              { label: classes.labelStepper}
                          }>{label}</StepLabel>
                      </Step>
                  ))}
              </Stepper>
        </Paper>
     
     </div>
  )
}

Navigator.propTypes = {
    classes:PropTypes.object.isRequired
}

export default withStyles(styles)(Navigator);
