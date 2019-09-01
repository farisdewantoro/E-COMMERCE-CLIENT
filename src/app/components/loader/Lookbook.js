import React from "react"
import ContentLoader from "react-content-loader"

const LoadingLookbook = props => (
    <ContentLoader
        height={160}
        width={400}
        speed={2}
        primaryColor="#b9b9b9"
        secondaryColor="#ecebeb"
        {...props}
    >
        <rect x="7.56" y="10.87" rx="5" ry="5" width="134.2" height="9.17" />
        <rect x="4.7" y="30.67" rx="0" ry="0" width="380" height="38.35" />
        <rect x="124.41" y="74.87" rx="5" ry="5" width="134.2" height="9.17" />
        <rect x="3.7" y="93.67" rx="0" ry="0" width="380" height="38.35" />
        <rect x="124.39" y="135.87" rx="5" ry="5" width="134.2" height="9.17" />
    </ContentLoader>
)

export default LoadingLookbook


