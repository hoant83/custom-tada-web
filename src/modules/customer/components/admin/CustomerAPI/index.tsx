import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ButtonGroup,
} from 'react-bootstrap';
import adminService from '@/modules/admin-user/admin.service';

interface ComponentProps {
  customer: any;
}

const CustomerAPI = (props: ComponentProps) => {
  const { customer } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    CUSTOMER_API_MANAGEMENT,
    BUTTONS_CREATE,
    BUTTONS_DELETE,
    CUSTOMER_API_KEY,
  } = I18N;

  const [api, setAPI] = React.useState<any>({});

  React.useEffect(() => {
    getCustomerAPI();
  }, [customer]);

  const getCustomerAPI = async () => {
    const { data } = await adminService.getCustomerAPI(+customer.id);
    if (data && data.result) {
      setAPI(data.result);
    } else {
      setAPI({});
    }
  };

  const createCustomerAPI = async () => {
    const { data } = await adminService.createCustomerAPI(+customer.id);
    if (data && data.result) {
      setAPI(data.result);
    } else {
      setAPI({});
    }
  };

  const deleteCustomerAPI = async () => {
    await adminService.deleteCustomerAPI(+customer.id);
    setAPI({});
  };

  return (
    <Container fluid className="block block-table my-favourite table-smaller">
      <Row>
        <Col xs={12}>
          <h3 className="block-title">{t(CUSTOMER_API_MANAGEMENT)}</h3>
        </Col>
        <Col xs={12} className="block-content">
          <Row>
            <Form.Group
              as={Col}
              xs={12}
              lg={7}
              controlId="apiKey"
              className="form-group-cardNo"
            >
              <Form.Label className="form-label">
                {t(CUSTOMER_API_KEY)}
              </Form.Label>
              <Form.Control
                type="text"
                name="cardNo"
                readOnly
                defaultValue={api.key || ''}
              />
            </Form.Group>
            <ButtonGroup className="form-actions">
              <Button onClick={createCustomerAPI}>{t(BUTTONS_CREATE)}</Button>
              <Button onClick={deleteCustomerAPI}>{t(BUTTONS_DELETE)}</Button>
            </ButtonGroup>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default observer(CustomerAPI);
