import { observer } from 'mobx-react';
import React from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { isCustomer, OrderStatusFilter } from '../../order.constants';

interface OptionsSelect {
  label: string | any;
  key: string | any;
  alias?: string | any;
}

interface ComponentProps {
  handleValueChange: (string: any[]) => void;

  selectAll: () => void;

  deselectAll: () => void;

  title: string;
  value: any[];
  options: OptionsSelect[];
}

const Component = (props: ComponentProps) => {
  const {
    handleValueChange,
    title,
    value,
    options,
    selectAll,
    deselectAll,
  } = props;
  const { t } = useTranslation();

  return (
    <>
      <Dropdown className="special" alignRight>
        <Dropdown.Toggle className="filter-btn">
          {/* {!value ? title : `${title} (${value})`} */}
          {title}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Form.Group className="unset-after">
            {value.length !== options.length && (
              <button className="link-button select-all" onClick={selectAll}>
                Select all
              </button>
            )}
            {value.length > 0 && (
              <button
                className="link-button deselect-all"
                onClick={deselectAll}
              >
                Uncheck all
              </button>
            )}

            {options.map((o) => (
              <Form.Check
                id={`${title.toLowerCase().split(' ').join('-')}-filter-${
                  o.key
                }`}
                type="checkbox"
                label={t(o.label)}
                checked={value.includes(o.key)}
                onClick={() => {
                  if (value.includes(o.key)) {
                    handleValueChange(
                      isCustomer
                        ? value
                            .filter((of) => of !== o.key)
                            .filter(
                              (data) =>
                                !OrderStatusFilter.filter(
                                  (a) => a.alias === o.key
                                )
                                  .map((u) => u.key)
                                  .includes(data)
                            )
                        : value.filter((of) => of !== o.key)
                    );
                  } else {
                    handleValueChange(
                      isCustomer
                        ? [...value, o.key].concat(
                            OrderStatusFilter.filter(
                              (a) => a.alias === o.key
                            ).map((u) => u.key)
                          )
                        : [...value, o.key]
                    );
                  }
                }}
              />
            ))}
          </Form.Group>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export const DropdownSelectSearch = observer(Component);
