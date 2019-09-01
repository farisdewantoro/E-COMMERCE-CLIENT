import React, { Component } from 'react'
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import keys from '../../config/keys';
const Lookbook = (props) => {

      const { lookbook, classes} = props;
    return (
      <div>
            <Grid item xs={12} style={{
                marginTop: 100
            }}>
            <Grid container justify="center">
            <Grid item md={11}>
            <Grid container >
            <div style={{width:"100%"}}>
                <Typography variant="h1" className={classes.titleLookbook}>
                                    LOOKBOOK
                </Typography>
            </div>
              
            </Grid>
                <Grid container direction="row" spacing={16}>
                            {lookbook.map((lb, i) => {
                                return (
                                    <Grid item md={6} key={i} >
                                        <Card>
                                            <CardActionArea component={Link} to={`/lookbook/detail/${lb.slug}-${lb.lookbook_id}`}>
                                                <img src={keys.media.url+lb.public_id} style={{ width: "100%" }} alt="" />
                                            </CardActionArea>
                                            <CardActions >
                                                <Typography variant="h1" component={Link} to={`/lookbook/detail/${lb.slug}-${lb.lookbook_id}`} className={classes.lookbookNameText}>
                                                   {lb.name}
                                               </Typography>
                                           </CardActions>
                                        </Card>
                                    </Grid>
                                )
                            })}
                </Grid>
            </Grid>
                
                
            </Grid>
         
        </Grid>
      </div>
    )
  
}

Lookbook.propTypes={
    lookbook:PropTypes.array.isRequired,
    classes:PropTypes.object.isRequired
}

export default withStyles(styles)(Lookbook);
