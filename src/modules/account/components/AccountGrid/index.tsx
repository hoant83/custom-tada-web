import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
// import { accountGrid } from '@/modules/account/constants/account.constants';

interface ComponentProps {
  handleView?: () => boolean;
  handleDelete?: () => boolean;
  handleEdit?: () => boolean;
  title?: string;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

const AccountGrid = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    handleView,
    handleDelete,
    handleEdit,
    title,
    style,
    className,
    children,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { ADMIN_MANAGE_ACCOUNT } = I18N;

  return (
    <>
      <div className={`grid-items ${className ? className : ''}`} style={style}>
        <h2 className="form-title">
          {title ? title : t(ADMIN_MANAGE_ACCOUNT)}
          <p onClick={() => handleView}>11</p>
          <p onClick={() => handleDelete}>22</p>
          <p onClick={() => handleEdit}>33</p>
        </h2>
      </div>
      {children}
    </>
  );
};

export default observer(AccountGrid);
