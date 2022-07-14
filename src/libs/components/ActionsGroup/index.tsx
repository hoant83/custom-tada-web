import React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ActionsGroupDto } from '@/libs/dto/ActionsGroup.dto';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  actions: ActionsGroupDto[];
}

const ActionsGroup = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const { style, className, children, actions } = props;

  return (
    <>
      <Container
        className={`main-actions ${className ? className : ''}`}
        style={style}
      >
        <Row>
          <Col xs={12}>
            {actions.map((button, index) => (
              <Button
                key={`main-action-button-${index}`}
                variant={button.variantType}
                title={button.label}
                onClick={() => {
                  button.action();
                }}
              >
                {button.label}
              </Button>
            ))}
          </Col>
        </Row>
        {children}
      </Container>
    </>
  );
};

export default observer(ActionsGroup);
