import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { adminRoutes } from '@/themes/admin/routers/routes';
import PageNotFound from '@/modules/no-route/pages/admin/PageNotFound';

export default function AdminLayout() {
  return (
    <Switch>
      {adminRoutes
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
