import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import { I18N } from '@/modules/lang/i18n.enum';
import CircularProgress from '@material-ui/core/CircularProgress';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

/*
 * Props of Component
 */
interface ComponentProps {
  show: boolean;
  handleClose: any;
  dragFile?: any;
  handleDragFile?: any;
  handleUploadMultipleOrders?: any;
  isUpLoading?: boolean;
  handleDownloadTemplate: any;
}

const MultipleOrder = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    show,
    handleClose,
    dragFile,
    handleDragFile,
    handleUploadMultipleOrders,
    isUpLoading,
    handleDownloadTemplate,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    IMPORT_DOWNLOAD_TEMPLATE,
    IMPORT_UPLOAD,
    IMPORT_DRAG,
    IMPORT_SELECT,
    IMPORT_DOWNLOAD_BUTTON,
    IMPORT_TEMPLATE,
    IMPORT_UPLOAD_BUTTON,
    IMPORT_OR,
  } = I18N;

  const handleDrop = (acceptedFiles: any) => {
    handleDragFile(acceptedFiles[0]);
  };
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: '.xlsx',
    onDrop: handleDrop,
  });

  React.useEffect(() => {}, [handleDragFile, dragFile, isUpLoading]);

  return (
    <>
      <Modal
        show={show}
        onHide={() => handleClose()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-custom modal-multiple-order"
      >
        <Modal.Body>
          <Button
            variant={BUTTONVARIANT.PRIMARY}
            onClick={() => handleClose()}
            className="btn-icon modal-close-right"
            size="lg"
          >
            <i className="ico ico-delete"></i>
          </Button>
          <div className="block-selected-order">
            <h5>{t(IMPORT_DOWNLOAD_TEMPLATE)}</h5>
            <div className="multiple-wrapper bordered">
              <div
                className="item multiple-item"
                onClick={() => handleDownloadTemplate()}
              >
                <i className="ico ico-import"></i>
                <div className="box">
                  <h4 className="item-title">{t(IMPORT_DOWNLOAD_BUTTON)}</h4>
                  <span className="item-subtitle">{t(IMPORT_TEMPLATE)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="block-selected-order">
            <h5>{t(IMPORT_UPLOAD)}</h5>
            <div className="multiple-wrapper bordered">
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} accept=".xlsx" />
                  <p>{t(IMPORT_DRAG)}</p>
                  <p>{t(IMPORT_OR)}</p>
                  <div className="item multiple-item">
                    <i className="ico ico-upload"></i>
                    <div className="box">
                      <h4 className="item-title" style={{ paddingTop: '18px' }}>
                        {t(IMPORT_SELECT)}
                      </h4>
                    </div>
                  </div>
                  <aside>
                    <span>
                      {acceptedFiles.map((file: any) => `${file.path}`)}
                    </span>
                  </aside>
                </div>
              </section>
              <ButtonGroup className="block-actions upload-multiple-button">
                <Button
                  variant={BUTTONVARIANT.PRIMARY}
                  onClick={() => {
                    handleUploadMultipleOrders();
                    acceptedFiles.length = 0;
                    acceptedFiles.splice(0, acceptedFiles.length);
                  }}
                  disabled={isUpLoading || !dragFile.file}
                >
                  {isUpLoading && <CircularProgress size={20} />}
                  {!isUpLoading && (
                    <>
                      {t(IMPORT_UPLOAD_BUTTON)}
                      <i className="ico ico-yes-circle"></i>
                    </>
                  )}
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default observer(MultipleOrder);
