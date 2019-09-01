import React, { Component } from 'react'
import HomeBanner from './HomeBanner'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import OurRecommendation from './OurRecommendation'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Collection from './Collection';
import {ImageFull} from '../../components/loader/Loader';
import ReactPixel  from 'react-facebook-pixel';
import InstagramFeed from './instagramFeed';
import Page from '../../components/page';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import NewArrivals from './NewArrivals';
const styles = theme => ({
    tes:{
        height:'200vh'
    },
    rootHomePage:{

    }
});

function imageRender(props){
    if(isWidthUp('sm',props.width)){
        return props.UI.slider
    }else{
        return props.UI.slider_mobile
    }
}
function imageRenderInstagram(props) {
    if (isWidthUp('sm', props.width)) {
        return {
            width:293,
            height:193
        }
    } else {
        return {
            width: 104,
            height:50
        }
    }
}

class Home extends Component {
componentDidMount(){

    ReactPixel.pageView(); 
   
}
UNSAFE_componentWillReceiveProps(nextProps){
    if (nextProps.UI.category !== this.props.UI.category) {
        nextProps.UI.category.unshift({
            category: "New Arrivals",
            category_slug: "newarrivals",
            category_tag: "none"
        })
    }
}
  render() {
      const { UI, instagrams, classes } = this.props;
      const image = imageRender(this.props);
    return (
        <Page
            id="homepage"
            title="Handcrafted Denim Products "
        >
            <div className={classes.rootHomePage}>
                {image instanceof Array && image.length > 0 ? (
                    <HomeBanner image={image} />
                ) : (
                        <ImageFull />
                    )}

                <Grid style={{ padding:'10px 20px 10px 20px' }}  >

                    <NewArrivals newarrivals={UI.newarrivals}/>
                    <Collection collection={UI.collection} />
                    <OurRecommendation
                        products={UI.product_recommendation} />

                    <InstagramFeed
                        instagrams={instagrams}
                        dimension={imageRenderInstagram(this.props)}
                    />

                </Grid>


            </div>
        </Page>
     
    )
  }
}

Home.propTypes = {
   
    classes: PropTypes.object.isRequired,
    UI:PropTypes.object.isRequired,
    instagrams:PropTypes.object.isRequired,
    width:PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    UI:state.UI,
    instagrams:state.instagrams
})

export default
    compose(
        connect(mapStateToProps,null),
        withStyles(styles, { name: 'Home' }),
        withWidth()
    )(Home);