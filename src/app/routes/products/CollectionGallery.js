import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Slider from 'react-slick'
import withMobileDialog from '@material-ui/core/withMobileDialog';
import keys from '../../config/keys';
 class CollectionGallery extends Component {
  render() {
      const {collection,fullScreen} = this.props;
      const settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          autoplaySpeed: 2000,
          autoplay: true
      };
      
    return (
      <div style={{margin:"0 0 50px"}}>
            <Grid item xs={12}>
                <Grid container direction="column" >


                <Grid item xs={12} >

                 {fullScreen ? (
                            <Slider {...settings}>
                                {collection.collection.map((c, index) => {
                                    return (
                                        <div key={index}>
                                            <img src={keys.media.url+c.public_id} style={{ width: '100%' }} alt="" />
                                        </div>
                                    )
                                })}
                            </Slider>
                 ):(
                                <Slider {...settings}>
                                    {collection.collection_mobile.map((c, index) => {
                                        return (
                                            <div key={index}>
                                                <img src={keys.media.url+c.public_id} style={{ width: '100%' }} alt="" />
                                            </div>
                                        )
                                    })}
                                </Slider>
                 ) }       
                 





                </Grid>

                </Grid>
            </Grid>
      </div>
    )
  }
}

CollectionGallery.propTypes={
    collection:PropTypes.array.isRequired,
    fullScreen: PropTypes.bool.isRequired
}

export default withMobileDialog()(CollectionGallery);
