import GoogleMapAutocomplete from '@/libs/components/GoogleMapAutocomplete';
import GoogleMapAutocompleteDynamic from '@/libs/components/GoogleMapAutoCompleteDynamic';
import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import { toTimePicker } from '@/libs/utils/time.util';
import { I18N } from '@/modules/lang/i18n.enum';
import { DynamicDropOffDto } from '@/modules/order/order.dto';
import { observer } from 'mobx-react';
import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import DateTimePicker from 'react-datetime';
import { useTranslation } from 'react-i18next';

interface ComponentProps {
  handleChooseRecent?: any;
  handleChooseAddressBook?: any;
  handleChangePlace: any;
  setFieldValue: any;
  pickupTime: any;
  dropoffTime: any;
  onChange: any;
  values: any;
  errors?: any;
  handleChange?: any;
  onChangeTime?: any;
  dropOffFields: DynamicDropOffDto[];
  handleChangeDynamic: any;
  handleAddFields: any;
  handleRemoveFields: any;
  onChangeDropoff: any;
  handleChangeDropOff: any;
  handleUploadPhotos?: any;
  orderPhotos: any;
  handleRemovePhoto: any;
  handleChangeDropOffTime: any;
  mode?: any;
  handleClearData?: any;
}

const CreateOrderStepTwo = (props: ComponentProps) => {
  const {
    values,
    handleChooseRecent,
    handleChooseAddressBook,
    handleChangePlace,
    setFieldValue,
    pickupTime,
    errors,
    onChange,
    onChangeTime,
    dropOffFields,
    handleChangeDynamic,
    handleRemoveFields,
    handleAddFields,
    handleChangeDropOff,
    handleUploadPhotos,
    orderPhotos,
    handleRemovePhoto,
    handleChangeDropOffTime,
    handleClearData,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ORDER_PICKUP_ADDRESS,
    ORDER_PICKUP_TIME,
    ORDER_PICKUP_CONTACTNO,
    ORDER_DROPOFF_ADDRESS,
    ORDER_DROPOFF_CONTACTNO,
    ORDER_NOTE_TODRIVER,
    ORDER_DROPOFF_TIME,
    BUTTONS_CHOOSE_IMAGE,
    BUTTONS_ADD_MORE,
    MESSAGES_IMAGE_SIZE_LIMIT,
    ORDER_DROPOFF_CONTACT,
    ORDER_UPLOAD_PHOTOS,
  } = I18N;

  return (
    <>
      <Form.Row className="route-info">
        <Container fluid>
          <Row>
            <Form.Group
              as={Col}
              xs="12"
              lg="7"
              controlId="pickupAddressText"
              className="pickupAddressText"
            >
              <Form.Label className="form-label-required">
                {t(ORDER_PICKUP_ADDRESS)}{' '}
                <span style={{ color: 'red' }}>(*)</span>
              </Form.Label>
              <GoogleMapAutocomplete
                handleChangePlace={handleChangePlace}
                field="pickupAddressText"
                setFieldValue={setFieldValue}
                componentId="pickupAddressText"
                value={values.pickupAddressText}
                onChange={onChange}
                isInvalid={!!errors.pickupAddressText}
                handleChooseRecent={handleChooseRecent}
                handleChooseAddressBook={handleChooseAddressBook}
                handleClearData={handleClearData}
              />
              <Form.Control.Feedback type="invalid">
                {errors.pickupAddressText}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="pickup-section">
            <Form.Group
              as={Col}
              xs={12}
              lg={7}
              controlId="pickupTime"
              className="pickupTime"
            >
              <Form.Label>
                {t(ORDER_PICKUP_TIME)} <span style={{ color: 'red' }}>(*)</span>
              </Form.Label>
              <Form.Control
                value={pickupTime ? (values.pickupTime = pickupTime) : ''}
                onChange={onChange}
                isInvalid={!!errors.pickupTime}
                disabled
                hidden
              />
              <DateTimePicker
                value={new Date(toTimePicker(pickupTime))}
                onChange={onChangeTime}
                isInvalid={!!errors.pickupTime}
              />
              <Form.Control.Feedback type="invalid">
                {errors.pickupTime}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              xs={12}
              lg={5}
              controlId="pickupContactNo"
              className="pickupContactNo"
            >
              <Form.Label>
                {t(ORDER_PICKUP_CONTACTNO)}{' '}
                <span style={{ color: 'red' }}>(*)</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={values.pickupContactNo}
                onChange={onChange}
                isInvalid={!!errors.pickupContactNo}
              />
              <Form.Control.Feedback type="invalid">
                {errors.pickupContactNo}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          {dropOffFields && dropOffFields.length > 0
            ? dropOffFields.map((dropOffField: any, index: number) => (
                <React.Fragment key={`${index}`}>
                  <Form.Row className="bordered ">
                    <Container fluid>
                      <Row>
                        <Form.Group
                          as={Col}
                          xs="12"
                          lg="7"
                          controlId={`dropOffFields.${index}.dropoffAddressText`}
                          className="dropoffAddressText"
                        >
                          <Form.Label className="form-label-required">
                            {t(ORDER_DROPOFF_ADDRESS)}{' '}
                            <span style={{ color: 'red' }}>(*)</span>
                          </Form.Label>
                          <GoogleMapAutocompleteDynamic
                            handleChangePlace={(values: any) => {
                              handleChangeDropOff(values, index);
                            }}
                            field="dropoffAddressText"
                            setFieldValue={setFieldValue}
                            componentId={`dropoffAddressText-${index}`}
                            value={dropOffFields[index].dropoffAddressText}
                            onChange={(event: any) => {
                              handleChangeDynamic(
                                index,
                                event,
                                'dropoffAddressText'
                              );
                              handleClearData(
                                'dropoffAddressText',
                                setFieldValue,
                                index
                              );
                            }}
                            isInvalid={
                              errors.dropOffFields
                                ? errors.dropOffFields[index]
                                  ? !!errors.dropOffFields[index]
                                      .dropoffAddressText
                                  : false
                                : false
                            }
                            handleChooseRecent={async (value: any) => {
                              handleChooseRecent(
                                value,
                                'dropoffAddressText',
                                setFieldValue,
                                index
                              );
                            }}
                            handleChooseAddressBook={async (value: any) => {
                              handleChooseAddressBook(
                                value,
                                'dropoffAddressText',
                                setFieldValue,
                                index
                              );
                            }}
                          />
                          {errors.dropOffFields && (
                            <Form.Control.Feedback type="invalid">
                              {errors.dropOffFields[index] &&
                                errors.dropOffFields[index]
                                  .dropoffAddressText &&
                                errors.dropOffFields[index].dropoffAddressText}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                        {dropOffFields.length > 1 && (
                          <Button
                            variant={BUTTONVARIANT.PRIMARY}
                            onClick={() => {
                              handleRemoveFields(index, setFieldValue);
                            }}
                            className="btn-icon dynamic-remove"
                            size="lg"
                            as={Col}
                            xs="12"
                            lg="5"
                          >
                            <i className="ico ico-delete"></i>
                          </Button>
                        )}
                      </Row>
                      <Row>
                        <Form.Group
                          as={Col}
                          xs={12}
                          lg={4}
                          controlId={`dropOffFields.${index}.dropoffTime`}
                          className="dropoffTime"
                        >
                          <Form.Label>{t(ORDER_DROPOFF_TIME)}</Form.Label>
                          <Form.Control
                            value={
                              dropOffFields[index]
                                ? dropOffFields[index].dropoffTime
                                : ''
                            }
                            onChange={onChange}
                            isInvalid={!!errors.dropoffTime}
                            disabled
                            hidden
                          />
                          <DateTimePicker
                            value={
                              //   new Date(
                              //     toTimePicker(dropOffFields[index].dropoffTime)

                              // )
                              dropOffFields[index].dropoffTime
                            }
                            onChange={(value: any) => {
                              handleChangeDropOffTime(value, index);
                            }}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.dropoffTime}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          xs={12}
                          lg={4}
                          controlId={`dropOffFields.${index}.dropoffContact`}
                          className="dropoffContact"
                        >
                          <Form.Label>{t(ORDER_DROPOFF_CONTACT)}</Form.Label>
                          <Form.Control
                            type="text"
                            value={dropOffFields[index].dropoffContact}
                            onChange={(event: any) => {
                              handleChangeDynamic(
                                index,
                                event,
                                'dropoffContact'
                              );
                            }}
                          />
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          xs={12}
                          lg={4}
                          controlId={`dropOffFields.${index}.dropoffContactNo`}
                          className="dropoffContactNo"
                        >
                          <Form.Label>
                            {t(ORDER_DROPOFF_CONTACTNO)}{' '}
                            <span style={{ color: 'red' }}>(*)</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={dropOffFields[index].dropoffContactNo}
                            onChange={(event: any) => {
                              handleChangeDynamic(
                                index,
                                event,
                                'dropoffContactNo'
                              );
                            }}
                            isInvalid={
                              errors.dropOffFields
                                ? errors.dropOffFields[index]
                                  ? !!errors?.dropOffFields[index]
                                      ?.dropoffContactNo
                                  : false
                                : false
                            }
                          />
                          {errors.dropOffFields && (
                            <Form.Control.Feedback type="invalid">
                              {errors.dropOffFields[index] &&
                                errors.dropOffFields[index].dropoffContactNo &&
                                errors.dropOffFields[index].dropoffContactNo}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </Row>
                    </Container>
                  </Form.Row>
                </React.Fragment>
              ))
            : null}
          <Row className="more-dropoff">
            <Button
              onClick={() => {
                handleAddFields(setFieldValue);
              }}
              className="add-dropoff-btn"
            >
              <span className="dropoff-addition">{t(BUTTONS_ADD_MORE)}</span>
              <span className="fas fa-plus-square dropoff-addition"></span>
            </Button>
          </Row>
          <Row>
            <Form.Group
              as={Col}
              xs={12}
              controlId="noteToDriver"
              className="noteToDriver"
            >
              <Form.Label>{t(ORDER_NOTE_TODRIVER)}</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                value={values.noteToDriver}
                onChange={onChange}
                isInvalid={!!errors.noteToDriver}
              />
              <Form.Control.Feedback type="invalid">
                {errors.noteToDriver}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group
              as={Col}
              controlId="companyIconUrl"
              className="form-group-companyIconUrl"
            >
              <div className="form-image-wrapper">
                <Form.Label className="form-label">
                  {t(ORDER_UPLOAD_PHOTOS)}
                  <span className="image-size">
                    {t(MESSAGES_IMAGE_SIZE_LIMIT)}
                  </span>
                </Form.Label>
                <Row className="photos-section">
                  {orderPhotos &&
                    orderPhotos.map((u: any, index: any) => (
                      <>
                        <Col xs lg={3} className={`photo-data photo-${index}`}>
                          <Form.File
                            id="order-photo"
                            label={t(u.name)}
                            onChange={handleUploadPhotos}
                            custom
                          />
                          {u.link && (
                            <Col className="image image-summary" xs={3} md={8}>
                              <a
                                className="zoom-image"
                                href={u.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <div className="document-wrapper">
                                  <Image src={`${u.link}`} />
                                </div>
                                <span className="caption">{u.fileName}</span>
                              </a>
                            </Col>
                          )}
                          <Button
                            className="btn-icon"
                            onClick={() => {
                              handleRemovePhoto(index);
                            }}
                          >
                            <i className="ico ico-delete"></i>
                          </Button>
                        </Col>
                      </>
                    ))}
                  {orderPhotos.length < 6 && (
                    <Col xs lg={3} className={'photo-data photo-button'}>
                      <Form.File
                        id="companyIconUrl"
                        label={t(BUTTONS_CHOOSE_IMAGE)}
                        onChange={handleUploadPhotos}
                        custom
                      />
                    </Col>
                  )}
                </Row>
              </div>
            </Form.Group>
          </Row>
        </Container>
      </Form.Row>
    </>
  );
};
export default observer(CreateOrderStepTwo);
