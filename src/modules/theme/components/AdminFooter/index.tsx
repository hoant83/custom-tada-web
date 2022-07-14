import React from 'react';
import { observer } from 'mobx-react-lite';

const AdminFooter = () => {
  return (
    <>
      <div className="admin-footer">
        <address>© 2020 All Rights Reserved. Power by MVL.</address>
        <p className="admin-version">Version 1.0 </p>
      </div>
    </>
  );
};

export default observer(AdminFooter);
