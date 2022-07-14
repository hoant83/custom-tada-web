import Loading from '@/libs/components/Loading';
import CustomQuillEditor from '@/libs/components/QuillEditor';
import { ImportantNote } from '@/libs/dto/important-note/important-note.dto';
import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import importantNoteService from '@/libs/services/important-note.service';
import { ImportantNoteStoreContext } from '@/libs/stores/important-note.store';
import { I18N } from '@/modules/lang/i18n.enum';
import AdminWrapper from '@/modules/theme/components/AdminWrapper';
import { observer } from 'mobx-react';
import React from 'react';
import { Button, ButtonGroup, Form, Tab, Tabs } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import './index.scss';

export const IMPORTANT_NOTE_TAB_KEY = {
  CUSTOMER: 'CUSTOMER',
  TRUCK_OWNER: 'TRUCK_OWNER',
};

const ImportantNotePage = () => {
  const { t } = useTranslation();

  const {
    IMPORTANT_NOTE_TITLE,
    BUTTONS_UPDATE,
    USER_ROLE_CUSTOMER,
    USER_ROLE_TRUCK_OWNER,
  } = I18N;

  const importantNoteStore = React.useContext(ImportantNoteStoreContext);

  const [currentTab, setCurrentTab] = React.useState<string>(
    IMPORTANT_NOTE_TAB_KEY.CUSTOMER
  );

  const [activated, setActivated] = React.useState<boolean>(false);

  const [content, setContent] = React.useState<string>(
    importantNoteStore.adminImportantNotes.find((x) => x.type === currentTab)
      ?.content || ''
  );

  const updateImportantNote = async (
    id: number,
    model: Partial<ImportantNote>
  ) => {
    const result = await importantNoteService.update(id, model);
    if (result) {
      importantNoteStore.listImportantNotes();
      toast.success('OK');
    }
  };

  const getIdFromCurrentTab = (): number => {
    const id =
      importantNoteStore.adminImportantNotes.find((x) => x.type === currentTab)
        ?.id || 0;
    return id;
  };

  const updateContent = async () => {
    const id = getIdFromCurrentTab();
    if (!id) {
      return;
    }
    updateImportantNote(id, { content, isOn: activated });
  };

  const handleToggleActivated = async () => {
    const id = getIdFromCurrentTab();
    if (!id) {
      return;
    }
    updateImportantNote(id, { content, isOn: !activated });
  };

  React.useEffect(() => {
    if (importantNoteStore.isLoading === false) {
      const found = importantNoteStore.adminImportantNotes.find(
        (x) => x.type === currentTab
      );
      setContent(found ? found.content : '');
      setActivated(found ? found.isOn : false);
    }
  }, [
    importantNoteStore.isLoading,
    currentTab,
    importantNoteStore.adminImportantNotes,
  ]);

  React.useEffect(() => {
    importantNoteStore.listImportantNotes();
  }, [importantNoteStore]);

  return (
    <>
      <React.Suspense fallback={<Loading />}>
        <AdminWrapper pageTitle={t(IMPORTANT_NOTE_TITLE)}>
          <Tabs
            id="uncontrolled-tab-important-note"
            activeKey={currentTab}
            onSelect={(k) => setCurrentTab(k || '')}
          >
            <Tab
              eventKey={IMPORTANT_NOTE_TAB_KEY.CUSTOMER}
              title={t(USER_ROLE_CUSTOMER)}
            ></Tab>

            <Tab
              eventKey={IMPORTANT_NOTE_TAB_KEY.TRUCK_OWNER}
              title={t(USER_ROLE_TRUCK_OWNER)}
            ></Tab>
          </Tabs>

          <Form.Switch
            id="activating"
            type="switch"
            label={'Activating'}
            className="form-switch"
            checked={activated}
            onChange={handleToggleActivated}
          />

          <CustomQuillEditor
            defaultValue={content}
            setContent={setContent}
          ></CustomQuillEditor>

          <ButtonGroup className="form-actions">
            <Button variant={BUTTONVARIANT.PRIMARY} onClick={updateContent}>
              <span>{t(BUTTONS_UPDATE)}</span>
              <i className="ico ico-update"></i>
            </Button>
          </ButtonGroup>
        </AdminWrapper>
      </React.Suspense>
    </>
  );
};

export default observer(ImportantNotePage);
