import { observer } from 'mobx-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ComponentProps {
  className?: string;
  componentId: string;
  handleChangePlace: any;
  field: string;
  setFieldValue?: any;
  defaultValue?: string;
  value?: any;
  onChange?: any;
  isInvalid?: any;
  placeHolder?: any;
}

const GoogleMapAutocompleteInput = (props: ComponentProps) => {
  const {
    className,
    componentId,
    handleChangePlace,
    field,
    setFieldValue,
    defaultValue,
    value,
    onChange,
    placeHolder,
  } = props;
  const { t } = useTranslation();

  // const [value, setValue] = React.useState<string>(defaultValue ?? '');

  React.useEffect(() => {
    const input = document.getElementById(componentId) as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input, {
      // types: ['address'],
      componentRestrictions: { country: `${process.env.REACT_APP_REGION}` },
    });
    autocomplete.setFields([
      'address_components',
      'formatted_address',
      'geometry',
    ]);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      handleChangePlace(place, field, setFieldValue);
    });
  }, [componentId, field, handleChangePlace, setFieldValue]);

  return (
    <>
      <div className={`search-location-input ${className ? className : ''}`}>
        <input
          id={componentId}
          placeholder={`${t(placeHolder)}`} // Translate
          value={value}
          onChange={onChange}
        />
        {defaultValue && <i></i>}
      </div>
    </>
  );
};

export default observer(GoogleMapAutocompleteInput);
