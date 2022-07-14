import React from 'react';
import { observer } from 'mobx-react-lite';
import { LanguageStoreContext } from '@/modules/lang/lang.store';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Customerlanguages, languages } from '@/modules/lang/lang.constants';
import { retrieveFromStorage, saveToStorage } from '@/libs/utils/storage.util';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { AccountStoreContext } from '@/modules/account/account.store';
import { THEMES } from '@/theme.enum';

/*
 * Props of Component
 */
interface ComponentProps {
  className?: string;
}

const theme = process.env.REACT_APP_THEME || 'truckowner';

const SwitchLanguages = (props: ComponentProps) => {
  const langStore = React.useContext(LanguageStoreContext);
  const auth = React.useContext(AuthenticationStoreContext);
  const accountStore = React.useContext(AccountStoreContext);
  const { i18n } = useTranslation();
  const existedToken = retrieveFromStorage('token');
  /*
   * Props of Component
   */
  const { className } = props;

  /*
   * Action of changing languages
   * @params: void
   * @return: void
   */
  const onChangeLanguage = async (key: string) => {
    await i18n.changeLanguage(key);
    langStore.setActiveLanguage(key);
    saveToStorage('lang', key);
    if (auth.loggedUser && existedToken) {
      await accountStore.changeLanguage(auth.loggedUser.id, existedToken, key);
    }
  };

  React.useEffect(() => {
    if (auth.loggedUser && existedToken) {
      accountStore.changeLanguage(
        auth.loggedUser.id,
        existedToken,
        langStore.activeLanguage
      );
    }
  }, [accountStore, auth.loggedUser, langStore, existedToken]);

  return (
    <>
      <Dropdown className={`box-language ${className ? className : ''}`}>
        <Dropdown.Toggle>{i18n.language}</Dropdown.Toggle>
        <Dropdown.Menu>
          {theme === THEMES.TADATRUCK
            ? Customerlanguages.filter((x) => x.isShow).map((lang, index) => (
                <Dropdown.Item
                  as="button"
                  key={`language-item-${index}`}
                  onClick={() => onChangeLanguage(lang.key)}
                >
                  {lang.shortLabel}
                </Dropdown.Item>
              ))
            : languages
                .filter((x) => x.isShow)
                .map((lang, index) => (
                  <Dropdown.Item
                    as="button"
                    key={`language-item-${index}`}
                    onClick={() => onChangeLanguage(lang.key)}
                  >
                    {lang.shortLabel}
                  </Dropdown.Item>
                ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default observer(SwitchLanguages);
