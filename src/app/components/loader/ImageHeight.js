import React from "react"
import ContentLoader from "react-content-loader"

const ImageHeight = props => (
    <ContentLoader
        height={160}
        width={400}
        speed={2}
        primaryColor="#b9b9b9"
        secondaryColor="#ecebeb"
        {...props}
    >
        <rect x="2" y="12.67" rx="5" ry="5" width="220" height="11.9" />
        
        <rect x="1.69" y="34.67" rx="0" ry="0" width="406.95" height="133" />
    </ContentLoader>
)

export default ImageHeight


