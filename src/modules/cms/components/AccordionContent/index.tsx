import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col, Accordion, Card } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import { useAccordionToggle, AccordionContext } from 'react-bootstrap';

/*
 * Props of Component
 */
interface ContextAwareToggleProps {
  children?: React.ReactNode;
  eventKey: string;
  callback?: any;
}

const FaqCustomToggle = (props: ContextAwareToggleProps) => {
  /*
   * Props of Component
   */
  const { children, eventKey, callback } = props;

  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <Card.Header
      onClick={decoratedOnClick}
      className={isCurrentEventKey ? 'active' : ''}
    >
      {children}
    </Card.Header>
  );
};

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title: string;
  data: any;
}

const AccordionContent = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const { style, className, children, title, data } = props;

  return (
    <>
      <Container fluid className={`cms-static ${className ? className : ''}`}>
        <Row className="page-title">
          <h1>{title}</h1>
        </Row>
        <Row className="contents" style={style}>
          {data && (
            <Col xs={12}>
              {data.map((item: any, index: any) => (
                <Accordion
                  key={`faq-key-${index}`}
                  defaultActiveKey={index === 0 ? `${index}` : ''}
                >
                  <FaqCustomToggle eventKey={`${index}`}>
                    {item.title}
                  </FaqCustomToggle>
                  <Accordion.Collapse eventKey={`${index}`}>
                    <Card.Body>{ReactHtmlParser(item.content)}</Card.Body>
                  </Accordion.Collapse>
                </Accordion>
              ))}
            </Col>
          )}
          <Col>{children}</Col>
        </Row>
      </Container>
    </>
  );
};

export default observer(AccordionContent);
