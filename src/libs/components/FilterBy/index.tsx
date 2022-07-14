import React from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Button, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { FilterByDto, FilterByOptions } from '@/libs/dto/FilterBy.dto';
import { FILTER_TYPE } from '@/libs/enums/filter.enum';
import { LanguageStoreContext } from '@/modules/lang/lang.store';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  label?: string;
  filters: FilterByDto[];
  handleFilter: any;
  filtered?: boolean;
  handleResetFilter?: any;
  hideLabel?: boolean;
}

const FilterBy = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    label,
    filters,
    handleFilter,
    filtered = false,
    handleResetFilter,
    hideLabel,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();

  const languageStore = React.useContext(LanguageStoreContext);

  const { FILTER_SEARCHBY, FILTER_SEARCH } = I18N;

  const [filterLabel, setFilterLabel] = React.useState<string>(
    filters[0]?.label
  );

  const [filterBy, setFilterBy] = React.useState<FilterByDto>(filters[0]);
  const [filterType, setFilterType] = React.useState<FILTER_TYPE>(
    FILTER_TYPE.TEXT
  );
  const [options, setOptions] = React.useState<FilterByOptions[]>([]);

  React.useEffect(() => {
    setFilterLabel(filters[0]?.label);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageStore.activeLanguage]);

  return (
    <>
      {filters && (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleFilter(e, filterBy);
          }}
        >
          <Form.Group
            className={`block-filter filtered ${filtered ? 'filtered' : ''} ${
              className ? className : ''
            }`}
            style={style}
          >
            {filters.length !== 0 && filters[0]?.label !== '' && (
              <>
                {!hideLabel && (
                  <Form.Label className="block-filter-label" column="lg">
                    {label ? label : t(FILTER_SEARCHBY)}
                  </Form.Label>
                )}
                <Dropdown
                  className={`block-export ${className ? className : ''}`}
                  style={style}
                >
                  <Dropdown.Toggle className="block-export-actions">
                    {filterLabel}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="block-export-contents">
                    {filters.map((filter: FilterByDto) => (
                      <Dropdown.Item
                        onClick={() => {
                          setFilterBy(filter);
                          setFilterLabel(filter.label);
                          filter.type
                            ? setFilterType(filter.type)
                            : setFilterType(FILTER_TYPE.TEXT);
                          filter.options
                            ? setOptions(filter.options)
                            : setOptions([]);
                        }}
                        key={`order-filter-${filter.key}`}
                      >
                        {filter.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}

            <div className="group">
              {filterType === FILTER_TYPE.TEXT && (
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder={t(FILTER_SEARCH)}
                  name="search"
                />
              )}
              {filterType === FILTER_TYPE.SELECT && (
                <Form.Control size="lg" as="select" name="search">
                  {options.map((item: FilterByOptions, index) => (
                    <option key={`filter-option-${index}`} value={item.key}>
                      {t(item.label)}
                    </option>
                  ))}
                </Form.Control>
              )}
              <Button type="submit">
                <i className="ico ico-o-next"></i>
              </Button>
              <Button onClick={handleResetFilter}>
                <i className="ico ico-reset"></i>
              </Button>
            </div>
          </Form.Group>
          {children}
        </Form>
      )}
    </>
  );
};

export default observer(FilterBy);
