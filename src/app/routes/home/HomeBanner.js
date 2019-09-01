import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Slider from 'react-slick'
import {ImageFull} from '../../components/loader/Loader';
import styles from './styles';
import { Link } from 'react-router-dom';
import keys from '../../config/keys';
// function checkWidth(){
//     const theme = withTheme();
//     const matches = useMediaQuery(theme.breakpoints.up('sm'));
//     return matches;
// }

 class HomeBanner extends Component {
     constructor(props){
         super(props);
        this.state = {
            image: this.props.image.map(img => ({
                ...img,
                src:"false"
            }))
        }
    }


     componentWillMount() {
         if(this.state.image.length > 0){
             this.state.image.forEach((image, index) => {
                 const { public_id,redirect } = this.props.image[index] // get image primary src
                 const primaryImage = new Image() // create an image object programmatically
              
                 primaryImage.onload = () => { // use arrow function here
                     const image = [...this.state.image] // copy image array from state
                     image[index].src = public_id 
                     image[index].redirect = redirect
                     this.setState({
                         image
                     })
                 }
                 primaryImage.src = keys.media.url+public_id // do it after you set onload handler
             })
         }

     }

  render() {
      const settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows:false,
          autoplaySpeed:2000,
          autoplay:true
      };
    //   const {  image } = this.props;
      const imageContain = this.state.image.map(image => (
          <div key={image.id}>
              {image.src === "false" && (
                  <ImageFull />
              )}
              {image.src && image.redirect ? (
                  <Link to={image.redirect}>
                      <img src={keys.media.url+image.src} style={{ width: '100%' }} alt={image.alt} />
                  </Link>
              ):(
                      <img src={keys.media.url+image.src} style={{ width: '100%' }} alt={image.alt} />
              )}
            </div>
      ));
    return (
      <div>
           <Grid>

       
            <Grid item xs={12} >
        

                    <Slider {...settings}>
                        {imageContain}
                    {/* {image.map((i,index)=>{
                        return(
                            <div key={index}>
                                <img src={i.link} style={{ width: '100%' }} alt="" />
                            </div>
                        )
                    })}
                       */}
                  

                    </Slider>
             
              
                
              
                   
            </Grid>
            </Grid>
      </div>
    )
  }
}
HomeBanner.propTypes = {
    classes: PropTypes.object.isRequired,
    image:PropTypes.array.isRequired
};

export default withStyles(styles)(HomeBanner);