# How to create a new theme
1. create a new theme in /themes folder, such as: truckowner
2. create the following folders and files:
truckowner/
|-- assests
    |-- css
        |-- style.less
    |-- fonts
    |-- images
|-- layout/
    |-- index.tsx
    |-- theme.tsx
|-- pages
|-- routers
    |-- index.tsx
    |-- routers.tsx

3. work on truckowner/routers/routers.tsx, copy the following codes to this file
import React from 'react';
// import routers of modules here to use
// import { accountFERoutes } from '@/modules/admin-user/routers/frontend';

export const truckOwnerRoutes = [
  {
    path: '/',
    name: 'home',
    title: 'Truck Owner - Home Page',
    exact: true,
    permission: '',
    component: React.lazy(() => import('@/themes/truckowner/pages/Home')),
    isLayout: false,
    isGuarded: false,
  },
  // import routers of modules here to use
  // ...accountFERoutes,
];

4. work on truckowner/layout/theme.tsx, copy the following codes to this file
import React from 'react';
import '@/themes/truckowner/assets/css/style.less';

export default function TruckOwnerTheme() {
  return <></>;
}

**Notes: rename this text TruckOwnerTheme to your theme name**

5. work on truckowner/layout/index.tsx, copy the following codes to this file
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { truckOwnerRoutes } from '@/themes/truckowner/routers/routers';
import PageNotFound from '@/modules/no-route/pages/frontend/PageNotFound';

export default function TruckOwnerLayout() {
  return (
    <Switch>
      {truckOwnerRoutes
        .filter((item: any) => !item.isLayout)
        .map((item: any) => (
          <Route
            key={item.path}
            path={item.path}
            component={item.component}
            exact={item.exact}
          />
        ))}
      <Route component={PageNotFound} />
    </Switch>
  );
}

6. work on truckowner/routers/index.tsx, copy the following codes to this file
import React from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { getRouteTitle } from '@/libs/utils/routes.util';
import { truckOwnerRoutes } from '@/themes/truckowner/routers/routers';
import TruckOwnerLayout from '@/themes/truckowner/layout';

declare const document: any;

const TruckOwnerRouter = () => {
  const location = useLocation();
  const history = useHistory();

  /*
   * Translation
   */
  const { t } = useTranslation();

  React.useEffect(() => {
    const title: string = getRouteTitle(location.pathname, truckOwnerRoutes);
    document.title = t(title);
  });

  React.useEffect(() => {}, [history]);

  return (
    <>
      <Switch>
        <Route
          path="/"
          render={(props: any) => <TruckOwnerLayout {...props} exact />}
        />
      </Switch>
    </>
  );
};

export default observer(TruckOwnerRouter);

7. edit src/theme.enum.ts, add new theme to it, see below:
export enum THEMES {
  ADMIN = 'admin',
  TADATRUCK = 'tadatruck',
  TRUCKOWNER = 'truckowner',
}

8. edit src/App.tsx, add new theme to it, see below:
import React from 'react';
import { observer } from 'mobx-react';
import AdminRouter from '@/themes/admin/routers';
import TadaTruckRouter from '@/themes/tadatruck/routers';
import TruckOwnerRouter from '@/themes/truckowner/routers';
import { THEMES } from '@/theme.enum';

const theme = process.env.REACT_APP_THEME || 'truckowner';
const AdminTheme = React.lazy(() => import('@/themes/admin/layout/theme'));
const TadaTruckTheme = React.lazy(
  () => import('@/themes/tadatruck/layout/theme')
);
const TruckOwnerTheme = React.lazy(
  () => import('@/themes/truckowner/layout/theme')
);

function App() {
  if (theme === THEMES.ADMIN) {
    return (
      <>
        <AdminRouter />
        <AdminTheme />
      </>
    );
  }
  if (theme === THEMES.TADATRUCK) {
    return (
      <>
        <TadaTruckRouter />
        <TadaTruckTheme />
      </>
    );
  }
  return (
    <>
      <TruckOwnerRouter />
      <TruckOwnerTheme />
    </>
  );
}

export default observer(App);

9. edit .env file, add and set new theme to run with this new theme:

REACT_APP_THEME=truckowner