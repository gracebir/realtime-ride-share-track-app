/** @format */

import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import car from "./assets/car.png";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import Direction from "./components/Direction";

const App = () => {
    const api_key: string = import.meta.env.VITE_API_KEY;

    const [driverLocation, setDriverLocation] = useState<{
        lat: number;
        lng: number;
    } | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setDriverLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        });
    }, []);
    return (
        <div className='relative h-screen font-inter'>
            <Navbar />
            <APIProvider apiKey={api_key}>
                <Map
                    style={{ width: "100%", height: "100vh" }}
                    defaultCenter={
                        driverLocation || {
                            lat: -1.9422863738143827,
                            lng: 30.043862048146906,
                        }
                    }
                    defaultZoom={9}
                    gestureHandling={"greedy"}
                    fullscreenControl={false}
                    zoomControl={false}
                >
                    {driverLocation && (
                        <Marker position={driverLocation} icon={car} />
                    )}
                    <Direction />
                </Map>
            </APIProvider>
            <Footer />
        </div>
    );
};

export default App;
