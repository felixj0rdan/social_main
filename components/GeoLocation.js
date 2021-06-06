import React, { useState, useEffect } from "react";
import Weather from "./Weather";

const GeoLocation = () => {
    const [location, setLocation] = useState([]);

    const onSuccess = (location) => {
        setLocation([location.coords.latitude,location.coords.longitude])};

    // const onError = (error) => {
    //     setLocation({
    //         loaded: true,
    //         error: {
    //             code: error.code,
    //             message: error.message,
    //         },
    //     });
    // };

    useEffect(() => {
        // if (!("geolocation" in navigator)) {
        //     onError({
        //         code: 0,
        //         message: "Geolocation not supported",
        //     });
        // }

        navigator.geolocation.getCurrentPosition(onSuccess);
    }, []);

    return (
        <Weather lat={location[0]} lon={location[1]} />
    );
};

export default GeoLocation;