import PageNotFound from '@/modules/no-route/pages/frontend/PageNotFound';
import { tadaTruckRoutes } from '@/themes/tadatruck/routers/routes';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

export default function TadaTruckLayout() {
  return (
    <>
      <Switch>
        {tadaTruckRoutes
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
    </>
  );
}
