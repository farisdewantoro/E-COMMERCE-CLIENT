import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingBag,
  faTags,
  faAngleRight,
  faSort,
  faTrashAlt,
  faUser,
  faFileSignature,
  faHome,
  faCreditCard,
  faSignOutAlt,
  faMinus,
  faUserCircle,
  faEye,
  faAngleLeft
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faLine,
  faWhatsapp,
  faFacebook
} from "@fortawesome/free-brands-svg-icons";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";

import queryString from "query-string";
import { withRouter } from "react-router-dom";
import Snackbars from "../common/Snackbars";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./styles";
import ReactPixel from "react-facebook-pixel";
library.add([
  faInstagram,
  faFacebookF,
  faFacebook,
  faLine,
  faWhatsapp,
  faShoppingBag,
  faTags,
  faAngleLeft,
  faAngleRight,
  faSort,
  faTrashAlt,
  faUser,
  faFileSignature,
  faHome,
  faCreditCard,
  faSignOutAlt,
  faUserCircle,
  faMinus,
  faEye
]);

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#212121",
      dark: "#424242",
      contrastText: "#fff"
    },
    secondary: {
      main: "#fafafa"
    }
  },
  typography: {
    useNextVariants: true
  }
});

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      left: false,
      cartList: [],
      totalQuantityCart: 0,
      notificationCart: false,
      status: null,
      prevPath: "",
      notification: {
        error: true,
        message: "tes",
        openNotification: true
      },
      openDrawer: false
    };
  }
  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };
  toggleDrawer = (side, open) => e => {
    this.setState({
      [side]: open
    });
  };

  componentDidMount() {
    const options = {
      autoConfig: true, // set pixel's autoConfig
      debug: false // enable logs
    };
    ReactPixel.init("281390916075949", options);
    ReactPixel.pageView();

    if (
      this.props.carts.cartList.length > 0 &&
      this.state.cartList !== this.props.carts.cartList
    ) {
      let quantity = 0;
      this.props.carts.cartList.forEach(c => {
        quantity = quantity + c.quantity;
      });
      this.setState({
        cartList: this.props.carts.cartList,
        totalQuantityCart: quantity
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    let carts = nextProps.carts;
    let quantity = 0;

    if (carts !== this.props.carts) {
      this.setState({
        cartList: carts.cartList
      });

      carts.cartList.forEach(c => {
        quantity = quantity + c.quantity;
      });
      this.setState({
        totalQuantityCart: quantity,
        notificationCart: true
      });
      this.timeoutNotification(6000);
    }
    if (nextProps.notification !== this.props.notification) {
      let notif = nextProps.notification;
      this.setState(prevState => ({
        notification: {
          ...prevState.notification,
          error: notif.error,
          message: notif.message,
          openNotification: notif.notification
        }
      }));
    }
  }
  timeoutNotification = time => {
    setTimeout(this.removeNotification, time);
  };
  removeNotification = () => {
    this.setState({
      notificationCart: false
    });
  };

  render() {
    const { classes } = this.props;
    const {
      totalQuantityCart,
      notificationCart,
      notification,
      openDrawer
    } = this.state;
    const loadingProduct = this.props.products.loading;
    const loadingCart = this.props.carts.loading;
    const loadingAuth = this.props.auths.loading;
    const loadingOrder = this.props.orders.loading;
    const { user } = this.props.auths;
    const { category, category_tag, collection } = this.props.UI;

    let loadingContainer;
    if (loadingProduct || loadingCart || loadingAuth || loadingOrder) {
      loadingContainer = <LinearProgress color="primary" />;
    }
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Header
            totalQuantityCart={totalQuantityCart}
            notificationCart={notificationCart}
            user={user}
            loadingContainer={loadingContainer}
            category={category}
            category_tag={category_tag}
            toggleDrawer={this.toggleDrawer}
            openDrawer={openDrawer}
            collection={collection}
          />

          <main className={classes.content}>
            {this.props.children}
            <Snackbars notification={notification} />
          </main>

          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  carts: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  products: state.products,
  carts: state.carts,
  auths: state.auths,
  tracks: state.tracks,
  notification: state.notification,
  UI: state.UI,
  orders: state.orders
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    {}
  )
)(withRouter(MainLayout));
