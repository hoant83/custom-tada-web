import { action, observable } from 'mobx';
import { createContext } from 'react';
import { TRACKING } from '../constants/tracking.constants';
import truckImg from '@/libs/assets/images/truck.svg';
import shipImg from '@/libs/assets/images/ship.svg';
import gpsImg from '@/libs/assets/images/gps.png';

const HCMCity = { lat: 10.82302, lng: 106.62965 };
const Jakarta = { lat: -6.1719387, lng: 106.74837 };
const BangKok = { lat: 13.736717, lng: 100.523186 };
const truckIcon = {
  url: truckImg,
  scaledSize: new google.maps.Size(50, 50),
};
const shipIcon = {
  url: shipImg,
  scaledSize: new google.maps.Size(50, 50),
};
const gpsIcon = {
  url: gpsImg,
  scaledSize: new google.maps.Size(70, 50),
};

const styledMapType = new google.maps.StyledMapType([
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
]);

export default class GoogleMapStore {
  @observable isLoading: boolean = false;

  @action
  private _setLoadingStatus(status: boolean) {
    this.isLoading = status;
  }

  @observable markers: google.maps.Marker[] = [];
  @observable truckMarkers: google.maps.Marker[] = [];
  @observable gpsMarkers: google.maps.Marker[] = [];
  @observable
  infoWindowTruck: google.maps.InfoWindow = new google.maps.InfoWindow();
  @observable
  infoWindowGPS: google.maps.InfoWindow = new google.maps.InfoWindow();
  @observable directionsRenderer = new google.maps.DirectionsRenderer();
  @observable
  polylineHistory: google.maps.Polyline = new google.maps.Polyline();
  @observable markersHistory: google.maps.Marker[] = [];
  @observable polylineHistoryData = [];
  @observable map: any;

  @action
  setMarkers(markers: any[], truckMarkers?: any[], isShip: boolean = false) {
    // const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // let labelIndex = 0;
    this.markers.map((m) => m.setMap(null));
    this.markers = markers.map(
      (x, index) =>
        new google.maps.Marker({
          position: x,
          map: this.map,
        })
    );

    if (truckMarkers && truckMarkers?.length > 0) {
      this.truckMarkers.map((m) => m.setMap(null));
      this.truckMarkers = truckMarkers.map(
        (x, index) =>
          new google.maps.Marker({
            position: x,
            map: this.map,
            icon: isShip ? shipIcon : truckIcon,
          })
      );
    }
  }

  @action
  moveTruckMarkers(truckInfos: any[], gpsInfos: any[] = []) {
    gpsInfos.map((gps) => {
      const curMarker = this.gpsMarkers.find(
        (marker) => marker.get('name') === gps.name
      );
      if (!curMarker) {
        const newMarker = new google.maps.Marker({
          position: gps.location,
          icon: truckInfos.length === 0 ? truckIcon : gpsIcon,
        });
        newMarker.setValues({ name: gps.name });
        this.gpsMarkers.push(newMarker);
        this.infoWindowGPS = new google.maps.InfoWindow({
          content: gps.infoWindow,
          zIndex: 1,
        });
        if (truckInfos.length === 0) {
          newMarker.addListener('click', () => {
            this.infoWindowGPS.open({
              // @ts-ignore
              anchor: newMarker,
              map: this.map,
              shouldFocus: false,
            });
          });
          const _this = this;
          google.maps.event.addListener(this.map, 'click', function (event) {
            _this.infoWindowGPS.close();
          });
          newMarker.setMap(this.map);
        }
      } else {
        curMarker.setPosition(gps.location);
      }
    });

    truckInfos.map((truck) => {
      const curMarker = this.truckMarkers.find(
        (marker) => marker.get('name') === truck.name
      );
      if (!curMarker) {
        const newMarker = new google.maps.Marker({
          position: truck.location,
          map: this.map,
          icon: truck.type === TRACKING.SHIP_TYPE ? shipIcon : truckIcon,
        });
        newMarker.setValues({ name: truck.name });
        this.truckMarkers.push(newMarker);
        this.infoWindowTruck = new google.maps.InfoWindow({
          content: `${truck.infoWindow}`,
          zIndex: 2,
        });
        google.maps.event.addListener(this.infoWindowTruck, 'domready', () => {
          const currentState =
            localStorage.getItem('infoWindowTracking') ?? 'collapse';
          if (currentState === 'collapse') {
            if (document.getElementById('collapseView')?.style) {
              // @ts-ignore
              document.getElementById('collapseView').style.display = 'block';
            }
            if (document.getElementById('expandView')?.style) {
              // @ts-ignore
              document.getElementById('expandView').style.display = 'none';
            }
          } else {
            if (document.getElementById('collapseView')?.style) {
              // @ts-ignore
              document.getElementById('collapseView').style.display = 'none';
            }
            if (document.getElementById('expandView')?.style) {
              // @ts-ignore
              document.getElementById('expandView').style.display = 'block';
            }
          }
        });
        newMarker.addListener('click', () => {
          this.infoWindowTruck.open({
            // @ts-ignore
            anchor: newMarker,
            map: this.map,
            shouldFocus: false,
          });
          if (this.gpsMarkers[0]) {
            this.gpsMarkers[0].setMap(this.map);
            this.infoWindowGPS.open({
              // @ts-ignore
              anchor: this.gpsMarkers[0],
              map: this.map,
              shouldFocus: false,
            });
          }
        });
        newMarker.setMap(this.map);
        const _this = this;
        google.maps.event.addListener(this.map, 'click', function (event) {
          _this.infoWindowTruck.close();
          localStorage.setItem('infoWindowTracking', 'collapse');
          if (_this.gpsMarkers[0]) {
            _this.gpsMarkers[0].setMap(null);
            _this.infoWindowGPS.close();
          }
        });
      } else {
        this.infoWindowTruck.setContent(`${truck.infoWindow}`);
        curMarker.setMap(this.map);
        curMarker.setPosition(truck.location);
      }
    });
  }

  @action
  setPolylineOptions(options: any) {
    if (Object.keys(options).length === 0) {
      options = undefined;
    }
    this.directionsRenderer.setOptions({
      map: this.map,
      polylineOptions: options,
    });
  }

  @action
  setPolylineHistoryData(data: any) {
    this.markersHistory.map((item: any) => {
      item.setMap(null);
    });
    this.polylineHistory.setMap(null);
    if (!data || data.length === 0) {
      return false;
    }
    this.markersHistory = [];
    this.polylineHistory = new google.maps.Polyline({
      path: data,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    const markerStart = new google.maps.Marker({
      position: data[0],
      map: this.map,
      label: 'A',
    });

    const markerEnd = new google.maps.Marker({
      position: data[data.length - 1],
      map: this.map,
      label: 'B',
    });

    this.markersHistory.push(markerStart);
    this.markersHistory.push(markerEnd);

    this.markersHistory[0].setMap(this.map);
    this.markersHistory[1].setMap(this.map);
    this.polylineHistory.setMap(this.map);
    this.zoomToObject(this.polylineHistory);
  }

  @action
  zoomToObject(obj: any) {
    var bounds = new google.maps.LatLngBounds();
    var points = obj.getPath().getArray();
    for (let n = 0; n < points.length; n++) {
      bounds.extend(points[n]);
    }
    this.map.fitBounds(bounds);
  }

  @action
  initMap() {
    this.map = new google.maps.Map(
      document.getElementById('ggmap') as HTMLElement,
      {
        zoom: 10,
        center:
          process.env.REACT_APP_REGION === 'VN'
            ? HCMCity
            : process.env.REACT_APP_REGION === 'TH'
            ? BangKok
            : Jakarta,
      }
    );
    this.map.mapTypes.set('styled_map', styledMapType);
    this.map.setMapTypeId('styled_map');
  }
}

export const GoogleMapStoreContext = createContext(new GoogleMapStore());
