import React, { Component } from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types';
import { withStyles  } from '@material-ui/core/styles';
import ImageGallery from 'react-image-gallery';
import styles from './styles';
import keys from '../../config/keys';
function imagesData(dataProduct,data, classes){
    let image =[];
    image= data.map((d,i)=>{
        return {
            original:keys.media.url+ d.public_id,
            thumbnail:keys.media.url+ d.public_id,
            originalAlt: dataProduct.name + ' - ' + dataProduct.category_type,
            thumbnailAlt: dataProduct.name + ' - ' + dataProduct.category_type,
            originalTitle: dataProduct.name + ' - ' + dataProduct.category_type,
            thumbnailTitle: dataProduct.name + ' - ' + dataProduct.category_type,
            public_id: d.public_id
        }
    })

    return image;
}
 class imageDetail extends Component {
  render() {
      const { classes, dataImage, width, dataProduct} = this.props;

      let position = "left";
       if(width === "xs"){
           position = "bottom";
       }

    return (
      <div className={classes.wrapperImageGallery}>
            <ImageGallery
                items={imagesData(dataProduct,dataImage,classes)}
                thumbnailPosition={position}
                showNav={false}
                
                showPlayButton={false}
                lazyLoad={true} 
                infinite={true}
                />
      </div>
    )
  }
}

imageDetail.propTypes = {
    classes: PropTypes.object.isRequired
}

export default compose(withStyles(styles))(imageDetail);