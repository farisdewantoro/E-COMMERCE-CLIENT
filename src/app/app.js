// The basics
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

// Action creators and helpers
// import { establishCurrentUser } from '../modules/auth';
import { isServer } from "../store";

import Header from "./header";
import Routes from "./routes";
// import MainLayout from './components/layouts/MainLayout';
import Loadable from "react-loadable";
import "typeface-roboto";
import "react-image-gallery/styles/css/image-gallery.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScrollToTop from "./ScrollToTop";


const MainLayout = Loadable({
  loader: () =>
    import(/* webpackChunkName: "dashboard" */ "./components/layouts/MainLayout"),
  loading: () => null,
  modules: ["MainLayout"]
});
class App extends Component {
  render() {

    return ( 
          <MainLayout>
              <ScrollToTop>
                <Routes />
              </ScrollToTop>
          </MainLayout>
    );
  }
}

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated
// });

// const mapDispatchToProps = dispatch =>
//   bindActionCreators({ establishCurrentUser }, dispatch);

export default withRouter(App);
