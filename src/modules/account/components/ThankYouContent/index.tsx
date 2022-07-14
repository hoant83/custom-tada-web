import React from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Button } from 'react-bootstrap';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title: string;
  subTitle: string;
  iconSuccess?: string;
  btnText?: string;
  handleBtn?: any;
}

const AccountThankYouContent = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    title,
    subTitle,
    iconSuccess = '',
    btnText = '',
    handleBtn,
  } = props;

  return (
    <>
      <div className={`block-thank-you ${className ? className : ''}`}>
        <Card style={style}>
          {iconSuccess && <Card.Img variant="top" src={iconSuccess} />}
          <Card.Body>
            <Card.Title className="block-title">{title}</Card.Title>
            <Card.Subtitle className="block-subtitle">{subTitle}</Card.Subtitle>
            <Card.Text className="block-content">{children}</Card.Text>
            {handleBtn && (
              <Button variant="primary" type="submit" onClick={handleBtn}>
                <span>{btnText}</span>
                <i className="ico ico-o-next"></i>
              </Button>
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default observer(AccountThankYouContent);
