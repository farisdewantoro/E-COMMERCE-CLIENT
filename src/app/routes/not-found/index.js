import React from 'react';
import Page from '../../components/page';
import {
  Grid,
  Button,
  Typography
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import {Link} from 'react-router-dom';
const notFound = (props) =>{
  const {classes} = props;
  return(
    
  <Page
    id="not-found"
    title="Not Found"
    description="This is embarrassing."
    noCrawl
  >
    <div className={classes.rootCarts}>
      <Grid container justify="center" direction="column" alignItems="center" spacing={40}>

        <Grid item>
          <Grid container justify="center" style={{ margin: "20px 0" }}>
            {/* <Navigator /> */}
          </Grid>
        </Grid>
        <Grid item >
          <Typography  className={classes.titleParamsActive}>
            404 PAGE IS NOT FOUND
                        </Typography>
          <Grid container justify="center" style={{ margin: "20px 0" }}>
            <Button variant="contained" component={Link} to="/shop" color="primary">
              RETURN TO SHOP
            </Button>
          </Grid>

        </Grid>

      </Grid>
    </div>
  </Page>

  )
};

export default withStyles(styles)(notFound);