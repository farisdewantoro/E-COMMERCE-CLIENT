import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import {Link} from 'react-router-dom';
import keys from '../../config/keys';
const Collection = (props)=> {

        const {collection, classes} = props;

        let imageCollection;
        if (collection.length > 0 ) {
            imageCollection = (     
                    <Grid item md={12}>
                        <Link to={`/collection/${collection[0].slug}`}>
                        <img
                            src={keys.media.url+collection[0].public_id}
                            style={{
                                width: "100%"
                            }}
                            alt={collection[0].alt} />
                        </Link>
                
                    </Grid>
            )
        }
 

        return (
            <div>
                <Grid
                    item
                    xs={12}
                    style={{
                    marginTop: 100
                }}>
                    <Grid container justify="center">
                        <Grid item md={11} xs={12}>
                            <Grid container>
                                <div
                                    style={{
                                    width: "100%"
                                }}>
                                    <Typography variant="h1" className={classes.titleLookbook}>
                                        COLLECTION
                                    </Typography>
                               
                                </div>
                                <Grid container direction="row" justify="center" spacing={16}>
                      
                                   
                                    {imageCollection}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    
}

Collection.propTypes = {
    collection: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Collection);
