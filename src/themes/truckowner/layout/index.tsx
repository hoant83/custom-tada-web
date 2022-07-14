import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { truckOwnerThemeRoutes } from '@/themes/truckowner/routers/routes';
import PageNotFound from '@/modules/no-route/pages/frontend/PageNotFound';

export default function TruckOwnerLayout() {
  return (
    <Switch>
      {truckOwnerThemeRoutes
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
