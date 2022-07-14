/* eslint-disable react-hooks/exhaustive-deps */
import { GoogleMapStoreContext } from '@/libs/stores/google-map.store';
import { observer } from 'mobx-react-lite';
import React from 'react';

interface ComponentProps {
  markers: { lat: number; lng: number }[];
  truckMarkers?: { lat: number; lng: number }[];
}

const GoogleMap = (props: ComponentProps) => {
  const { markers, truckMarkers } = props;

  const googleMapStore = React.useContext(GoogleMapStoreContext);

  const [directionsService] = React.useState(
    new google.maps.DirectionsService()
  );

  React.useEffect(() => {
    googleMapStore.directionsRenderer = new google.maps.DirectionsRenderer();
  }, []);

  React.useEffect(() => {
    googleMapStore.initMap();
  }, [googleMapStore]);

  React.useEffect(() => {
    googleMapStore.directionsRenderer.setMap(googleMapStore.map);
  }, [googleMapStore.map, googleMapStore.directionsRenderer]);

  React.useEffect(() => {
    googleMapStore.setMarkers(
      markers
      // truckMarkers && truckMarkers.length > 0 ? truckMarkers : []
    );

    if ((markers?.length || 0) >= 2) {
      let waypoints = [];

      if (markers.length > 2) {
        for (let i = 1; i < markers.length - 1; i++) {
          waypoints.push({
            location: new google.maps.LatLng({
              lat: +markers[i].lat,
              lng: +markers[i].lng,
            }),
            stopover: true,
          });
        }
      }

      const request = {
        origin: new google.maps.LatLng({
          lat: +markers[0].lat,
          lng: +markers[0].lng,
        }),
        destination: new google.maps.LatLng({
          lat: +markers[markers.length - 1].lat,
          lng: +markers[markers.length - 1].lng,
        }),
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: waypoints,
        optimizeWaypoints: true,
      };
      directionsService.route(request, function (result, status) {
        if (status === 'OK') {
          googleMapStore.directionsRenderer.setDirections(result);
        }
      });
    }
  }, [
    markers,
    directionsService,
    googleMapStore.directionsRenderer,
    googleMapStore.map,
    googleMapStore,
    truckMarkers,
  ]);
  return (
    <>
      <div id="ggmap"></div>
    </>
  );
};

export default observer(GoogleMap);
