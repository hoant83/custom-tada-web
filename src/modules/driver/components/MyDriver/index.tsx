import React from 'react';
import { observer } from 'mobx-react-lite';

/*
 * Props of Component
 */
interface ComponentProps {}

const MyDriver = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {} = props;

  return <>My Driver</>;
};

export default observer(MyDriver);
