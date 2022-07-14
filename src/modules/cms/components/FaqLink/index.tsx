import React from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { CMS_ROUTERS } from '@/modules/cms/router.enum';

/*
 * Props of Component
 */
interface ComponentProps {
  className?: string;
}

const FaqLink = (props: ComponentProps) => {
  const history = useHistory();

  /*
   * Props of Component
   */
  const { className } = props;

  return (
    <>
      <Button
        variant="link"
        className={`item box-faq ${className ? className : ''}`}
        onClick={() => history.push(CMS_ROUTERS.FAQ)}
      >
        <i className="ico ico-faq"></i>
      </Button>
    </>
  );
};

export default observer(FaqLink);
