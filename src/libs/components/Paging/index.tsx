import React from 'react';
import { observer } from 'mobx-react-lite';
import { Pagination, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { pageSizeOptions } from '@/libs/constants/paging.constants';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  pageSize: number;
  handleChangeSize?: any;
  totalPage: number;
  totals: number;
  handleChangePage: any;
  current: number;
  currentPageFrame: number;
  maxPage: number;
  showFirstLast?: boolean;
  showLimiter?: boolean;
  showTotals?: boolean;
}

const Paging = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    pageSize,
    handleChangeSize,
    totalPage,
    totals,
    currentPageFrame,
    maxPage,
    handleChangePage,
    current,
    showFirstLast = true,
    showLimiter = true,
    showTotals = true,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    PAGING_FIRST,
    PAGING_LAST,
    PAGING_NEXT,
    PAGING_PREV,
    PAGING_AMOUNT,
    PAGING_PER_PAGE,
  } = I18N;

  const getStartPage = () => {
    if (currentPageFrame * maxPage > totalPage && maxPage < totalPage) {
      return totalPage - maxPage;
    }
    return currentPageFrame * maxPage - maxPage;
  };

  const startPage = getStartPage();

  return (
    <>
      <div className={`toolbar ${className ? className : ''}`} style={style}>
        {showTotals && (
          <p className="toolbar-amount">
            {totals} {t(PAGING_AMOUNT)}
          </p>
        )}
        {showLimiter && (
          <Form.Group className="limiter">
            <Form.Control
              as="select"
              defaultValue={pageSize}
              className="limiter-options"
              name="limiter"
              onChange={handleChangeSize}
            >
              {pageSizeOptions.map((size, indx) => (
                <option key={`limiter-${indx}`} value={size}>
                  {size}
                </option>
              ))}
            </Form.Control>
            <Form.Label className="limiter-label">
              {t(PAGING_PER_PAGE)}
            </Form.Label>
          </Form.Group>
        )}
        <Pagination>
          {showFirstLast && (
            <Pagination.First
              disabled={current > 1 ? false : true}
              onClick={() => handleChangePage(1)}
              className="page-first"
            >
              <i className="ico ico-first"></i>
              <span>{t(PAGING_FIRST)}</span>
            </Pagination.First>
          )}
          <Pagination.Prev
            className="page-prev"
            onClick={() => handleChangePage(current - 1)}
            disabled={current > 1 ? false : true}
          >
            <i className="ico ico-prev"></i>
            <span>{t(PAGING_PREV)}</span>
          </Pagination.Prev>
          {[...Array(totalPage < maxPage ? totalPage : maxPage)].map((e, i) =>
            current === startPage + i + 1 ? (
              <Pagination.Item
                active
                onClick={() => handleChangePage(startPage + i + 1)}
                key={`paging-${i}`}
                className="page-number"
              >
                {startPage + i + 1}
              </Pagination.Item>
            ) : (
              <Pagination.Item
                onClick={() => handleChangePage(startPage + i + 1)}
                key={`paging-${i}`}
                className="page-number"
              >
                {startPage + i + 1}
              </Pagination.Item>
            )
          )}
          <Pagination.Next
            className="page-next"
            onClick={() => handleChangePage(current + 1)}
            disabled={current === totalPage ? true : false}
          >
            <span>{t(PAGING_NEXT)}</span>
            <i className="ico ico-next"></i>
          </Pagination.Next>
          {showFirstLast && (
            <Pagination.Last
              className="page-last"
              onClick={() => handleChangePage(totalPage)}
              disabled={current === totalPage ? true : false}
            >
              <span>{t(PAGING_LAST)}</span>
              <i className="ico ico-last"></i>
            </Pagination.Last>
          )}
        </Pagination>
        {children}
      </div>
    </>
  );
};

export default observer(Paging);
