import React from "react"
import ContentLoader from "react-content-loader"

export const ImageFull = props => (
    <ContentLoader
        height={160}
        width={400}
        speed={2}
        primaryColor="#b9b9b9"
        secondaryColor="#ecebeb"
        {...props}
    >
        <rect x="273.41" y="58.67" rx="0" ry="0" width="0" height="0" />
        <rect x="211.41" y="88.67" rx="0" ry="0" width="0" height="0" />
        <rect x="189.41" y="140.67" rx="0" ry="0" width="0" height="0" />
        <rect x="323.41" y="59.67" rx="0" ry="0" width="0" height="0" />
        <rect x="-257.77" y="-185.33" rx="0" ry="0" width="712" height="169" />
        <rect x="-0.77" y="-1.33" rx="0" ry="0" width="605.86" height="189" />
    </ContentLoader>
)



