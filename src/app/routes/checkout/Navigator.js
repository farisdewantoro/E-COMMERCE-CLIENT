import React from 'react'
import styles from './styles';
import { withStyles } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
let Navigator =(styles)=> {
    return (
    
      <div style={{ marginBottom: 20 }}>
            <Button className={styles.classes.titleParams} component={Link} to="/carts">
              SHOPPING CART
            </Button>
          <FontAwesomeIcon
              icon={['fas', 'angle-right']}
              size="lg"
              style={{
                  marginLeft: 5,
                  marginRight: 5
              }}
                className={styles.classes.navigatorArrowDisabled} />
            <Button className={styles.classes.titleParamsActive} component={Link}  to="/checkout">
                CHECKOUT DETAILS
            </Button>
            <FontAwesomeIcon
                icon={['fas', 'angle-right']}
                size="lg"
                style={{
                    marginLeft: 5,
                    marginRight: 5
                }}
                className={styles.classes.navigatorArrowDisabled}
               />
            <Button className={styles.classes.titleParams} disabled>
                ORDER COMPLETE
            </Button>
          
      
      </div>
  )
}

export default withStyles(styles)(Navigator);