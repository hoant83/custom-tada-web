import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/App';
import * as serviceWorker from '@/serviceWorker';
import { Provider } from 'mobx-react';
import 'mobx-react-lite/batchingForReactDom';
import { BrowserRouter } from 'react-router-dom';
import initStore from '@/libs/stores';
import Loading from '@/libs/components/Loading';
import { ToastContainer, cssTransition } from 'react-toastify';
import '@/i18n';
import { retrieveFromStorage } from './libs/utils/storage.util';
import ScrollToTop from './libs/components/ScrollToTop';

const stores = initStore();
const Zoom = cssTransition({
  enter: 'zoomIn',
  exit: 'zoomOut',
  duration: 750,
  appendPosition: false,
  collapse: true,
  collapseDuration: 300,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
      <React.Suspense
        fallback={
          <Loading className={retrieveFromStorage('defaultColor') ?? ''} />
        }
      >
        <BrowserRouter>
          <ScrollToTop />
          <App />
          <ToastContainer
            autoClose={2000}
            position={'top-center'}
            hideProgressBar={true}
            transition={Zoom}
            pauseOnHover={true}
          />
        </BrowserRouter>
      </React.Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
