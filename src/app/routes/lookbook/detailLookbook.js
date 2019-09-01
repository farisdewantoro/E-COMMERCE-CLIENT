import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import styles from './styles';
import { getDetailLookbook } from '../../actions/lookbookActions';
import Gallery from './Gallery';
import Page from '../../components/page';
import keys from '../../config/keys'
class DetailLookbook extends Component {
    state={
        
    }
    componentDidMount() {
        this.props.getDetailLookbook(this.props.match.params.slug);
  
    }
  
    
    render() {
        const { classes } = this.props;
        const { lookbook,lookbook_image } = this.props.lookbooks;

        return (
            <Page
                id="Lookbook"
                title={`LOOKBOOK - ${lookbook[0] ? lookbook[0].name : ''}`}
            >
            <div  className={classes.paddingRoot}>
                <Grid container >
                    <Grid item md={12}>
                        <Grid container justify="center">
                            <Grid item md={10}>
                                <Typography variant="h1" className={classes.titleLookbook}>
                                    LOOKBOOK-{lookbook[0] ? lookbook[0].name:''}
                                </Typography>
                                <Grid container direction="row" spacing={16}>
                                    <Gallery images={lookbook_image.map((image,i) => ({
                                        src: keys.media.url+image.public_id,
                                        thumbnail: keys.media.url+image.public_id,
                                        caption:image.public_id,
                                    }))} showThumbnails />
                           
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

DetailLookbook.propTypes = {
    classes: PropTypes.object.isRequired,
    lookbooks: PropTypes.object.isRequired,
    getDetailLookbook:PropTypes.func.isRequired
}

const mapStateToProps = state => ({ lookbooks: state.lookbooks });

export default compose(connect(mapStateToProps, { getDetailLookbook}), withStyles(styles, { name: "DetailLookbook" }))(DetailLookbook);
