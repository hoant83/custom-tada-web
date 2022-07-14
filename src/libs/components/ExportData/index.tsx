import React from 'react';
import { observer } from 'mobx-react-lite';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { ExportingToDto } from '@/libs/dto/ExportingTo.dto';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  label: string;
  exportingTo: ExportingToDto[];
  exportingItems?: string[];
}

const ExportData = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    label,
    exportingTo,
    exportingItems,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { ADMIN_SELECTED_ITEMS } = I18N;

  return (
    <>
      {exportingItems && exportingItems?.length > 0 && (
        <p className="selected-items">
          {exportingItems?.length} {t(ADMIN_SELECTED_ITEMS)}
        </p>
      )}
      {exportingTo && (
        <Dropdown
          className={`block-export ${className ? className : ''}`}
          style={style}
        >
          <Dropdown.Toggle className="block-export-actions">
            {label}
          </Dropdown.Toggle>
          <Dropdown.Menu className="block-export-contents">
            {exportingTo.map((action: ExportingToDto, index: number) => (
              <Dropdown.Item
                onClick={() => {
                  action.action();
                }}
                key={`export-action-${index}`}
              >
                {action.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
      {children}
    </>
  );
};

export default observer(ExportData);
