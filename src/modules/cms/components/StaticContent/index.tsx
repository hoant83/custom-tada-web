import React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col } from 'react-bootstrap';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title: string;
}

const StaticContent = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const { style, className, children, title } = props;

  return (
    <>
      <Container fluid className={`cms-static ${className ? className : ''}`}>
        <Row className="page-title">
          <h1>{title}</h1>
        </Row>
        <Row className="contents" style={style}>
          <Col xs={12}>{children}</Col>
        </Row>
      </Container>
    </>
  );
};

export default observer(StaticContent);
