import React from 'react';
import { observer } from 'mobx-react';
import { FirebaseStoreContext } from '@/libs/stores/firebase.store';

const Home = () => {
  const firebaseStore = React.useContext(FirebaseStoreContext);
  return (
    <>
      <p>Home Page truck owner {firebaseStore.count}</p>
    </>
  );
};

export default observer(Home);
