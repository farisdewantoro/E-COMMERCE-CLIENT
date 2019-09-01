import ReactGA from 'react-ga'

const options = {}

const trackPage = (page) => {
    ReactGA.set({
        page,
        ...options
    })
    ReactGA.pageview(page)
}

const tractAddToCart = (payload)=>{
    if(payload.length > 0){
        ReactGA.event({
            category: 'Cart',
            action: 'Add To Cart',
            label: payload[0].product_name
        });
    }
}

const contentView = (payload)=>{
    if (payload.dataProduct && payload.dataProduct.length > 0){

        ReactGA.event({
            category: 'Content',
            action: 'View Content',
            label: payload.dataProduct[0].name,
        });
    }

}

let currentPage = ''

export const googleAnalytics = store => next => action => {
   
    if (action.type === '@@router/LOCATION_CHANGE') {

        const nextPage = `${action.payload.location.pathname}${action.payload.location.search}`

        if (currentPage !== nextPage) {
            currentPage = nextPage
            trackPage(nextPage)
        }
     
    }
    if (action.type === 'ADD_TO_CART' ){
        tractAddToCart(action.payload)
    }

    if (action.type === 'GET_PRODUCT_DETAIL'){
        contentView(action.payload)
    }

    return next(action)
}