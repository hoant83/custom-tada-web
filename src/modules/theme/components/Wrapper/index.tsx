/* eslint-disable react-hooks/exhaustive-deps */
import PageTitle from '@/libs/components/PageTitle';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { LanguageStoreContext } from '@/modules/lang/lang.store';
import AdminMenu from '@/modules/theme/components/AdminMenu';
import Menu from '@/modules/theme/components/Menu';
import TopMenu from '@/modules/theme/components/TopMenu';
import { THEMES } from '@/theme.enum';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Footer from '../footer/Footer';

interface ComponentProps {
  children?: React.ReactNode;
  pageTitle?: string;
  pageSubTitle?: string;
  showCurrentDate?: boolean;
  elementPageName?: string;
  elementPageId?: string;
}

const WrapperTheme = (props: ComponentProps) => {
  const langStore = React.useContext(LanguageStoreContext);
  const authenticationStore = React.useContext(AuthenticationStoreContext);

  /*
   * Props of Component
   */
  const {
    children,
    pageTitle,
    pageSubTitle,
    elementPageName,
    elementPageId,
    showCurrentDate = true,
  } = props;

  React.useEffect(() => {
    if (process.env.REACT_APP_THEME === THEMES.TADATRUCK) {
      if (authenticationStore.settings?.defaultColor) {
        document.body.classList.remove('yellow');
        document.body.classList.add(
          `${
            authenticationStore.settings?.defaultColor
              ? authenticationStore.settings?.defaultColor
              : ''
          }`
        );
      }
    }
  }, []);

  React.useEffect(() => {}, [langStore, langStore.activeLanguage]);

  return (
    <>
      <div
        className={`page-wrapper ${
          process.env.REACT_APP_THEME === THEMES.TADATRUCK &&
          authenticationStore.settings?.defaultColor
            ? authenticationStore.settings?.defaultColor
            : ''
        } ${langStore.activeLanguage}`}
      >
        {process.env.REACT_APP_THEME === THEMES.ADMIN && <AdminMenu />}
        {process.env.REACT_APP_THEME !== THEMES.ADMIN && <Menu />}
        <div className="main">
          <TopMenu />
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
        </div>

        <Footer />
      </div>
    </>
  );
};

export default observer(WrapperTheme);
