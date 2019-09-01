import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import withWidth from '@material-ui/core/withWidth';
import {compose} from 'redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from '@material-ui/core/IconButton';
const InstagramFeed = (props)=>{

        const { classes, instagrams, width, dimension} = props;
        return (
            <div>
                <Grid item xs={12} style={{
                    marginTop: 100
                }}>
                    <Grid container justify="center">
                        <Grid item xs={11}>
                            <Grid container >
                                <div style={{ width: "100%" }}>
                                    <Typography variant="h1" className={classes.titleInstagram}>
                                   
                                            <FontAwesomeIcon icon={["fab", "instagram"]} /> hammerstoutdenim
                                    
                                 </Typography>
                                </div>
                                <div className={classes.rootInstagram}>
                                    <GridList cellHeight={dimension.height} spacing={8} className={classes.gridList} cols={width === 'xs' || width === 'sm' ? 3:4 }>
                                        {instagrams.instagram.map((tile,i) => (
                                            <GridListTile key={tile.images.standard_resolution.url} >
                                                <div 
                                                onClick={(e)=>window.open(tile.link,'_blank')}
                                                className={classes.wrapperInstagram} 
                                                style={
                                                    { 
                                                        backgroundImage: `url(${tile.images.standard_resolution.url})`,
                                                        width:dimension.width+'px',
                                                        height:dimension.height+'px',
                                                        cursor:"pointer"
                                                }
                                                }
                                                >
                                        {/* <img 
                                        src={tile.images.standard_resolution.url}
                                        alt={tile.caption.text} title={tile.caption.text}
                                        className={classes.imageInstagram}
                                        /> */}
                                            </div>

                                                
                                     
                                            </GridListTile>
                                        ))}
                                    </GridList>
                                </div>
                            </Grid>
                     
                        </Grid>


                    </Grid>

                </Grid>
            </div>
        )
    
}

InstagramFeed.propTypes = {
    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
}

export default compose(withStyles(styles), withWidth())(InstagramFeed);
