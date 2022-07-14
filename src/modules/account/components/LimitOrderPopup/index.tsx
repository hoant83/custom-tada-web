/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import importantNoteService from '@/libs/services/important-note.service';
import { I18N } from '@/modules/lang/i18n.enum';
import DOMPurify from 'dompurify';
import { observer } from 'mobx-react';
import React from 'react';
import { Button, ButtonGroup, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AuthenticationStoreContext } from '../../authentication.store';
import './index.scss';

interface ComponentProps {
  content: string;
}

const Component = (props: ComponentProps) => {
  const authStore = React.useContext(AuthenticationStoreContext);
  const { t } = useTranslation();

  const {
    IMPORTANT_POP_UP_CONFIRM,
    IMPORTANT_POP_UP_NOT_SHOW_AGAIN,
    IMPORTANT_POP_UP_READ_MORE,
  } = I18N;

  const { content } = props;

  const [innerContent, setInnerContent] = React.useState<string>('');
  const [show, setShow] = React.useState<boolean>(false);
  const [remainOrders, setRemainOrders] = React.useState<any>(0);

  const [notShowAgain, setNotShowAgain] = React.useState<boolean>(false);

  const [showMoreButtonVisible, setShowMoreButtonVisible] = React.useState<
    boolean
  >(true);

  const modalRef = React.useRef<HTMLDivElement>(null);

  const checkIfNeedShowMore = (): void => {
    const scrollHeight = modalRef?.current?.scrollHeight ?? 0;
    const clientHeight = modalRef?.current?.clientHeight ?? 0;

    if (!modalRef.current || innerContent === '') return;

    setShowMoreButtonVisible(scrollHeight > clientHeight);
  };

  const handleConfirmClicked = () => {
    if (notShowAgain) {
      importantNoteService.notShowAgain();
    }

    setShow(false);
  };

  React.useEffect(() => {
    setInnerContent(`${content} ${authStore.settings.remain}`);
  }, [show, content]);

  React.useEffect(() => {
    checkIfNeedShowMore();
  }, [innerContent, checkIfNeedShowMore]);

  React.useEffect(() => {
    setShow(true);
    setInnerContent(DOMPurify.sanitize(content));
  }, []);

  const getRemainOrderSchedule = React.useCallback(async () => {
    const data = await authStore.getRemainOrderSchedule();
    if (data) {
      setRemainOrders(data);
    }
  }, [authStore]);

  React.useEffect(() => {
    getRemainOrderSchedule();
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      getRemainOrderSchedule();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const totalOrders = authStore.settings?.monthlyOrder;
    if (
      (totalOrders && +totalOrders < 10 && +remainOrders === 1) ||
      (totalOrders && +remainOrders <= +totalOrders * 0.1)
    ) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [remainOrders]);

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Body className="modal-admin">
          <>
            <div
              className={`${
                !showMoreButtonVisible ? '' : 'line-clamp'
              } modal-content`}
              ref={modalRef}
              dangerouslySetInnerHTML={{
                __html: innerContent,
              }}
            ></div>

            {showMoreButtonVisible && (
              <a
                className="read-more"
                onClick={() => setShowMoreButtonVisible(false)}
              >
                {t(IMPORTANT_POP_UP_READ_MORE)}
              </a>
            )}

            <Form.Group className="unset-after">
              <Form.Check
                id="not-show-again"
                type="checkbox"
                label={t(IMPORTANT_POP_UP_NOT_SHOW_AGAIN)}
                checked={notShowAgain}
                onClick={() => setNotShowAgain(!notShowAgain)}
              />
            </Form.Group>

            <ButtonGroup className="form-actions">
              <Button
                variant={BUTTONVARIANT.PRIMARY}
                onClick={handleConfirmClicked}
              >
                <span>{t(IMPORTANT_POP_UP_CONFIRM)}</span>
                <i className="ico ico-checked"></i>
              </Button>
            </ButtonGroup>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export const LimitOrderPopup = observer(Component);
