import { GoogleAddress } from '@/libs/dto/GoogleAddress.dto';
import { AddressStoreContext } from '@/modules/address/address.store';
import { I18N } from '@/modules/lang/i18n.enum';
import { observer } from 'mobx-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import AddressBook from '../AddressBook';

interface ComponentProps {
  handleChooseRecent?: any;
  data: GoogleAddress[];
  field: string;
  setFieldValue?: any;
  openMenu?: any;
  handleChooseAddress?: any;
  handleChooseAddressBook?: any;
}

const RecentSearch = (props: ComponentProps) => {
  const {
    handleChooseRecent,
    data,
    field,
    setFieldValue,
    openMenu,
    handleChooseAddress,
    handleChooseAddressBook,
  } = props;
  const addressStore = React.useContext(AddressStoreContext);
  const { t } = useTranslation();
  const { ADDRESS_TITLE, ADDRESS_CHOOSE_FROM } = I18N;

  const [initData, setInitData] = React.useState<any[]>([]);
  const [initDataBookPickup, setInitDataBookPickup] = React.useState<any[]>([]);
  const [initDataBookDropoff, setInitDataBookDropoff] = React.useState<any[]>(
    []
  );
  const [showAddressBook, setShowAddressBook] = React.useState<boolean>(false);

  const handleClick = React.useCallback(
    (field: string) => {
      const a: React.SetStateAction<any[]> = [];
      (field === 'pickupAddressText'
        ? addressStore.pickupAddresses
        : addressStore.dropoffAddresses
      )
        // eslint-disable-next-line array-callback-return
        .map((u) => {
          a.push({
            value: u,
            label: (() => {
              return (
                <div
                  style={{ textAlign: 'center' }}
                  onClick={handleChooseAddress}
                  className="address-list-option"
                >
                  <span className="addres-book name">
                    {`${u.company} - ${u.locationName}`}
                  </span>
                  <div>{u.locationAddress}</div>
                  <div>{`${u.inChargeName ?? ''} - ${u.inChargeNo ?? ''}`}</div>
                </div>
              );
            })(),
          });
        });
      // let data = [fromAddressBook(a, true)];
      if (field === 'pickupAddressText') {
        setInitDataBookPickup(a);
      } else {
        setInitDataBookDropoff(a);
      }
      setShowAddressBook(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      addressStore.dropoffAddresses,
      addressStore.pickupAddresses,
      handleChooseAddress,
    ]
  );

  const fromAddressBook = React.useCallback(
    (options: any, isChoose?: boolean) => {
      if (options.length) {
        return {
          label: (() => {
            return (
              <>
                <div
                  onClick={() => {
                    isChoose ? handleBack() : handleClick(field);
                  }}
                  className={isChoose ? 'address-book-list' : 'history-list'}
                >
                  <span></span>
                  <p style={{ textAlign: 'center' }}>
                    {t(ADDRESS_CHOOSE_FROM)}
                  </p>
                </div>
              </>
            );
          })(),
          options: options,
        };
      }
      return {
        label: (() => {
          return (
            <div
              style={{ textAlign: 'center' }}
              onClick={() => {
                isChoose ? handleBack() : handleClick(field);
              }}
              className={isChoose ? 'address-book-list' : 'history-list'}
            >
              <span></span>
              <p style={{ textAlign: 'center' }}>{t(ADDRESS_CHOOSE_FROM)}</p>
            </div>
          );
        })(),
        value: 'address-book',
      };
    },
    [ADDRESS_CHOOSE_FROM, field, handleClick, t]
  );

  const handleChange = (values: any) => {
    handleChooseRecent(values.value, field, setFieldValue);
  };

  const handleChangeAddressBook = (values: any) => {
    handleChooseAddressBook(values, field, setFieldValue);
  };

  const handleBack = () => {
    setShowAddressBook(false);
  };

  const handleInitData = React.useCallback(() => {
    const a: React.SetStateAction<any[]> = [];
    data.map((u) =>
      a.push({
        value: u,
        label: <div className="recent-options">{u.formatted_address}</div>,
      })
    );
    let options = [fromAddressBook(a)];
    setInitData(options);
  }, [data, fromAddressBook]);
  const customStyles = {
    option: (provided: any, state: { isSelected: any }) => ({
      ...provided,
      borderTop: '1px solid #F3F3F3',
    }),
  };

  React.useEffect(() => {
    handleInitData();
  }, [handleInitData]);
  return (
    <>
      {!showAddressBook && (
        <Select
          styles={customStyles}
          className="recent-dropdown"
          options={initData}
          name={field}
          onChange={handleChange}
          menuIsOpen={openMenu}
        />
      )}
      {showAddressBook && (
        <>
          <AddressBook
            title={t(ADDRESS_TITLE)}
            show={showAddressBook ? true : false}
            handleClose={() => {
              setShowAddressBook(false);
            }}
            customStyles={customStyles}
            field={field}
            initDataBookPickup={initDataBookPickup}
            initDataBookDropoff={initDataBookDropoff}
            handleChangeAddressBook={handleChangeAddressBook}
            openMenu={openMenu}
          />
        </>
      )}
    </>
  );
};

export default observer(RecentSearch);
