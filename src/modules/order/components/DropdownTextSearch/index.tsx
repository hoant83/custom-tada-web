import { observer } from 'mobx-react-lite';
import React, { ChangeEvent } from 'react';
import { Dropdown, FormControl, InputGroup } from 'react-bootstrap';

interface ComponentProps {
  handleKeyboardPress: (event: any) => any;

  handleValueChange: (string: string) => void;

  handleSearch: () => void;

  title: string;
  value: string;
}

const Component = (props: ComponentProps) => {
  const {
    handleValueChange,
    handleKeyboardPress,
    handleSearch,
    title,
    value,
  } = props;

  const [name] = React.useState<string>(
    title
      .split(' ')
      .map((x) => x.toLowerCase())
      .join('-')
  );

  const handleEventValueChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    handleValueChange(event.target.value);
  };

  return (
    <>
      <Dropdown className="special" alignRight>
        <Dropdown.Toggle className="filter-btn">
          {/* {!value ? title : `${title} (${value})`} */}
          {title}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <InputGroup>
            <FormControl
              type="search"
              value={value}
              placeholder={title}
              name={name}
              onChange={(
                value: ChangeEvent<
                  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
                >
              ) => handleEventValueChange(value)}
              onKeyUp={handleKeyboardPress}
            />
            <button className="center-text light-border" onClick={handleSearch}>
              <i className="ico ico-next"></i>
            </button>
          </InputGroup>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export const DropdownTextSearch = observer(Component);
