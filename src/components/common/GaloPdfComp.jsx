import React from "react";

const GaloPdfComp = ({ bg, children }) => {
    // const BASE_URL = "https://gautamsolar.us/proposal_images/watt";
    const BASE_URL = "http://localhost:3004";
  
    

    const imageSrc = bg?.startsWith("/") ? bg : `${BASE_URL}/${bg}`;

    return (
        <section
            className="
        pdf-page
        relative
        w-198.5
        h-280.75
        bg-white
        mx-auto
        overflow-hidden
      "
        >
            {/* background image */}
            <img
                src={imageSrc}
                className="absolute inset-0 w-full h-full object-cover"
                crossOrigin="anonymous"
                alt=""
            />

            {/* overlay content */}
            <div className="absolute inset-0 z-10">{children}</div>
        </section>
    );
};

export default GaloPdfComp;
