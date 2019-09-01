import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography'
import styles from './styles';
import {getAllLookbook} from '../../actions/lookbookActions';
import Page from '../../components/page';
import keys from '../../config/keys';
class Lookbook extends Component {
    componentDidMount(){
        this.props.getAllLookbook();
 
    }
    render() {
        const {classes} = this.props;
        const {lookbook} = this.props.lookbooks;
        const lString=lookbook.map(l=>{
            return l.name
        }).toString();
        return (
            <Page
                id="Lookbook"
                title={`${lString} Lookbook`}
            >
                
            <div className={classes.paddingRoot}>
                <Grid container >
                    <Grid item md={12}>
                        <Grid container justify="center">
                            <Grid item md={10}>
                                <Typography variant="h1" className={classes.titleLookbook}>
                                    LOOKBOOK
                                </Typography>
                                <Grid container direction="row" spacing={16}>
                                   
                                        {lookbook.map((lb, i) => {
                                            return (
                                                <Grid item md={4} key={i} >
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

                </Grid>
            </div>

            </Page>
        )
    }
}

Lookbook.propTypes = {
    classes: PropTypes.object.isRequired,
    lookbooks: PropTypes.object.isRequired,
    getAllLookbook:PropTypes.func.isRequired
}

const mapStateToProps = state => ({lookbooks: state.lookbooks});

export default compose(connect(mapStateToProps, { getAllLookbook}), withStyles(styles, {name: "Lookbook"}))(Lookbook);
