import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
const PrivateRouteParams = ({ component: Component, auths, ...rest }) => (
 
    <Route {...rest} render={props =>
        auths.isAuthenticated === true 
            ? <Component key={props.match.params.token_order} {...props} /> : <Redirect to="/sign-in" />
        // <Component key={props.match.params.token_order} {...props} /> 
    }
    />
);

PrivateRouteParams.propTypes = {
    auths: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auths: state.auths
});

export default connect(mapStateToProps)(PrivateRouteParams);