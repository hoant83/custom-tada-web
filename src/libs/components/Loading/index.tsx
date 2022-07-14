import React from 'react';

/*
 * Props of Component
 */
interface ComponentProps {
  className?: string;
}

const Loading = (props: ComponentProps) => {
  const { className } = props;

  return (
    <>
      <div className={`page-loading ${className ?? ''}`}></div>
    </>
  );
};

export default Loading;
