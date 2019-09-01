import React from "react"
import ContentLoader from "react-content-loader"

const ProductList = props => (
    <ContentLoader
        height={300}
        width={400}
        speed={2}
        primaryColor="#b9b9b9"
        secondaryColor="#ecebeb"
        {...props}
    >
        <rect x="7" y="226.87" rx="3" ry="3" width="85" height="9.98" />
        <rect x="3.86" y="3.87" rx="0" ry="0" width="302.81" height="210.77" />
        <rect x="7" y="239.87" rx="3" ry="3" width="128.35" height="10.37" />
        <rect x="6" y="255.87" rx="3" ry="3" width="113.9" height="7.68" />
    </ContentLoader>
)

export default ProductList


