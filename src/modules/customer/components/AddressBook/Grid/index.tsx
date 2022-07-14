import ConfirmModal from '@/libs/components/ConfirmModal';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { PaginationRequest } from '@/modules/address/address.dto';
import { AddressStoreContext } from '@/modules/address/address.store';
import { I18N } from '@/modules/lang/i18n.enum';
import { ACTIONS_MODE } from '@/modules/order/order.enum';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Col, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import AddressCreateForm from '../AddressCreateForm';
import AddressList from '../List';

const AddressBookGrid = () => {
  const addressStore = React.useContext(AddressStoreContext);
  const [locationType, setLocationType] = React.useState('');
  const [initData, setInitData] = React.useState<any>(null);
  const [selectedAddress, setSelectedAddress] = React.useState<number>(0);
  const [editingAddress, setEditingAddress] = React.useState<any>(null);
  const [actionMode, setActionMode] = React.useState<ACTIONS_MODE>(
    ACTIONS_MODE.CREATE
  );
  /*
   * Translation
   */
  const { t } = useTranslation();
  const { MESSAGES_CONFIRM_DELETE, ADDRESS_TITLE } = I18N;

  /*
   * set criteria
   */
  const [criteriaDto, setCriteriaDto] = React.useState<PaginationRequest>({
    skip: 0,
    take: +pageSizeOptions[1],
  });

  const getAddressesWithCurrentConfig = React.useCallback(() => {
    addressStore.list(criteriaDto);
  }, [addressStore, criteriaDto]);

  const handleCreate = async (values: any) => {
    values.locationType = locationType;
    const result = await addressStore.create(values);
    addressStore.setLoadingStatus(true);
    if (result) {
      getAddressesWithCurrentConfig();
      setInitData(null);
      toast.dismiss();
      toast.success('success');
      addressStore.setLoadingStatus(false);
    }
    setInitData(addressStore.initModel);
  };

  const handleUpdate = async (values: any) => {
    values.locationType = locationType;
    const result = addressStore.update(values);
    if (result) {
      getAddressesWithCurrentConfig();
      setActionMode(ACTIONS_MODE.CREATE);
      toast.dismiss();
      toast.success('success');
    }
  };

  const handleCancel = React.useCallback(() => {
    setEditingAddress(addressStore.initModel);
    setActionMode(ACTIONS_MODE.CREATE);
  }, [addressStore.initModel]);

  const handleEdit = React.useCallback(
    async (addressId: number) => {
      const data = await addressStore.getById(addressId);
      if (data) {
        setActionMode(ACTIONS_MODE.EDIT);
        setEditingAddress({
          company: data.company,
          id: data.id,
          inChargeName: data.inChargeName,
          inChargeNo: data.inChargeNo,
          locationAddress: data.locationAddress,
          locationName: data.locationName,
          locationType: data.locationType,
          pickupAddress: data.pickupAddress,
          dropoffAddress: data.dropoffAddress,
          pickupCity: data.pickupCity,
          ownerId: data.ownerId,
        });
        setLocationType(data.locationType);
      }
    },
    [addressStore]
  );

  const handleDelete = (addressId: number) => {
    setSelectedAddress(addressId);
    setShowConfirmDeletePopup(true);
  };

  const handleOkDelete = async () => {
    const result = await addressStore.delete(selectedAddress);
    if (result) {
      getAddressesWithCurrentConfig();
      toast.dismiss();
      toast.success(result);
      setShowConfirmDeletePopup(false);
    }
  };

  const handleChangeType = (value: string) => {
    setLocationType(value);
    initData.locationType = value;
  };

  /*
   * Set current Page
   */
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  /*
   * Set frame Page
   */
  const [currentPageFrame, setCurrentPageFrame] = React.useState<number>(1);

  /*
   * Handle when changing current page
   *
   * @param number page
   * @return void
   */
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    setCurrentPageFrame(Math.ceil(page / maxPage));
    setCriteriaDto({
      skip: page > 1 ? (page - 1) * +pageSizeOptions[1] : 0,
      take: +pageSizeOptions[1],
    });
  };

  /*
   * Set total page
   */
  // const totals: number = items.length;
  const maxPage: number = 4;
  const [totalPage, setTotalPage] = React.useState<number>(0);

  /*
   * Set paging size
   */
  const [pagingSize] = React.useState<number>(+pageSizeOptions[1]);

  /*
   * show hide delete popup
   */
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = React.useState<
    boolean
  >(false);

  const handleCancelDelete = () => {
    setShowConfirmDeletePopup(false);
  };

  const handleChangePlace = (value: any, field: string, setFieldValue: any) => {
    setFieldValue(field, value?.formatted_address, false);
    setFieldValue('pickupAddress', [], false);
    setFieldValue('dropoffAddress', [], false);
    if (locationType === 'pickup') {
      setFieldValue(
        'pickupAddress',
        [value.geometry?.location?.lat(), value.geometry?.location?.lng()],
        false
      );

      value?.address_components.map((value: any) => {
        if (value.types[0] === 'administrative_area_level_1') {
          setFieldValue('pickupCity', value.short_name, false);
        }
      });
    }
    if (locationType === 'dropoff') {
      setFieldValue(
        'dropoffAddress',
        [value.geometry?.location?.lat(), value.geometry?.location?.lng()],
        false
      );
    }
  };

  React.useEffect(() => {
    getAddressesWithCurrentConfig();
    setInitData(addressStore.initModel);
    setLocationType(addressStore.initModel.locationType);
  }, [addressStore.initModel, getAddressesWithCurrentConfig]);

  React.useEffect(() => {
    setTotalPage(Math.ceil(addressStore.totalCount / +pageSizeOptions[1]));
  }, [addressStore.addresses, addressStore.totalCount]);

  return (
    <Container fluid className={'block block-table table-smaller address-book'}>
      <Col xs={12}>
        <h3 className="block-title">{t(ADDRESS_TITLE)}</h3>
      </Col>
      {initData && locationType && actionMode === ACTIONS_MODE.CREATE && (
        <AddressCreateForm
          handleCreate={handleCreate}
          handleChangeType={handleChangeType}
          locationType={locationType}
          initialValues={initData}
          handleChangePlace={handleChangePlace}
          actionMode={actionMode}
          handleCancel={handleCancel}
          mode={'create'}
        />
      )}

      {editingAddress && locationType && actionMode === ACTIONS_MODE.EDIT && (
        <AddressCreateForm
          handleCreate={handleUpdate}
          handleChangeType={handleChangeType}
          locationType={locationType}
          initialValues={editingAddress}
          handleChangePlace={handleChangePlace}
          actionMode={actionMode}
          handleCancel={handleCancel}
          mode={'edit'}
        />
      )}

      {addressStore.addresses && (
        <AddressList
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleChangePage={handleChangePage}
          totalPage={totalPage}
          currentPageFrame={currentPageFrame}
          maxPage={maxPage}
          pagingSize={pagingSize}
          currentPage={currentPage}
        />
      )}

      <ConfirmModal
        show={showConfirmDeletePopup}
        handleCancel={handleCancelDelete}
        handleOk={handleOkDelete}
      >
        <p>{t(MESSAGES_CONFIRM_DELETE)}</p>
      </ConfirmModal>
    </Container>
  );
};

export default observer(AddressBookGrid);
