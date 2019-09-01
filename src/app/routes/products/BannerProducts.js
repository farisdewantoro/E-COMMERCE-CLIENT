import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';
import keys from '../../config/keys';

const BannerProducts = props => {

    const image = props.imageRender;
    
  return (
    <Grid container justify="center" direction="row" >
        
          {image.hasOwnProperty('banner') && image.banner.map(id=>{
            return(
                <Grid item md={12} xs={12} key={id.public_id}>
                    <img src={keys.media.url+id.public_id} alt={id.alt} style={{maxWidth:"100%"}}/>
                </Grid>
            )
        })}

          {image.hasOwnProperty('banner_promo') && image.banner_promo.map(id => {
              return (
                  <Grid item md={12} xs={12} key={id.public_id}>
                      <img src={keys.media.url+id.public_id} alt={id.alt} style={{ maxWidth: "100%" }}/>
                  </Grid>
              )
          })}
         

      </Grid>
  )
}

BannerProducts.propTypes = {
    imageRender:PropTypes.object.isRequired
}

export default BannerProducts
