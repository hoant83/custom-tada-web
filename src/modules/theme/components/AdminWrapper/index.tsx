import React from 'react';
import { observer } from 'mobx-react-lite';
import AdminMenu from '@/modules/theme/components/AdminMenu';
import AdminTopMenu from '@/modules/theme/components/AdminTopMenu';
import AdminFooter from '@/modules/theme/components/AdminFooter';
import PageTitle from '@/libs/components/PageTitle';
import { LanguageStoreContext } from '@/modules/lang/lang.store';

interface ComponentProps {
  children?: React.ReactNode;
  pageTitle?: string;
  pageSubTitle?: string;
  elementPageName?: string;
  elementPageId?: string;
  showCurrentDate?: boolean;
}

const AdminWrapper = (props: ComponentProps) => {
  const langStore = React.useContext(LanguageStoreContext);

  /*
   * Props of Component
   */
  const {
    children,
    pageTitle,
    elementPageName,
    elementPageId,
    pageSubTitle,
    showCurrentDate = true,
  } = props;

  return (
    <>
      <div className={`page-wrapper ${langStore.activeLanguage}`}>
        <AdminMenu className="admin-menu" />
        <div className="main">
          <AdminTopMenu />
          {pageTitle && (
            <PageTitle
              title={pageTitle}
              subTitle={pageSubTitle}
              showCurrentDate={showCurrentDate}
              elementPageName={elementPageName}
              elementPageId={elementPageId}
            />
          )}
          {children}
          <AdminFooter />
        </div>
      </div>
    </>
  );
};

export default observer(AdminWrapper);
