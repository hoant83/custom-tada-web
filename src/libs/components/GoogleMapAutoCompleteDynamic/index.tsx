import { LOCATION_TYPE } from '@/libs/constants/location-type.constant';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { AddressPaginationRequest } from '@/modules/address/address.dto';
import { AddressStoreContext } from '@/modules/address/address.store';
import RecentSearch from '@/modules/order/components/RecentSearch';
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
  handleChooseRecent?: any;
  handleChooseAddressBook?: any;
}

const GoogleMapAutocompleteDynamic = (props: ComponentProps) => {
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
    handleChooseRecent,
    handleChooseAddressBook,
  } = props;
  const { t } = useTranslation();
  const [showRecent, setShowRecent] = React.useState<boolean>(false);
  const [dataRecent, setDataRecent] = React.useState<any>([]);
  const onClick = () => {
    setShowRecent(true);
  };
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);
  const addressStore = React.useContext(AddressStoreContext);

  /*
   * set criteria
   */
  const [criteriaDto] = React.useState<AddressPaginationRequest>({
    skip: 0,
    take: +pageSizeOptions[1],
    locationType:
      field === 'pickupAddressText'
        ? LOCATION_TYPE.PICKUP
        : LOCATION_TYPE.DROPOFF,
  });

  const getAddressesWithCurrentConfig = React.useCallback(() => {
    addressStore.addressBookList(criteriaDto);
  }, [addressStore, criteriaDto]);

  React.useEffect(() => {
    const input = document.getElementById(componentId) as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: `${process.env.REACT_APP_REGION}` },
    });
    autocomplete.setFields([
      'address_components',
      'formatted_address',
      'geometry',
    ]);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      handleChangePlace(place);
    });
    const data = JSON.parse(localStorage.getItem(field) || '[]');
    setDataRecent(data || []);
  }, [componentId, field, handleChangePlace, setFieldValue]);

  React.useEffect(() => {
    getAddressesWithCurrentConfig();
  }, [getAddressesWithCurrentConfig]);

  return (
    <>
      <div className={`search-location-input ${className ? className : ''}`}>
        <input
          id={componentId}
          placeholder={`${t(placeHolder)}`}
          value={value}
          onChange={(value) => {
            onChange(value);
            setShowRecent(false);
          }}
          onClick={() => {
            onClick();
            setOpenMenu(true);
          }}
          autoComplete="false"
        />
        {defaultValue && <i></i>}
        {showRecent && !value && (
          <RecentSearch
            handleChooseRecent={handleChooseRecent}
            field={field}
            data={dataRecent}
            setFieldValue={setFieldValue}
            openMenu={openMenu}
            handleChooseAddressBook={handleChooseAddressBook}
          />
        )}
      </div>
    </>
  );
};

export default observer(GoogleMapAutocompleteDynamic);
