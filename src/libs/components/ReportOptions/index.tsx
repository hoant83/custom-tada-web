import React from 'react';
import { observer } from 'mobx-react-lite';
import { Col, Dropdown, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { SelectMonthDto, SelectYearDto } from '@/libs/dto/SelectMonth.dto';
import { I18N } from '@/modules/lang/i18n.enum';
import { LanguageStoreContext } from '@/modules/lang/lang.store';
import moment from 'moment/moment';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  years: SelectYearDto[];
  handleChangeMonth?: any;
  handleChangeYear?: any;
}

const ReportOptions = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    years,
    handleChangeMonth,
    handleChangeYear,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    MONTH_SELECTION,
    MONTH_1,
    MONTH_2,
    MONTH_3,
    MONTH_4,
    MONTH_5,
    MONTH_6,
    MONTH_7,
    MONTH_8,
    MONTH_9,
    MONTH_10,
    MONTH_11,
    MONTH_12,
  } = I18N;

  const languageStore = React.useContext(LanguageStoreContext);

  const [monthLabel, setMonthLabel] = React.useState<string>(
    t(MONTH_SELECTION)
  );

  const [currentMonth, setCurrentMonth] = React.useState<number>(
    moment().month()
  );
  const [yearLabel, setYearLabel] = React.useState<any>(moment().year());

  const selectMonth: SelectMonthDto[] = [
    {
      label: 'All',
      value: -1,
    },
    {
      label: t(MONTH_1),
      value: 0,
    },
    {
      label: t(MONTH_2),
      value: 1,
    },
    {
      label: t(MONTH_3),
      value: 2,
    },
    {
      label: t(MONTH_4),
      value: 3,
    },
    {
      label: t(MONTH_5),
      value: 4,
    },
    {
      label: t(MONTH_6),
      value: 5,
    },
    {
      label: t(MONTH_7),
      value: 6,
    },
    {
      label: t(MONTH_8),
      value: 7,
    },
    {
      label: t(MONTH_9),
      value: 8,
    },
    {
      label: t(MONTH_10),
      value: 9,
    },
    {
      label: t(MONTH_11),
      value: 10,
    },
    {
      label: t(MONTH_12),
      value: 11,
    },
  ];

  React.useEffect(() => {
    const selectedMonth: any = selectMonth.find(
      (m) => m.value === currentMonth
    );
    setMonthLabel(selectedMonth.label);
  }, [languageStore.activeLanguage, currentMonth, selectMonth]);

  return (
    <>
      <Row>
        <Col md="auto">
          <Dropdown
            className={`block-export ${className ? className : ''}`}
            style={style}
          >
            <Dropdown.Toggle className="block-export-actions">
              {monthLabel}
            </Dropdown.Toggle>
            <Dropdown.Menu className="block-export-contents">
              {selectMonth.map((month: SelectMonthDto, index: number) => (
                <Dropdown.Item
                  onClick={() => {
                    setMonthLabel(month.label);
                    setCurrentMonth(month.value);
                    handleChangeMonth(month);
                  }}
                  key={`export-action-${index}`}
                >
                  {month.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col md="auto">
          <Dropdown
            className={`block-export ${className ? className : ''}`}
            style={style}
          >
            <Dropdown.Toggle className="block-export-actions">
              {yearLabel}
            </Dropdown.Toggle>
            <Dropdown.Menu className="block-export-contents">
              {years.map((year: SelectYearDto, index: number) => (
                <Dropdown.Item
                  onClick={() => {
                    setYearLabel(year.label);
                    handleChangeYear(year);
                  }}
                  key={`export-action-${index}`}
                >
                  {year.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {children}
    </>
  );
};

export default observer(ReportOptions);
