import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { I18N } from '@/modules/lang/i18n.enum';
import { LanguageStoreContext } from '@/modules/lang/lang.store';
import { NotificationStoreContext } from '@/modules/notification/notification.store';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React from 'react';
import { Badge, Button, ListGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

/*
 * Props of Component
 */
interface ComponentProps {
  className?: string;
}

const NotificationSummary = (props: ComponentProps) => {
  const languageStore = React.useContext(LanguageStoreContext);
  /*
   * Props of Component
   */
  const { className } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { BUTTONS_LOAD_MORE, IMPORTANT_POP_UP_NOT_SHOW_AGAIN } = I18N;

  /*
   * Setting show/hide Notification
   */
  const [showNotification, setShowNotification] = React.useState<boolean>(
    false
  );

  const notiStore = React.useContext(NotificationStoreContext);

  const authStore = React.useContext(AuthenticationStoreContext);

  React.useEffect(() => {
    notiStore.getNotiSchedule();
  }, [notiStore, languageStore.activeLanguage, authStore]);

  return (
    <>
      <div className={`item box-noti ${className ? className : ''}`}>
        <Button
          variant="link"
          className="box-noti-link"
          onClick={() => setShowNotification(!showNotification)}
        >
          <i className="ico ico-noti"></i>
          <Badge variant="light">{notiStore.unreadCount}</Badge>
        </Button>
        {showNotification && authStore.loggedUser && (
          <>
            <ListGroup as="ul" className="box-noti-list">
              {notiStore.notifications.map((noti) => (
                <ListGroup.Item
                  as="li"
                  key={noti.id}
                  onClick={() => {
                    notiStore.setRead(noti.id);
                  }}
                  className={`${!noti.isRead ? 'new' : 'read'}`}
                >
                  <i
                    className={`ico ico-noti-${
                      noti.notification.source === 'MARKETING'
                        ? 'system'
                        : 'order'
                    }`}
                  ></i>
                  {noti.notification.body ?? (
                    <>
                      <td>{noti.notification.body}</td>
                    </>
                  )}{' '}
                  <span className="item-date">
                    {moment.utc(noti.createdDate).fromNow()}
                  </span>
                  {noti.notification.titleEN ===
                    'Your maximum order quantity is running out' &&
                    !authStore.loggedUser.limitWarning && (
                      <span>
                        <Button
                          onClick={() => {
                            authStore.loggedUser.limitWarning = true;
                            notiStore.setStopWarning();
                          }}
                        >
                          <span>{t(IMPORTANT_POP_UP_NOT_SHOW_AGAIN)}</span>
                          <i className="ico ico-next"></i>
                        </Button>
                      </span>
                    )}
                </ListGroup.Item>
              ))}
              {notiStore.notifications.length < notiStore.total && (
                <ListGroup.Item className="buttons">
                  <Button
                    onClick={() => {
                      notiStore.currentTake += 5;
                      notiStore.getNotiList();
                    }}
                  >
                    <span>{t(BUTTONS_LOAD_MORE)}</span>
                    <i className="ico ico-next"></i>
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </>
        )}
      </div>
    </>
  );
};

export default observer(NotificationSummary);
