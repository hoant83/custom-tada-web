import React from 'react';
import { observer } from 'mobx-react-lite';
import { Alert } from 'react-bootstrap';
import { MessageStoreContext } from '@/modules/message/message.store';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  keyName: string;
}

const Message = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const { style, className, children, keyName } = props;

  /*
   * messages from store
   */
  const messageStore = React.useContext(MessageStoreContext);

  /*
   * Action of closing messagae
   * @params: number index
   * @return: void
   */
  const handleClose = (index: number) => {
    messageStore.setMessages([
      ...messageStore.messages.filter((item, idx) => idx !== index),
    ]);
  };

  return (
    <>
      {messageStore.messages && (
        <>
          {messageStore.messages.map((item, index) => (
            <Alert
              variant={item.type}
              style={style}
              className={`messages ${className ? className : ''}`}
              onClose={() => handleClose(index)}
              dismissible
              transition={true}
              key={`${keyName}-${index}`}
            >
              {item.content}
            </Alert>
          ))}
        </>
      )}
      {children}
    </>
  );
};

export default observer(Message);
