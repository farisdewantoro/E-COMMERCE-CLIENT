import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography'
import styles from './styles';
import { getAllCollection } from '../../actions/collectionActions';
import Page from '../../components/page';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import keys from '../../config/keys';
class Collection extends Component {
    componentDidMount(){
        this.props.getAllCollection();
    }
    render() {
        const { classes } = this.props;
        const { collection, collection_mobile, fullScreen } = this.props.collections;
        let cString = ''
        let imageCollection = [];
        if (fullScreen){
            cString= collection.map(c => {
                return c.name
            }).toString();
            imageCollection = collection;
        }
        if (!fullScreen) {
            cString = collection_mobile.map(c => {
                return c.name
            }).toString();
            imageCollection = collection_mobile;
        }
        return (
            <Page
                id="Collection"
                title={`${cString} collections `}
            >
                <div className={classes.paddingRoot}>
                    <Grid container >
                        <Grid item md={12}>
                            <Grid container justify="center">
                                <Grid item md={10}>
                                    <Typography variant="h1" className={classes.titleCollection}>
                                        COLLECTION
                                </Typography>
                                    <Grid container direction="row" justify="center" spacing={16}>

                                        {imageCollection.map((co, i) => {
                                            return (
                                                <Grid item md={12} key={i} >
                                                    <Link to={`/collection/${co.slug}`}>
                                                        <img src={keys.media.url+co.public_id} style={{ width: "100%" }} alt={co.alt} />
                                                    </Link>

                                                </Grid>
                                            )
                                        })}

                                    </Grid>

                                </Grid>
                            </Grid>

                        </Grid>

                    </Grid>
                </div>
            </Page>
        
        )
    }
}

Collection.propTypes = {
    classes: PropTypes.object.isRequired,
    collections: PropTypes.object.isRequired,
    getAllCollection: PropTypes.func.isRequired,
    fullScreen: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({ collections: state.collections });

export default compose(connect(mapStateToProps, { getAllCollection }), withStyles(styles, { name: "Collection" }), withMobileDialog())(Collection);
