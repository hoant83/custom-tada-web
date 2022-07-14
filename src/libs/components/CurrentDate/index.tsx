import React from 'react';
import { observer } from 'mobx-react-lite';
import { Card } from 'react-bootstrap';
import { CommonStoreContext } from '@/libs/stores/common.store';
import Clock from 'react-live-clock';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

const CurrentDate = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const { style, className, children } = props;

  const commonStore = React.useContext(CommonStoreContext);

  return (
    <>
      <Card
        className={`block-time ${className ? className : ''}`}
        style={style}
      >
        <Card.Body>
          <Card.Title className="item-time">
            <Clock format={commonStore.hourMinusFormat} ticking={true} />
          </Card.Title>
          <Card.Text className="item-day">
            <Clock format={commonStore.shortTimeFormat} ticking={true} />
          </Card.Text>
        </Card.Body>
      </Card>
      {children}
    </>
  );
};

export default observer(CurrentDate);
