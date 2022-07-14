import React from 'react';

/*
 * Props of Component
 */
interface ComponentProps {
  onClick: any;
  name: string;
  title: string;
  sort: any;
}

const SortTH = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const { onClick, name, title, sort } = props;

  return (
    <th>
      <div className="d-flex align-items-center">
        {title}
        <span className="sort-icon ml-2" onClick={onClick}>
          {(!sort ||
            sort.orderBy !== name ||
            (sort.orderBy === name && sort.orderDirection === 'ASC')) && (
            <i className="ico ico-arrow-up" />
          )}
          {(!sort ||
            sort.orderBy !== name ||
            (sort.orderBy === name && sort.orderDirection === 'DESC')) && (
            <i className="ico ico-arrow-down" />
          )}
          {/* <i className="ico ico-arrow-up" />
          <i className="ico ico-arrow-down" /> */}
        </span>
      </div>
    </th>
  );
};

export default SortTH;
