import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography'
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CardHeader from '@material-ui/core/CardHeader';
import Page from '../../components/page';
class Help extends Component {

    render() {
        const { classes } = this.props;
  

        return (
            <Page
                id="Help"
                title="Help Center"
            >
                
            <div className={classes.wrapperHelp}>
                <Grid container direction="column">
                    <Grid item xs={12}>
                        <Grid container justify="center">
                            <Grid item md={6} xs={12}>
                          
                                <Card>
                                    <CardHeader
                                        title={
                                            <Typography variant="h6">
                                                HELP CENTER
                                            </Typography>
                                        }
                                    />
                                    <Divider/>
                                    <CardContent>
                                        <List component="nav">
                                            <ListItem button component={Link} to="/payment-guide">
                                                <ListItemText
                                                    primary="PAYMENT GUIDE"
                                                />
                                                <ListItemIcon>
                                                    <FontAwesomeIcon icon={['fas', 'angle-right']} size="lg" />
                                                </ListItemIcon>


                                            </ListItem>
                                            <Divider />
                                            <ListItem button component={Link} to="/size-guide">
                                                <ListItemText
                                                    primary="SIZE GUIDE"
                                                />
                                                <ListItemIcon>
                                                    <FontAwesomeIcon icon={['fas', 'angle-right']} size="lg" />
                                                </ListItemIcon>


                                            </ListItem>
                                            <Divider />
                                            <ListItem button component={Link} to="/return-policy">
                                                <ListItemText
                                                    primary="RETURN POLICY"
                                                />
                                                <ListItemIcon>
                                                    <FontAwesomeIcon icon={['fas', 'angle-right']} size="lg" />
                                                </ListItemIcon>


                                            </ListItem>
                                            <Divider />
                                                <ListItem button component={Link} to="/track-shipment">
                                                    <ListItemText
                                                        primary="TRACK SHIPMENT"
                                                    />
                                                    <ListItemIcon>
                                                        <FontAwesomeIcon icon={['fas', 'angle-right']} size="lg" />
                                                    </ListItemIcon>


                                                </ListItem>
                                                <Divider />
                       

                                      

                                  




                                        </List>


                                    </CardContent>

                                </Card>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </div>

            </Page>
        )
    }
}
Help.propTypes = {
    classes: PropTypes.object.isRequired
}



export default withStyles(styles, { name: "Help" })(Help);
