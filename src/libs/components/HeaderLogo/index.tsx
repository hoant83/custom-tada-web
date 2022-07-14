import React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col } from 'react-bootstrap';
import { LogoDto } from '@/libs/dto/Logo.dto';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  logo: LogoDto;
}

const HeaderLogo = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const { style, className, children, logo } = props;

  return (
    <>
      <header className={`header ${className ? className : ''}`} style={style}>
        <Container fluid>
          <Row>
            <Col xs={12}>
              {logo && (
                <a
                  className="logo-wrapper"
                  href="/"
                  title={logo.alt ? logo.alt : 'Logo'}
                >
                  <img
                    className={logo.className ? logo.className : ''}
                    src={logo.url ? logo.url : ''}
                    alt={logo.alt ? logo.alt : 'Logo'}
                  />
                </a>
              )}
              {children}
            </Col>
          </Row>
        </Container>
      </header>
    </>
  );
};

export default observer(HeaderLogo);
