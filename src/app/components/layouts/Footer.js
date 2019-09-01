import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import styles from "./styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Divider from "@material-ui/core/Divider";
// import BCA_logo from '../../asset/bank/bca.png';
// import BRI_logo from '../../asset/bank/bri.png';
// import GOPAY_logo from '../../asset/bank/gopay.png';
// import BNI_logo from '../../asset/bank/bni.png';
// import MANDIRI_logo from '../../asset/bank/mandiri.png';
// import PERMATA_logo from '../../asset/bank/permata.png';

class Footer extends Component {
  // state={
  //   paymentList: [
  //     // { name: "Credit Card", value:"credit_card"},
  //     { name: "GO-PAY", value: "gopay", img: GOPAY_logo },
  //     { name: "PERMATA - ATM/Bank Transfer (Virtual Account)", value: "permata_va", img: PERMATA_logo },
  //     { name: "BNI - ATM/Bank Transfer (Virtual Account )", value: "bni_va", img: BNI_logo },
  //     { name: "MANDIRI - ATM/Bank Transfer (Virtual Account )", value: "echannel", img: MANDIRI_logo },
  //     { name: "BCA - ATM/Bank Transfer (Verifikasi Manual)", value: "bank_transfer_manual", bank: "bca", img: BCA_logo },
  //     { name: "BRI - ATM/Bank Transfer (Verifikasi Manual)", value: "bank_transfer_manual", bank: "bri", img: BRI_logo }

  //     // { name: "KlikBCA", value: "bca_klikbca" },
  //     // { name: "BCA KlikPay", value: "bca_klikpay" },
  //     // { name: "Mandiri Clickpay", value: "mandiri_clickpay" },
  //     // { name: "CIMB Clicks", value: "cimb_clicks" },
  //     // { name: "Danamon Online Banking", value: "danamon_online" },
  //     // { name: "E-Pay BRI", value: "bri_epay" },
  //     // { name: "Indomaret", value: "indomaret" },
  //   ],

  // }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapperFooter}>
        <Grid container justify="center">
          <Grid
            item
            xs={10}
            style={{
              margin: "20px 0"
            }}
          >
            <Grid container spacing={16} direction="row">
              <Grid item md={7} xs={12}>
                <div className={classes.wrapperFooterList}>
                  <Typography
                    component={Link}
                    to="/shop"
                    className={classes.link}
                  >
                    Shop
                  </Typography>
                  <Divider style={{ background: "#fff" }} />
                </div>
                <div className={classes.wrapperFooterList}>
                  <Typography
                    component={Link}
                    to="/confirm-payment"
                    className={classes.link}
                  >
                    Confirm Payment
                  </Typography>
                  <Divider style={{ background: "#fff" }} />
                </div>
                <div className={classes.wrapperFooterList}>
                  <Typography
                    component={Link}
                    to="/return-policy"
                    className={classes.link}
                  >
                    Return Policy
                  </Typography>
                  <Divider style={{ background: "#fff" }} />
                </div>

                <div className={classes.wrapperFooterList}>
                  <Typography
                    component={Link}
                    to="/payment-guide"
                    className={classes.link}
                  >
                    Payment Guide
                  </Typography>
                  <Divider style={{ background: "#fff" }} />
                </div>
                <div className={classes.wrapperFooterList}>
                  <Typography
                    component={Link}
                    to="/size-guide"
                    className={classes.link}
                  >
                    Size Guide
                  </Typography>
                  <Divider style={{ background: "#fff" }} />
                </div>
                <div className={classes.wrapperFooterList}>
                  <Typography
                    component={Link}
                    to="/track-shipment"
                    className={classes.link}
                  >
                    Track Shipment
                  </Typography>
                  <Divider style={{ background: "#fff" }} />
                </div>
                <div className={classes.wrapperFooterList}>
                  <Typography className={classes.colorWhite}>
                    Hammerstout © 2018 Developed by DevF. All Rights Reserved.
                  </Typography>
                </div>
              </Grid>
              <Grid item md={5} xs={12}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignContent="center"
                  alignItems="center"
                  spacing={16}
                >
                  <Grid item md={12}>
                    <Grid container justify="center">
                      <Grid item md={8}>
                        <Typography className={classes.titleTop}>
                          
                          HEADQUARTERS & STORE
                        </Typography>
                        <Typography
                          className={classes.colorWhite}
                          style={{ textAlign: "center" }}
                        >
                          Jln. Sari Indah IV no.19, Babakan Sari, Kiaracondong,
                          Bandung. Monday – Sunday (10.00 – 20.00 WIB)
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={12}>
                    <Typography className={classes.titleTop}>
                      CONNECT WITH US
                    </Typography>
                    <div className={classes.wrapperIcon}>
                      <IconButton
                        aria-label="facebook"
                        onClick={e =>
                          window.open(
                            "https://www.facebook.com/hammerstoutdenim/",
                            "_blank"
                          )
                        }
                        className={classes.colorWhite}
                      >
                        <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                      </IconButton>
                      <IconButton
                        aria-label="instagram"
                        onClick={() =>
                          window.open(
                            "https://www.instagram.com/hammerstoutdenim/",
                            "_blank"
                          )
                        }
                        className={classes.colorWhite}
                      >
                        <FontAwesomeIcon icon={["fab", "instagram"]} />
                      </IconButton>
                      <IconButton
                        aria-label="line"
                        className={classes.colorWhite}
                        onClick={() =>
                          window.open("line://ti/p/@hammerstoutdenim", "_blank")
                        }
                      >
                        <FontAwesomeIcon icon={["fab", "line"]} />
                      </IconButton>
                      <IconButton
                        aria-label="whatsapp"
                        className={classes.colorWhite}
                        onClick={() =>
                          window.open("https://wa.me/6281221183839", "_blank")
                        }
                      >
                        <FontAwesomeIcon icon={["fab", "whatsapp"]} />
                      </IconButton>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
    
      
          </Grid>
        </Grid>
      </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Footer);
