/** @format */

import { useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import { useState, useEffect, useMemo } from "react";
import { RiErrorWarningFill } from "react-icons/ri";

function Direction() {
    const map = useMap();
    const routesLibrary = useMapsLibrary("routes");
    const [directionService, setDirectionService] =
        useState<google.maps.DirectionsService>();
    const [currentLocation, setCurrentLocation] = useState<{
        lat: number;
        lng: number;
    }>();
    const [directionRenderer, setDirectionRenderer] =
        useState<google.maps.DirectionsRenderer>();
    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
    const legs = routes[0]?.legs;

    const intermediatePoints = [
        { lat: -1.9355377074007851, lng: 30.060163829002217 },
        { lat: -1.9358808342336546, lng: 30.08024820994666 },
        { lat: -1.9489196023037583, lng: 30.092607828989397 },
        { lat: -1.9592132952818164, lng: 30.106684061788073 },
        { lat: -1.9487480402200394, lng: 30.126596781356923 },
    ];

    const formatWaysPoint = useMemo(() => {
        return intermediatePoints.map((point) => ({
            location: new google.maps.LatLng(point.lat, point.lng),
            stopover: true,
        }));
    }, []);

    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionService(new routesLibrary.DirectionsService());
        setDirectionRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [map, routesLibrary]);

    useEffect(() => {
        if (!directionService || !formatWaysPoint.length) return;

        directionService
            .route({
                origin: { lat: -1.939826787816454, lng: 30.0445426438232 },
                destination: {
                    lat: -1.9365670876910166,
                    lng: 30.13020167024439,
                },
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: false,
                waypoints: formatWaysPoint,
            })
            .then((response) => {
                directionRenderer?.setDirections(response);
                setRoutes(response.routes);
            });

        // Start tracking the user's position
        const watchId = navigator.geolocation.watchPosition((position) => {
            const current = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            setCurrentLocation(current);
        });

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, [directionService, directionRenderer, formatWaysPoint]);

    const currentLegIndex = useMemo(() => {
        if (!currentLocation || !routes.length) return -1;
        const distancesToNextStops = routes[0].legs.map((leg) => {
            const endLocation = leg.end_location;
            const distance =
                google.maps.geometry.spherical.computeDistanceBetween(
                    new google.maps.LatLng(
                        currentLocation.lat,
                        currentLocation.lng
                    ),
                    new google.maps.LatLng(endLocation.lat(), endLocation.lng())
                );
            return distance;
        });
        return distancesToNextStops.findIndex((distance) => distance <= 70);
    }, [currentLocation]);

    if (!currentLegIndex || currentLegIndex === -1 || !legs[currentLegIndex])
        return (
            <div className='bg-white min-h-20 w-full absolute top-0 right-0 left-0 p-6 flex gap-2 items-center'>
                <RiErrorWarningFill size={30} />
                <h1 className='font-medium text-gray-500'>
                    Please go pickup passeger to Nyabugogo
                </h1>
            </div>
        );

    const currentLeg = legs[currentLegIndex];
    const nextStop = currentLeg?.end_address;
    const distanceToNextStop = currentLeg?.distance?.text;
    const durationToNextStop = currentLeg?.duration?.text;

    return (
        <div className='bg-white min-h-20 w-full absolute top-0 right-0 left-0'>
            <div className='mx-auto max-w-5xl py-4 flex flex-col lg:items-center items-start px-6'>
                <h1 className='font-bold text-xl'>Nyabugogo - Kimirongo</h1>
                <p>
                    <span>Next Stops:</span> {nextStop}
                </p>
                <div className='flex justify-between w-full'>
                    <span>Distance: {distanceToNextStop}</span>
                    <span>Time: {durationToNextStop}</span>
                </div>
            </div>
        </div>
    );
}

export default Direction;
