import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography'
import styles from './styles';
import { getAllSizing} from '../../actions/sizingActions';
import Page from '../../components/page';
import keys from '../../config/keys';
class SizeGuide extends Component {
    componentDidMount(){

        this.props.getAllSizing();
    }
    render() {
        const { classes,sizings } = this.props;
        return (
            <Page
                id="SizeGuide"
                title="Size Guide , Size Fit"
            >
                
            <div className={classes.paddingRoot}>
                <Grid container >
                    <Grid item md={12}>
                        <Grid container justify="center">
                            <Grid item md={10}>
                                <Typography variant="h1" className={classes.titleSizeGuide}>
                                    Size Guide
                                </Typography>
                                <Grid container direction="row" spacing={16}>
                                
                                    {sizings.sizing.map((s,i)=>{
                                        return(
                                            <Grid item xs={12}>
                                                <Grid container direction="row" spacing={16}>
                                                    <Grid item md={6} xs={12}>
                                                        <Card>
                                                            <CardHeader
                                                                subheader={s.name}
                                                            />
                                                            <img src={keys.media.url+s.public_id} style={{ maxWidth: "100%" }} alt={s.alt} />
                                                        </Card>
                                                    </Grid>
                                                    <Grid item md={6} xs={12}>
                                                    {typeof s.description !== "undefined" 
                                                        && s.description !== '' 
                                                        && s.description !== null
                                                        && (
                                                            <Card>
                                                            <CardHeader
                                                                subheader='Description'
                                                            />
                                                            <CardContent>
                                                                <div dangerouslySetInnerHTML={{
                                                                    __html:s.description
                                                                }}>

                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    )}
                                                    
                                                    </Grid>
                                                </Grid>
                                               
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

SizeGuide.propTypes = {
    classes: PropTypes.object.isRequired,
    sizings:PropTypes.object.isRequired,
    getAllSizing:PropTypes.func.isRequired
}

const mapStateToProps = (state)=>({
    sizings:state.sizings
})

export default compose(connect(mapStateToProps, { getAllSizing}), withStyles(styles, { name: "SizeGuide" }))(SizeGuide);
