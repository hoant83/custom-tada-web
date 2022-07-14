import CurrentDate from '@/libs/components/CurrentDate';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title: string;
  subTitle?: string;
  elementPageName?: string;
  elementPageId?: string;
  showCurrentDate: boolean;
}

const PageTitle = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    title,
    subTitle = '',
    elementPageName = '',
    elementPageId = '',
    showCurrentDate = true,
  } = props;

  const ElementIdBlock = () => {
    return (
      <>
        <span className="element-id-block">
          <span className="element-page-name">{elementPageName}</span>|
          <span className="element-page-id">{elementPageId}</span>
        </span>
      </>
    );
  };

  return (
    <>
      <Container
        fluid
        className={`page-title-wrapper ${className ? className : ''}`}
        style={style}
      >
        <Row>
          {elementPageName && elementPageId ? (
            <>
              <Col xs={12} md={2}>
                <h1 className="page-title">{title}</h1>
              </Col>
              <Col xs={12} md={5}>
                <ElementIdBlock />
              </Col>
              {subTitle && <p className="page-subtitle">{subTitle}</p>}
            </>
          ) : (
            <Col xs={12} md={7}>
              <h1 className="page-title">{title}</h1>
              {subTitle && <p className="page-subtitle">{subTitle}</p>}
            </Col>
          )}

          {showCurrentDate && (
            <Col xs={12} md={5}>
              <CurrentDate />
            </Col>
          )}
        </Row>
        {children}
      </Container>
    </>
  );
};

export default observer(PageTitle);
