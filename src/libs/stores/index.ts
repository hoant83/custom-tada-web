import CommonStore from './common.store';
import FirebaseStore from './firebase.store';
import GoogleMapStore from './google-map.store';

export default function initStore() {
  return {
    commonStore: new CommonStore(),
    firebaseStore: new FirebaseStore(),
    googleMapStore: new GoogleMapStore(),
  };
}
