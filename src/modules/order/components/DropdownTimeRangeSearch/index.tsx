import { CommonStoreContext } from '@/libs/stores/common.store';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';
import DateTimePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

interface ComponentProps {
  handleValueFromChange: (string: string) => void;

  handleValueToChange: (string: string) => void;
  title: string;
  valueFrom: string;
  valueTo: string;
}

const Component = (props: ComponentProps) => {
  const {
    title,
    valueFrom,
    handleValueFromChange,
    valueTo,
    handleValueToChange,
  } = props;

  return (
    <>
      <Dropdown className="special from-to" alignRight>
        <Dropdown.Toggle className="filter-btn">{title}</Dropdown.Toggle>
        <Dropdown.Menu>
          <Row>
            <Col xs={4} className="center-text">
              From
            </Col>
            <Col xs={8}>
              <CustomDateTimePicker
                value={valueFrom}
                handleValueChange={handleValueFromChange}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={4} className="center-text">
              To
            </Col>
            <Col xs={8}>
              <CustomDateTimePicker
                value={valueTo}
                handleValueChange={handleValueToChange}
              />
            </Col>
          </Row>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

interface CustomDateTimePickerProps {
  value: string;
  handleValueChange: (string: string) => void;
}

const CustomDateTimePicker = (props: CustomDateTimePickerProps) => {
  const commonStore = React.useContext(CommonStoreContext);
  const { value, handleValueChange } = props;
  return (
    <DateTimePicker
      value={moment(value)}
      onChange={(inputValue: moment.Moment) => {
        if (!moment.isMoment(inputValue)) return;
        handleValueChange(inputValue.toISOString());
      }}
      dateFormat={commonStore.newOnlyDateFormat}
      timeFormat={commonStore.newOnlyTimeFormat}
      closeOnSelect
    />
  );
};

export const DropdownTimeRangeSearch = observer(Component);
