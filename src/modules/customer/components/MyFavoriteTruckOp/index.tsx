import Paging from '@/libs/components/Paging';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { CustomerAuthenticationStoreContext } from '@/modules/customer/authentication.store';
import { I18N } from '@/modules/lang/i18n.enum';
import { MessageDto } from '@/modules/message/message.dto';
import { MESSAGE_TYPE } from '@/modules/message/message.enum';
import { MessageStoreContext } from '@/modules/message/message.store';
import * as yup from 'yup';
import {
  FavoriteTruckOpTableDto,
  FavoriteTruckOp,
} from '@/modules/truckowner/truckowner.dto';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Container,
  Row,
  Col,
  Table,
  OverlayTrigger,
  Tooltip,
  Button,
  ButtonGroup,
  Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title: string;
  tooltip: string;
  totals: number;
  getFavoriteOpWithCurrentSettings: any;
}
const MyFavoriteTruckOp = (props: ComponentProps) => {
  const auth = React.useContext(AuthenticationStoreContext);
  const customerAuthStore = React.useContext(
    CustomerAuthenticationStoreContext
  );
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    title,
    tooltip,
    totals,
    getFavoriteOpWithCurrentSettings,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    TRUCKOWNER_CUSTOMER_PHONE,
    TRUCKOWNER_CUSTOMER_EMAIL,
    COMPANY_PHONE,
    COMPANY_NAME,
    CUSTOMER_NAME,
    CUSTOMER_STATUS,
    BUTTONS_RESET,
    MESSAGES_SELECTED_ITEMS,
    BUTTONS_CREATE,
    VALIDATE_REQUIRED,
  } = I18N;

  /*
   * messages from store
   */
  const messageStore = React.useContext(MessageStoreContext);

  /*
   * Seleted ids in grid
   */
  const [items, setItems] = React.useState<FavoriteTruckOpTableDto[]>([]);

  /*
   * set id of row that need to delete
   */
  const [deleteID, setDeleteID] = React.useState<number>(-1);

  /*
   * Set paging size
   */
  const [pagingSize, setPagingSize] = React.useState<number>(
    +pageSizeOptions[1]
  );

  /*
   * Set current Page
   */
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  /*
   * Set frame Page
   */
  const [currentPageFrame, setCurrentPageFrame] = React.useState<number>(1);

  /*
   * Set total page
   */
  // const totals: number = items.length;
  const maxPage: number = 4;
  const [totalPage, setTotalPage] = React.useState<number>(0);

  /*
   * Handle when changing page size
   *
   * @param number pageSize
   * @return void
   */
  const handleChangeSize = (event: any) => {
    setPagingSize(+event.target.value);
    setTotalPage(Math.ceil(totals / +event.target.value));
  };

  /*
   * Handle when changing current page
   *
   * @param number page
   * @return void
   */
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    setCurrentPageFrame(Math.ceil(page / maxPage));
  };

  /*
   * set Employee info
   */
  const [initFavoriteOp, setFavoriteOp] = React.useState<FavoriteTruckOp>({
    email: '',
    firstName: '',
    address: '',
    phoneNumber: '',
    companyName: '',
  });

  /*
   * set publicId info
   */
  const [initPublicId, setPublicId] = React.useState<any>({
    publicId: '',
  });

  const handleAddFavorite = async (values: any) => {
    // const result = await customerAuthStore.addFavoriteTruckOwner(
    //   values.publicId
    // );
    // if (result === true) {
    //   const message: MessageDto = {
    //     key: 'order.export',
    //     type: MESSAGE_TYPE.SUCCESS,
    //     content: t(MESSAGES_SELECTED_ITEMS),
    //   };
    //   messageStore.setMessages([message]);
    // }
    // getFavoriteOpWithCurrentSettings();
  };
  /*
   * Action of Delete button on favorite Op form popup
   * @params: void
   * @return: void
   */
  const handleDeleteFavoriteOp = async (id: number) => {
    // const result = await customerAuthStore.deleteFavoriteTruckOwner(id);
    // if (result === true) {
    //   const message: MessageDto = {
    //     key: 'order.export',
    //     type: MESSAGE_TYPE.SUCCESS,
    //     content: t(MESSAGES_SELECTED_ITEMS),
    //   };
    //   messageStore.setMessages([message]);
    // }
    // getFavoriteOpWithCurrentSettings();
  };

  /*
   * Action of Reset more button
   *
   * @param void
   * @return void
   */
  const handleReset = async () => {
    // const result = await customerAuthStore.resetFavoriteTruckOwner();
    // if (result === true) {
    //   const message: MessageDto = {
    //     key: 'order.export',
    //     type: MESSAGE_TYPE.SUCCESS,
    //     content: t(MESSAGES_SELECTED_ITEMS),
    //   };
    //   messageStore.setMessages([message]);
    // }
    // getFavoriteOpWithCurrentSettings();
  };

  /*
   * Action of Delete button
   *
   * @param number id
   * @return void
   */
  const handleDelete = async (id: number) => {
    setDeleteID(id);
    await handleDeleteFavoriteOp(id);
    getFavoriteOpWithCurrentSettings();
  };

  /*
   * Validation
   */
  const schema = yup.object({
    publicId: yup.string().required(t(VALIDATE_REQUIRED)),
  });

  // React.useEffect(() => {
  //   /*
  //    * Init selected items
  //    */
  //   let tmpItems: any[] = [];
  //   setItems(customerAuthStore.favoriteTruckOp);
  //   if (items) {
  //     items.map((item: any) => {
  //       tmpItems.push({ id: item.id, checked: false });
  //       return items;
  //     });
  //   }
  //   setTotalPage(Math.ceil(totals / +pageSizeOptions[1]));
  // }, [items, customerAuthStore.favoriteTruckOp, totals]);

  return (
    <>
      {items && (
        <Container
          fluid
          className={`block block-my-Employee ${className ? className : ''}`}
          style={style}
        >
          <Row>
            {title && (
              <Col xs={12}>
                <h3 className="block-title">{title}</h3>
              </Col>
            )}
            <Formik
              validationSchema={schema}
              onSubmit={(values) => {
                handleAddFavorite(values);
              }}
              initialValues={initPublicId}
            >
              {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
                <Form
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  className={`form form-driver ${className ? className : ''}`}
                  style={style}
                >
                  {children}
                  <Form.Row>
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="publicId"
                      className="form-group-publicId"
                    >
                      <Form.Label className="form-label-required">
                        {t('PublicId')} <span>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={values.publicId}
                        onChange={handleChange}
                        isInvalid={!!errors.publicId}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.publicId}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>
                  <ButtonGroup className="form-actions">
                    <Button variant="primary" type="submit">
                      <span>{t(BUTTONS_CREATE)}</span>
                      <i className="ico ico-plus"></i>
                    </Button>
                  </ButtonGroup>
                </Form>
              )}
            </Formik>
            <Col xs={12} className="block-content">
              <Table responsive="lg">
                <thead>
                  <tr>
                    <th>{t(COMPANY_NAME)}</th>
                    <th>{t(CUSTOMER_NAME)}</th>
                    <th>{t(TRUCKOWNER_CUSTOMER_EMAIL)}</th>
                    <th>{t(TRUCKOWNER_CUSTOMER_PHONE)}</th>
                    <th>
                      {tooltip && (
                        <OverlayTrigger
                          key={'top'}
                          placement={'top'}
                          overlay={
                            <Tooltip id="tooltip-right">{tooltip}</Tooltip>
                          }
                        >
                          <div className="tooltip-icon">
                            <span className="ico ico-faq"></span>
                          </div>
                        </OverlayTrigger>
                      )}
                    </th>
                    <th className="col-actions"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item: FavoriteTruckOpTableDto, index: number) => (
                    <tr key={item.id}>
                      <td>{item.company?.name}</td>
                      <td>{item.firstName}</td>
                      <td>{item.email}</td>
                      <td>{item.phoneNumber}</td>
                      <td className="col-actions">
                        <Button
                          variant={BUTTONVARIANT.PRIMARY}
                          onClick={() => handleDelete(item.id)}
                          className="btn-icon"
                          size="lg"
                        >
                          <i className="ico ico-delete"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <ButtonGroup className="block-actions">
                <Button variant="primary" onClick={handleReset} size="lg">
                  <span>{t(BUTTONS_RESET)}</span>
                  <i className="ico ico-next"></i>
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
          {children}
          {totalPage > 1 && (
            <>
              <Paging
                handleChangeSize={handleChangeSize}
                totalPage={totalPage}
                totals={totals}
                currentPageFrame={currentPageFrame}
                maxPage={maxPage}
                handleChangePage={handleChangePage}
                current={currentPage}
                pageSize={pagingSize}
              />
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default observer(MyFavoriteTruckOp);
